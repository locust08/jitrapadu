/* eslint-disable @next/next/no-img-element */
const base = "/sites/figma-jitrapadu/shared/";
const rows = [
  [
    { name: "Telekom Malaysia", file: "3c79e.png", width: 163, height: 80 },
    { name: "MCMC", file: "1d955.png", width: 121, height: 100 },
    { name: "Digital Nasional", file: "aad0a.png", width: 304, height: 100 },
    { name: "Civil Aviation Authority of Malaysia", file: "32b20.png", width: 143, height: 140 },
    { name: "Majlis Keselamatan Negara", file: "2afdb.png", width: 140, height: 140 },
  ],
  [
    { name: "DCA Malaysia", file: "0f995.png", width: 211, height: 90 },
    { name: "D’Harmony Telco Infra", file: "1fcbb.png", width: 347, height: 90 },
    { name: "CelcomDigi", file: "86de1.png", width: 293, height: 90 },
    { name: "Maxis", file: "54cf0.png", width: 312, height: 90 },
    { name: "U Mobile", file: "86ea9.png", width: 140, height: 140 },
  ],
];

export function TrustedPartners() {
  return <section className="partners-section" data-node-id="40:1307" aria-labelledby="partners-heading" tabIndex={0}>
    <div className="partners-heading" data-reveal>
      <h2 id="partners-heading">Trusted by Industry Partners</h2>
      <p>Jitrapadu has worked with telecommunication providers, infrastructure owners, public sector organisations and industry partners across Malaysia and beyond.</p>
    </div>
    <div className="partner-rows">
      {rows.map((partners, index) => <div className={`partner-row partner-row-${index}`} key={index}>
        <div className="partner-track">
          {[0, 1].map(copy => <div className="partner-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {partners.map(partner => <div className="partner-cell" key={partner.name}>
              <img src={base + partner.file} alt={copy === 0 ? partner.name : ""} width={partner.width} height={partner.height} style={{ width: partner.width, height: partner.height }} />
            </div>)}
          </div>)}
        </div>
      </div>)}
    </div>
  </section>;
}
