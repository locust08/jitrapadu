import type { HTMLAttributes } from "react";
import glyphs from "./icon-map.json";
export function FigmaIcon({ name, className = "", ...props }: HTMLAttributes<HTMLSpanElement> & { name: string }) {
  const glyph = (glyphs as Record<string, string>)[name];
  return <span {...props} aria-hidden="true" className={"figma-icon " + className}>{glyph || ""}</span>;
}
