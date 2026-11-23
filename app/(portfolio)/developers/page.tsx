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
    <article className="mx-auto max-w-[40rem] px-5 py-16">
      <header>
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] leading-[1.12] text-ink">
          Developer resources
        </h1>
        <p className="mt-5 text-ink-2 leading-relaxed">
          Public work, source, and machine-readable files for {SITE.name}. This
          is a personal portfolio. There is no public API, OpenAPI spec, auth
          flow, developer portal, or MCP server.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">When to use this</h2>
        <ul className="mt-4 space-y-3 text-ink-2 leading-relaxed">
          <li>Look up Devyanshu&apos;s GitHub, products, or writing</li>
          <li>Contact or hire Devyanshu for AI and backend engineering</li>
          <li>
            Fetch markdown via{" "}
            <code className="font-mono text-[0.92em] text-ink">
              Accept: text/markdown
            </code>{" "}
            or the <code className="font-mono text-[0.92em] text-ink">.md</code> sibling
            of any page
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">Public work and source</h2>
        <ul className="mt-4 space-y-6">
          {DEVELOPER_RESOURCES.map((resource) => (
            <li key={resource.url}>
              <a
                href={resource.url}
                className="font-bold text-ink underline underline-offset-4"
                target={resource.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  resource.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {resource.name}
              </a>
              <p className="mt-1 text-ink-2 leading-relaxed">
                {resource.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">Machine-readable</h2>
        <ul className="mt-4 space-y-4">
          <li>
            <a href="/llms.txt" className="font-mono text-sm text-ink underline underline-offset-4">
              /llms.txt
            </a>
            <p className="text-ink-2">Index and when-to-use guidance</p>
          </li>
          <li>
            <a href="/sitemap.xml" className="font-mono text-sm text-ink underline underline-offset-4">
              /sitemap.xml
            </a>
            <p className="text-ink-2">Indexable URLs</p>
          </li>
          <li>
            <a href="/developers.md" className="font-mono text-sm text-ink underline underline-offset-4">
              /developers.md
            </a>
            <p className="text-ink-2">This page as markdown</p>
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">Contact</h2>
        <a href={`mailto:${SITE.email}`} className="mt-4 inline-block font-bold text-ink underline underline-offset-4">
          {SITE.email}
        </a>
      </section>
    </article>
  );
}
