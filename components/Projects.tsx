import React from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "LoomKit",
    tag: "Featured",
    year: "2025",
    blurb:
      "Tiny, swappable LLM orchestration core — the seam under your agent harness, without LangChain-scale bloat. A Protocol, a few dataclasses, one optional provider.",
    points: [
      "Provider Protocol — swap backends without inheritance or registration",
      "Small Message · Response · Usage surface for chat-style generation",
      "Gemini out of the box; core package stays zero-deps",
      "Built to layer streaming, tools, retries, and agents later",
    ],
    href: "https://loomkit.vercel.app/",
    linkLabel: "Visit loomkit.vercel.app",
    stack: "Python · pip install loomkit",
  },
  {
    title: "FeedFr",
    tag: "Live",
    year: "2025",
    blurb:
      "User feedback that ships. Collect ideas, prioritize with votes, show what's planned, and announce what landed — without enterprise pricing or clutter.",
    points: [
      "Public feedback boards with voting",
      "Roadmaps and changelogs that close the loop",
      "Embeddable widget for in-product capture",
      "Free forever tier — paid when you outgrow it",
    ],
    href: "https://feedfr.com",
    linkLabel: "Visit feedfr.com",
    stack: "Next.js · TypeScript · PostgreSQL",
  },
];

const Projects = () => {
  return (
    <section id="work" className="scroll-mt-8 pb-14 md:pb-16">
      <p className="label mb-6">Work</p>

      <div className="space-y-6 md:space-y-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="surface-card p-6 sm:p-8 md:p-9"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-display text-3xl md:text-[2.5rem] tracking-tight text-ink">
                  {project.title}
                </h2>
                <span className="text-sm text-mark font-medium">
                  {project.tag}
                </span>
              </div>
              <span className="font-mono text-xs text-ink-3">
                {project.year}
              </span>
            </div>

            <p className="text-lg md:text-[1.15rem] leading-[1.7] text-ink-2 max-w-[36rem]">
              {project.blurb}
            </p>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-[40rem]">
              {project.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[0.92rem] text-ink-2 leading-relaxed"
                >
                  <span
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-mark"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[0.98rem] font-medium text-mark hover:text-ink transition-colors"
              >
                {project.linkLabel}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <span className="font-mono text-[11px] tracking-wide text-ink-3">
                {project.stack}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
