# Homepage motion implementation — 20 October 2026

Implemented the approved homepage refinements:

- Hero keeps the confirmed Figma cloud MP4, source poster, crop, separate tower and overlay. Added explicit eager media preload. Browser observed readyState4, paused:false and advancing playback time.
- Trusted Partners now has two repeating horizontal rows using the original ten logo assets, sequence, desktop image dimensions and440×240px cells. Top moves left; bottom moves right. Two identical groups make each track's50% translation a seamless repeat.
- Both rows pause on section hover and keyboard focus, and resume without resetting their animation time. Duplicate content is hidden from assistive technology.
- Mobile/tablet preserve two rows, using220×120px cells. Bottom offset is bounded so the duplicate sequence covers the viewport at the upper mobile breakpoint. Reduced-motion preference exposes static horizontally scrollable rows.
- Provisional constant speed:40 design pixels/second,55seconds per desktop cycle and27.5seconds per mobile cycle. Exact Figma motion timing was unavailable; user-specified direction, loop and hover behavior are authoritative.
- Header samples the live backdrop with eight overlapping masked blur layers from40px to0px. Its white opacity follows the16 source Figma stops from80% to transparent. Removed the abrupt scrolled-state uniform blur. Foreground logo/navigation/buttons remain sharp and clickable.
- Navigation pill uses20px backdrop blur. Removed a redundant prefixed CSS declaration after observing that the compiler dropped both filter declarations when both were present. Browser now confirms computed blur(20px).

Browser verification: desktop rows moved in opposite directions; paused positions stayed identical across separate reads and resumed after clicking outside. Track width equals twice group width, with enough repeated content through the animation boundary. Mobile390px showed both120px rows, document375px excluding scrollbar, and zero broken logo assets. Mobile menu opened correctly above the blur layers. Hero played in the inspected desktop tab.

Port3000 is occupied by another local project; use the Jitrapadu preview on http://localhost:3002/.

Final checks: npm run check passed (lint, TypeScript, production build). All four production routes returned HTTP200 on port3002. Production tablet980px measured965px document width and1100px repeated groups; dynamic bottom offset preserves coverage at the upper responsive breakpoint.
