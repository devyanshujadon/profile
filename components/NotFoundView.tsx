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
      <pre className="hidden">{markdown}</pre>
      <div className={framed ? "py-8 px-5 sm:px-7" : "px-5 sm:px-7 lg:px-9 py-16"}>
        <p className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-mark mb-4">
          404
        </p>
        <h1 className="font-display uppercase text-[clamp(2.5rem,8vw,5.5rem)] tracking-[-0.04em] leading-[0.88] text-ink mb-6">
          Page not found
        </h1>
        <p className="text-ink-2 mb-8 max-w-[36rem] leading-relaxed">
          That path does not exist. Agents and humans can recover from the
          links below.
        </p>
        <ul className="border-t border-ink max-w-[28rem]">
          {recovery.map((item) => (
            <li key={item.href} className="border-b border-ink">
              {item.href.startsWith("http") ? (
                <a
                  href={item.href}
                  className="block py-3 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink hover:text-mark transition-colors duration-150 cursor-pointer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="block py-3 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink hover:text-mark transition-colors duration-150 cursor-pointer"
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
  return <div className="site-shell min-h-[100dvh]">{inner}</div>;
}
