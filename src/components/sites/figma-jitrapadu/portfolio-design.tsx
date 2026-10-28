/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { portfolioOptions } from "./portfolio-options";
import Link from "next/link";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import "./portfolio.css";
import { approvedCopy } from "./approved-copy";

const base = "/sites/figma-jitrapadu/shared/";
const projects = [
  { title: "Teluk Muroh, Manjung, Perak", category: "telecom-tower-monopole", description: "45m 3-legged light-duty tower", image: "7c4f4.png", location: "Manjung, Perak" },
  { title: "Kg Permatang Tulang, Melaka", category: "telecom-tower-monopole", description: "45m 3-legged light-duty tower", image: "0bbc3.png", location: "Melaka" },
  { title: "KPM Ayer Molek, Melaka", category: "telecom-tower-monopole", description: "36m monopole for 5 telco sharers", image: "42ef4.png", location: "Melaka" },
];
const portfolioCopy = approvedCopy.portfolio;
export function PortfolioDesign() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requested = searchParams.get("solution") || "all";
  const category = portfolioOptions.some(option => option.id === requested) ? requested : "all";
  const selectedCategory = portfolioOptions.find(option => option.id === category)!;
  const categoryLabel = selectedCategory.label;
  const setCategory = (value: string) => router.replace(value === "all" ? "/portfolio" : `/portfolio?solution=${value}`, { scroll: false });
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = projects.filter(project => category === "all" || project.category === category);
  const showProject = (project: (typeof projects)[number]) => {
    setSelected(project);
    dialog.current?.showModal();
  };
  return <div className="design-canvas fluid-page portfolio-page">
    <Header />
    <section className="portfolio-hero" data-reveal>
      <div className="portfolio-hero-art" aria-hidden="true"><img src={base + "4ac91.png"} alt="" /><img src={base + "e7432.png"} alt="" /><img src={base + "270ae.png"} alt="" /></div>
      <div className="portfolio-hero-copy"><h1>Portfolio</h1></div>
    </section>
    <section className="portfolio-introduction" data-reveal><h2>{portfolioCopy[2].slice(4)}</h2><p>{portfolioCopy[3]}</p></section>
    <section className="portfolio-layout" aria-label="Project portfolio" data-reveal>
      <aside className="portfolio-sidebar"><h2>Filter by solution</h2><div className="portfolio-filters">{portfolioOptions.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}<ChevronRight size={18} /></button>)}</div><label className="portfolio-mobile-filter">Filter by solution<select value={category} onChange={event => setCategory(event.target.value)}>{portfolioOptions.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></aside>
      <div>{category !== "all" && <div className="portfolio-category-intro"><h2>{selectedCategory.label}</h2><p>{selectedCategory.description}</p></div>}<p className="portfolio-result-status" role="status">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{category !== "all" ? ` · ${categoryLabel}` : ""}</p>{filtered.length === 0 && <p className="portfolio-empty" role="status">No projects are available in this category yet.</p>}<div className="portfolio-grid">{filtered.map(project => <button type="button" className="portfolio-card" key={project.title} onClick={() => showProject(project)} aria-label={`View project: ${project.title}`}><img src={base + project.image} alt={project.description + " at " + project.title} /><span className="portfolio-card-copy"><span className="portfolio-card-title">{project.title}</span><span className="portfolio-card-description">{project.description}</span><span className="portfolio-view">View Project<span><ArrowRight size={18} /></span></span></span></button>)}</div></div>
    </section>
    <FooterWithCta className="site-footer" enquiryTitle="Looking for a Similar Solution?" enquiryText="Share your project scope with us and we will help recommend a suitable structure, fabrication method and deployment approach." enquiryLabel="Discuss Your Project" />
    <dialog ref={dialog} className="portfolio-dialog" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onClose={() => setSelected(null)} aria-labelledby="project-dialog-title">
      {selected && <><button type="button" className="portfolio-dialog-close" aria-label="Close project" onClick={() => dialog.current?.close()}><X size={24} /></button><div className="portfolio-dialog-layout"><img className="portfolio-dialog-photo" src={base + selected.image} alt={selected.description + " at " + selected.title} /><div className="portfolio-dialog-copy"><p className="portfolio-eyebrow">{portfolioOptions.find(option => option.id === selected.category)?.label}</p><h2 id="project-dialog-title">{selected.title}</h2><dl><div><dt>Location</dt><dd>{selected.location}</dd></div><div><dt>Structure</dt><dd>{selected.description}</dd></div></dl><Link href="/contact-us" onClick={() => dialog.current?.close()}>Discuss a similar project<ArrowRight size={18} /></Link></div></div></>}
    </dialog>
  </div>;
}
