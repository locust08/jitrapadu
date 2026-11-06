/* eslint-disable @next/next/no-img-element */
"use client";

import { FoldText } from "./FoldText";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { projectImages, type Project } from "../project-data";
import { portfolioOptions } from "../portfolio-options";
import "./project-gallery.css";

const GalleryContext = createContext<((project: Project) => void) | null>(null);

export function useProjectGallery() {
  const open = useContext(GalleryContext);
  if (!open) throw new Error("Project cards need a ProjectGalleryProvider");
  return open;
}

export function ProjectGalleryProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const images = selected ? projectImages(selected) : [];
  const open = (project: Project) => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIndex(0);
    setSelected(project);
  };
  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [selected]);
  const close = () => dialog.current?.close();
  const move = (step: number) => setIndex(current => (current + step + images.length) % images.length);

  return <GalleryContext.Provider value={open}>
    {children}
    <dialog ref={dialog} className="project-gallery" aria-labelledby="project-dialog-title"
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onClose={() => { setSelected(null); opener.current?.focus(); }}
      onKeyDown={event => {
        if (images.length < 2) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
      {selected && <>
        <button type="button" className="project-gallery-close" aria-label="Close project" onClick={close} autoFocus><X size={24} /></button>
        <div className="project-gallery-layout">
          <div className="project-gallery-media">
            <div className="project-gallery-stage">
              <img className="project-gallery-photo" src={images[index].src} alt={images[index].alt} />
              {images.length > 1 && <div className="project-gallery-controls">
                <button type="button" onClick={() => move(-1)} aria-label="Previous project image"><ArrowLeft size={22} /></button>
                <p role="status" aria-live="polite">Image {index + 1} of {images.length}</p>
                <button type="button" onClick={() => move(1)} aria-label="Next project image"><ArrowRight size={22} /></button>
              </div>}
            </div>
            {images.length > 1 && <div className="project-gallery-thumbnails" aria-label="Choose project image">
              {images.map((image, i) => <button key={image.src} type="button" aria-label={`Show project image ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)}><img src={image.src} alt="" /></button>)}
            </div>}
          </div>
          <div className="project-gallery-copy">
            <p className="project-gallery-category">{portfolioOptions.find(option => option.id === selected.category)?.label}</p>
            <h2 id="project-dialog-title"><FoldText>{selected.title}</FoldText></h2>
            <dl><div><dt>Location</dt><dd>{selected.location}</dd></div><div><dt>Structure</dt><dd>{selected.description}</dd></div></dl>
            <Link href="/contact-us" onClick={close}>Discuss a similar project<ArrowRight size={18} /></Link>
          </div>
        </div>
      </>}
    </dialog>
  </GalleryContext.Provider>;
}
