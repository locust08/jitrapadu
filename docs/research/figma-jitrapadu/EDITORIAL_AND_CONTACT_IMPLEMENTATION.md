# Selected designs: News & Events 1, CSR 3, Contact 5

Implemented `/news-events`, `/csr`, `/contact-us`, six News/Event post routes and four CSR post routes. The selected artboards are saved in `docs/design-options/2026-10-22/`.

Archives use sidebar category filters, responsive image-card grids, draft-content notes and real pagination where there are enough posts. Undated content has no invented year filter. Post pages contain a banner, readable body sections and related-post links. Header, footer and enquiry navigation now point to the appropriate pages.

News and event copy is draft editorial content. The two event ideas have no confirmed dates, venues or bookings. CSR stories describe proposed initiatives, not completed company activities. Images are illustrative; generated photographs do not document real company events.

Contact details and map coordinates were checked against https://www.jitrapadu.com/contact-us. The page has labelled form fields, required-field and email validation, consent, telephone/email links, a Google Maps iframe and a directions link. No email-delivery provider or backend credentials are configured. The form prepares an encoded `mailto:` enquiry for review and sending in the visitor's email application; it does not claim to have sent a message. Direct server-side delivery requires a configured provider and verified sender.

Four illustrative photographs were created with the built-in ImageGen tool and saved in `public/sites/figma-jitrapadu/editorial/`:

- `engineering-education.png`: Malaysian engineering mentor demonstrating a tabletop telecom model to students in a safe classroom; navy/white palette, realistic editorial photography, no logos or claims.
- `responsible-materials.png`: gloved hands planting a seedling with adult volunteers softly out of focus; fictional environmental illustration, no logos or claims.
- `site-team.png`: two ground-level Malaysian telecom engineers reviewing plans beside a tower, with appropriate PPE; fictional safety/industry illustration.
- `steel-fabrication.png`: protected welder working on steel inside an organised workshop; wide editorial composition for card and banner crops.

These prompt summaries describe the production prompts. The original ImageGen outputs remain in the Codex generated-images folder; workspace copies are the assets used by the site.

Outstanding before public publication: client approval of editorial/CSR copy and event information; selection/configuration of an email delivery service if direct form submission is required; final legal/privacy text. Existing legal labels have not been turned into invented legal documents.
