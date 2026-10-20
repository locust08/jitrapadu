import fs from 'node:fs/promises';
import ts from 'typescript';
const root='src/components/sites/figma-jitrapadu';
const home=await fs.readFile(root+'/home-design.tsx','utf8');
function declarations(code) {
 const source=ts.createSourceFile('design.tsx',code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 return [...source.statements].filter(n=>ts.isFunctionDeclaration(n)||ts.isTypeAliasDeclaration(n)).map(n=>({name:n.name?.text,start:n.getFullStart(),end:n.end,text:n.getText(source)}));
}
const footer=declarations(home).find(n=>n.name==='FooterWithCta').text;
const assetConstants=home.match(/const img\w+ =[^;]+;/g).filter(line=>{const name=line.match(/const (\w+)/)[1];return footer.includes(name);}).join('\n');
await fs.writeFile(root+'/shared/Footer.tsx','/* eslint-disable @next/next/no-img-element */\nimport { FigmaIcon } from "./FigmaIcon";\nconst assetPathPrefix="/sites/figma-jitrapadu/shared";\n'+assetConstants+'\nexport '+footer);
for(const key of ['home','about','factory','tower']) {
 let code=await fs.readFile(root+'/'+key+'-design.tsx','utf8');
 for(const d of declarations(code).filter(d=>['Header','HeaderProps','FooterWithCta'].includes(d.name)).reverse()) code=code.slice(0,d.start)+code.slice(d.end);
 code=code.replace('import { FigmaIcon }','import { Header } from "./shared/Header";\nimport { FooterWithCta } from "./shared/Footer";\nimport { FigmaIcon }');
 // Escaped slash token identifiers from Figma are normalised to CSS-safe names.
 code=code.replace(/var\((--[^,()]+),/g,(_,name)=>'var('+name.replace(/[^a-zA-Z0-9-]/g,'-').replace(/-+/g,'-')+',');
 // Remove asset constants no longer used after shared component extraction.
 for(const m of [...code.matchAll(/const (img\w+) =[^;]+;\n/g)].reverse()) {
  if(code.split(m[1]).length===2) code=code.slice(0,m.index)+code.slice(m.index+m[0].length);
 }
 await fs.writeFile(root+'/'+key+'-design.tsx',code);
}
let footerCode=await fs.readFile(root+'/shared/Footer.tsx','utf8');
footerCode=footerCode.replace(/var\((--[^,()]+),/g,(_,name)=>'var('+name.replace(/[^a-zA-Z0-9-]/g,'-').replace(/-+/g,'-')+',');
await fs.writeFile(root+'/shared/Footer.tsx',footerCode);

