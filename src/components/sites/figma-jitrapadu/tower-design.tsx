/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { FigmaIcon } from "./shared/FigmaIcon";
import {usePublishedContent} from "./shared/PublishedContentProvider";
import {towerProducts} from "@/cms/public-model";
import { TowerFaq } from "./shared/TowerFaq";
const assetPathPrefix = "/sites/figma-jitrapadu/shared";
import { ShaderFill } from "./shared/ShaderFill";
import { setup as setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render as renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, manifest as manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 } from "./shared/CodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615";
const imgRectangle1 = `${assetPathPrefix}/fa8df.png`;
const imgRectangle2 = `${assetPathPrefix}/73b9c.png`;
const imgRectangle13 = `${assetPathPrefix}/9c687.png`;
const imgRectangle12 = `${assetPathPrefix}/4a624.png`;
const imgRectangle8 = `${assetPathPrefix}/acfba.png`;
const imgRectangle9 = `${assetPathPrefix}/abfaf.png`;
const imgRectangle10 = `${assetPathPrefix}/0cb46.png`;
const imgRectangle11 = `${assetPathPrefix}/3acd4.png`;
const imgRectangle14 = `${assetPathPrefix}/2c6e1.png`;
const imgRectangle15 = `${assetPathPrefix}/3feec.png`;
const imgFrame = `${assetPathPrefix}/dd177.png`;
const imgFrame1 = `${assetPathPrefix}/071f5.png`;
const imgFrame2 = `${assetPathPrefix}/107b7.png`;
const imgFrame3 = `${assetPathPrefix}/97607.png`;
const imgFrame4 = `${assetPathPrefix}/49871.png`;
const imgFrame5 = `${assetPathPrefix}/cbc14.png`;
const imgFrame6 = `${assetPathPrefix}/a07fa.png`;
const imgRectangle16 = `${assetPathPrefix}/7aa7e.png`;
const imgRectangle17 = `${assetPathPrefix}/38685.png`;
const imgRectangle18 = `${assetPathPrefix}/b84b2.png`;
const imgRectangle19 = `${assetPathPrefix}/4234d.png`;
const imgRectangle20 = `${assetPathPrefix}/2f0e9.png`;
const imgRectangle21 = `${assetPathPrefix}/0a76a.png`;
const imgRectangle22 = `${assetPathPrefix}/88807.png`;
const imgRectangle23 = `${assetPathPrefix}/60a46.png`;
const imgRectangle24 = `${assetPathPrefix}/36139.png`;
const imgRectangle25 = `${assetPathPrefix}/9fde5.png`;
const imgRectangle26 = `${assetPathPrefix}/7c4f4.png`;
const imgRectangle27 = `${assetPathPrefix}/0bbc3.png`;
const imgRectangle28 = `${assetPathPrefix}/42ef4.png`;


import "./tower-fluid.css";
const towerCopy = {
  "60:624": "Telecom Tower & Monopole Solutions",
  "60:628": "Built for High-Performance Connectivity",
  "60:629": "Strong, Reliable and Customisable Tower Infrastructure for Telco Network Expansion",
  "65:685": "Product Range",
  "65:686": "Jitrapadu has worked with telecommunication providers, infrastructure owners, public sector organisations and industry partners across Malaysia and beyond.",
  "83:1678": "Applications & Use Cases",
  "83:1679": "Our telecom tower and monopole solutions are suitable for new network rollout, capacity expansion, infrastructure sharing and specialised communication needs.",
  "133:1003": "FAQ",
  "133:1004": "Your Questions, Answered",
  "191:1430": "our Steps",
  "133:1038": "Featured Projects",
  "133:1039": "Explore selected tower and monopole projects that show our ability to deliver reliable structures for different heights, locations, load requirements and site conditions."
};
const products = [
{title: "Angular Tower", description: "Lattice tower structures available in 3-legged and 4-legged configurations, ranging from 30m to 120m, with light, medium and heavy-duty classifications.", image: imgRectangle8},
{title: "Mono-pole", description: "Single-legged tubular tapered structures designed for multi-telco installations, with common height options including 30m, 36m, 45m and 50m.", image: imgRectangle9},
{title: "Rooftop Unipole", description: "Compact rooftop structures for sites where ground space is limited but elevated telco coverage is required.", image: imgRectangle10},
{title: "Guyed Mast", description: "A cost-effective tower option supported by guy wires, suitable for selected open-space or specialised deployment conditions.", image: imgRectangle11},
{title: "Radar and Broadcast Tower", description: "Custom steel tower structures for radar, broadcast and communication-related applications.", image: imgRectangle14},
{title: "Camouflage Pole", description: "A telecom structure designed for urban areas where connectivity blends with the environment.", image: imgRectangle15},
];
const steps = [
{title: "Project Requirement Study", description: "We begin by reviewing the client’s coverage objective, site location, operator load, required height, timeline and access conditions.", image: imgRectangle16},
{title: "Site and Structural Assessment", description: "Our team evaluates the site constraints, available footprint, terrain, wind exposure, foundation requirements and surrounding environment.", image: imgRectangle17},
{title: "Engineering Design", description: "The tower or monopole is designed according to the required height, loading category, telco-sharing capacity and applicable structural standards.", image: imgRectangle18},
{title: "Cost Baselining and Proposal", description: "We prepare a practical solution with technical recommendations, estimated cost, fabrication timeline and deployment approach.", image: imgRectangle19},
{title: "In-House Fabrication", description: "Approved designs move into fabrication at our Klang facility, where steel components are cut, formed, welded and prepared for finishing.", image: imgRectangle20},
{title: "Galvanising and Coating", description: "Steel members are finished according to project specifications, including galvanising and aviation-related coating where required.", image: imgRectangle21},
{title: "Site Preparation and Foundation Works", description: "Depending on the structure type, the site is prepared for conventional concrete foundation or RDS-compatible footing solutions.", image: imgRectangle22},
{title: "Delivery and Structure Erection", description: "Fabricated components are delivered to site and erected by qualified teams, with safety and alignment checked throughout the process.", image: imgRectangle23},
{title: "Equipment Integration Support", description: "We coordinate with relevant telco or equipment teams for antenna, cabinet, cable and supporting infrastructure installation.", image: imgRectangle24},
{title: "Inspection, Handover and Support", description: "Final checks are carried out before handover, with technical support available for maintenance, optimisation or future upgrades.", image: imgRectangle25},
];
const applications = [
{title: "Greenfield Telecommunication Deployment", image: imgFrame},
{title: "Multi-operator Telco-sharing Sites", image: imgFrame1},
{title: "Rural and Suburban Network Expansion", image: imgFrame2},
{title: "High-capacity Urban Coverage Sites ", image: imgFrame3},
{title: "Radar and Broadcast Infrastructure", image: imgFrame4},
{title: "Rooftop and Space-constrained Deployments", image: imgFrame5},
{title: "Long-term 4G and 5G Infrastructure Support", image: imgFrame6},
];
const projects = [
{label: "45m 3-legged light-duty tower", title: "Teluk Muroh, Manjung, Perak", image: imgRectangle26},
{label: "45m 3-legged light-duty tower", title: "Kg Permatang Tulang, Melaka", image: imgRectangle27},
{label: "36m monopole for 5 telco-sharer", title: "KPM Ayer Molek, Melaka", image: imgRectangle28},
];

export function TowerDesign() {
  const content=usePublishedContent();
  const solution=content.solutions['telecom-tower-monopole'];
  const publishedProducts=towerProducts(content);
  const displayProducts=publishedProducts.length?publishedProducts.map(p=>({title:p.title,description:p.description,image:p.image?.url,alt:p.image?.alt||p.title})):products.map(p=>({...p,alt:p.title}));
  return (
    <div className="design-canvas fluid-page tower-page" data-name="Our Solutions - Telecom Tower & Monopole">
      <Header />
      <section className="tower-hero">
        <div className="tower-hero-images" aria-hidden="true"><img src={imgRectangle1} alt="" /><img src={imgRectangle2} alt="" /></div>
        <div className="tower-shell"><h1 data-reveal>{solution?.title||towerCopy["60:624"]}</h1></div>
      </section>
      <section className="tower-shell tower-section tower-intro">
        <div className="tower-intro-copy" data-reveal><p className="tower-eyebrow">{towerCopy["60:628"]}</p><h2>{towerCopy["60:629"]}</h2></div>
        <div className="tower-intro-detail"><img data-reveal src={imgRectangle13} alt="Telecommunication tower infrastructure" /><div data-reveal>
          {solution?.body ? solution.body.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>) : <>
          <p>Jitrapadu designs and fabricates telecommunication towers and monopoles for diverse deployment needs, from rural coverage to high-capacity urban sites. Our structures are engineered for strength, durability and long-term performance across Malaysia’s climate and terrain conditions.</p>
          <p>{`We support tower owners, telcos, infrastructure providers and project partners with solutions that can be tailored by height, load capacity, operator requirements, foundation type and site constraints. With in-house fabrication and experienced project teams, we help clients move from engineering concept to field deployment with greater confidence. `}</p>
          </>}
        </div></div>
        <div className="tower-intro-main" data-reveal><img src={imgRectangle12} alt="Jitrapadu tower structure" /></div>
      </section>
      <section className="tower-section tower-muted">
        <div className="tower-shell"><div className="tower-section-heading" data-reveal><h2>{towerCopy["65:685"]}</h2><p>{towerCopy["65:686"]}</p></div>
          <div className="tower-products">{displayProducts.map((product) => <article className="tower-product" key={product.title} data-card data-reveal><h3>{product.title}</h3>{product.image&&<div className="tower-product-image" data-card-image><img src={product.image} alt={product.alt} /></div>}<p>{product.description}</p></article>)}</div>
        </div>
      </section>
      <section className="tower-section tower-workflow">
        <div className="tower-pattern" aria-hidden="true"><ShaderFill className="absolute" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 2.299999952316284, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 0.8832286596298218, y: 64.27672576904297, radius: 28.776113510131836, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} /></div>
        <div className="tower-shell tower-workflow-layout"><div className="tower-workflow-heading"><div data-reveal><p className="tower-eyebrow">{towerCopy["191:1430"]}</p><h2>Installation &amp;<br />Deployment Workflow</h2></div></div>
          <ol className="tower-steps">{steps.map((step, index) => <li key={step.title} data-reveal><div className="tower-step-icon"><span style={{maskImage: `url("${step.image}")`}} /></div><div><p className="tower-step-number">Step {index + 1}:</p><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        </div>
      </section>
      <section className="tower-section tower-muted"><div className="tower-shell"><div className="tower-section-heading" data-reveal><h2>{towerCopy["83:1678"]}</h2><p>{towerCopy["83:1679"]}</p></div>
        <div className="tower-applications">{applications.map((application) => <article key={application.title} data-card data-reveal><div data-card-image><img src={application.image} alt="" /></div><h3>{application.title}</h3></article>)}</div>
      </div></section>
      <section className="tower-section tower-shell" id="featured-projects"><div className="tower-featured-heading"><div data-reveal><h2>{towerCopy["133:1038"]}</h2><p>{towerCopy["133:1039"]}</p></div><Link href="/portfolio" className="tower-project-label">Explore More Projects <FigmaIcon name="arrow-right" /></Link></div>
        <div className="tower-projects">{projects.map((project) => <article key={project.title} data-card data-reveal><div className="tower-project-image"><img data-card-image src={project.image} alt={project.title} /></div><p className="tower-project-tag">{project.label}</p><h3>{project.title}</h3></article>)}</div>
      </section>
      <section className="tower-section tower-faq"><div className="tower-pattern" aria-hidden="true"><ShaderFill className="absolute" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 2.299999952316284, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 50, y: 100, radius: 22.97724151611328, angle: -90 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} /></div><div className="tower-shell"><div className="tower-section-heading" data-reveal><p className="tower-eyebrow">{towerCopy["133:1003"]}</p><h2>{towerCopy["133:1004"]}</h2></div><TowerFaq /></div></section>
      <FooterWithCta className="site-footer" />
    </div>
  );
}
