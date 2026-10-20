# Mobile reflow specification
Target mobile.css under src/components/sites/figma-jitrapadu. Media query max-width767px only. Import from site.css is parent responsibility.
No mobile frame supplied. Adapt desktop compositions with same content/assets/colours/typography. Canonical source screenshot home-1920.png.
At390px use padding24px, section gap48px, cards gap16px; H1 Inter700 40/48 tracking-1px, H2 32/40 tracking-.8px, H3 26/34, body16/26. Headings and original art retained.
Desktop components preserve source 1920px absolute canvas. Mobile must set design-canvas zoom1 width100% height auto and reflow [data-node-id] containers, hide empty backgrounds/decorative lines, preserve all foreground pictures/logos. Avoid blanket image width/height overrides that corrupt crops/masks.
Home visual order: hero > about > three solutions > factory > partners > industries > footer. Desktop JSX differs, so CSS order or grid-area needed.
Home hero has moving cloud video and foreground tower, heading and summary. Mobile readable title, not zoomed miniature.
Home six about benefit cards two-column at390 or one-column when text needs; solutions stack and source photos visible; factory image with stats then text; partners grid5x2 or2columns; industries two or one column with readable overlay captions.
Inner pages maintain source topological order. Hero image height300 with title bottom. Product cards and factory capability cards stack (or2columns if readable). Timeline steps vertical. About certificates grid2columns and real images legible.
Footer source image remains background. CTA width100 padding24 text32/40. Footer columns stack, copyright wraps. No horizontal overflow.
Header: fixed height80, logo150x33, menu button show, nav hidden until .mobile-open, then absolute top72 left16 right16 white panel stacked. Enquiry can hide desktop button on mobile. Dropdown stays in flow in mobile menu. Do not alter Header.tsx.
Only create mobile.css. Parent will import. Verify typecheck if applicable. Do not modify page components.

