/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import {usePublishedContent} from "./shared/PublishedContentProvider";
import {solutionGroups} from "@/cms/content-types";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { TrustedPartners } from "./shared/TrustedPartners";
import { CountUp } from "./shared/CountUp";
import { FigmaIcon } from "./shared/FigmaIcon";
import { ShaderFill } from "./shared/ShaderFill";
import { setup, render, manifest } from "./shared/CodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615";
const base = "/sites/figma-jitrapadu/shared/";
const strengths = [
  ["Turnkey", "End-to-end project support.", "c371c.png"],
  ["In-House", "Fabricated at our Klang facility.", "6eadb.png"],
  ["Local", "Made in Malaysia by local professionals.", "4234d.png"],
  ["Reliable", "Built to recognised engineering standards.", "9fde5.png"],
  ["Proven", "Experienced across telco rollout projects.", "40532.png"],
  ["Innovative", "Driven by R&D and practical deployment needs.", "d6f8b.png"],
];
const industries = [
  ["Telecommunications", "We support telco network expansion with towers, poles, smart poles and rapid deployment structures.", "e24c4.png"],
  ["Smart City & IoT", "Our smart pole solutions support 5G, sensors, surveillance and connected urban infrastructure.", "ce86a.png"],
  ["Utilities & Energy", "We fabricate steel structures for lighting, utility poles, solar frames and infrastructure support.", "63599.png"],
  ["Defence & Radar", "We provide steel tower solutions for radar, broadcast and specialised communication infrastructure.", "1fe6f.png"],
  ["Oil & Gas", "We support custom steel fabrication needs for industrial and utility-based applications.", "89429.png"],
  ["Public Infrastructure", "Our solutions help local councils and agencies improve connectivity in urban and rural areas.", "51338.png"],
];
const solutions = [
  { title:"Telecom Tower & Monopole", image:"20e41.png", description:"Engineered steel structures designed to support reliable telecommunications networks across diverse site conditions, load requirements and deployment needs.", href:"/solutions/telecom-tower-monopole", id:"telecom-tower", node:"133:1462" },
  { title:"Rapid Deployment System, RDS", image:"6a0eb.png", description:"Fast-deployment infrastructure solutions designed for temporary, urgent or flexible network expansion with efficient installation and reliable structural performance.", id:"rapid-deployment-system", href:"/solutions/rapid-deployment-system", node:"133:1483" },
  { title:"Smart Pole & Lamp Pole", image:"f0e6b.png", description:"Multi-purpose pole solutions designed to support lighting, telecommunications, 5G, sensors, surveillance and modern smart city infrastructure requirements.", id:"smart-pole", href:"/solutions/smart-pole-lamp-pole", node:"133:1498" },
];
export function HomeDesign() {
  const content=usePublishedContent();
  const publicSolutions=solutions.map((slot,index)=>{const published=content.solutions[solutionGroups[index]];return {...slot,title:published?.title||slot.title,description:published?.summary||slot.description,imageUrl:published?.image?.url||base+slot.image};});
  return <div className="design-canvas fluid-page home-page">
    <Header />
    <section className="home-hero">
      <video className="hero-video" preload="auto" autoPlay muted loop playsInline poster={base+"background-0.jpg"} src={base+"background-0.mp4"} />
      <div className="home-hero-overlay" />
      <div className="home-hero-heading" data-reveal>
        <p>We Are The XPERTS in Telecom Steel Infrastructure</p>
        <h1>Engineering Excellence, Powering Innovation</h1>
      </div>
      <div className="home-tower" aria-hidden="true"><img src={base+"16e03.png"} alt="" /></div>
      <div className="home-hero-copy" data-reveal>
        <p>Jitrapadu Engineering Sdn Bhd delivers turnkey telecommunication infrastructure, steel tower solutions, smart poles, rapid deployment systems and custom steel fabrication for Malaysia’s growing connectivity needs.</p>
        <p>From engineering design to in-house fabrication, deployment and project handover, we help telcos, infrastructure owners and project partners build stronger, safer and future-ready networks.</p>
      </div>
    </section>
    <section className="home-about section-pad">
      <ShaderFill className="absolute" shader={{ setup, render, manifest, params:{falloff:4,inverseFalloff:false,ringCount:30,offset:1,shape:1,transform:{x:21.67953109741211,y:100,radius:40.80624771118164,angle:0},color:{r:.9450980424880981,g:.9450980424880981,b:.9450980424880981,a:.800000011920929}} }} />
      <div className="home-section-title" data-reveal><p className="eyebrow">About Us</p><h2>Building the Future of Malaysia’s Connectivity</h2></div>
      <div className="home-about-body">
        <div className="prose" data-reveal><p>Jitrapadu Engineering Sdn Bhd is a Malaysian telecommunication engineering and steel structure specialist focused on turnkey infrastructure solutions. We design, fabricate and deploy telecommunication towers, monopoles, smart poles, lamp poles, rapid deployment systems and other custom steel structures.</p><p>Our strength lies in combining engineering knowledge, in-house manufacturing and field experience to deliver safe, reliable and cost-effective infrastructure. With continuous R&D and a strong understanding of telco requirements, we support clients in building networks that are ready for 5G, smart city development, IoT and future connectivity needs.</p></div>
        <div className="home-strengths">{strengths.map(([title,copy,icon])=><article className="home-strength" data-card data-reveal key={title}><div className="home-icon"><span style={{maskImage:`url("${base+icon}")`}} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <Link className="primary-action" href="/about-us" data-reveal>Learn More <FigmaIcon name="arrow-right" /></Link>
      </div>
    </section>
    <section className="home-solutions" id="solutions">{publicSolutions.map(solution=>{
      const content=<><img src={solution.imageUrl} alt="" /><h2>{solution.title}</h2><div className="solution-reveal"><p>{solution.description}</p><span className="solution-arrow"><FigmaIcon name="arrow-right" /></span></div></>;
      const props={className:"home-solution",id:solution.id,"data-node-id":solution.node,"data-reveal":true};
      return solution.href?<Link {...props} href={solution.href} key={solution.id}>{content}</Link>:<article {...props} tabIndex={0} key={solution.id}>{content}</article>;
    })}</section>
    <section className="home-factory section-pad">
      <div className="home-factory-photo" data-card data-reveal><img data-card-image src={base+"21909.png"} alt="Jitrapadu’s steel fabrication facility in Klang" /><div className="home-stat-stack"><div><strong><CountUp value={60} suffix="+" /></strong><p>Skilled Workers</p></div><div><strong><CountUp value={350} />–<CountUp value={500} /><small> Tons</small></strong><p>Production Capacity per Month</p></div></div></div>
      <div className="home-factory-copy"><p className="eyebrow" data-reveal>Our Factory</p><h2 data-reveal>Built locally.<br />Delivered with control.</h2><p data-reveal>Our in-house factory in Klang gives us better control over fabrication quality, production timelines and project delivery, from steel processing to finished structure.</p><Link className="primary-action" href="/our-factory" data-reveal>See Our Capability <FigmaIcon name="arrow-right" /></Link></div>
    </section>
    <TrustedPartners />
    <section className="home-industries section-pad"><div className="home-centered-heading" data-reveal><h2>Industries We Serve</h2><p>Jitrapadu has worked with telecommunication providers, infrastructure owners, public sector organisations and industry partners across Malaysia and beyond.</p></div><div className="home-industry-grid">{industries.map(([title,copy,image])=><article className="home-industry" data-card data-reveal key={title}><img data-card-image src={base+image} alt="" /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
    <FooterWithCta className="site-footer" />
  </div>;
}
