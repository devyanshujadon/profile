import Link from "next/link";
import { SITE, notFoundMarkdown } from "@/lib/site";
import { journalPrefix } from "@/lib/journal-path";

export default async function NotFound() {
  const markdown = notFoundMarkdown("/unknown");
  const prefix = await journalPrefix();

  return (
    <div className="mx-auto max-w-[40rem]">
      <pre className="hidden">{markdown}</pre>
      <p className="kicker">404</p>
      <h1>Page not found</h1>
      <p className="mt-4 text-ink-2 max-w-[32rem] leading-relaxed">
        That entry does not exist or has been moved.
      </p>
      <div className="journal-list mt-8">
        <Link href={prefix || "/"} className="journal-card">Back to journal</Link>
        <a href={`${SITE.blogUrl}/sitemap.xml`} className="journal-card">Journal sitemap</a>
        <a href={`${SITE.url}/llms.txt`} className="journal-card">llms.txt</a>
        <a href={`${SITE.url}/developers`} className="journal-card">Devyanshu developer resources</a>
      </div>
    </div>
  );
}
