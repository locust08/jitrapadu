/* eslint-disable @next/next/no-img-element */
"use client";

import { FoldText } from "./shared/FoldText";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { portfolioOptions, portfolioPath, type PortfolioCategory } from "./portfolio-options";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import "./portfolio.css";
import { projects } from "./project-data";
import { ProjectCard } from "./shared/ProjectCard";
import { approvedCopy } from "./approved-copy";

import { portfolioBanners } from "./solution-assets";
const portfolioCopy = approvedCopy.portfolio;
export function PortfolioLegacyRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Preserve bookmarked review links while making every new navigation use the
  // category's own route. Keep the query reader in its own Suspense boundary so
  // it cannot turn the actual project listing into a client-only static export.
  useEffect(() => {
    if (!searchParams.has("solution")) return;
    const item = portfolioOptions.find(option => option.id === searchParams.get("solution")) || portfolioOptions[0];
    router.replace(portfolioPath(item.id), { scroll: false });
  }, [searchParams, router]);
  return null;
}

export function PortfolioDesign({ routeCategory = "all" }: { routeCategory?: PortfolioCategory }) {
  const router = useRouter();
  const selectedCategory = portfolioOptions.find(option => option.id === routeCategory) || portfolioOptions[0];
  const category = selectedCategory.id;
  const categoryLabel = selectedCategory.label;
  const setCategory = (value: PortfolioCategory) => router.push(portfolioPath(value), { scroll: false });
  const filtered = projects.filter(project => category === "all" || project.category === category);
  return <div className="design-canvas fluid-page portfolio-page">
    <Header />
    <section className="portfolio-hero page-banner" data-reveal>
      <div className="portfolio-hero-art" aria-hidden="true"><img src={portfolioBanners[category]} alt="" /></div>
      <div className="portfolio-hero-copy"><h1><FoldText>Portfolio</FoldText></h1></div>
    </section>
    {category === "all" && <section className="portfolio-introduction" data-reveal><h2><FoldText>{portfolioCopy[2].slice(4)}</FoldText></h2><p>{portfolioCopy[3]}</p></section>}
    <section className="portfolio-layout" aria-label="Project portfolio" data-reveal>
      <aside className="portfolio-sidebar"><h2><FoldText>Filter by solution</FoldText></h2><div className="portfolio-filters">{portfolioOptions.map(item => <Link key={item.id} href={portfolioPath(item.id)} aria-current={category === item.id ? "page" : undefined} scroll={false}>{item.label}<ChevronRight size={18} /></Link>)}</div><label className="portfolio-mobile-filter">Filter by solution<select value={category} onChange={event => setCategory(event.target.value as PortfolioCategory)}>{portfolioOptions.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></aside>
      <div>{category !== "all" && <div className="portfolio-category-intro"><h2><FoldText>{selectedCategory.label}</FoldText></h2><p>{selectedCategory.description}</p></div>}<p className="portfolio-result-status" role="status">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{category !== "all" ? ` · ${categoryLabel}` : ""}</p>{filtered.length === 0 && <p className="portfolio-empty" role="status">No projects are available in this category yet.</p>}<div className="portfolio-grid">{filtered.map(project => <ProjectCard key={project.title} project={project} />)}</div></div>
    </section>
    <FooterWithCta className="site-footer" enquiryTitle="Looking for a Similar Solution?" enquiryText="Share your project scope with us and we will help recommend a suitable structure, fabrication method and deployment approach." enquiryLabel="Discuss Your Project" />
  </div>;
}
