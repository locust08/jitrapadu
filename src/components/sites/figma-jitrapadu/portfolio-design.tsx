/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import "./portfolio.css";
import { approvedCopy } from "./approved-copy";

const base = "/sites/figma-jitrapadu/shared/";
const projects = [
  { title: "Teluk Muroh, Manjung, Perak", category: "Telecom Towers", description: "45m 3-legged light-duty tower", image: "7c4f4.png", location: "Manjung, Perak" },
  { title: "Kg Permatang Tulang, Melaka", category: "Telecom Towers", description: "45m 3-legged light-duty tower", image: "0bbc3.png", location: "Melaka" },
  { title: "KPM Ayer Molek, Melaka", category: "Monopoles", description: "36m monopole for 5 telco sharers", image: "42ef4.png", location: "Melaka" },
];
const categories = ["All Projects", "Telecom Towers", "Monopoles"];
const portfolioCopy = approvedCopy.portfolio;
const sectorHeadings = ["Telecommunications", "Smart Pole", "Oil & Gas", "Defence"];
const sectors = sectorHeadings.map(title => {
  const start = portfolioCopy.indexOf(`H2: ${title}`);
  const end = portfolioCopy.findIndex((line, index) => index > start && line.startsWith("H2: "));
  return { title, introduction: portfolioCopy[start + 1], items: portfolioCopy.slice(start + 2, end) };
});

export function PortfolioDesign() {
  const [category, setCategory] = useState("All Projects");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = projects.filter(project => category === "All Projects" || project.category === category);
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
      <aside className="portfolio-sidebar"><h2>Filter by solution</h2><div className="portfolio-filters">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<ChevronRight size={18} /></button>)}</div><label className="portfolio-mobile-filter">Filter by solution<select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label></aside>
      <div><p className="portfolio-result-status" role="status">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{category !== "All Projects" ? ` · ${category}` : ""}</p><div className="portfolio-grid">{filtered.map(project => <button type="button" className="portfolio-card" key={project.title} onClick={() => showProject(project)} aria-label={`View project: ${project.title}`}><img src={base + project.image} alt={project.description + " at " + project.title} /><span className="portfolio-card-copy"><span className="portfolio-card-title">{project.title}</span><span className="portfolio-card-description">{project.description}</span><span className="portfolio-view">View project<span><ArrowRight size={18} /></span></span></span></button>)}</div></div>
    </section>
    <section className="portfolio-sector-grid">{sectors.map((sector, index) => <article key={sector.title} className="portfolio-sector" data-reveal><h2>{sector.title}</h2><p>{sector.introduction}</p><ul>{sector.items.map(item => <li key={item}>{item}</li>)}</ul>{index > 0 && <div className="portfolio-sector-image-blank" aria-hidden="true" />}</article>)}</section>
    <section className="portfolio-enquiry" data-reveal><div><h2>Looking for a Similar Solution?</h2><p>Share your project scope with us and we will help recommend a suitable structure, fabrication method and deployment approach.</p></div><Link href="/contact-us">Discuss Your Project<ArrowRight size={18} /></Link></section>
    <FooterWithCta className="site-footer portfolio-footer" />
    <dialog ref={dialog} className="portfolio-dialog" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onClose={() => setSelected(null)} aria-labelledby="project-dialog-title">
      {selected && <><button type="button" className="portfolio-dialog-close" aria-label="Close project" onClick={() => dialog.current?.close()}><X size={24} /></button><div className="portfolio-dialog-layout"><img className="portfolio-dialog-photo" src={base + selected.image} alt={selected.description + " at " + selected.title} /><div className="portfolio-dialog-copy"><p className="portfolio-eyebrow">{selected.category}</p><h2 id="project-dialog-title">{selected.title}</h2><dl><div><dt>Location</dt><dd>{selected.location}</dd></div><div><dt>Structure</dt><dd>{selected.description}</dd></div></dl><Link href="/contact-us" onClick={() => dialog.current?.close()}>Discuss a similar project<ArrowRight size={18} /></Link></div></div></>}
    </dialog>
  </div>;
}
