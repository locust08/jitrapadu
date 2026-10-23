"use client";
import { useEffect, type RefObject } from "react";

export function PageMotion({ root }: { root: RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Set<HTMLElement>();
    const added = new Set<HTMLElement>();
    const selector = "[data-reveal], [data-card], .post-card, .portfolio-card";
    const observer = new IntersectionObserver(entries => {
      let entering = 0;
      // DOM order keeps left-to-right card sequences stable between observer batches.
      const ordered = [...entries].sort((a, b) => a.target === b.target ? 0 : a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
      for (const entry of ordered) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          const siblings = element.parentElement ? Array.from(element.parentElement.children).filter(child => child.matches(selector)) : [];
          const index = Math.max(entering++, siblings.indexOf(element));
          element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 85}ms`);
        } else {
          element.style.setProperty("--reveal-delay", "0ms");
        }
        // A focused control must never disappear while someone is using it.
        element.dataset.visible = String(entry.isIntersecting || element.contains(document.activeElement));
      }
    }, { threshold: 0, rootMargin: "0px 0px -20px 0px" });
    const register = () => {
      for (const element of elements) {
        if (!container.contains(element)) { observer.unobserve(element); elements.delete(element); }
      }
      for (const element of container.querySelectorAll<HTMLElement>(selector)) {
        if (elements.has(element) || element.closest("dialog")) continue;
        if (!element.hasAttribute("data-reveal")) { element.dataset.reveal = ""; added.add(element); }
        // Slide only content/cards, never section ancestors containing sticky navigation.
        if (element.matches("[data-card], .post-card, .portfolio-card, .about-heading, .home-section-title, .article-body>section, h1[data-reveal], .contact-form-panel, .contact-details, .tower-section-heading, .tower-intro-copy, .factory-steps>li, .tower-steps>li")) element.dataset.revealSlide = "true";
        element.dataset.visible = "false";
        elements.add(element);
        observer.observe(element);
      }
    };
    const update = () => { container.setAttribute("data-motion", preference.matches ? "reduced" : "ready"); };
    update();
    const registration = requestAnimationFrame(register);
    const mutations = new MutationObserver(register);
    mutations.observe(container, { childList: true, subtree: true });
    preference.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(registration);
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", update);
      for (const element of elements) { delete element.dataset.visible; delete element.dataset.revealSlide; element.style.removeProperty("--reveal-delay"); }
      for (const element of added) delete element.dataset.reveal;
      container.removeAttribute("data-motion");
    };
  }, [root]);
  return null;
}
