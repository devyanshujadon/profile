import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntryBySlug, listEntries } from "@/lib/cms";
import { markdownToHtml } from "@/lib/blog";

export const revalidate = 60;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const pages = await listEntries("page", { includeDrafts: false });
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await getEntryBySlug("page", slug);
    if (!page) return { title: "Page" };
    return {
      title: page.title,
      description: page.excerpt || undefined,
    };
  } catch {
    return { title: "Page" };
  }
}

async function resolveHtml(content: string, format: string): Promise<string> {
  if (!content) return "";
  if (format === "markdown") return markdownToHtml(content);
  if (format === "plain") {
    return `<p>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`;
  }
  return content;
}

export default async function CmsPage({ params }: Params) {
  const { slug } = await params;
  let page;
  try {
    page = await getEntryBySlug("page", slug);
  } catch {
    notFound();
  }
  if (!page || !page.published) notFound();

  const html = await resolveHtml(page.content, page.contentFormat);
  const wide = page.meta?.template === "wide";
  const minimal = page.meta?.template === "minimal";

  return (
    <article
      className={`mx-auto py-12 md:py-16 px-5 sm:px-7 ${
        wide ? "max-w-3xl" : "max-w-[40rem]"
      }`}
    >
      {!minimal && (
        <header className="mb-10 pb-8 border-b border-ink">
          <h1 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] leading-[0.92] text-ink">
            {page.title}
          </h1>
          {page.excerpt && (
            <p className="mt-4 text-ink-2 leading-relaxed">{page.excerpt}</p>
          )}
        </header>
      )}
      {minimal && (
        <h1 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] leading-[0.92] text-ink mb-8">
          {page.title}
        </h1>
      )}
      <div
        className="prose prose-neutral max-w-none text-ink-2 prose-headings:font-display prose-headings:text-ink prose-a:text-mark"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
