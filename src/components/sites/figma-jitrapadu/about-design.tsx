/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import "./about-fluid.css";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { FigmaIcon } from "./shared/FigmaIcon";
const assetPathPrefix = "/sites/figma-jitrapadu/shared";
const imgRectangle8 = `${assetPathPrefix}/687ab.png`;
const imgRectangle15 = `${assetPathPrefix}/d3b69.png`;
const imgRectangle7 = `${assetPathPrefix}/bc58c.png`;
import { ShaderFill } from "./shared/ShaderFill";
import { setup as setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render as renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, manifest as manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 } from "./shared/CodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615";
const imgRectangle1 = `${assetPathPrefix}/4ac91.png`;
const imgRectangle2 = `${assetPathPrefix}/e7432.png`;
const imgRectangle3 = `${assetPathPrefix}/270ae.png`;
const imgRectangle12 = `${assetPathPrefix}/46788.png`;
const imgRectangle13 = `${assetPathPrefix}/bfe35.png`;
const imgRectangle9 = `${assetPathPrefix}/857fe.png?privacy=20261022b`;
const imgRectangle10 = `${assetPathPrefix}/cbcd2.png?privacy=20261022b`;
const imgRectangle11 = `${assetPathPrefix}/0b993.png?privacy=20261022b`;
const imgRectangle14 = `${assetPathPrefix}/f7ddc.png?privacy=20261022b`;
const imgRectangle16 = `${assetPathPrefix}/b23c8.png?privacy=20261022b`;
const imgImage238 = `${assetPathPrefix}/55b91.png?privacy=20261022b`;
const imgRectangle17 = `${assetPathPrefix}/1d7d6.png?privacy=20261022b`;
const imgRectangle18 = `${assetPathPrefix}/32e5c.png?privacy=20261022b`;
const imgRectangle19 = `${assetPathPrefix}/1393b.png?privacy=20261022b`;
const imgRectangle20 = `${assetPathPrefix}/031f5.png?privacy=20261022b`;
const imgRectangle21 = `${assetPathPrefix}/1c3f8.png?privacy=20261022b`;
const imgRectangle22 = `${assetPathPrefix}/bdb93.png?privacy=20261022b`;
const imgRectangle23 = `${assetPathPrefix}/9c60b.png`;
const imgRectangle24 = `${assetPathPrefix}/71610.png`;
const imgRectangle25 = `${assetPathPrefix}/d6026.png`;
const imgRectangle26 = `${assetPathPrefix}/76a50.png`;
const imgRectangle27 = `${assetPathPrefix}/bdc44.png`;
const imgRectangle28 = `${assetPathPrefix}/b0451.png`;
const imgRectangle29 = `${assetPathPrefix}/4234d.png`;
const imgRectangle30 = `${assetPathPrefix}/bad8d.png`;
const imgRectangle31 = `${assetPathPrefix}/2ba06.png`;
const imgRectangle32 = `${assetPathPrefix}/d6c79.png`;
const imgLine15 = `${assetPathPrefix}/ba425.svg`;
const imgGroup15 = `${assetPathPrefix}/fe9be.svg`;

type RightArrowProps = {
  className?: string;
  property1?: "Default";
  onClick?: () => void;
  disabled?: boolean;
};

function RightArrow({ className, onClick, disabled }: RightArrowProps) {
  return (
    <button type="button" aria-label="Scroll milestones right" onClick={onClick} disabled={disabled} className={className || "bg-[var(--color-background-primary,white)] border border-[var(--color-brand-primary,#007cf8)] border-solid content-stretch flex items-center justify-center relative rounded-[50px] size-[70px]"} data-node-id="184:1127" style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? "default" : "pointer" }}>
      <FigmaIcon name="chevron-right"  className="[word-break:break-word]  leading-[1.6] not-italic relative shrink-0 text-[24px] text-[color:var(--color-background-blue,#007cf8)] text-justify whitespace-nowrap" data-node-id="184:1123" />
    </button>
  );
}

type LeftArrowProps = {
  className?: string;
  property1?: "Default";
  onClick?: () => void;
  disabled?: boolean;
};

function LeftArrow({ className, onClick, disabled }: LeftArrowProps) {
  return (
    <button type="button" aria-label="Scroll milestones left" onClick={onClick} disabled={disabled} className={className || "bg-[var(--color-background-primary,white)] border border-[var(--color-brand-primary,#007cf8)] border-solid content-stretch flex items-center justify-center relative rounded-[50px] size-[70px]"} data-node-id="184:1126" style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? "default" : "pointer" }}>
      <FigmaIcon name="chevron-left"  className="[word-break:break-word]  leading-[1.6] not-italic relative shrink-0 text-[24px] text-[color:var(--color-background-blue,#007cf8)] text-justify whitespace-nowrap" data-node-id="184:1125" />
    </button>
  );
}

type OurMissionProps = {
  className?: string;
  property1?: "Default";
};

function OurMission({ className }: OurMissionProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={(className || "h-[700px] relative w-[960px]") + " purpose-card"} data-node-id="337:1506" role="button" tabIndex={0} aria-label="Our mission" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setExpanded(!expanded); } }} data-expanded={expanded} >
      <div className="absolute flex inset-0 items-center justify-center" data-node-id="336:1471" style={{ containerType: "size" }}>
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle8} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col gap-[24px] inset-0 items-center justify-center p-[100px]" data-purpose-overlay data-node-id="336:1479" data-name="Frame">
        <div className="bg-[var(--color-background-secondary,#f7f9fc)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[100px]" data-purpose-icon data-node-id="336:1495" data-name="Frame">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="336:1496" data-name="Mask group">
            <div className="bg-[#1456a3] col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[45px_45px] ml-0 mt-0 relative row-1 size-[45px]" data-node-id="336:1498" style={{ maskImage: `url("${imgRectangle15}")` }} />
          </div>
        </div>
        <p className="[word-break:break-word] font-sans font-bold leading-[58px] min-w-full not-italic relative shrink-0 text-[48px] text-[color:var(--color-text-inverse,white)] text-center tracking-[-1.2px] w-[min-content]" data-node-id="336:1499">
          Our Mission
        </p>
        <p data-purpose-description className="hidden text-center font-sans text-[24px] leading-[32px] font-semibold tracking-[-0.3px] text-white">To provide customisable, cost-effective and reliable telecommunication infrastructure solutions through engineering excellence, in-house fabrication, continuous R&D and professional project delivery.</p>
      </div>
      <style jsx>{`
        .purpose-card { cursor: pointer; }
        .purpose-card [data-purpose-overlay] { transition: background-color .15s ease-in-out, backdrop-filter .15s ease-in-out; }
        .purpose-card:hover [data-purpose-overlay], .purpose-card:focus-visible [data-purpose-overlay], .purpose-card[data-expanded="true"] [data-purpose-overlay] { background: rgba(0,0,0,.55); backdrop-filter: blur(5px); }
        .purpose-card:hover [data-purpose-icon], .purpose-card:focus-visible [data-purpose-icon], .purpose-card[data-expanded="true"] [data-purpose-icon] { display: none; }
        .purpose-card:hover [data-purpose-description], .purpose-card:focus-visible [data-purpose-description], .purpose-card[data-expanded="true"] [data-purpose-description] { display: block; }
        @media (max-width: 767px) { .purpose-card [data-purpose-overlay] { padding: 24px; } .purpose-card [data-purpose-description] { font-size: 20px; line-height: 28px; } }
      `}</style>
    </div>
  );
}

type OurVisionProps = {
  className?: string;
  property1?: "Default";
};

function OurVision({ className }: OurVisionProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={(className || "h-[700px] relative w-[960px]") + " purpose-card"} data-node-id="337:1505" role="button" tabIndex={0} aria-label="Our vision" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setExpanded(!expanded); } }} data-expanded={expanded} >
      <div className="absolute flex inset-0 items-center justify-center" data-node-id="336:1462" style={{ containerType: "size" }}>
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle7} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col gap-[24px] inset-0 items-center justify-center p-[100px]" data-purpose-overlay data-node-id="336:1463" data-name="Frame">
        <div className="bg-[var(--color-background-secondary,#f7f9fc)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[100px]" data-purpose-icon data-node-id="336:1464" data-name="Frame">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="336:1465" data-name="Mask group">
            <div className="bg-[#1456a3] col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[45px_45px] ml-0 mt-0 relative row-1 size-[45px]" data-node-id="336:1467" style={{ maskImage: `url("${imgRectangle15}")` }} />
          </div>
        </div>
        <p className="[word-break:break-word] font-sans font-bold leading-[58px] min-w-full not-italic relative shrink-0 text-[48px] text-[color:var(--color-text-inverse,white)] text-center tracking-[-1.2px] w-[min-content]" data-node-id="336:1468">
          Our Vision
        </p>
        <p data-purpose-description className="hidden text-center font-sans text-[24px] leading-[32px] font-semibold tracking-[-0.3px] text-white">To become Malaysia’s trusted leader in telecommunication steel infrastructure by driving innovation, safety and sustainable connectivity for the future.</p>
      </div>
      <style jsx>{`
        .purpose-card { cursor: pointer; }
        .purpose-card [data-purpose-overlay] { transition: background-color .15s ease-in-out, backdrop-filter .15s ease-in-out; }
        .purpose-card:hover [data-purpose-overlay], .purpose-card:focus-visible [data-purpose-overlay], .purpose-card[data-expanded="true"] [data-purpose-overlay] { background: rgba(0,0,0,.55); backdrop-filter: blur(5px); }
        .purpose-card:hover [data-purpose-icon], .purpose-card:focus-visible [data-purpose-icon], .purpose-card[data-expanded="true"] [data-purpose-icon] { display: none; }
        .purpose-card:hover [data-purpose-description], .purpose-card:focus-visible [data-purpose-description], .purpose-card[data-expanded="true"] [data-purpose-description] { display: block; }
        @media (max-width: 767px) { .purpose-card [data-purpose-overlay] { padding: 24px; } .purpose-card [data-purpose-description] { font-size: 20px; line-height: 28px; } }
      `}</style>
    </div>
  );
}

export function AboutDesign() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineLimits, setTimelineLimits] = useState({ start: true, end: false });
  const updateTimelineLimits = () => {
    const element = timelineRef.current;
    if (element) setTimelineLimits({ start: element.scrollLeft <= 1, end: element.scrollLeft >= element.scrollWidth - element.clientWidth - 1 });
  };
  useEffect(() => {
    const element = timelineRef.current;
    if (!element) return;
    const observer = new ResizeObserver(updateTimelineLimits);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const moveTimeline = (direction: number) => {
    const track = timelineRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * ((card?.offsetWidth || 417.5) + gap), behavior: "smooth" });
  };
  return (
    <div className="design-canvas fluid-page about-page" data-node-id="14:725" data-name="About Us">
      <Header />
      <section className="about-hero" data-node-id="14:726"><div className="about-hero-art" data-node-id="14:727">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[650px] relative w-[1920px]">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <img alt="" className="absolute max-w-none object-cover size-full" src={imgRectangle1} />
                <div className="absolute inset-0 overflow-hidden">
                  <img alt="" className="absolute h-[213.28%] left-0 max-w-none top-[-83.84%] w-full" src={imgRectangle2} />
                </div>
                <div className="absolute inset-0 overflow-hidden">
                  <img alt="" className="absolute h-[213.28%] left-0 max-w-none top-[-76.02%] w-full" src={imgRectangle3} />
                </div>
              </div>
            </div>
          </div>
        </div><div className="about-hero-shade" /><div className="about-hero-title" data-node-id="14:729">
          <p className="[word-break:break-word] font-sans font-bold leading-[76px] min-w-full not-italic relative shrink-0 text-[68px] text-[color:var(--color-text-inverse,white)] tracking-[-1.8px] w-[min-content]" data-node-id="14:731">
            About Jitrapadu Engineering Sdn Bhd
          </p>
        </div></section>
      <section className="about-section about-intro" data-node-id="214:839"><div className="about-heading" data-reveal data-node-id="14:734" data-name="Frame">
          <p className="font-sans font-semibold leading-[18px] relative shrink-0 text-[13px] text-[color:var(--color-brand-primary,#007cf8)] tracking-[1.5px] uppercase whitespace-nowrap" data-node-id="14:735">
            Our Background
          </p>
          <div className="font-sans font-bold leading-[0] min-w-full relative shrink-0 text-[48px] text-[color:var(--color-text-primary,#102033)] tracking-[-1.2px] w-[min-content]" data-node-id="14:736">
            <p className="leading-[58px] mb-0">Engineering Excellence</p>
            <p className="leading-[58px]">{`for Malaysia’s Telecommunication Future `}</p>
          </div>
        </div><div className="about-intro-content"><div className="about-body" data-reveal data-node-id="94:490">
          <p className="leading-[30px] mb-0">Jitrapadu Engineering Sdn Bhd is a Malaysian telecommunication engineering and steel fabrication company specialising in turnkey infrastructure solutions. Our core focus includes telecommunication towers, monopoles, smart poles, lamp poles, rapid deployment systems, portable BTS solutions, custom steel fabrication, project management and technical support.</p>
          <p className="leading-[30px]">Over the years, Jitrapadu has grown from a steel structure and tower fabrication specialist into a one-stop solution partner for the telecommunications ecosystem. Our work supports telcos, tower owners, infrastructure providers, government-linked organisations and project partners that need reliable structures for network expansion, 5G rollout, smart city development and rural connectivity.</p>
        </div><div className="about-intro-photos"><div className="about-intro-main-photo" data-node-id="94:489">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle12} />
        </div><div className="about-intro-side"><div className="about-intro-small-photo" data-node-id="94:491">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle13} />
        </div><p className="about-body" data-reveal data-node-id="14:737">{`Today, our strength is built on practical engineering, in-house manufacturing capability, continuous R&D and field-tested deployment experience. We remain committed to building a better-connected Malaysia through safe, customisable, cost-effective and reliable telecommunication infrastructure.`}</p></div></div></div></section>
      <section className="about-purpose" data-node-id="149:676"><OurVision className="about-purpose-panel" /><OurMission className="about-purpose-panel" /></section>
      <section className="about-section about-values" data-node-id="68:1041"><div className="about-section-heading" data-reveal data-node-id="68:1068" data-name="Frame">
          <p className="[word-break:break-word] font-sans font-bold leading-[58px] not-italic relative shrink-0 text-[48px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-1.2px] w-full" data-node-id="68:1069">
            Our Core Values
          </p>
        </div><div className="about-values-grid" data-node-id="133:572">
          <div className="border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col gap-[var(--spacing-8,8px)] h-[354px] items-start px-[var(--spacing-24,24px)] py-[var(--spacing-32,32px)] relative rounded-[var(--spacing-12,12px)] shrink-0 w-[437px]" data-node-id="247:691" data-name="icon box" data-card data-reveal>
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[var(--spacing-12,12px)]">
              <div className="absolute bg-[var(--color-brand-primary,#007cf8)] inset-0 rounded-[var(--spacing-12,12px)]" />
              <ShaderFill className="absolute backdrop-blur-[5px] rounded-[var(--spacing-12,12px)]" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 4, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 100, y: 0, radius: 31.230924606323242, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} />
            </div>
            <div className="bg-[var(--color-background-secondary,#f7f9fc)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[100px]" data-node-id="247:692" data-name="Frame">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="247:693" data-name="Mask group">
                <div className="bg-[#1456a3] col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[45px_45px] ml-0 mt-0 relative row-1 size-[45px]" data-node-id="247:695" style={{ maskImage: `url("${imgRectangle27}")` }} />
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start not-italic relative shrink-0 text-[color:var(--color-text-inverse,white)] w-full" data-node-id="247:696">
              <div className="font-sans font-semibold leading-[0] relative shrink-0 text-[32px] tracking-[-0.6px] w-full whitespace-pre-wrap" data-node-id="247:697">
                <p className="leading-[40px] mb-0">{`Drive Innovation & `}</p>
                <p className="leading-[40px]">{`Continuous R&D`}</p>
              </div>
              <p className="font-sans font-normal leading-[30px] relative shrink-0 text-[18px] w-full" data-node-id="247:698">
                Full turnkey solution to propel nationwide development telecommunication infrastructure.
              </p>
            </div>
          </div>
          <div className="border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col gap-[var(--spacing-8,8px)] items-start justify-self-stretch px-[var(--spacing-24,24px)] py-[var(--spacing-32,32px)] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="133:582" data-name="Frame" data-card data-reveal>
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[var(--spacing-12,12px)]">
              <div className="absolute bg-[var(--color-brand-primary,#007cf8)] inset-0 rounded-[var(--spacing-12,12px)]" />
              <ShaderFill className="absolute backdrop-blur-[5px] rounded-[var(--spacing-12,12px)]" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 4, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 100, y: 0, radius: 31.230924606323242, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} />
            </div>
            <div className="bg-[var(--color-background-secondary,#f7f9fc)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[100px]" data-node-id="180:929" data-name="Frame">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="180:930" data-name="Mask group">
                <div className="bg-[#1456a3] col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[45px_45px] ml-0 mt-0 relative row-1 size-[45px]" data-node-id="180:932" style={{ maskImage: `url("${imgRectangle28}")` }} />
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start leading-[0] not-italic relative shrink-0 text-[color:var(--color-text-inverse,white)] w-full whitespace-pre-wrap" data-node-id="133:588">
              <div className="font-sans font-semibold relative shrink-0 text-[32px] tracking-[-0.6px] w-full" data-node-id="133:589">
                <p className="leading-[40px] mb-0">{`Uncompromising `}</p>
                <p className="leading-[40px]">{`Safety & Reliability`}</p>
              </div>
              <div className="font-sans font-normal relative shrink-0 text-[18px] w-full" data-node-id="133:590">
                <p className="leading-[30px] mb-0">{`Engineered for peace of mind, with a 10-year `}</p>
                <p className="leading-[30px] mb-0">{`structural design warranty and dedicated `}</p>
                <p className="leading-[30px]">technical support.</p>
              </div>
            </div>
          </div>
          <div className="border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col gap-[var(--spacing-8,8px)] items-start justify-self-stretch px-[var(--spacing-24,24px)] py-[var(--spacing-32,32px)] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="133:591" data-name="Frame" data-card data-reveal>
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[var(--spacing-12,12px)]">
              <div className="absolute bg-[var(--color-brand-primary,#007cf8)] inset-0 rounded-[var(--spacing-12,12px)]" />
              <ShaderFill className="absolute backdrop-blur-[5px] rounded-[var(--spacing-12,12px)]" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 4, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 100, y: 0, radius: 31.230924606323242, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} />
            </div>
            <div className="bg-[var(--color-background-secondary,#f7f9fc)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[100px]" data-node-id="180:937" data-name="Frame">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="180:938" data-name="Mask group">
                <div className="bg-[#1456a3] col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[45px_45px] ml-0 mt-0 relative row-1 size-[45px]" data-node-id="180:940" style={{ maskImage: `url("${imgRectangle15}")` }} />
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start not-italic relative shrink-0 text-[color:var(--color-text-inverse,white)] w-full" data-node-id="133:597">
              <p className="font-sans font-semibold leading-[40px] relative shrink-0 text-[32px] tracking-[-0.6px] w-full" data-node-id="133:598">
                Delivering Tower Excellence
              </p>
              <p className="font-sans font-normal leading-[30px] relative shrink-0 text-[18px] w-full" data-node-id="133:599">
                A decade of expertise crafting tailored solutions that meet diverse needs
              </p>
            </div>
          </div>
          <div className="border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col gap-[var(--spacing-8,8px)] items-start justify-self-stretch px-[var(--spacing-24,24px)] py-[var(--spacing-32,32px)] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="133:600" data-name="Frame" data-card data-reveal>
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[var(--spacing-12,12px)]">
              <div className="absolute bg-[var(--color-brand-primary,#007cf8)] inset-0 rounded-[var(--spacing-12,12px)]" />
              <ShaderFill className="absolute backdrop-blur-[5px] rounded-[var(--spacing-12,12px)]" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 4, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 100, y: 0, radius: 31.230924606323242, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} />
            </div>
            <div className="bg-[var(--color-background-secondary,#f7f9fc)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[100px]" data-node-id="180:933" data-name="Frame">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="180:934" data-name="Mask group">
                <div className="bg-[#1456a3] col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[45px_45px] ml-0 mt-0 relative row-1 size-[45px]" data-node-id="180:936" style={{ maskImage: `url("${imgRectangle29}")` }} />
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start not-italic relative shrink-0 text-[color:var(--color-text-inverse,white)] w-full" data-node-id="133:606">
              <p className="font-sans font-semibold leading-[40px] relative shrink-0 text-[32px] tracking-[-0.6px] w-full" data-node-id="133:607">
                Uphold Premium Quality
              </p>
              <p className="font-sans font-normal leading-[30px] relative shrink-0 text-[18px] w-full" data-node-id="133:608">
                Precision-crafted solutions with uncompromising standards in every stage of fabrication and deployment
              </p>
            </div>
          </div>
        </div></section>
      <section className="about-section about-team" data-node-id="71:1071"><div className="about-team-heading" data-reveal data-node-id="71:1074" data-name="Frame">
          <div className="content-stretch flex flex-col gap-[var(--spacing-24,24px)] items-start relative shrink-0 w-[611px]" data-node-id="133:647" data-name="Frame">
            <p className="font-sans font-semibold leading-[18px] relative shrink-0 text-[13px] text-[color:var(--color-brand-primary,#007cf8)] tracking-[1.5px] uppercase whitespace-nowrap" data-node-id="133:648">
              Our Team
            </p>
            <p className="font-sans font-bold leading-[58px] min-w-full relative shrink-0 text-[48px] text-[color:var(--color-text-primary,#102033)] tracking-[-1.2px] w-[min-content]" data-node-id="133:649">
              Engineering Strength Through Collaboration
            </p>
          </div>
          <div className="font-sans font-normal leading-[0] relative shrink-0 text-[18px] text-[color:var(--color-text-secondary,#495667)] w-[1053px] whitespace-pre-wrap" data-node-id="71:1076">
            <p className="leading-[30px] mb-0">Jitrapadu is supported by a team of engineers, project managers, technical personnel, certified welders, skilled workers and site teams who work together from planning to completion.</p>
            <p className="leading-[30px] mb-0">​</p>
            <p className="leading-[30px]">{`Our management approach is practical and hands-on. Engineering, fabrication, logistics, construction and project coordination are aligned early so that every structure is designed with real site conditions in mind. This helps us reduce delays, improve quality control and deliver solutions that are ready for actual deployment. `}</p>
          </div>
        </div><div className="about-team-photos"><div className="about-team-photo" data-node-id="159:737">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-16,16px)] size-full" src={imgRectangle32} />
        </div><div className="about-team-photo" data-node-id="71:1073">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-16,16px)] size-full" src={imgRectangle30} />
        </div><div className="about-team-photo" data-node-id="159:736">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[var(--spacing-16,16px)]">
            <img alt="" className="absolute h-full left-[-38.84%] max-w-none top-0 w-[252.81%]" src={imgRectangle31} />
          </div>
        </div></div></section>
      <section className="about-section about-certificates" data-node-id="184:719"><div className="about-section-art" data-node-id="68:913">
          <div className="h-[1034px] pointer-events-auto sticky top-0 w-[1920px]">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[var(--color-background-primary,white)] inset-0" />
              <ShaderFill className="absolute" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 4, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 21.67953109741211, y: 100, radius: 40.80624771118164, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} />
            </div>
          </div>
        </div><div className="about-heading about-certificate-heading" data-reveal data-node-id="112:594" data-name="Frame">
                <p className="font-sans font-semibold leading-[18px] relative shrink-0 text-[13px] text-[color:var(--color-brand-primary,#007cf8)] tracking-[1.5px] uppercase whitespace-nowrap" data-node-id="112:595">{`Certifications & Compliance`}</p>
                <div className="font-sans font-bold leading-[0] min-w-full relative shrink-0 text-[48px] text-[color:var(--color-text-primary,#102033)] tracking-[-1.2px] w-[min-content]" data-node-id="112:596">
                  <p className="leading-[58px] mb-0">Engineering Excellence</p>
                  <p className="leading-[58px]">{`for Malaysia’s Telecommunication Future `}</p>
                </div>
                <p className="font-sans font-normal leading-[30px] min-w-full relative shrink-0 text-[18px] text-[color:var(--color-text-secondary,#495667)] w-[min-content]" data-node-id="115:437">{`Our work is supported by recognised registrations, technical references, engineering standards and industry compliance documents that reflect our commitment to quality and reliability. `}</p>
              </div><div className="about-certificate-grid" data-node-id="68:923">
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:988" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:989">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[var(--spacing-12,12px)]">
                  <img alt="" className="absolute h-[102.67%] left-[-2.11%] max-w-none top-[-2.51%] w-[103.69%]" src={imgRectangle9} />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:990">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:991">{`SIRIM QAS International Test Report `}</p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:1003" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:1004">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle10} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1005">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] tracking-[-0.2px] whitespace-nowrap" data-node-id="68:1006">
                  TM Vendor
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:993" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:994">
                <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[var(--spacing-12,12px)]">
                  <div className="absolute bg-white inset-0 rounded-[var(--spacing-12,12px)]" />
                  <div className="absolute inset-0 overflow-hidden rounded-[var(--spacing-12,12px)]">
                    <img alt="" className="absolute h-[93.79%] left-[1.94%] max-w-none top-[3.28%] w-[96.07%]" src={imgRectangle11} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:995">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] tracking-[-0.2px] whitespace-nowrap" data-node-id="68:996">
                  CIDB Grade G5: B / CE / ME
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:1008" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:1009">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[var(--spacing-12,12px)]">
                  <img alt="" className="absolute h-[102.56%] left-[-2.57%] max-w-none top-[-2.62%] w-[105.13%]" src={imgRectangle14} />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1010">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:1011">
                  Ericsson Smart Pole Cabinet Reference
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:1013" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:1014">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle16} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1015">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:1016">
                  Chugoku Paints Qualified Painting Applicator
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:1018" data-name="Frame" data-reveal>
              <div className="h-[460.432px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-[317.67px]" data-node-id="184:709" data-name="image 238">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgImage238} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1020">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:1021">
                  DCA / CAAM-related tower paint colour approval
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:1023" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:1024">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle17} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1025">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] tracking-[-0.2px] whitespace-nowrap" data-node-id="68:1026">
                  FGV Vendor Registration
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:1028" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:1029">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle18} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1030">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:1031">
                  Galvanising / Zinc Coating Certificate
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:983" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:984">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle19} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:985">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:986">
                  YTSB 5G Infrastructure Support Letter
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:924" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:981">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle20} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:930">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:931">
                  edotco Malaysia Appreciation Letter
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:998" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:999">
                <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle21} />
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1000">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:1001">
                  Rendang Engineering Technical Endorsement Letter
                </p>
              </div>
            </div>
            <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.2)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-col items-start justify-self-stretch p-[10px] relative rounded-[var(--spacing-12,12px)] self-stretch shrink-0" data-node-id="68:1033" data-name="Frame" data-reveal>
              <div className="h-[460.43px] relative rounded-[var(--spacing-12,12px)] shrink-0 w-full" data-node-id="68:1034">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[var(--spacing-12,12px)]">
                  <img alt="" className="absolute h-[101.65%] left-[-1.76%] max-w-none top-[-2.76%] w-[101.42%]" src={imgRectangle22} />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[var(--spacing-4,4px)] items-center p-[var(--spacing-12,12px)] relative shrink-0 w-full" data-node-id="68:1035">
                <p className="[word-break:break-word] font-sans font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-text-primary,#102033)] text-center tracking-[-0.2px] w-full" data-node-id="68:1036">
                  Steel Material Mill Test Certificate
                </p>
              </div>
            </div>
          </div></section>
      <section className="about-section about-achievements" data-node-id="235:1193"><div className="about-heading" data-reveal data-node-id="235:1195">
          <div className="content-stretch flex flex-col gap-[var(--spacing-24,24px)] items-start relative shrink-0 w-full" data-node-id="235:1196" data-name="Frame">
            <p className="[word-break:break-word] font-sans font-bold leading-[58px] min-w-full not-italic relative shrink-0 text-[48px] text-[color:var(--color-text-inverse,white)] tracking-[-1.2px] w-[min-content]" data-node-id="235:1198">
              Our Achievements
            </p>
          </div>
          <p className="[word-break:break-word] font-sans font-normal leading-[30px] not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-inverse,white)] w-full" data-node-id="235:1199">
            Jitrapadu has a strong track record in delivering telecommunications infrastructure solutions across Malaysia and the region. Backed by proven expertise, robust manufacturing capabilities and a skilled in-house team, we support the reliable and efficient deployment of modern connectivity infrastructure.
          </p>
        </div><div className="about-achievement-list" data-node-id="235:1201" data-name="Achievement list">
          <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-card data-reveal data-node-id="235:1202" data-name="Achievement row">
            <p className="font-sans font-semibold leading-[26px] relative shrink-0 text-[18px] text-[color:var(--color-brand-navy,#102c4c)] w-[34px]" data-node-id="235:1203">
              01
            </p>
            <div className="bg-[var(--color-background-primary,white)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-12,12px)] items-start min-w-px p-[20px] relative rounded-[10px]" data-node-id="235:1204" data-name="Timeline structure">
              <p className="font-sans font-semibold leading-[40px] relative shrink-0 text-[#102033] text-[32px] tracking-[-0.6px] whitespace-nowrap" data-node-id="235:1205">
                Pioneering Smart Pole Innovation
              </p>
              <p className="font-sans font-normal leading-[22px] min-w-full relative shrink-0 text-[#495667] text-[14px] w-[min-content]" data-node-id="235:1206">{`Jitrapadu pioneered a smart pole solution endorsed by SIRIM, DBKL and major telecommunications providers.`}</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-card data-reveal data-node-id="235:1207" data-name="Achievement row">
            <p className="font-sans font-semibold leading-[26px] relative shrink-0 text-[18px] text-[color:var(--color-brand-navy,#102c4c)] w-[34px]" data-node-id="235:1208">
              02
            </p>
            <div className="bg-[var(--color-background-primary,white)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-12,12px)] items-start min-w-px p-[20px] relative rounded-[10px]" data-node-id="235:1209" data-name="Timeline structure">
              <p className="font-sans font-semibold leading-[40px] relative shrink-0 text-[#102033] text-[32px] tracking-[-0.6px] whitespace-nowrap" data-node-id="235:1210">
                Pioneer of Rapid Deployment Solution (RDS)
              </p>
              <p className="font-sans font-normal leading-[22px] min-w-full relative shrink-0 text-[#495667] text-[14px] w-[min-content]" data-node-id="235:1211">
                Our plug-and-play Rapid Deployment Solution reduces installation time and allows structures to be relocated as network needs change.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-card data-reveal data-node-id="235:1212" data-name="Achievement row">
            <p className="font-sans font-semibold leading-[26px] relative shrink-0 text-[18px] text-[color:var(--color-brand-navy,#102c4c)] w-[34px]" data-node-id="235:1213">
              03
            </p>
            <div className="bg-[var(--color-background-primary,white)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-12,12px)] items-start min-w-px p-[20px] relative rounded-[10px]" data-node-id="235:1214" data-name="Timeline structure">
              <p className="font-sans font-semibold leading-[40px] relative shrink-0 text-[#102033] text-[32px] tracking-[-0.6px] whitespace-nowrap" data-node-id="235:1215">
                Trusted Telecom Infrastructure Partner
              </p>
              <p className="font-sans font-normal leading-[22px] min-w-full relative shrink-0 text-[#495667] text-[14px] w-[min-content]" data-node-id="235:1216">
                We deliver reliable telecommunications infrastructure for network providers, tower owners and infrastructure partners.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-card data-reveal data-node-id="235:1217" data-name="Achievement row">
            <p className="font-sans font-semibold leading-[26px] relative shrink-0 text-[18px] text-[color:var(--color-brand-navy,#102c4c)] w-[34px]" data-node-id="235:1218">
              04
            </p>
            <div className="bg-[var(--color-background-primary,white)] border border-[var(--color-border-default,#dde4ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-12,12px)] items-start min-w-px p-[20px] relative rounded-[10px]" data-node-id="235:1219" data-name="Timeline structure">
              <p className="font-sans font-semibold leading-[40px] relative shrink-0 text-[#102033] text-[32px] tracking-[-0.6px] whitespace-nowrap" data-node-id="235:1220">
                Regional Project Experience
              </p>
              <p className="font-sans font-normal leading-[22px] min-w-full relative shrink-0 text-[#495667] text-[14px] w-[min-content]" data-node-id="235:1221">
                Our project experience spans Malaysia, Singapore, Indonesia, Bangladesh and Australia.
              </p>
            </div>
          </div>
        </div></section>
      <section className="about-section about-milestones" data-node-id="75:1077"><div className="about-section-art" data-node-id="75:1078">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-white inset-0" />
            <ShaderFill className="absolute" shader={{ setup: setupCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, render: renderCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615, params: { falloff: 2.299999952316284, inverseFalloff: false, ringCount: 30, offset: 1, shape: 1, transform: { x: 93.0792236328125, y: 0, radius: 40.80624771118164, angle: 0 }, color: { r: 0.9450980424880981, g: 0.9450980424880981, b: 0.9450980424880981, a: 1 } }, manifest: manifestCodeComponentId_c2b302fbdfce8a1ec92a5a80b10a5916ab506ed7_615 }} />
          </div>
        </div><div className="about-milestone-heading"><div className="about-heading" data-reveal data-node-id="133:667" data-name="Frame">
          <p className="font-sans font-semibold leading-[18px] relative shrink-0 text-[13px] text-[color:var(--color-brand-primary,#007cf8)] tracking-[1.5px] uppercase whitespace-nowrap" data-node-id="133:668">
            Our Milestones
          </p>
          <p className="font-sans font-bold leading-[58px] min-w-full relative shrink-0 text-[48px] text-[color:var(--color-text-primary,#102033)] tracking-[-1.2px] w-[min-content]" data-node-id="133:669">{`Our Journey of Growth & Innovation`}</p>
        </div><div className="about-milestone-arrows" data-node-id="184:1212" data-name="nav arrow">
          <LeftArrow onClick={() => moveTimeline(-1)} disabled={timelineLimits.start} className="bg-[var(--color-background-primary,white)] border border-[var(--color-brand-primary,#007cf8)] border-solid content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[70px]" />
          <RightArrow onClick={() => moveTimeline(1)} disabled={timelineLimits.end} className="bg-[var(--color-background-primary,white)] border border-[var(--color-brand-primary,#007cf8)] border-solid content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[70px]" />
        </div></div><div className="about-milestone-content"><img alt="" className="about-milestone-line" src={imgLine15} /><div className="about-milestone-track" ref={timelineRef} onScroll={updateTimelineLimits} aria-label="Company milestones" tabIndex={0} data-node-id="184:1161">
          <div className="content-stretch flex flex-col gap-[var(--spacing-24,24px)] items-center relative shrink-0 w-[417.5px]" data-node-id="184:1162" data-name="Frame" data-card data-reveal>
            <p className="[word-break:break-word] font-sans font-semibold leading-[40px] not-italic relative shrink-0 text-[32px] text-[color:var(--color-text-primary,#102033)] tracking-[-0.6px] whitespace-nowrap" data-node-id="184:1163">
              1999
            </p>
            <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="184:1209">
              <div className="bg-[var(--color-background-blue,#007cf8)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[40px]" data-node-id="184:1164" data-name="Frame">
                <FigmaIcon name="calendar"  className="[word-break:break-word]  leading-[1.6] not-italic relative shrink-0 text-[color:var(--color-background-primary,white)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="184:1165" />
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="184:1166">
                <div className="col-1 h-[28px] ml-[203.5px] mt-0 relative row-1 w-[10px]" data-node-id="184:1167">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup15} />
                </div>
                <div data-milestone-photo className="col-1 h-[376px] ml-0 mt-[26px] relative rounded-[var(--spacing-12,12px)] row-1 w-[418px]" data-node-id="184:1170">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle23} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-sans font-normal leading-[30px] min-w-full not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-secondary,#495667)] w-[min-content]" data-node-id="184:1172">
              Supplied monopole structures for Singtel Singapore, including 28m, 34m and 45m monopoles.
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--spacing-24,24px)] items-center relative shrink-0 w-[417.5px]" data-node-id="184:1173" data-name="Frame" data-card data-reveal>
            <p className="[word-break:break-word] font-sans font-semibold leading-[40px] not-italic relative shrink-0 text-[32px] text-[color:var(--color-text-primary,#102033)] tracking-[-0.6px] whitespace-nowrap" data-node-id="184:1174">
              1999 to 2001
            </p>
            <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="184:1210">
              <div className="bg-[var(--color-background-blue,#007cf8)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[40px]" data-node-id="184:1175" data-name="Frame">
                <FigmaIcon name="calendar"  className="[word-break:break-word]  leading-[1.6] not-italic relative shrink-0 text-[color:var(--color-background-primary,white)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="184:1176" />
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="184:1177">
                <div className="col-1 h-[28px] ml-[203.5px] mt-0 relative row-1 w-[10px]" data-node-id="184:1178">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup15} />
                </div>
                <div data-milestone-photo className="col-1 h-[376px] ml-0 mt-[26px] relative rounded-[var(--spacing-12,12px)] row-1 w-[418px]" data-node-id="184:1181">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle24} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-sans font-normal leading-[30px] min-w-full not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-secondary,#495667)] w-[min-content]" data-node-id="184:1183">
              Delivered heavy-duty 4-legged tower projects for Telekom Malaysia in Central Malaysia.
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--spacing-24,24px)] items-center relative shrink-0 w-[417.5px]" data-node-id="184:1184" data-name="Frame" data-card data-reveal>
            <p className="[word-break:break-word] font-sans font-semibold leading-[40px] not-italic relative shrink-0 text-[32px] text-[color:var(--color-text-primary,#102033)] tracking-[-0.6px] whitespace-nowrap" data-node-id="184:1185">
              2002 to 2004
            </p>
            <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="184:1211">
              <div className="bg-[var(--color-background-blue,#007cf8)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[40px]" data-node-id="184:1186" data-name="Frame">
                <FigmaIcon name="calendar"  className="[word-break:break-word]  leading-[1.6] not-italic relative shrink-0 text-[color:var(--color-background-primary,white)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="184:1187" />
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="184:1188">
                <div className="col-1 h-[28px] ml-[203.5px] mt-0 relative row-1 w-[10px]" data-node-id="184:1189">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup15} />
                </div>
                <div data-milestone-photo className="col-1 h-[376px] ml-0 mt-[26px] relative rounded-[var(--spacing-12,12px)] row-1 w-[418px]" data-node-id="184:1192">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--spacing-12,12px)] size-full" src={imgRectangle25} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-sans font-normal leading-[30px] min-w-full not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-secondary,#495667)] w-[min-content]" data-node-id="184:1194">
              Supported tower projects for Maxis and broadcast tower projects in Indonesia.
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--spacing-24,24px)] items-center relative shrink-0 w-[417.5px]" data-node-id="184:1218" data-name="Frame" data-card data-reveal>
            <p className="[word-break:break-word] font-sans font-semibold leading-[40px] not-italic relative shrink-0 text-[32px] text-[color:var(--color-text-primary,#102033)] tracking-[-0.6px] whitespace-nowrap" data-node-id="184:1219">
              2005 to 2014
            </p>
            <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="184:1220">
              <div className="bg-[var(--color-background-blue,#007cf8)] content-stretch flex items-center justify-center relative rounded-[50px] shrink-0 size-[40px]" data-node-id="184:1221" data-name="Frame">
                <FigmaIcon name="calendar"  className="[word-break:break-word]  leading-[1.6] not-italic relative shrink-0 text-[color:var(--color-background-primary,white)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="184:1222" />
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="184:1223">
                <div className="col-1 h-[28px] ml-[203.5px] mt-0 relative row-1 w-[10px]" data-node-id="184:1224">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup15} />
                </div>
                <div data-milestone-photo className="col-1 h-[376px] ml-0 mt-[26px] relative rounded-[var(--spacing-12,12px)] row-1 w-[418px]" data-node-id="184:1227">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[var(--spacing-12,12px)]">
                    <img alt="" className="absolute h-full left-[0.01%] max-w-none top-0 w-[99.99%]" src={imgRectangle26} />
                  </div>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-sans font-normal leading-[30px] min-w-full not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-secondary,#495667)] w-[min-content]" data-node-id="184:1229">
              Delivered multiple tower and pole projects for infrastructure partners including Shazan Alam Muda and Konsortium Jaringan Selangor.
            </p>
          </div>
        </div></div></section>
      <FooterWithCta className="site-footer" />
    </div>
  );
}
