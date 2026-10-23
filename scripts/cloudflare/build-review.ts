import { cp, mkdir, mkdtemp, readFile, writeFile, symlink, access, rm, stat, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import type { PublishedContent } from '../../src/cms/content-types'

export async function prepareReviewWorkspace({ repoRoot, workspace, content }: { repoRoot: string; workspace: string; content: PublishedContent }): Promise<void> {
  await mkdir(path.join(workspace, 'src/cms'), { recursive: true })
  await cp(path.join(repoRoot, 'src/app/(frontend)'), path.join(workspace, 'src/app'), { recursive: true })
  for (const dir of ['components', 'lib', 'hooks', 'types']) {
    const source = path.join(repoRoot, 'src', dir)
    if (await access(source).then(() => true, () => false)) await cp(source, path.join(workspace, 'src', dir), { recursive: true })
  }
  for (const file of ['src/cms/content-types.ts', 'src/cms/public-model.ts', 'postcss.config.mjs', 'package.json']) await cp(path.join(repoRoot, file), path.join(workspace, file))
  // The client-facing helpers do not need the server-only Media projection or Payload's generated schema.
  const modelPath = path.join(workspace, 'src/cms/public-model.ts')
  const model = await readFile(modelPath, 'utf8')
  await writeFile(modelPath, model.replace(/^import type \{ Media \} from '\.\.\/payload-types'\r?\n/m, '').replace(/export function toPublicImage[\s\S]*?(?=export function usePublishedList)/, ''))
  await cp(path.join(repoRoot, 'public'), path.join(workspace, 'public'), { recursive: true })
  await symlink(path.join(repoRoot, 'node_modules'), path.join(workspace, 'node_modules'), 'dir')
  const layoutPath = path.join(workspace, 'src/app/layout.tsx')
  const layout = await readFile(layoutPath, 'utf8')
  await writeFile(layoutPath, layout.replace(/^export const dynamic = 'force-dynamic';\r?\n/m, ''))
  const tsconfig = JSON.parse(await readFile(path.join(repoRoot, 'tsconfig.json'), 'utf8'))
  delete tsconfig.compilerOptions.paths['@payload-config']
  tsconfig.include = ['next-env.d.ts', 'src/**/*.ts', 'src/**/*.tsx', '.next/types/**/*.ts']
  await writeFile(path.join(workspace, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))
  await writeFile(path.join(workspace, 'next.config.mjs'), "export default { output: 'export', trailingSlash: true, images: { unoptimized: true } };\n")
  await writeFile(path.join(workspace, 'src/cms/review-content.json'), JSON.stringify(content))
  await writeFile(path.join(workspace, 'src/cms/public-content.ts'), "import type { PublishedContent } from './content-types'\nimport content from './review-content.json'\nexport async function getPublishedContent(): Promise<PublishedContent> { return content as PublishedContent }\n")
}

async function buildReview() {
  const repoRoot = path.resolve(fileURLToPath(new URL('../..', import.meta.url)))
  const parent = path.join(repoRoot, 'temp/cloudflare-review')
  await mkdir(parent, { recursive: true })
  const workspace = await mkdtemp(path.join(parent, 'build-'))
  const { emptyPublishedContent } = await import('../../src/cms/content-types')
  let content = emptyPublishedContent()
  if (process.env.PAYLOAD_SECRET) {
    const { getPayload } = await import('payload'), { default: config } = await import('../../src/payload.config')
    const { readPublishedContent } = await import('../../src/cms/public-reader')
    const payload = await getPayload({ config })
    try { content = await readPublishedContent(payload) }
    finally { const client = payload.db.drizzle.$client; await payload.destroy(); client.close() }
  }
  await prepareReviewWorkspace({ repoRoot, workspace, content })
  const status = await new Promise<number>(resolve => {
    const build = spawn(process.execPath, [path.join(repoRoot, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], { cwd: workspace, env: { ...process.env, NODE_ENV: 'production' }, stdio: 'inherit' })
    build.once('error', () => resolve(1)); build.once('exit', code => resolve(code ?? 1))
  })
  if (status !== 0) throw new Error('Review export build failed')
  const output = path.join(parent, 'out')
  await rm(output, { recursive: true, force: true })
  await cp(path.join(workspace, 'out'), output, { recursive: true })
  // Public approved local upload URLs need their bytes in this static-only deployment.
  const images = [...Object.values(content.solutions).flatMap(s => s?.image ? [s.image] : []), ...content.products.flatMap(p => p.image ? [p.image] : []), ...content.partners.map(p => p.logo)]
  const uploads = path.resolve(process.env.PAYLOAD_UPLOAD_DIR || path.join(repoRoot, 'temp/cms/uploads'))
  for (const image of images) {
    if (!image.url.startsWith('/api/media/file/')) continue
    const name = decodeURIComponent(image.url.slice('/api/media/file/'.length))
    if (!name || path.basename(name) !== name || name.includes('..')) throw new Error('Unsafe public media path')
    const target = path.join(output, 'api/media/file', name)
    await mkdir(path.dirname(target), { recursive: true }); await cp(path.join(uploads, name), target)
  }
  await writeFile(path.join(output, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n  X-Content-Type-Options: nosniff\n')
  const routes: string[] = []
  async function collectRoutes(dir: string): Promise<void> {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name)
      if (item.isDirectory()) await collectRoutes(file)
      else if (item.name === 'index.html') {
        const relative = path.relative(output, dir).split(path.sep).join('/')
        if (relative !== '404') routes.push(relative ? `/${relative}/` : '/')
      }
    }
  }
  await collectRoutes(output)
  const manifest = { kind: 'frontend-review', publicSnapshot: true, backendDeployed: false, builtAt: new Date().toISOString(), routes: routes.sort() }
  await writeFile(path.join(parent, 'manifest.json'), JSON.stringify(manifest, null, 2))
  async function checkFiles(dir: string): Promise<void> {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name)
      if (item.isDirectory()) await checkFiles(file)
      else if ((await stat(file)).size > 25 * 1024 * 1024) throw new Error('Export asset exceeds Cloudflare static asset 25 MiB limit')
    }
  }
  await checkFiles(output)
  for (const route of manifest.routes) {
    const html = await readFile(path.join(output, route, 'index.html'), 'utf8')
    if (!html.includes('www.bugherd.com/sidebarv2.js?apikey=8w0wxbo6yv16hqo0pnwzrg')) throw new Error('BugHerd script missing from review export')
  }
  console.log(JSON.stringify({ output, ...manifest }, null, 2))
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await buildReview() } catch { console.error('Frontend review export failed; inspect build diagnostics.'); process.exitCode = 1 }
  process.exit(process.exitCode || 0)
}
