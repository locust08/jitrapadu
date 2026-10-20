import fs from 'node:fs/promises';
const keys=['home','about','factory','tower'];
const out='src/components/sites/figma-jitrapadu';
await fs.mkdir(out,{recursive:true});
for(const key of keys) {
 let code=await fs.readFile('docs/research/figma-jitrapadu/source/'+key+'-context.tsx.txt','utf8');
 code=code.replace(/const assetPathPrefix = "[^"]+";/,'const assetPathPrefix = "/sites/figma-jitrapadu/shared";');
 code=code.replace(/import \{ ShaderFill \} from "[^"]+";/,'import { ShaderFill } from "./shared/ShaderFill";');
 code=code.replace(/from "\.\/lib\/custom-effects\/([^"]+)"/g,'from "./shared/$1"');
 code=code.replace(/font-\['Inter:[^']+'\]/g,'font-sans');
 code=code.replace(/<p([^>]*className="[^"]*Font_Awesome[^"]*"[^>]*)>\s*([a-z0-9-]+)\s*<\/p>/g,(_,attrs,name)=>'<FigmaIcon name="'+name+'" '+attrs.replace(/className="([^"]*)"/,(_m,cl)=>'className="'+cl.replace(/font-\['Font_Awesome[^']+'\]/g,'')+'"')+' />');
 code=code.replace(/, property1 = "Default"/g,'').replace(/, mode = "Light", state = "Default"/g,'');
 code=code.replace(/export default function (\w+)\(\)/,'export function '+key[0].toUpperCase()+key.slice(1)+'Design()');
 // Normalise supplied Figma canvas dimensions at the root only.
 const marker='export function '+key[0].toUpperCase()+key.slice(1)+'Design()';
 const idx=code.indexOf(marker);
 code=code.slice(0,idx)+code.slice(idx).replace('className="bg-white relative size-full"','className="design-canvas design-'+key+' bg-white relative"');
 code='/* eslint-disable @next/next/no-img-element */\n"use client";\nimport { FigmaIcon } from "./shared/FigmaIcon";\n'+code;
 await fs.writeFile(out+'/'+key+'-design.tsx',code);
}

