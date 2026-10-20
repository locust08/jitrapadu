# Scope and implementation notes
- The design file and prototype are different Figma files. Editable design tokens are authoritative; prototype behavior is supplementary.
- Four complete page frames were supplied. No backend, authentication or mail service is included.
- Mobile reflow is an adaptation because no full mobile page frames exist in the supplied page.
- The Figma connector returned the original WGSL shader source and parameters, but resource file://shader-runtime-index.json/ was unavailable. Resources/list and resources/templates/list did not advertise the runtime. A local typed WebGPU adapter executes the shader with the browser-required premultiplied-alpha conversion. A static2D circle-pattern fallback preserves decoration without WebGPU and after GPU device loss. See RECHECK_2026-10-20.md for exact scope.
- The second prototype video was downloaded for source preservation; only the cloud video has a confirmed visible assignment. Static design photography remains authoritative elsewhere.
- Automatic approval review rejected recursive cleanup of .template-bootstrap. This temporary upstream checkout is retained, ignored by Git, and excluded from TypeScript, lint and Tailwind scanning.
- Dependency audit: critical Next.js advisories were addressed by moving to 16.4.2. shadcn is a development tool; production dependency audit is recorded separately. The full tooling dependency tree can retain advisories requiring breaking upstream changes.


