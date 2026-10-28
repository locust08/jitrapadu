"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FigmaIcon } from "./FigmaIcon";
import { portfolioOptions } from "../portfolio-options";

const solutions = [
  ["Telecom Tower & Monopole", "/solutions/telecom-tower-monopole"],
  ["Rapid Deployment System", "/solutions/rapid-deployment-system"],
  ["Smart Pole & Lamp Pole", "/solutions/smart-pole-lamp-pole"],
];
export function Header({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) { setOpen(null); setMobileOpen(false); }
    };
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(null); setMobileOpen(false); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", key); };
  }, []);
  return <header ref={root} className={"site-header " + className} data-node-id="14:700">
    <div className="header-blur" aria-hidden="true">{[40, 32, 24, 16, 10, 6, 3, 0].map((radius, index) => <span key={radius} style={{ backdropFilter: `blur(${radius}px)`, WebkitBackdropFilter: `blur(${radius}px)`, maskImage: `linear-gradient(to bottom, transparent ${Math.max(0, index - 1) * 12.5}%, black ${index * 12.5}%, black ${(index + 1) * 12.5}%, transparent ${Math.min(100, (index + 2) * 12.5)}%)`, WebkitMaskImage: `linear-gradient(to bottom, transparent ${Math.max(0, index - 1) * 12.5}%, black ${index * 12.5}%, black ${(index + 1) * 12.5}%, transparent ${Math.min(100, (index + 2) * 12.5)}%)` }} />)}</div>
    <Link href="/" aria-label="Jitrapadu home" className="site-logo">
      <img src="/sites/figma-jitrapadu/shared/d777f.png" alt="Jitrapadu" />
    </Link>
    <button className="mobile-menu-toggle" type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
      <FigmaIcon name={mobileOpen ? "xmark" : "bars"} />
    </button>
    <nav aria-label="Main navigation" className={"main-navigation " + (mobileOpen ? "mobile-open" : "")}>
      <Link href="/about-us" onClick={() => setMobileOpen(false)}>About Us</Link>
      <div className="nav-dropdown">
        <button type="button" aria-expanded={open === "solutions"} onClick={() => setOpen(open === "solutions" ? null : "solutions")}>Our Solution <FigmaIcon name="caret-down" /></button>
        {open === "solutions" && <div className="dropdown-panel">{solutions.map(([label, href]) => <Link key={label} href={href} onClick={() => {setOpen(null); setMobileOpen(false);}}>{label}</Link>)}</div>}
      </div>
      <Link href="/our-factory" onClick={() => setMobileOpen(false)}>Our Factory</Link>
      <div className="nav-dropdown">
        <button type="button" aria-expanded={open === "portfolio"} onClick={() => setOpen(open === "portfolio" ? null : "portfolio")}>Portfolio <FigmaIcon name="caret-down" /></button>
        {open === "portfolio" && <div className="dropdown-panel">{portfolioOptions.filter(option => option.id !== "all").map(option => <Link key={option.id} href={`/portfolio?solution=${option.id}`} onClick={() => {setOpen(null); setMobileOpen(false);}}>{option.label}</Link>)}</div>}
      </div>
      <div className="nav-dropdown">
        <button type="button" aria-expanded={open === "resources"} onClick={() => setOpen(open === "resources" ? null : "resources")}>Resources <FigmaIcon name="caret-down" /></button>
        {open === "resources" && <div className="dropdown-panel resources-panel"><Link href="/blog" onClick={() => {setOpen(null); setMobileOpen(false);}}>Article</Link><Link href="/news-events?category=News" onClick={() => {setOpen(null); setMobileOpen(false);}}>News</Link><Link href="/news-events?category=Events" onClick={() => {setOpen(null); setMobileOpen(false);}}>Events</Link><Link href="/csr" onClick={() => {setOpen(null); setMobileOpen(false);}}>CSR</Link></div>}
      </div>
      <Link className="mobile-contact-button" href="/contact-us" onClick={() => {setOpen(null); setMobileOpen(false);}}>Contact Us <FigmaIcon name="envelope" /></Link>
    </nav>
    <a className="enquiry-button" href="/contact-us">Send an Enquiry <FigmaIcon name="envelope" /></a>
  </header>;
}

