/* eslint-disable @next/next/no-img-element */
"use client";
import { FoldText } from "./shared/FoldText";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { TowerFaq } from "./shared/TowerFaq";
import { ShaderFill } from "./shared/ShaderFill";
import { FigmaIcon } from "./shared/FigmaIcon";
import { setup, render, manifest } from "./shared/CodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615";
import { solutionData, type SolutionKey } from "./solution-data";
import { clientAsset, solutionAssets } from "./solution-assets";
import { projectsForSolution } from "./project-data";
import { ProjectCard } from "./shared/ProjectCard";
import Link from "next/link";
import "./tower-fluid.css";
import "./solution-fluid.css";

export function SolutionDesign({ solution }: { solution: SolutionKey }) {
  const data = solutionData[solution];
  const assets = solutionAssets[solution];
  const isRds = solution === "rapid-deployment-system";
  return <div className="design-canvas fluid-page tower-page additional-solution">
    <Header />
    <section className="tower-hero page-banner">
      <div className="tower-hero-images" aria-hidden="true"><img src={clientAsset(assets.hero)} alt="" /></div>
      <div className="tower-shell"><h1 data-reveal><FoldText>{data.title}</FoldText></h1></div>
    </section>
    <section className="tower-shell tower-section tower-intro">
      <div className="tower-intro-copy" data-reveal><p className="tower-eyebrow">{data.eyebrow}</p><h2><FoldText>{data.heading}</FoldText></h2></div>
      <div className="tower-intro-detail"><div className="solution-intro-image"><img src={clientAsset(assets.intro)} alt={`${data.title} installation detail`} /></div><div data-reveal><p>{data.introduction}</p><p>{data.detail}</p></div></div>
      <div className="tower-intro-main" data-reveal><img src={clientAsset(assets.main)} alt={`${data.title} deployment`} /></div>
    </section>
    <section className="tower-section tower-muted"><div className="tower-shell">
      <div className="tower-section-heading" data-reveal><h2><FoldText>Product Range</FoldText></h2></div>
      <div className={`tower-products solution-products ${isRds ? "rds-product-images" : "smart-product-images"}`}>{data.products.map((product, index) => <article className="tower-product" key={product.title} data-card data-reveal>
        <h3>{product.title}</h3><div className="tower-product-image" data-card-image><img src={clientAsset(assets.products[index])} alt={product.title} />{isRds && index === 2 && <img className="rds-single-overlay" src={clientAsset(solutionAssets["rapid-deployment-system"].singleOverlay)} alt="" />}</div><p>{product.description}</p>
      </article>)}</div>
    </div></section>
    <section className="tower-section tower-workflow">
      {isRds && <div className="tower-pattern" aria-hidden="true"><ShaderFill className="absolute" shader={{ setup, render, manifest, params: { falloff: 2.299999952316284, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 0.8832286596298218, y: 64.27672576904297, radius: 28.776113510131836, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } } }} /></div>}
      <div className="tower-shell tower-workflow-layout">
      <div className="tower-workflow-heading"><div data-reveal><p className="tower-eyebrow">Our Steps</p><h2><FoldText>Installation &amp;<br />Deployment Workflow</FoldText></h2></div></div>
      <ol className="tower-steps">{data.steps.map((step, index) => <li key={step.title} data-reveal>
        <div className="tower-step-icon" aria-hidden="true"><span style={{maskImage:`url("${clientAsset(assets.steps[index])}")`}} /></div>
        <div><p className="tower-step-number">Step {index + 1}:</p><h3>{step.title}</h3><p>{step.description}</p></div>
      </li>)}</ol>
    </div></section>
    <section className="tower-section tower-muted"><div className="tower-shell">
      <div className="tower-section-heading" data-reveal><h2><FoldText>Applications &amp; Use Cases</FoldText></h2><p>{data.applicationsIntro}</p></div>
      <div className="tower-applications solution-application-slots">{data.applications.map((application, index) => <article key={application} data-card data-reveal>
        <div className="solution-application-image" aria-hidden="true"><img src={clientAsset(assets.applications[index])} alt="" data-card-image /></div><h3>{application}</h3>
      </article>)}</div>
    </div></section>
    <section className="tower-section tower-shell">
        <div className="tower-featured-heading"><div data-reveal><h2><FoldText>Featured Projects</FoldText></h2><p>{data.featuredIntro}</p></div><Link className="tower-project-label" href={`/portfolio/${solution}/`}>Explore More Projects <FigmaIcon name="arrow-right" /></Link></div>
        <div className="tower-projects">{projectsForSolution(solution).map(project => <ProjectCard key={project.title} project={project} />)}</div>
    </section>
    <section className="tower-section tower-faq">
      {/* Latest client Figma: RDS 479:476 and Smart Pole 479:810 share this exact fill. */}
      <div className="tower-pattern" aria-hidden="true"><ShaderFill className="absolute" shader={{ setup, render, manifest, params: { falloff: 2.299999952316284, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 50, y: 100, radius: 22.97724151611328, angle: -90 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } } }} /></div>
      <div className="tower-shell">
      <div className="tower-section-heading" data-reveal><p className="tower-eyebrow">FAQ</p><h2><FoldText>Your Questions, Answered</FoldText></h2></div>
      <TowerFaq items={data.questions} />
    </div></section>
    <FooterWithCta className="site-footer" enquiryTitle={data.ctaTitle} enquiryText={data.ctaText} />
  </div>;
}
