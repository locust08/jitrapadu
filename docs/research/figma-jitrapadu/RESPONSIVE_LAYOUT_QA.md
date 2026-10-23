# Global layout and responsive checks

Requirements: 1920px maximum outer page width; 1820px maximum content width. Smaller viewports use the available width with responsive gutters. Larger displays center the page. Article reading columns remain narrower inside the main content container.

Changes:
- Shared page/header maximum width increased from 1820px to 1920px.
- Generated-page resource containers increased from 1640px to 1820px.
- Desktop navigation switches to the mobile menu through 1199px, avoiding the enquiry-button collision at 1024px.
- Factory footer now uses the shared responsive footer instead of the fixed 1920px source-canvas layout.
- Long actions and form controls stay within their containers; footer paragraphs respect available width.

Browser checks:
- All twelve main pages checked at 320, 360, 390, 430, 540, 768, 1024, 1280, 1920 and 2560px.
- All ten generated News & Events / CSR article pages checked at 320, 768, 1920 and 2560px.
- Repaired home/About/Factory/Telecom layouts retested at 320, 540, 768, 1024, 1199, 1200, 1920 and 3840px.
- Final checks found no viewport overflow or out-of-bounds text/action elements in those views. Intentional milestone and partner tracks were excluded from text-boundary checks.
- At 3840px, measured outer page width is 1920px, resource container is 1820px, with matching left/right outer margins (subpixel rounding only).
- Tablet menu opens its Resources submenu and navigates to Resources Overview. At 844×390 landscape, menu fits vertically and supports scrolling.
- Narrow 320px Factory footer inspected visually: contacts and copyright wrap, affiliate logo stays at bottom right.

Evidence: `temp/responsive-qa/audit.json` and `temp/responsive-qa/factory-mobile.png` are local, ignored QA artifacts.
