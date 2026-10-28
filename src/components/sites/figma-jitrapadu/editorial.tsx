/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { editorialPosts, type EditorialKind, type EditorialPost } from "./editorial-data";
import "./resources.css";
import { blogCategories, blogCategoryHref, type BlogCategory } from "./blog-routes";

export function ResourceFrame({children,withCta=true}:{children:React.ReactNode;withCta?:boolean}) {
  return <div className="design-canvas fluid-page resource-page"><Header />{children}<FooterWithCta className={withCta ? "site-footer" : "site-footer resource-footer"} /></div>;
}
export function PostCard({post,kind,featured=false}:{post:EditorialPost;kind:EditorialKind;featured?:boolean}) {
  return <article className={`post-card${featured?" post-featured":""}`} data-card>
    <Link className="post-image" href={`/${kind}/${post.slug}`} tabIndex={-1} aria-hidden="true"><img src={post.image} alt="" data-card-image /></Link>
    <div className="post-summary"><span className="post-category">{post.category}</span><p className="post-date">{kind==="csr"?(post.completedYear?"Illustrative year: "+post.completedYear+" · Proposed initiative":"Proposed initiative"):"Date to be confirmed"}</p><h2><Link href={`/${kind}/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="post-read" href={`/${kind}/${post.slug}`}>Read {kind==="csr"?"the story":"more"}<ArrowRight size={16}/></Link></div>
  </article>;
}
const categoryDescriptions: Record<string, string> = {
  Article: "Explore practical articles covering telecommunication infrastructure, steel fabrication, smart poles, rapid deployment systems, 5G readiness and project planning.",
  News: "Keep up with Jitrapadu’s latest company updates, project announcements, certifications, milestones and developments across our operations.",
  Events: "Discover Jitrapadu’s participation in industry events, exhibitions, technical activities and other initiatives that connect us with industry partners and the wider engineering community.",
};
export function EditorialArchive({kind,category="All"}:{kind:EditorialKind;category?:BlogCategory}) {
  const router=useRouter();
  const csr=kind==="csr";
  const categories: BlogCategory[]=["All",...blogCategories.map(item=>item.label)];
  const [year,setYear]=useState("All");
  const years=[...new Set(editorialPosts.csr.flatMap(post=>post.completedYear?[post.completedYear]:[]))].sort((a,b)=>b-a);
  const filterKey=csr?year:category;
  const [pagination,setPagination]=useState({filter:filterKey,page:1});
  const page=pagination.filter===filterKey?pagination.page:1;
  const results=useRef<HTMLDivElement>(null);
  const changePage=(next:number)=>{setPagination({filter:filterKey,page:next});results.current?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});};
  const setCategory=(value:string)=>router.push(blogCategoryHref(value),{scroll:false});
  const filtered=editorialPosts[kind].filter(post=>(category==="All"||post.category===category)&&(!csr||year==="All"||String(post.completedYear)===year));
  const count=csr?4:5;
  const pages=Math.ceil(filtered.length/count);
  const visible=filtered.slice((page-1)*count,page*count);
  const heading=category==="All"?"All updates":category;
  const description=categoryDescriptions[heading]||"Explore Jitrapadu’s articles, company news and participation in industry events.";
  return <ResourceFrame>
    <section data-reveal className={`resource-hero ${csr?"csr-hero":"news-hero"}`}><img src={csr?"/sites/figma-jitrapadu/editorial/engineering-education.png":"/sites/figma-jitrapadu/shared/fa8df.png"} alt=""/><div className="resource-hero-copy">{!csr&&<p className="resource-eyebrow">Resources</p>}<h1>{csr?"CSR":"Blog"}</h1>{!csr&&<p>Explore practical articles, company news and industry events from Jitrapadu Engineering.</p>}</div></section>
    <section className="resource-shell archive-layout" data-reveal>
      <aside className="archive-sidebar" aria-label="Post filters"><h2>{csr?"Filter by year":"Filter by"}</h2>{csr?<label className="archive-year-filter">Year<select value={year} onChange={event=>setYear(event.target.value)} aria-describedby="csr-year-note"><option value="All">All years</option>{years.map(item=><option key={item} value={item}>{item}</option>)}</select></label>:<div className="archive-filters">{categories.map(item=><button key={item} type="button" aria-pressed={category===item} onClick={()=>setCategory(item)}><span>{item==="All"?"All updates":item}</span></button>)}</div>}{csr&&<p id="csr-year-note" className="archive-year-note">Years are generated for review. Activities and completion dates are unverified.</p>}</aside>
      <div className="archive-results" ref={results}>{csr?<div className="archive-category-intro"><h2>CSR</h2><p>Discover how Jitrapadu supports community development, safer infrastructure and a better-connected Malaysia through meaningful corporate social responsibility initiatives.</p></div>:<div className="archive-category-intro"><h2>{heading}</h2><p>{description}</p><p className="editorial-draft-note">Articles and event ideas are drafts for review. Events are not scheduled and no bookings are being taken. Images are illustrative.</p></div>}<p className="result-count" role="status">{filtered.length} {filtered.length===1?"story":"stories"}{csr&&year!=="All"?` in ${year}`:category!=="All"?` in ${category}`:""}</p>{filtered.length===0&&<p className="archive-empty" role="status">No posts are available in this {csr?"year":"category"} yet.</p>}<div className="post-grid">{visible.map((post,index)=><PostCard post={post} kind={kind} key={post.slug} featured={!csr&&page===1&&category==="All"&&index===0}/>)}</div>
      {pages>1&&<nav className="archive-pagination" aria-label="Archive pagination"><button type="button" disabled={page===1} aria-label="Previous page" onClick={()=>changePage(page-1)}><ChevronLeft size={18}/></button>{Array.from({length:pages},(_,i)=><button key={i} aria-current={page===i+1?"page":undefined} onClick={()=>changePage(i+1)}>{i+1}</button>)}<button type="button" disabled={page===pages} aria-label="Next page" onClick={()=>changePage(page+1)}><ChevronRight size={18}/></button></nav>}</div>
    </section>
  </ResourceFrame>;
}
export function EditorialArticle({kind,post}:{kind:EditorialKind;post:EditorialPost}) {
  const related=editorialPosts[kind].filter(item=>item.slug!==post.slug).slice(0,3);
  return <ResourceFrame><div className="article-banner"><img src={post.image} alt=""/></div><article className="resource-shell article-layout"><nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={kind==="csr"?"/csr":blogCategoryHref(post.category)}>{kind==="csr"?"CSR":"Blog"}</Link></nav><div className="article-body"><span className="post-category">{post.category}</span><p className="post-date">{kind==="csr"?("Proposed initiative — draft content"+(post.completedYear?" · Illustrative year: "+post.completedYear:"")):"Draft editorial content · Date to be confirmed"}</p><h1>{post.title}</h1><p className="article-lead">{post.excerpt}</p>{kind==="csr"&&<aside className="article-draft">This is generated review content with an illustrative year, not a report of an actual company activity. Images are illustrative.</aside>}<img className="article-inline-image" src={post.image} alt="Illustration accompanying this draft story"/>{post.body.map(section=><section key={section.heading} data-reveal><h2>{section.heading}</h2><p>{section.text}</p></section>)}</div></article><section className="resource-shell related-posts"><div className="related-heading"><h2>Related {kind==="csr"?"CSR stories":"posts"}</h2><Link href={kind==="csr"?"/csr":"/blog"}>View all {kind==="csr"?"stories":"updates"}<ArrowRight size={16}/></Link></div><div className="related-grid">{related.map(item=><PostCard kind={kind} post={item} key={item.slug}/>)}</div></section></ResourceFrame>;
}
