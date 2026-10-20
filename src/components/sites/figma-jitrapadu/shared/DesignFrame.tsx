"use client";
import { useRef, type ReactNode } from "react";
import { PageMotion } from "./PageMotion";
export function DesignFrame({ children, height, page }: { children: ReactNode; height: number; page: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return <main ref={ref} className={"design-frame page-" + page} data-source-height={height}>{children}<PageMotion root={ref} /></main>;
}

