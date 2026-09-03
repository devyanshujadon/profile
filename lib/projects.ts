import { getPublishedProjects, type CmsEntry } from "@/lib/cms";

export type ProjectView = {
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
export const FALLBACK_PROJECTS: ProjectView[] = [
  {
    title: "LoomKit",
    tag: "Featured",
    year: "2026",
    blurb:
      "Tiny, swappable LLM orchestration core. The seam under your agent harness, without LangChain-scale bloat. A Protocol, a few dataclasses, one optional provider.",
    points: [
      "Provider Protocol: swap backends without inheritance",
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
      "User feedback that ships. Collect ideas, prioritize with votes, show what's planned, and announce what landed, without enterprise pricing or clutter.",
    points: [
      "Public feedback boards with voting",
      "Roadmaps and changelogs that close the loop",
      "Embeddable widget for in-product capture",
      "Free forever tier, paid when you outgrow it",
    ],
    href: "https://feedfr.com",
    linkLabel: "feedfr.com",
    stack: "Next.js · PostgreSQL",
  },
];

export function entryToProject(entry: CmsEntry): ProjectView {
  const m = entry.meta || {};
  return {
    title: entry.title,
    tag: String(m.tag || (entry.featured ? "Featured" : "Live")),
    year: String(m.year || entry.date.slice(0, 4)),
    blurb: entry.excerpt || "",
    points: Array.isArray(m.points) ? m.points.map(String) : [],
    href: String(m.href || "#"),
    linkLabel:
      String(m.linkLabel || "") ||
      String(m.href || "").replace(/^https?:\/\//, ""),
    stack: String(m.stack || ""),
  };
}

export async function loadProjects(): Promise<ProjectView[]> {
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
