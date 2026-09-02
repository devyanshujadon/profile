import type { Metadata } from "next";
import { DEVELOPER_RESOURCES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Devyanshu developer resources",
  description:
    "Developer resources for Devyanshu Jadon — GitHub, LoomKit, FeedFr, journal, llms.txt, and sitemap. Personal site; no public API or MCP server.",
  alternates: {
    canonical: "/developers",
    types: {
      "text/markdown": "/developers.md",
    },
  },
};

export default function DevelopersPage() {
  return (
    <article className="mx-auto max-w-[38rem] py-4">
      <header className="mb-10">
        <p className="label mb-4">Developers</p>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
          Devyanshu developer resources
        </h1>
        <p className="mt-4 text-ink-2 leading-relaxed">
          Public work, source, and machine-readable files for{" "}
          {SITE.name}. This is a personal portfolio — there is no public
          API, OpenAPI spec, auth flow, developer portal, or MCP server.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="font-display text-xl tracking-tight text-ink mb-4">
          When to use this
        </h2>
        <ul className="space-y-2 text-[0.95rem] text-ink-2 leading-relaxed">
          <li>Look up Devyanshu&apos;s GitHub, products, or writing</li>
          <li>Contact or hire Devyanshu for AI and backend engineering</li>
          <li>
            Fetch markdown via{" "}
            <code className="font-mono text-[0.85em] bg-canvas-2 px-1 rounded">
              Accept: text/markdown
            </code>{" "}
            or the <code className="font-mono text-[0.85em]">.md</code> sibling
            of any page
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-xl tracking-tight text-ink mb-5">
          Public work and source
        </h2>
        <ul className="space-y-5">
          {DEVELOPER_RESOURCES.map((resource) => (
            <li key={resource.url}>
              <a
                href={resource.url}
                className="text-mark hover:text-ink transition-colors"
                target={
                  resource.url.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  resource.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {resource.name}
              </a>
              <p className="mt-1 text-[0.95rem] text-ink-2 leading-relaxed">
                {resource.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-xl tracking-tight text-ink mb-5">
          Machine-readable
        </h2>
        <ul className="space-y-3 text-[0.95rem] text-ink-2">
          <li>
            <a href="/llms.txt" className="text-mark hover:text-ink">
              /llms.txt
            </a>
            <span> — index and when-to-use guidance</span>
          </li>
          <li>
            <a href="/sitemap.xml" className="text-mark hover:text-ink">
              /sitemap.xml
            </a>
            <span> — indexable URLs</span>
          </li>
          <li>
            <a href="/developers.md" className="text-mark hover:text-ink">
              /developers.md
            </a>
            <span> — this page as markdown</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink mb-3">
          Contact
        </h2>
        <a
          href={`mailto:${SITE.email}`}
          className="text-mark hover:text-ink transition-colors"
        >
          {SITE.email}
        </a>
      </section>
    </article>
  );
}
