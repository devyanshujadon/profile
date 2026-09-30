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
    <article className="mx-auto max-w-[1120px] px-5 sm:px-8 py-16 md:py-20">
      <header className="max-w-[40rem]">
        <h1 className="text-[clamp(2.4rem,5vw,3.5rem)] font-medium tracking-[-0.035em] leading-[1.12] text-[#161616]">
          Developer resources
        </h1>
        <p className="mt-5 text-[17px] leading-[1.6] text-[#4a4a4a]">
          Public work, source, and machine-readable files for {SITE.name}. This
          is a personal portfolio. There is no public API, OpenAPI spec, auth
          flow, developer portal, or MCP server.
        </p>
      </header>

      <section className="mt-14 max-w-[40rem]">
        <h2 className="text-[1.7rem] font-medium tracking-[-0.03em] text-[#161616]">
          When to use this
        </h2>
        <ul className="mt-5 space-y-3 text-[16px] leading-relaxed text-[#4a4a4a]">
          <li>Look up Devyanshu&apos;s GitHub, products, or writing</li>
          <li>Contact or hire Devyanshu for AI and backend engineering</li>
          <li>
            Fetch markdown via{" "}
            <code className="font-mono text-[0.9em] text-[#161616]">
              Accept: text/markdown
            </code>{" "}
            or the <code className="font-mono text-[0.9em] text-[#161616]">.md</code> sibling
            of any page
          </li>
        </ul>
      </section>

      <section className="mt-14 max-w-[40rem]">
        <h2 className="text-[1.7rem] font-medium tracking-[-0.03em] text-[#161616]">
          Public work and source
        </h2>
        <ul className="mt-6 space-y-7">
          {DEVELOPER_RESOURCES.map((resource) => (
            <li key={resource.url}>
              <a
                href={resource.url}
                className="text-[17px] font-medium text-[#161616] underline decoration-[#ddd] underline-offset-4 hover:decoration-[#161616]"
                target={resource.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  resource.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {resource.name}
              </a>
              <p className="mt-2 text-[16px] leading-relaxed text-[#4a4a4a]">
                {resource.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 max-w-[40rem]">
        <h2 className="text-[1.7rem] font-medium tracking-[-0.03em] text-[#161616]">
          Machine-readable
        </h2>
        <ul className="mt-6 space-y-4">
          <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <a href="/llms.txt" className="font-mono text-[14px] text-[#161616] underline decoration-[#ddd] underline-offset-4">
              /llms.txt
            </a>
            <span className="text-[15px] text-[#5e5e5e]">
              Index and when-to-use guidance
            </span>
          </li>
          <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <a href="/sitemap.xml" className="font-mono text-[14px] text-[#161616] underline decoration-[#ddd] underline-offset-4">
              /sitemap.xml
            </a>
            <span className="text-[15px] text-[#5e5e5e]">Indexable URLs</span>
          </li>
          <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <a href="/developers.md" className="font-mono text-[14px] text-[#161616] underline decoration-[#ddd] underline-offset-4">
              /developers.md
            </a>
            <span className="text-[15px] text-[#5e5e5e]">This page as markdown</span>
          </li>
        </ul>
      </section>

      <section className="mt-14 max-w-[40rem]">
        <h2 className="text-[1.7rem] font-medium tracking-[-0.03em] text-[#161616]">
          Contact
        </h2>
        <a href={`mailto:${SITE.email}`} className="pill mt-5">
          Email
        </a>
        <p className="mt-4 break-all text-[15px] text-[#5e5e5e]">{SITE.email}</p>
      </section>
    </article>
  );
}
