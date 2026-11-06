"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./fold-text.css";

// Paper-fold motion follows React Bits Fold Text (David Haz):
// https://reactbits.dev/text-animations/fold-text
// Uses native CSS animation and our viewport lifecycle instead of adding GSAP.
export function FoldText({ children }: { children: ReactNode }) {
  const root = useRef<HTMLSpanElement>(null);
  let index = 0;
  const split = (nodes: ReactNode): ReactNode => Children.map(nodes, child => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).split(/(\s+)/).map((word, i) => !word || /^\s+$/.test(word) ? word :
        <span className="fold-text-word" key={i}><span className="fold-text-piece" style={{ "--fold-index": index++ } as CSSProperties}>{word}<span className="fold-text-shade" data-fold-text={word} aria-hidden="true" /></span></span>);
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
      return cloneElement(child, undefined, split(child.props.children));
    }
    return child;
  });
  const content = split(children);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const update = () => {
      observer?.disconnect();
      if (preference.matches) { element.dataset.foldState = "visible"; return; }
      if (element.dataset.foldState === "visible") return;
      element.dataset.foldState = "waiting";
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          element.dataset.foldState = "visible";
          observer?.disconnect();
        }
      }, { threshold: 0, rootMargin: "0px 0px -20px 0px" });
      observer.observe(element);
    };
    update();
    preference.addEventListener("change", update);
    return () => { observer?.disconnect(); preference.removeEventListener("change", update); };
  }, []);
  return <span ref={root} className="fold-text">{content}</span>;
}
