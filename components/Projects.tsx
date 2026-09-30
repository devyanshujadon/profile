import React from "react";
import Stage, { type StageTone } from "@/components/Stage";
import { loadProjects } from "@/lib/projects";

const tones: StageTone[] = ["blush", "mint", "butter", "lilac", "sky"];

const Projects = async () => {
  const projects = await loadProjects();

  return (
    <section id="work" className="scroll-mt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-[-0.03em] leading-[1.15] text-[#161616]">
          Work
        </h2>

        <div className="mt-8 flex flex-col gap-8 md:gap-10">
          {projects.map((project, index) => {
            const hasLink = Boolean(project.href && project.href !== "#");
            const tone = tones[index % tones.length];

            return (
              <article key={project.title}>
                <Stage tone={tone}>
                  <p className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium text-[#5e5e5e]">
                    <span>{project.year}</span>
                    <span>{project.tag}</span>
                    {project.stack ? <span>{project.stack}</span> : null}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.25rem)] font-medium tracking-[-0.03em] leading-[1.15] text-[#161616]">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-[40rem] text-[17px] leading-[1.6] text-[#4a4a4a]">
                    {project.blurb}
                  </p>
                  {project.points.length > 0 && (
                    <ul className="mt-5 max-w-[40rem] space-y-2">
                      {project.points.map((point) => (
                        <li key={point} className="text-[16px] leading-relaxed text-[#4a4a4a]">
                          <span className="mr-2 text-[#5e5e5e]" aria-hidden>
                            -
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  {hasLink && (
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill"
                      >
                        Visit
                      </a>
                      {project.linkLabel ? (
                        <span className="text-[14px] text-[#5e5e5e]">{project.linkLabel}</span>
                      ) : null}
                    </div>
                  )}
                </Stage>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
