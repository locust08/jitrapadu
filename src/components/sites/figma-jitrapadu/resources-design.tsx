import { FoldText } from "./shared/FoldText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResourceFrame } from "./editorial";
import { approvedCopy } from "./approved-copy";

const entries = [{title:"Blog",href:"/blog"},{title:"News & Events",href:"/blog/news"},{title:"CSR",href:"/csr"}];
export function ResourcesDesign() {
  const copy = approvedCopy.resources;
  return <ResourceFrame><section className="resources-index-hero" data-reveal><p className="resource-eyebrow">Resources</p><h1><FoldText>Resources</FoldText></h1><h2><FoldText>{copy[2].slice(4)}</FoldText></h2><p>{copy[3]}</p></section><section className="resource-shell resources-index-grid">{entries.map(item => <article key={item.title} data-card data-reveal><h2><FoldText>{item.title}</FoldText></h2><p>{copy[copy.indexOf(`H2: ${item.title}`)+1]}</p><Link href={item.href}>Explore {item.title}<ArrowRight size={18}/></Link></article>)}</section></ResourceFrame>;
}
