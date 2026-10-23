/* eslint-disable @next/next/no-img-element */
"use client";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { TowerFaq } from "./shared/TowerFaq";
import { solutionData, type SolutionKey } from "./solution-data";
import Link from "next/link";
import "./tower-fluid.css";
import "./solution-fluid.css";

export function SolutionDesign({ solution }: { solution: SolutionKey }) {
  const data = solutionData[solution];
  return <div className="design-canvas fluid-page tower-page additional-solution">
    <Header />
    <section className="tower-hero">
      <div className="tower-hero-images" aria-hidden="true"><img src={data.image} alt="" /></div>
      <div className="tower-shell"><h1 data-reveal>{data.title}</h1><p className="solution-hero-subtitle" data-reveal>{data.eyebrow}</p></div>
    </section>
    <section className="tower-shell tower-section tower-intro">
      <div className="tower-intro-copy" data-reveal><h2>{data.heading}</h2></div>
      <div className="tower-intro-detail" data-reveal><div><p>{data.introduction}</p><p>{data.detail}</p></div></div>
      <div className="tower-intro-main" data-reveal><img src={data.image} alt={`${data.title} — contextual infrastructure illustration`} /></div>
    </section>
    <section className="tower-section tower-muted"><div className="tower-shell">
      <div className="tower-section-heading" data-reveal><h2>Product Range</h2></div>
      <div className="tower-products solution-products">{data.products.map(product => <article className="tower-product" key={product.title} data-card data-reveal>
        <h3>{product.title}</h3><div className={`tower-product-image${product.image ? "" : " solution-image-blank"}`} data-card-image aria-hidden={!product.image}>{product.image && <img src={product.image} alt={`${product.title} — contextual illustration`} />}</div><p>{product.description}</p>
      </article>)}</div>
    </div></section>
    <section className="tower-section tower-workflow"><div className="tower-shell tower-workflow-layout">
      <div className="tower-workflow-heading"><div data-reveal><p className="tower-eyebrow">Our Steps</p><h2>Installation &amp;<br />Deployment Workflow</h2></div></div>
      <ol className="tower-steps">{data.steps.map((step, index) => <li key={step.title} data-reveal>
        <div className="tower-step-icon solution-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
        <div><p className="tower-step-number">Step {index + 1}:</p><h3>{step.title}</h3><p>{step.description}</p></div>
      </li>)}</ol>
    </div></section>
    <section className="tower-section tower-muted"><div className="tower-shell">
      <div className="tower-section-heading" data-reveal><h2>Applications &amp; Use Cases</h2><p>{data.applicationsIntro}</p></div>
      <ul className="solution-use-cases">{data.applications.map(application => <li key={application} data-card data-reveal>{application}</li>)}</ul>
    </div></section>
    <section className="tower-section tower-shell"><div className="tower-section-heading" data-reveal><h2>Featured Projects</h2><p>{data.featuredIntro}</p></div><div className="solution-project-blanks" aria-hidden="true"><div /><div /></div></section>
    <section className="tower-section tower-faq"><div className="tower-shell">
      <div className="tower-section-heading" data-reveal><p className="tower-eyebrow">FAQ</p><h2>Your Questions, Answered</h2></div>
      <TowerFaq items={data.questions} />
    </div></section>
    <section className="solution-copy-cta tower-shell" data-reveal><h2>{data.ctaTitle}</h2><p>{data.ctaText}</p><Link className="primary-action" href="/contact-us">{data.ctaLabel}</Link></section>
    <FooterWithCta className="site-footer solution-copy-footer" />
  </div>;
}
