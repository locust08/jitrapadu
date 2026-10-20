"use client";
import { useEffect, type RefObject } from "react";

export function PageMotion({ root }: { root: RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(entries => {
      let entering = 0;
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) element.style.setProperty("--reveal-delay", `${entering++ * 90}ms`);
        // A focused control must never disappear while someone is using it.
        element.dataset.visible = String(entry.isIntersecting || element.contains(document.activeElement));
      }
    }, { threshold: 0, rootMargin: "0px 0px -20px 0px" });
    for (const element of elements) {
      element.dataset.visible = "false";
    }
    const update = () => { container.setAttribute("data-motion", preference.matches ? "reduced" : "ready"); };
    update();
    const registration = requestAnimationFrame(() => elements.forEach(element => observer.observe(element)));
    preference.addEventListener("change", update);
    return () => { cancelAnimationFrame(registration); observer.disconnect(); preference.removeEventListener("change", update); container.removeAttribute("data-motion"); };
  }, [root]);
  return null;
}
