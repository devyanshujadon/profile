import React from "react";
import { ArrowUpRight } from "lucide-react";
import { loadProjects } from "@/lib/projects";

const Projects = async () => {
  const projects = await loadProjects();

  return (
    <section id="work" className="scroll-mt-8 pb-14 md:pb-16">
      <p className="label mb-8">Work</p>

      <div className="space-y-12 md:space-y-14">
        {projects.map((project) => (
          <article key={project.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-display text-[1.75rem] md:text-[2rem] tracking-tight text-ink">
                  {project.title}
                </h2>
                <span className="text-sm text-mark">{project.tag}</span>
              </div>
              <span className="font-mono text-xs text-ink-3">
                {project.year}
              </span>
            </div>

            <p className="text-[1.02rem] leading-[1.7] text-ink-2 max-w-[34rem]">
              {project.blurb}
            </p>

            {project.points.length > 0 && (
              <ul className="mt-5 space-y-1.5 max-w-[34rem]">
                {project.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-[0.95rem] text-ink-2 leading-relaxed"
                  >
                    <span className="text-ink-3 select-none" aria-hidden>
                      –
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {project.href && project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[0.95rem] text-mark hover:text-ink transition-colors"
                >
                  {project.linkLabel || project.href}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
              {project.stack && (
                <span className="font-mono text-[11px] text-ink-3">
                  {project.stack}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
