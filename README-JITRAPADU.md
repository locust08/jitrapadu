# Jitrapadu website

Built from the supplied editable Figma design, with prototype behavior references. The upstream template's MIT license is preserved in LICENSE.

## Run

Use Node.js 24 or later.

```powershell
npm ci
npm run dev
```

For the verified production preview:

```powershell
npm run build
npm run preview
```

Open http://localhost:3001. The preview command prepares the standalone static files and starts the server. Stop it with Ctrl+C.

## Pages

| Figma design frame | Local route |
| --- | --- |
| Home — 1:2064 | / |
| About Us — 14:725 | /about-us |
| Telecom Tower & Monopole — 60:618 | /solutions/telecom-tower-monopole |
| Our Factory — 75:1179 | /our-factory |

Design file: https://www.figma.com/design/FAnfnPaXeloTTZKS5YajIW/Jitra-Padu--dev-?node-id=2-3
Prototype: https://www.figma.com/proto/xTpPetri1XBx9CIiLoOFzX/Jitra-Padu?node-id=1-2064&page-id=2%3A3

## Implementation

Next.js 16.4.2, React 19, TypeScript and Tailwind CSS 4. Inter and Font Awesome match the design. Original image layers, crops, logos, document images, mask illustrations and cloud video are local assets. Original Figma shader WGSL is retained.

Desktop compositions use the original 1920px coordinates and scale proportionally. Below 1024px the layout reflows using the source mobile typography tokens; full mobile page frames were not supplied.

There are 18 React components, 20 specification files (18 component contracts and two interaction/responsive briefs), and 120 source asset files: 108 PNGs, 6 SVGs, 2 MP4s, 2 video posters and 2 icon fonts. Inter is self-hosted by Next.js.

The app has no live backend. Enquiry buttons open the published email address. Pages absent from the supplied designs are not invented.

## Verification and research

`npm run check` runs lint, TypeScript and production build. Research, source snapshots, design tokens, behavior notes, limitations and audit evidence are in docs/research/figma-jitrapadu. Full source reference renders are in docs/design-references/figma-jitrapadu.

Do not rerun the initial preparation scripts over edited components; they are retained as extraction provenance.


