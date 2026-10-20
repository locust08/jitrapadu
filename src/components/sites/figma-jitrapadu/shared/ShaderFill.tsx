/// <reference types="@webgpu/types" />
"use client";
import { useEffect, useRef } from "react";
type ShaderFrame = {
  state: Record<string, unknown>;
  params: Record<string, unknown>;
  output: { width: number; height: number; format: GPUTextureFormat; createView: () => GPUTextureView };
};
type Shader = {
  setup: (device: GPUDevice, frame: ShaderFrame) => void;
  render: (device: GPUDevice, frame: ShaderFrame) => void;
  params: Record<string, unknown>;
  manifest: { name: string; isAnimated: boolean };
};
export function ShaderFill({ className = "", shader }: { className?: string; shader: Shader }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // The supplied pattern is static. Keep it visible on browsers without WebGPU.
    const canvas = fallbackRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    canvas.style.visibility = "visible";
    const params = shader.params as { ringCount: number; falloff: number; inverseFalloff: boolean; offset: number; transform: { x: number; y: number; radius: number }; color: { r: number; g: number; b: number; a: number } };
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      context.scale(ratio, ratio);
      const { transform, color } = params;
      const unit = rect.height * transform.radius / 50;
      if (!unit) return;
      const step = unit / params.ringCount;
      const x = rect.width * transform.x / 100;
      const y = rect.height * transform.y / 100;
      const extent = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
      context.strokeStyle = `rgb(${color.r * 255} ${color.g * 255} ${color.b * 255})`;
      context.lineWidth = step / 2;
      for (let index = 0; index < Math.ceil(extent / step) + 1; index++) {
        const distance = (index + .25 + 1 - params.offset) / params.ringCount;
        const fade = Math.exp(-distance * params.falloff);
        context.globalAlpha = color.a * (params.inverseFalloff ? 1 - fade : fade);
        context.beginPath();
        context.arc(x, y, distance * unit, 0, Math.PI * 2);
        context.stroke();
      }
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => observer.disconnect();
  }, [shader]);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !navigator.gpu) return;
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let device: GPUDevice | undefined;
    async function initialize() {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter || cancelled || !canvas) return;
      device = await adapter.requestDevice();
      if (cancelled) { device.destroy(); return; }
      canvas.style.visibility = "visible";
      void device.lost.then(() => {
        if (cancelled) return;
        observer?.disconnect();
        canvas.style.visibility = "hidden";
        if (fallbackRef.current) fallbackRef.current.style.visibility = "visible";
      });
      const context = canvas.getContext("webgpu");
      if (!context) return;
      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({ device, format, alphaMode: "premultiplied" });
      const frame: ShaderFrame = {
        state: {}, params: shader.params,
        output: { width: 1, height: 1, format, createView: () => context.getCurrentTexture().createView() },
      };
      shader.setup(device, frame);
      const draw = () => {
        if (!device || cancelled) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.round(rect.width * devicePixelRatio));
        canvas.height = Math.max(1, Math.round(rect.height * devicePixelRatio));
        frame.output.width = canvas.width;
        frame.output.height = canvas.height;
        shader.render(device, frame);
        if (fallbackRef.current) fallbackRef.current.style.visibility = "hidden";
      };
      observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    }
    initialize().catch(() => {});
    return () => { cancelled = true; observer?.disconnect(); device?.destroy(); };
  }, [shader]);
  return <><canvas ref={fallbackRef} className={className + " shader-fill"} aria-hidden="true" /><canvas ref={ref} className={className + " shader-fill"} aria-hidden="true" /></>;
}

