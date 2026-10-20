# factory specification

## Overview
Exact Figma frame, including its visible text, images, overlapping layers and source dimensions. 1920 × 7569.

## Structure and styles
Use the captured high-fidelity design context in source/factory-context.tsx.txt. Every node has its original Figma ID. Preserve exact geometry at 1920, Inter font weights 400/500/600/700, token colours and image crops.

## Design tokens
Primary #007CF8; hover #0068D8; text #102033; secondary #495667; muted #6D7887; navy #092A54; light background #F7F9FC; border #DDE4EC.
H1 68/76 -1.8px; H2 48/58 -1.2px; H3 32/40 -0.6px; H4 24/32 -0.3px; body 18/30; button 16/20 600.

## Assets
Use downloaded source assets in public/sites/figma-jitrapadu/shared. Preserve all layers, original crop and masks. No screenshot as implementation asset. Source video on Home is autoplay, muted, loop; foreground tower stays a separate layer.

## States and behavior
Header remains visible on scroll (observed prototype). Solutions menu opens on click. Links navigate between supplied page designs. Enquiry opens the published email contact. Product cards expose source descriptions on hover/focus. No backend required.

## Content
All visible copy is verbatim in the captured source. Do not paraphrase.

## Responsive
1920 source geometry is canonical. Desktop downscales proportionally. Below 768 use readable mobile reflow with a menu, stacked content and 40/48 mobile H1, 32/40 H2; body 16/26. No mobile layout frames were provided: mobile arrangements are an adaptation, not an extracted source.

## Verification
Typecheck, production build, source asset completeness, desktop and mobile browser comparison.

