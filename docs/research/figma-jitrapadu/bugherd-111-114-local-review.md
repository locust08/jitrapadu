# BugHerd 111–114 — local review

12 November 2026. Local implementation reviewed and approved by the user for commit to main and deployment to Eason CF Main at https://jitrapadu.sites.locus-t.com. This release also records the previously applied Eason CF migration configuration and documentation.

- #111: Centre only milestone year labels within their cards.
- #112: Pause partner tracks on hover/focus within the logo area. Heading hover keeps both tracks running; keyboard focus on the labelled logo region still pauses motion.
- #113: Remove the hidden 4ac91 and e7432 banner layers; preserve the final 270ae image, transform and crop. The attached feedback explicitly identifies 4ac91 as the unwanted image.
- #114: Replace nine matching certificate images from the supplied folder, preserving their existing relative order. Remove CIDB, DCA/CAAM paint approval and Galvanising/Zinc Coating cards as requested. Certificate documents use contain sizing and meaningful alt text.

## Asset provenance

Source folder: https://drive.google.com/drive/folders/1J9ACBhtFkKh6nSFFXGma_xU03pNA5u8_

Client JPEGs converted to WebP quality 95 without changing dimensions or the supplied redactions. Eight images are 600×870; Steel Material is 600×882. Original downloads are retained in ignored temp/bugherd-111-114.

| Certificate | Drive file | Local asset |
|---|---|---|
| SIRIM QAS International Test Report | https://drive.google.com/file/d/1SRUkT110eRKiFwnBtGdAvbsJpCKcnTd7/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/sirim.webp |
| TM Vendor | https://drive.google.com/file/d/1TDNWWHOuqFCHQq3yVujnnc46ARGSf9B8/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/tm-vendor.webp |
| Ericsson Smart Pole Cabinet Reference | https://drive.google.com/file/d/1fkclPoPUBdRrYQCEoKwHM36OxFplIHZo/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/ericsson.webp |
| Chugoku Paints Qualified Painting Applicator | https://drive.google.com/file/d/1Y0jXbSVFERiXYRSEf638L6MDJIfzcd53/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/chugoku.webp |
| FGV Vendor Registration | https://drive.google.com/file/d/1-ap619LgS9Tg0qRYJ_pHd18rbvB4b-3q/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/fgv.webp |
| YTSB 5G Infrastructure Support Letter | https://drive.google.com/file/d/1fe_qKuhLHvRS8fSHO1hpfF4f9kvfYCcs/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/ytsb.webp |
| edotco Malaysia Appreciation Letter | https://drive.google.com/file/d/1fPbZF6E9h4BMNR19KhfNeK6XlAh4_1r6/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/edotco.webp |
| Rendang Engineering Technical Endorsement Letter | https://drive.google.com/file/d/1jnfOhuEFp-wHlGzgbmqxTUSeCYB42TY9/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/rendang.webp |
| Steel Material Mill Test Certificate | https://drive.google.com/file/d/1zyQbdSdWqHT8jH7OY8Gp7IVS6NctuUrL/view | public/sites/figma-jitrapadu/certificates/review-2026-11-12/steel-mill.webp |

## Verification

Lint and TypeScript passed. Local frontend review production build passed. Browser verification confirmed all nine images load, only the final banner image remains, and milestone years are centred. Hovering the partner heading reports running for both tracks; hovering the logo region reports paused. At 375px the nine-card grid has one column, no horizontal overflow, and centred milestone year labels. Desktop screenshot: temp/bugherd-111-114/certificates-desktop.png.

Tasks 111–114 remain Ready for Review; #77 remains in backlog awaiting additional photos. Form activation remains deferred, and workers.dev and preview URLs remain disabled. Live release target: https://jitrapadu.sites.locus-t.com. Local review remains available at http://localhost:3001/about-us and http://localhost:3001/.
