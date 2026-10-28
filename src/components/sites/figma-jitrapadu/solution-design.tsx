/* eslint-disable @next/next/no-img-element */
"use client";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { TowerFaq } from "./shared/TowerFaq";
import { ShaderFill } from "./shared/ShaderFill";
import { FigmaIcon } from "./shared/FigmaIcon";
import { setup, render, manifest } from "./shared/CodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615";
import { solutionData, type SolutionKey } from "./solution-data";
import Link from "next/link";
import "./tower-fluid.css";
import "./solution-fluid.css";

export function SolutionDesign({ solution }: { solution: SolutionKey }) {
  const data = solutionData[solution];
  const isRds = solution === "rapid-deployment-system";
  return <div className="design-canvas fluid-page tower-page additional-solution">
    <Header />
    <section className="tower-hero">
      <div className="tower-hero-images" aria-hidden="true"><img src={data.image} alt="" /></div>
      <div className="tower-shell"><h1 data-reveal>{data.title}</h1></div>
    </section>
    <section className="tower-shell tower-section tower-intro">
      <div className="tower-intro-copy" data-reveal><p className="tower-eyebrow">{data.eyebrow}</p><h2>{data.heading}</h2></div>
      <div className="tower-intro-detail"><div className="solution-intro-image solution-image-blank" aria-hidden="true" /><div data-reveal><p>{data.introduction}</p><p>{data.detail}</p></div></div>
      <div className="tower-intro-main" data-reveal><img src={data.image} alt={`${data.title} — contextual infrastructure illustration`} /></div>
    </section>
    <section className="tower-section tower-muted"><div className="tower-shell">
      <div className="tower-section-heading" data-reveal><h2>Product Range</h2></div>
      <div className="tower-products solution-products">{data.products.map(product => <article className="tower-product" key={product.title} data-card data-reveal>
        <h3>{product.title}</h3><div className={`tower-product-image${product.image ? "" : " solution-image-blank"}`} data-card-image aria-hidden={!product.image}>{product.image && <img src={product.image} alt={`${product.title} — contextual illustration`} />}</div><p>{product.description}</p>
      </article>)}</div>
    </div></section>
    <section className="tower-section tower-workflow">
      {isRds && <div className="tower-pattern" aria-hidden="true"><ShaderFill className="absolute" shader={{ setup, render, manifest, params: { falloff: 2.299999952316284, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 0.8832286596298218, y: 64.27672576904297, radius: 28.776113510131836, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } } }} /></div>}
      <div className="tower-shell tower-workflow-layout">
      <div className="tower-workflow-heading"><div data-reveal><p className="tower-eyebrow">Our Steps</p><h2>Installation &amp;<br />Deployment Workflow</h2></div></div>
      <ol className="tower-steps">{data.steps.map((step, index) => <li key={step.title} data-reveal>
        <div className="tower-step-icon solution-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
        <div><p className="tower-step-number">Step {index + 1}:</p><h3>{step.title}</h3><p>{step.description}</p></div>
      </li>)}</ol>
    </div></section>
    <section className="tower-section tower-muted"><div className="tower-shell">
      <div className="tower-section-heading" data-reveal><h2>Applications &amp; Use Cases</h2><p>{data.applicationsIntro}</p></div>
      <div className="tower-applications solution-application-slots">{data.applications.map(application => <article key={application} data-card data-reveal>
        <div className="solution-application-image" aria-hidden="true" /><h3>{application}</h3>
      </article>)}</div>
    </div></section>
    <section className="tower-section tower-shell">
        <div className="tower-featured-heading"><div data-reveal><h2>Featured Projects</h2><p>{data.featuredIntro}</p></div><Link className="tower-project-label" href="/portfolio">Explore More Projects <FigmaIcon name="arrow-right" /></Link></div>
        <div className="tower-projects solution-featured-slots" aria-hidden="true">{[0, 1, 2].map(index => <div className="solution-featured-slot" key={index}><div className="tower-project-image solution-image-blank" /></div>)}</div>
    </section>
    <section className="tower-section tower-faq">
      {!isRds && <div className="tower-pattern" aria-hidden="true"><ShaderFill className="absolute" shader={{ setup, render, manifest, params: { falloff: 2.299999952316284, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 50, y: 100, radius: 22.97724151611328, angle: -90 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } } }} /></div>}
      <div className="tower-shell">
      <div className="tower-section-heading" data-reveal><p className="tower-eyebrow">FAQ</p><h2>Your Questions, Answered</h2></div>
      <TowerFaq items={data.questions} />
    </div></section>
    <FooterWithCta className="site-footer" enquiryTitle={data.ctaTitle} enquiryText={data.ctaText} />
  </div>;
}
