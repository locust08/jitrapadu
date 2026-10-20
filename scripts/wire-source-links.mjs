import fs from 'node:fs/promises';
import ts from 'typescript';
const base='src/components/sites/figma-jitrapadu/';
const routeMap={
 '14:395':'/about-us',
 '129:1479':'/our-factory',
 '133:1462':'/solutions/telecom-tower-monopole',
 '133:1103':'mailto:jitrapadu@gmail.com',
 '133:1131':'/about-us',
 '133:1132':'/our-factory',
 '133:1173':'/solutions/telecom-tower-monopole#featured-projects',
 '133:1135':'mailto:jitrapadu@gmail.com',
 '133:1140':'/solutions/telecom-tower-monopole',
 '133:1155':'mailto:jitrapadu@gmail.com',
};
for(const file of ['home-design.tsx','shared/Footer.tsx']) {
 let code=await fs.readFile(base+file,'utf8');
 const source=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const changes=[];
 function visit(node) {
  if(ts.isJsxElement(node)) {
   const opening=node.openingElement;
   const id=opening.attributes.properties.find(p=>p.name?.text==='data-node-id')?.initializer?.text;
   const href=routeMap[id];
   if(href) {
    let text=opening.getText(source).replace(/^<\w+/,'<a');
    if(!/ href=/.test(text)) text=text.replace(/>$/,' href="'+href+'">');
    changes.push([opening.getStart(source),opening.end,text],[node.closingElement.getStart(source),node.closingElement.end,'</a>']);
   }
   const anchors={'31:329':'solutions','133:1104':'contact'};
   if(anchors[id]) changes.push([opening.end-1,opening.end-1,' id="'+anchors[id]+'"']);
  }
  ts.forEachChild(node,visit);
 }
 visit(source);
 for(const [start,end,replacement] of changes.sort((a,b)=>b[0]-a[0])) code=code.slice(0,start)+replacement+code.slice(end);
 await fs.writeFile(base+file,code);
}

