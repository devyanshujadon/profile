import Link from "next/link";
import { SITE, notFoundMarkdown } from "@/lib/site";

export default function NotFound() {
  const markdown = notFoundMarkdown("/unknown");

  return (
    <div className="mx-auto max-w-[40rem] py-16">
      <pre className="hidden">{markdown}</pre>
      <p className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-mark mb-4">
        404
      </p>
      <h1 className="font-display uppercase text-[clamp(2.25rem,7vw,4.5rem)] tracking-[-0.04em] leading-[0.88] text-ink mb-6">
        Page not found
      </h1>
      <p className="text-ink-2 mb-8 max-w-[32rem] leading-relaxed">
        That entry does not exist or has been moved.
      </p>
      <ul className="border-t border-ink max-w-[28rem]">
        <li className="border-b border-ink">
          <Link href="/" className="block py-3 nav-link">
            Back to journal
          </Link>
        </li>
        <li className="border-b border-ink">
          <a href={`${SITE.blogUrl}/sitemap.xml`} className="block py-3 nav-link">
            Journal sitemap
          </a>
        </li>
        <li className="border-b border-ink">
          <a href={`${SITE.url}/llms.txt`} className="block py-3 nav-link">
            llms.txt
          </a>
        </li>
        <li className="border-b border-ink">
          <a href={`${SITE.url}/developers`} className="block py-3 nav-link">
            Devyanshu developer resources
          </a>
        </li>
      </ul>
    </div>
  );
}
