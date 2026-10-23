# FAQ design alignment

Source: Figma `FAnfnPaXeloTTZKS5YajIW`, node `92:442` (FAQ section). Fresh design context and screenshot inspected alongside the rendered Telecom Tower page. This node does not include the rest of the page.

Corrected the shared accordion styling:
- Open answer text: white, replacing the general paragraph rule's grey.
- Desktop questions: Inter 600, 24px/32px, tracking -0.3px.
- Desktop answers: Inter 400, 18px/30px, tracking 0.
- Heading: Inter 700, 48px/58px, tracking -1.2px; eyebrow 13px/18px.
- Accordion maximum width 1053px, row padding 40px, question/answer gap 24px, heading/list gap 50px.
- Section padding 80px at the 1920px design size. Arrow line-height corrected to 32px instead of 38.4px.
- Separators render inside rows so borders do not add height to the design. The five-row section measures 953.99px against Figma's 954px frame.
- Closed row surfaces are transparent, preserving the original authored radial pattern beneath them. Existing shader module, runtime import, parameters and rendered ShaderFill remain connected and unchanged.
- Brand blue #007cf8, closed text #102033, inverse text #fff, open arrow #e8f3ff and separators #c5ced8.

Verified open/closed state colours, first/second-question toggling, 320px wrapping with no horizontal overflow, and desktop computed dimensions. Mobile retains 24px padding, 18px/26px questions and 16px/26px answers. Screenshot: `temp/figma-faq-qa/desktop.png` (local ignored evidence).

`npm run check` passed lint, TypeScript and production build. Changes were subsequently published to Cloudflare together with the shared BugHerd integration.
