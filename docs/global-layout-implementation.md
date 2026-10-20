# Global layout implementation — 20 October 2026

Implemented across Home, About Us, Telecom Tower & Monopole, and Our Factory:

- Normal document flow and responsive grids replace whole-page CSS zoom.
- The outer page and shared header are capped at 1820px and centered.
- IntersectionObserver reveals fade sections/cards in sequence and fade them out on exit. Keyboard focus remains visible; reduced-motion and print show content without transitions.
- Cards without a supplied interaction receive subtle border/shadow feedback and image zoom where applicable. Existing solution and Vision/Mission effects remain.
- Homepage and factory statistics count up once when visible, preserving units and ranges. Dates, contact details, measurements and list numbering remain static.
- Shared footer reflows from four to two to one column.
- The current radial shader remains unchanged pending the Ideal Homes reference.
- Development and preview scripts default to port 3001.

Validation: npm run check passed (ESLint, TypeScript, production build). All four production routes returned HTTP 200. Browser checks confirmed mobile pages have no document overflow, a centered 1820px homepage at a 3840px viewport, and count-up progression from near zero to final values. Reduced-motion handling was reviewed in code; it was not emulated in the browser.
