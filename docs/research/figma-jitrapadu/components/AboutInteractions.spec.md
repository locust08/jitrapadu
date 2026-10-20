# About interactions
Own about-design.tsx only. Preserve default geometry and imagery.
Vision/Mission source Figma variant hover: overlay rgba(0,0,0,.55), backdrop blur5px, padding100px, gap24, text white centered.
Title Inter700 48/58 -1.2px. Description Inter60024/32 -.3px.
Vision exact: To become Malaysia’s trusted leader in telecommunication steel infrastructure by driving innovation, safety and sustainable connectivity for the future.
Mission exact: To provide customisable, cost-effective and reliable telecommunication infrastructure solutions through engineering excellence, in-house fabrication, continuous R&D and professional project delivery.
Default icon100circle and title visible. Hover/focus hide icon, show title+description. Desktop frame960x700. Preserve no-hover appearance.
Mobile display description on tap or visible; adapt text20/28 padding24.
Timeline data-node184:1161 four cards417.5wide gap80 atleft52 top7371. Arrow184:1126/1127 size70 roundwhite border#007CF8 icon24.
Make arrows actual labelled buttons driving horizontal scroll of timeline viewport1820. Preserve original start first1999 then1999to2001,2002to2004,2005to2014. All source text and images unchanged.
At desktop move the track in a clipped viewport, arrow disabled at limits; keyboard/nativebutton accessible. On mobile allow swipe.
No other files; use inline dynamic transforms/scroll behavior if needed, or scoped component styles in JSX.
Verify npx tsc --noEmit.

