# BugHerd 94–110 and galleries 77/110 — localhost review

6 November 2026. Local review completed and approved by the user for commit to main and publication to https://jitrapadu.sites.locus-t.com. Contact form submission remains disabled until publishing is explicitly activated.

## Local review

- Home: http://localhost:3001/
- Portfolio gallery: http://localhost:3001/portfolio/rapid-deployment-system
- Solution cards: http://localhost:3001/solutions/rapid-deployment-system
- Certificates: http://localhost:3001/about-us
- Copy and filter updates: http://localhost:3001/blog, http://localhost:3001/csr, http://localhost:3001/contact-us

## Implemented and verified

| Tasks | Result |
|---|---|
| 94 | Existing milestone illustrations verified loading locally; all timeline image elements have nonzero natural width. No replacement imagery needed. |
| 95 | Restored the original Figma side-by-side layout with a sticky heading at 1440px and wider; stacked the heading above the grid below 1440px to prevent overlap. Visually verified at 1440px and 1026px. |
| 96 | All 31 supplied replacement logos imported, preserving order and the client's prepared 440×240 frames. Removed the duplicate CSS image inset so the frames fill their cells. |
| 97, 103 | Portfolio and CSR native select arrows use a Lucide chevron positioned 16px from the right, with room for the text. |
| 98–99 | Blog banner now retains only its title; removed the pinned eyebrow and description. Category descriptions remain below. |
| 100–101 | All Events and Article card images verified loading locally, including 687ab, 4a624 and 21909. These were already repaired in the current assets. |
| 102 | CSR archive content H2 expanded to Corporate Social Responsibility; banner remains CSR. |
| 104–107 | Contact banner retains only Contact Us. Introduction uses the supplied Let’s Talk About Your Project heading and replacement sentence. |
| 108–109 | H1/H2 and About's visual section/banner titles use a paper-fold reveal informed by React Bits Fold Text. Native CSS and IntersectionObserver avoid an additional animation dependency. Following paragraphs slide in after the title; homepage hero copy has a 1100ms delay. Heading links and accessible names remain intact, shade duplicates are aria-hidden, and reduced-motion/print modes keep text visible. Long words fit at 320px. |
| 77, 110 | Shared enlarged native-dialog viewer is used by portfolio and all three solution pages. Verified extra views have arrows, thumbnails and a counter. Arrow keys, Escape, focus return and index reset checked. Close remains visible while scrolling on mobile. Single-image projects have no empty carousel controls. |

## Gallery assets and limits

Only these visually matched additional views were imported:

- Kajang: `public/sites/figma-jitrapadu/projects/kajang-rds-7.webp`, from [RDS_7.jpg](https://drive.google.com/file/d/1G1A3CwPuysyaXVXxL0AtgDjCkqC8TX0H/view). Same lamp arms, mounting frames, steel base, enclosure and hospital facade as the existing cover.
- Changkat Jong: `public/sites/figma-jitrapadu/projects/changkat-jong-rds-9.webp`, from [RDS_9.jpg](https://drive.google.com/file/d/1c-wI88yVW1rZf5BonRjymPgY6jBlK9bj/view). Same tower, raised base, fence and adjacent building, photographed during installation.

Original covers remain first. Teluk Muroh, Kg Permatang Tulang, KPM Ayer Molek, Paka, Juru, Senai and Jalan Telok Kumbar remain single-image viewers. RDS_8.jpg is a different-pole candidate and remains excluded pending confirmation. Repeated crops are not used as extra slides. Full matching evidence and original Drive IDs remain in `temp/portfolio-photo-review/`.

Replacement logos: [client's new folder](https://drive.google.com/drive/folders/1lU4F3NTwS45H24zKyXoANnbx_eKOlA3v). Downloaded file metadata and the exact source/output mapping are in `temp/bugherd-94-110/logos/`.

## Verification

- ESLint and TypeScript checks pass.
- Frontend review production build passes with 33 static routes, without deploying.
- Three static-export regression tests pass, including all three solution-page viewers and private-content exclusion.
- Gallery regression verifies nine cover-first image sets, exactly two verified extra views, and no RDS_8 inclusion. Included in the standard npm test command.
- Independent code review found no actionable issues.
- Browser checks covered desktop 1440×1000, tablet 1026×786 and narrow layouts at 375px/320px. Confirmed both multi-image galleries and single-image viewers on the solution pages. Fresh About load has no browser errors after restarting Next dev to clear stale server/client hot-reload output.

The final standard suite passes **40/40**, including the new gallery regression. During earlier runs alongside the build, the existing `separate connections serialize same-key and quota races` test intermittently accepted four submissions instead of five. It passes in the final full recheck after the build finished; see `temp/bugherd-94-110/cms-tests-recheck.log`. No CMS transaction or form-activation behaviour was changed in this frontend work.

Screenshots: `temp/bugherd-94-110/local-kajang-gallery.png`, `local-solution-gallery.png`, `local-certificates-desktop.png`, `local-certificates-tablet.png`, `local-contact.png` and `local-partners.png`.

## BugHerd review state

Tasks 94–110 are Ready for Review. Task 77 remains in Feedback pending verified additional photographs for the other seven projects, while its gallery implementation is available locally for review. No tasks were marked Done.
