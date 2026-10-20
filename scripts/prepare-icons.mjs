import fs from 'node:fs/promises';
const css=await fs.readFile('docs/research/figma-jitrapadu/source/font-awesome.css','utf8');
const map={};
for(const m of css.matchAll(/([^{}]+)\{--fa:"\\([a-f0-9]+)"\}/g)) {
 for(const n of m[1].matchAll(/\.fa-([a-z0-9-]+)/g)) map[n[1]]=String.fromCodePoint(parseInt(m[2],16));
}
await fs.writeFile('src/components/sites/figma-jitrapadu/shared/icon-map.json',JSON.stringify(map));
console.log(Object.keys(map).length+' glyphs');

