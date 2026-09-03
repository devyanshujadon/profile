import type { Metadata } from "next";
import { DEVELOPER_RESOURCES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Devyanshu developer resources",
  description:
    "Developer resources for Devyanshu Jadon: GitHub, LoomKit, FeedFr, journal, llms.txt, and sitemap. Personal site; no public API or MCP server.",
  alternates: {
    canonical: "/developers",
    types: {
      "text/markdown": "/developers.md",
    },
  },
};

export default function DevelopersPage() {
  return (
    <article className="px-5 sm:px-7 lg:px-9 py-12 md:py-16 max-w-[52rem]">
      <header className="mb-12 pb-10 border-b border-ink">
        <h1 className="font-display uppercase text-[clamp(2.25rem,6vw,4.5rem)] tracking-[-0.04em] leading-[0.9] text-ink">
          Developer resources
        </h1>
        <p className="mt-6 max-w-[40rem] text-ink-2 leading-relaxed">
          Public work, source, and machine-readable files for {SITE.name}. This
          is a personal portfolio. There is no public API, OpenAPI spec, auth
          flow, developer portal, or MCP server.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="font-display uppercase text-2xl tracking-[-0.02em] text-ink mb-5">
          When to use this
        </h2>
        <ul className="border-t border-ink">
          <li className="border-b border-ink py-3 text-ink-2">
            Look up Devyanshu&apos;s GitHub, products, or writing
          </li>
          <li className="border-b border-ink py-3 text-ink-2">
            Contact or hire Devyanshu for AI and backend engineering
          </li>
          <li className="border-b border-ink py-3 text-ink-2">
            Fetch markdown via{" "}
            <code className="font-mono text-[0.85em] bg-canvas-2 px-1">
              Accept: text/markdown
            </code>{" "}
            or the <code className="font-mono text-[0.85em]">.md</code> sibling
            of any page
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-display uppercase text-2xl tracking-[-0.02em] text-ink mb-5">
          Public work and source
        </h2>
        <ul className="border-t border-ink">
          {DEVELOPER_RESOURCES.map((resource) => (
            <li key={resource.url} className="border-b border-ink py-5">
              <a
                href={resource.url}
                className="font-mono text-[0.78rem] tracking-[0.08em] uppercase text-ink hover:text-mark transition-colors duration-150 cursor-pointer"
                target={resource.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  resource.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {resource.name}
                {resource.url.startsWith("http") ? " ↗" : ""}
              </a>
              <p className="mt-2 text-[0.95rem] text-ink-2 leading-relaxed max-w-[40rem]">
                {resource.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-display uppercase text-2xl tracking-[-0.02em] text-ink mb-5">
          Machine-readable
        </h2>
        <ul className="border-t border-ink font-mono text-[0.78rem] tracking-[0.06em] uppercase">
          <li className="border-b border-ink py-3 flex flex-col sm:flex-row sm:gap-4">
            <a href="/llms.txt" className="text-ink hover:text-mark cursor-pointer">
              /llms.txt
            </a>
            <span className="text-ink-3 normal-case tracking-normal font-body text-[0.9rem]">
              Index and when-to-use guidance
            </span>
          </li>
          <li className="border-b border-ink py-3 flex flex-col sm:flex-row sm:gap-4">
            <a
              href="/sitemap.xml"
              className="text-ink hover:text-mark cursor-pointer"
            >
              /sitemap.xml
            </a>
            <span className="text-ink-3 normal-case tracking-normal font-body text-[0.9rem]">
              Indexable URLs
            </span>
          </li>
          <li className="border-b border-ink py-3 flex flex-col sm:flex-row sm:gap-4">
            <a
              href="/developers.md"
              className="text-ink hover:text-mark cursor-pointer"
            >
              /developers.md
            </a>
            <span className="text-ink-3 normal-case tracking-normal font-body text-[0.9rem]">
              This page as markdown
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display uppercase text-2xl tracking-[-0.02em] text-ink mb-4">
          Contact
        </h2>
        <a
          href={`mailto:${SITE.email}`}
          className="font-display uppercase text-xl tracking-[-0.02em] text-mark hover:text-ink transition-colors duration-150 cursor-pointer break-all"
        >
          {SITE.email}
        </a>
      </section>
    </article>
  );
}
