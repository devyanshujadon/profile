import Link from "next/link";
import { SITE, notFoundMarkdown } from "@/lib/site";

export default function NotFound() {
  const markdown = notFoundMarkdown("/unknown");

  return (
    <div className="mx-auto max-w-[38rem] py-16">
      <pre className="hidden">{markdown}</pre>
      <p className="label mb-4">404</p>
      <h1 className="font-display text-3xl tracking-tight text-ink mb-3">
        Page not found
      </h1>
      <p className="text-ink-2 mb-8">
        That entry doesn&apos;t exist or has been moved.
      </p>
      <ul className="space-y-2 text-[0.95rem] mb-8">
        <li>
          <Link href="/" className="text-mark hover:text-ink transition-colors">
            ← Back to journal
          </Link>
        </li>
        <li>
          <a
            href={`${SITE.blogUrl}/sitemap.xml`}
            className="text-mark hover:text-ink transition-colors"
          >
            Journal sitemap
          </a>
        </li>
        <li>
          <a
            href={`${SITE.url}/llms.txt`}
            className="text-mark hover:text-ink transition-colors"
          >
            llms.txt
          </a>
        </li>
        <li>
          <a
            href={`${SITE.url}/developers`}
            className="text-mark hover:text-ink transition-colors"
          >
            Devyanshu developer resources
          </a>
        </li>
      </ul>
    </div>
  );
}
