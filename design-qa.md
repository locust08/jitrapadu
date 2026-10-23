# Portfolio option 1 — design verification

final result: passed

Target: `docs/design-options/portfolio-2026-10-22/01-portfolio.png`, the first displayed proposal selected by the user.
Implementation: http://localhost:3001/portfolio

Compared the selected desktop/mobile board and captured implementation together. Desktop checked at 1440×1000 and default browser size; mobile checked at 390×844. The board contains scaled desktop/mobile presentations, so compare page regions rather than its surrounding canvas. Captures are under `docs/design-options/portfolio-2026-10-22/qa/`.

- Preserved photographic hero, white heading, sidebar with blue selected solution, two-column portrait project gallery and single-column mobile gallery.
- Used supplied project photographs and existing layered Figma hero assets. Preserved shared navigation and footer rather than reproducing incorrect contact details generated in the proposal.
- Checked readable card overlays and popup details separately. Three projects have verified existing titles and structural descriptions; no invented projects or dates added.
- Desktop Monopoles filter returned one project; mobile selector reset to all three. Native dialog opens, traps focus, closes with Escape and returns focus to its trigger. Contact links point to the existing contact page.
- Mobile footer remains in flow with grouped branding, readable legal lines and affiliate image at bottom right. No horizontal overflow at desktop or mobile widths. Browser console error log was empty.
- Full-page captures contain blank areas for sections outside the viewport because existing scroll reveal fades elements out. Separate footer captures show the revealed footer; this is expected motion, not missing content.
- `npm run check`: lint, TypeScript and production build passed, including static `/portfolio`.

No outstanding P0/P1/P2 issues. P3: generated proposal imagery and footer typography contain small differences from supplied source assets; retained the real brand assets and existing footer standards for consistency. Radial decoration remains deferred until the previously requested Ideal Homes reference is supplied.
