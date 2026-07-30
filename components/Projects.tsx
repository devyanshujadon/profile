import React from "react";
import { ArrowUpRight } from "lucide-react";
import { getPublishedProjects, type CmsEntry } from "@/lib/cms";

type ProjectView = {
  title: string;
  tag: string;
  year: string;
  blurb: string;
  points: string[];
  href: string;
  linkLabel: string;
  stack: string;
};

/** Fallback when the CMS has no published projects yet. */
const FALLBACK_PROJECTS: ProjectView[] = [
  {
    title: "LoomKit",
    tag: "Featured",
    year: "2026",
    blurb:
      "Tiny, swappable LLM orchestration core — the seam under your agent harness, without LangChain-scale bloat. A Protocol, a few dataclasses, one optional provider.",
    points: [
      "Provider Protocol — swap backends without inheritance",
      "Small Message · Response · Usage surface",
      "Gemini out of the box; core stays zero-deps",
      "Ready to layer streaming, tools, and agents",
    ],
    href: "https://loomkit.vercel.app/",
    linkLabel: "loomkit.vercel.app",
    stack: "Python",
  },
  {
    title: "FeedFr",
    tag: "Live",
    year: "2026",
    blurb:
      "User feedback that ships. Collect ideas, prioritize with votes, show what's planned, and announce what landed — without enterprise pricing or clutter.",
    points: [
      "Public feedback boards with voting",
      "Roadmaps and changelogs that close the loop",
      "Embeddable widget for in-product capture",
      "Free forever tier — paid when you outgrow it",
    ],
    href: "https://feedfr.com",
    linkLabel: "feedfr.com",
    stack: "Next.js · PostgreSQL",
  },
];

function entryToProject(entry: CmsEntry): ProjectView {
  const m = entry.meta || {};
  return {
    title: entry.title,
    tag: String(m.tag || (entry.featured ? "Featured" : "Live")),
    year: String(m.year || entry.date.slice(0, 4)),
    blurb: entry.excerpt || "",
    points: Array.isArray(m.points)
      ? m.points.map(String)
      : [],
    href: String(m.href || "#"),
    linkLabel:
      String(m.linkLabel || "") ||
      String(m.href || "").replace(/^https?:\/\//, ""),
    stack: String(m.stack || ""),
  };
}

async function loadProjects(): Promise<ProjectView[]> {
  try {
    const entries = await getPublishedProjects();
    if (entries.length > 0) {
      return entries.map(entryToProject);
    }
  } catch (err) {
    console.error("Failed to load CMS projects, using fallback:", err);
  }
  return FALLBACK_PROJECTS;
}

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
