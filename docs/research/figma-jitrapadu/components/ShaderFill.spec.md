# ShaderFill

Target: src/components/sites/figma-jitrapadu/shared/ShaderFill.tsx

Preserve exact source WGSL setup/render/manifest and every callsite parameters. Device WebGPU canvas responds toResizeObserver. Source pattern shape/rings/falloff/transform/color unchanged. Original shader-runtime-index MCP resource unavailable after discovery; local typed WebGPU hosting adapter executes original shader. No CSS approximation. Requires browserWebGPU; transparent if unavailable.

Assets and text: exact source Figma design context retained under source/; fullpage PNG under docs/design-references/figma-jitrapadu. No substitute art.
Verification: strict TypeScript, lint, production build and browser checks.

