import { FoldText } from "./shared/FoldText";
import { Header } from "./shared/Header";
import { FooterWithCta } from "./shared/Footer";
import { legalContent } from "./legal-content";
import "./legal.css";

export function LegalDesign({ kind }: { kind: keyof typeof legalContent }) {
  const content = legalContent[kind];
  return <div className="design-canvas fluid-page legal-page">
    <Header />
    <article className="legal-content">
      <h1><FoldText>{content.title}</FoldText></h1>
      {content.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </article>
    <FooterWithCta className="site-footer" />
  </div>;
}
