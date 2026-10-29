'use client';
/* eslint-disable @next/next/no-img-element */
import {usePublishedContent} from "./PublishedContentProvider";
import { clientPartnerLogos } from "../partner-logos";

function partnerKey(name: string) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (key === "tm") return "telekommalaysia";
  if (key === "caam") return "civilaviationauthorityofmalaysia";
  if (key.startsWith("dharmon")) return "dharmonitelcoinfra";
  return key;
}

export function TrustedPartners() {
  const content=usePublishedContent();
  const published=content.partners.map(p=>({name:p.name,file:p.logo.url,width:200,height:100}));
  const partnersByName=new Map(clientPartnerLogos.map(partner=>[partnerKey(partner.name),partner]));
  for (const partner of published) partnersByName.set(partnerKey(partner.name),partner);
  const partners=[...partnersByName.values()];
  const middle=Math.ceil(partners.length/2);
  const displayRows=[partners.slice(0,middle),partners.slice(middle)].filter(row=>row.length);
  return <section className="partners-section" data-node-id="40:1307" aria-labelledby="partners-heading" tabIndex={0}>
    <div className="partners-heading" data-reveal>
      <h2 id="partners-heading">Trusted by Industry Partners</h2>
      <p>Jitrapadu has worked with telecommunication providers, infrastructure owners, public sector organisations and industry partners across Malaysia and beyond.</p>
    </div>
    <div className="partner-rows">
      {displayRows.map((partners, index) => <div className={`partner-row partner-row-${index}`} key={index}>
        <div className="partner-track" style={{animationDuration:`${partners.length * 11}s`}}>
          {[0, 1].map(copy => <div className="partner-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {partners.map(partner => <div className="partner-cell" key={partner.name}>
              <img src={partner.file} alt={copy === 0 ? partner.name : ""} width={partner.width} height={partner.height} style={{ width: partner.width, height: partner.height }} />
            </div>)}
          </div>)}
        </div>
      </div>)}
    </div>
  </section>;
}
