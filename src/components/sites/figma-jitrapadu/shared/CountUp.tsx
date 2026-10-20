"use client";
import { useEffect, useRef, useState } from "react";

export function CountUp({ value, suffix = "", duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const final = value.toLocaleString("en-MY");
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const finish = () => { cancelAnimationFrame(frame); setDisplay(value); };
    const observer = new IntersectionObserver(entries => {
      if (started || !entries.some(entry => entry.isIntersecting)) return;
      started = true;
      observer.disconnect();
      if (motion.matches) return;
      const start = performance.now();
      setDisplay(0);
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .25 });
    const preference = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", preference);
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); motion.removeEventListener("change", preference); };
  }, [value, duration]);
  return <span ref={ref} className="count-up" data-count-final={value}><span aria-hidden="true" style={{ minWidth: `${final.length}ch` }}>{display.toLocaleString("en-MY")}{suffix}</span><span className="sr-only">{final}{suffix}</span></span>;
}
