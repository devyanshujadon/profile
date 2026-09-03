import React from "react";
import { loadProjects } from "@/lib/projects";

const Projects = async () => {
  const projects = await loadProjects();

  return (
    <section id="work" className="scroll-mt-16">
      <div className="border-b border-ink px-5 sm:px-7 lg:px-9 py-8 md:py-10">
        <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-ink">
          Work
        </h2>
      </div>

      <div className="bg-ink">
        {projects.map((project, index) => {
          const n = String(index + 1).padStart(2, "0");
          const hasLink = Boolean(project.href && project.href !== "#");

          return (
            <article
              key={project.title}
              className="grid grid-cols-1 md:grid-cols-[11rem_minmax(0,1fr)] bg-canvas border-b border-ink"
            >
              <div className="px-5 sm:px-7 lg:px-9 py-8 md:py-10 md:border-r border-ink flex flex-col gap-3">
                <p className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-ink-3">
                  [ {n} ]
                </p>
                <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink">
                  {project.year}
                </p>
                {project.stack && (
                  <p className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-ink-3">
                    {project.stack}
                  </p>
                )}
                <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-mark">
                  {project.tag}
                </p>
              </div>

              <div className="px-5 sm:px-7 lg:px-9 py-8 md:py-10">
                <h3 className="font-display uppercase text-[clamp(1.6rem,3.2vw,2.35rem)] tracking-[-0.03em] text-ink">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-[40rem] text-[1rem] leading-[1.65] text-ink-2">
                  {project.blurb}
                </p>

                {project.points.length > 0 && (
                  <ul className="mt-6 max-w-[40rem] border-t border-ink">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="border-b border-ink py-2.5 text-[0.95rem] leading-relaxed text-ink-2"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {hasLink && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.1em] uppercase text-ink hover:text-mark transition-colors duration-150 cursor-pointer"
                  >
                    {project.linkLabel || project.href}
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
