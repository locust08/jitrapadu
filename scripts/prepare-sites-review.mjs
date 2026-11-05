import { cp, mkdir, readdir, readFile, rm, stat, unlink, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

// Deployment-only compression: retain the source assets and validated export.
const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'temp/cloudflare-review/out');
const target = path.join(root, 'sites/jitrapadu-sites-source/dist');
// Replace generated output so an update cannot retain obsolete routes/chunks.
await stat(path.join(source, 'index.html'));
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(file));
    else if (entry.isFile()) result.push(file);
  }
  return result;
}

const originals = await files(source);
const replacements = new Map();
let originalBytes = 0;
let optimizedBytes = 0;
for (const file of originals.filter(file => file.endsWith('.png'))) {
  const relative = path.relative(source, file);
  const output = path.join(target, relative.replace(/\.png$/, '.webp'));
  const inputMetadata = await sharp(file).metadata();
  await sharp(file).webp({ quality: 95, alphaQuality: 100, effort: 4 }).toFile(output);
  const outputMetadata = await sharp(output).metadata();
  if (inputMetadata.width !== outputMetadata.width || inputMetadata.height !== outputMetadata.height) {
    throw new Error(`Image dimensions changed: ${relative}`);
  }
  originalBytes += (await stat(file)).size;
  optimizedBytes += (await stat(output)).size;
  replacements.set(path.basename(file), path.basename(output));
  await unlink(path.join(target, relative));
}

// Generated chunks may construct paths from a prefix plus a basename. Rewrite
// basenames in every exported HTML/CSS/JS/Flight payload, including encoded URLs.
const pattern = new RegExp([...replacements.keys()].map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
for (const file of await files(target)) {
  if (!/\.(html|js|css|txt|json|map)$/.test(file)) continue;
  const before = await readFile(file, 'utf8');
  const after = before.replace(pattern, name => replacements.get(name));
  if (after !== before) await writeFile(file, after);
}

const outputFiles = await files(target);
const bytes = (await Promise.all(outputFiles.map(file => stat(file)))).reduce((sum, file) => sum + file.size, 0);
if (bytes >= 256 * 1024 * 1024) throw new Error('Optimized export still exceeds the Sites archive limit');
await writeFile(path.join(root, 'sites/jitrapadu-sites-source/export-integrity.json'), JSON.stringify({
  source: 'temp/cloudflare-review/out',
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  optimization: 'PNG to WebP quality 95; original dimensions and source files retained',
  images: replacements.size,
  imageBytesBefore: originalBytes,
  imageBytesAfter: optimizedBytes,
  totalBytes: bytes,
  files: outputFiles.length,
}, null, 2) + '\n');
console.log(JSON.stringify({ images: replacements.size, originalBytes, optimizedBytes, bytes, files: outputFiles.length }));
