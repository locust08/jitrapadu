/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";
import type { Project } from "../project-data";
import "./project-card.css";

export function ProjectCard({ project, onView }: { project: Project; onView?: () => void }) {
  return <article className="project-card" data-card data-reveal>
    <div className="project-card-image"><img data-card-image src={project.image} alt={project.description + " at " + project.title} /></div>
    <p className="project-card-tag">{project.description}</p>
    <h3 className="project-card-heading">{project.title}</h3>
    {onView && <><span className="project-card-cta" aria-hidden="true">View Project <ArrowRight size={18} /></span><button className="project-card-open" type="button" onClick={onView} aria-label={`View project: ${project.title}`} /></>}
  </article>;
}
