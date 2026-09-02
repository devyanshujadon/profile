import Link from "next/link";
import { SITE, notFoundMarkdown } from "@/lib/site";

const recovery = [
  { href: "/", label: "Home" },
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/developers", label: "Devyanshu developer resources" },
  { href: SITE.blogUrl, label: "Journal" },
];

export default function NotFoundView({
  path = "/unknown",
  framed = false,
}: {
  path?: string;
  framed?: boolean;
}) {
  const markdown = notFoundMarkdown(path);

  const inner = (
    <>
      {/* Agent recovery copy (same body as the markdown 404). */}
      <pre className="hidden">{markdown}</pre>
      <div className={`mx-auto max-w-[38rem] ${framed ? "py-4" : "px-6 sm:px-8 py-16"}`}>
        <p className="label mb-4">404</p>
        <h1 className="font-display text-3xl tracking-tight text-ink mb-3">
          Page not found
        </h1>
        <p className="text-ink-2 mb-8 leading-relaxed">
          That path doesn&apos;t exist. Agents and humans can recover from the
          links below.
        </p>
        <ul className="space-y-2 text-[0.95rem]">
          {recovery.map((item) => (
            <li key={item.href}>
              {item.href.startsWith("http") ? (
                <a
                  href={item.href}
                  className="text-mark hover:text-ink transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-mark hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (framed) return inner;
  return <div className="site-shell min-h-screen">{inner}</div>;
}
