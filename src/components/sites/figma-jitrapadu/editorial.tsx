/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, CalendarDays, Newspaper, Grid2X2, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { editorialPosts, type EditorialKind, type EditorialPost } from "./editorial-data";
import "./resources.css";

export function ResourceFrame({children}:{children:React.ReactNode}) {
  return <div className="design-canvas fluid-page resource-page"><Header />{children}<FooterWithCta className="site-footer resource-footer" /></div>;
}
export function PostCard({post,kind,featured=false}:{post:EditorialPost;kind:EditorialKind;featured?:boolean}) {
  return <article className={`post-card${featured?" post-featured":""}`} data-card>
    <Link className="post-image" href={`/${kind}/${post.slug}`} tabIndex={-1} aria-hidden="true"><img src={post.image} alt="" data-card-image /></Link>
    <div className="post-summary"><span className="post-category">{post.category}</span><p className="post-date">{kind==="csr"?"Proposed initiative":"Date to be confirmed"}</p><h2><Link href={`/${kind}/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="post-read" href={`/${kind}/${post.slug}`}>Read {kind==="csr"?"the story":"more"}<ArrowRight size={16}/></Link></div>
  </article>;
}
export function EditorialArchive({kind,blog=false}:{kind:EditorialKind;blog?:boolean}) {
  const [category,setCategory]=useState("All");
  const [page,setPage]=useState(1);
  const results=useRef<HTMLDivElement>(null);
  const changePage=(next:number)=>{setPage(next);results.current?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});};
  const csr=kind==="csr";
  const categories=csr?["All","Community","Education","Environment"]:blog?["All"]:["All","News","Events"];
  const filtered=editorialPosts[kind].filter(post=>(!blog||post.category==="News")&&(category==="All"||post.category===category));
  const count=csr?4:5;
  const pages=Math.ceil(filtered.length/count);
  const visible=filtered.slice((page-1)*count,page*count);
  return <ResourceFrame>
    <section data-reveal className={`resource-hero ${csr?"csr-hero":"news-hero"}`}><img src={csr?"/sites/figma-jitrapadu/editorial/engineering-education.png":"/sites/figma-jitrapadu/shared/fa8df.png"} alt=""/><div className="resource-hero-copy"><p className="resource-eyebrow">{csr?"CSR — Community Stories":"Resources"}</p><h1>{csr?"CSR":blog?"Blog":"News & Events"}</h1><p>{csr?"Discover how Jitrapadu supports community development, safer infrastructure and a better-connected Malaysia through meaningful corporate social responsibility initiatives.":blog?"Read practical articles on telecommunication infrastructure, steel fabrication, smart poles, rapid deployment systems, 5G readiness and project planning.":"Follow our latest company updates, project announcements, industry participation, certifications and milestone achievements."}</p></div></section>
    <section className="resource-shell archive-layout" data-reveal>
      <aside className="archive-sidebar" aria-label="Post filters"><h2>{csr?"Filter stories":"Filter by"}</h2><div className="archive-filters">{categories.map((item,index)=><button key={item} type="button" aria-pressed={category===item} onClick={()=>{setCategory(item);setPage(1);}}>{index===0?<Grid2X2 size={18}/>:item==="Events"?<CalendarDays size={18}/>:<Newspaper size={18}/>}<span>{item==="All"?(csr?"All initiatives":"All updates"):item}</span></button>)}</div><p className="archive-year-note">{csr?"Initiatives are proposed and undated.":"Dates will appear once editorial and event details are confirmed."}</p></aside>
      <div className="archive-results" ref={results}><div className="editorial-notice"><p className="resource-eyebrow">{csr?"Proposed CSR stories — draft content":"Draft editorial content"}</p><p>{csr?"These stories explore potential initiatives. They do not report completed activities or verified outcomes. Imagery is illustrative.":"Articles and event ideas are drafts for review. Events are not scheduled and no bookings are being taken. Images are illustrative."}</p></div><p className="result-count" role="status">{filtered.length} {filtered.length===1?"story":"stories"}{category!=="All"?` in ${category}`:""}</p><div className="post-grid">{visible.map((post,index)=><PostCard post={post} kind={kind} key={post.slug} featured={!csr&&page===1&&category==="All"&&index===0}/>)}</div>
      {pages>1&&<nav className="archive-pagination" aria-label="Archive pagination"><button type="button" disabled={page===1} aria-label="Previous page" onClick={()=>changePage(page-1)}><ChevronLeft size={18}/></button>{Array.from({length:pages},(_,i)=><button key={i} aria-current={page===i+1?"page":undefined} onClick={()=>changePage(i+1)}>{i+1}</button>)}<button type="button" disabled={page===pages} aria-label="Next page" onClick={()=>changePage(page+1)}><ChevronRight size={18}/></button></nav>}</div>
    </section>
  </ResourceFrame>;
}
export function EditorialArticle({kind,post}:{kind:EditorialKind;post:EditorialPost}) {
  const related=editorialPosts[kind].filter(item=>item.slug!==post.slug).slice(0,3);
  return <ResourceFrame><div className="article-banner"><img src={post.image} alt=""/></div><article className="resource-shell article-layout"><nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/${kind}`}>{kind==="csr"?"CSR":"News & Events"}</Link></nav><div className="article-body"><span className="post-category">{post.category}</span><p className="post-date">{kind==="csr"?"Proposed initiative — draft content":"Draft editorial content · Date to be confirmed"}</p><h1>{post.title}</h1><p className="article-lead">{post.excerpt}</p>{kind==="csr"&&<aside className="article-draft">This is a proposed initiative, not a report of an actual company activity. Images are illustrative.</aside>}<img className="article-inline-image" src={post.image} alt="Illustration accompanying this draft story"/>{post.body.map(section=><section key={section.heading} data-reveal><h2>{section.heading}</h2><p>{section.text}</p></section>)}</div></article><section className="resource-shell related-posts"><div className="related-heading"><h2>Related {kind==="csr"?"CSR stories":"posts"}</h2><Link href={`/${kind}`}>View all {kind==="csr"?"stories":"updates"}<ArrowRight size={16}/></Link></div><div className="related-grid">{related.map(item=><PostCard kind={kind} post={item} key={item.slug}/>)}</div></section></ResourceFrame>;
}
