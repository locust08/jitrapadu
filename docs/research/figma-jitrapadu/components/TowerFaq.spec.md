# FAQ specification
Target: src/components/sites/figma-jitrapadu/shared/TowerFaq.tsx, replacing the node 92:449 content in tower-design.tsx only.
Interaction model: click accordion, first entry open by default; keyboard operable button. One open item at a time.
Container width 1053px, column. Row padding40px, gap24px, bottom border1px #C5CED8.
Open row #007CF8 with radius16px, text white. Closed row white, text #102033.
Question Inter600 24px/32px letter-spacing -0.3px; answer Inter400 18px/30px.
Icon Font Awesome arrow-up open/arrow-down closed; use existing FigmaIcon.
Exact questions:
1 What types of telecommunication towers does Jitrapadu provide?
2 What height range is available for angular towers?
3 How many operators can a monopole support?
4 Are the towers fabricated in-house?
5 What standards do your structures follow?
Exact first answer: We provide angular towers, 3-legged towers, 4-legged towers, monopoles, rooftop unipoles, guyed masts and customised tower structures.
Other answer text: use only existing source facts in tower-design.tsx; no guessed numerical heights or standards.
Desktop original row sizes first210px, others112px. Keep FAQ overall available height; original section top7593 bottom8403. Expanding answers must fit this area without footer overlap (restrict brief answers).
Mobile width100%, padding24px, question18px/26px and answer16px/26px.
Avoid source asset changes.
Verify npx tsc --noEmit before finishing.

