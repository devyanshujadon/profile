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
      <div className={framed ? "mx-auto max-w-[1120px] px-5 sm:px-8 py-16" : "mx-auto max-w-[1120px] px-5 sm:px-8 py-20"}>
        <p className="text-[15px] text-[#5e5e5e]">404</p>
        <h1 className="mt-3 text-[clamp(2.4rem,6vw,4rem)] font-medium tracking-[-0.035em] leading-[1.1] text-[#161616]">
          Page not found
        </h1>
        <p className="mt-5 mb-8 max-w-[36rem] text-[17px] leading-[1.6] text-[#4a4a4a]">
          That path does not exist. Agents and humans can recover from the
          links below.
        </p>
        <ul className="flex max-w-[28rem] flex-col gap-3">
          {recovery.map((item) => (
            <li key={item.href}>
              {item.href.startsWith("http") ? (
                <a
                  href={item.href}
                  className="text-[16px] text-[#161616] underline decoration-[#ddd] underline-offset-4 hover:decoration-[#161616]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-[16px] text-[#161616] underline decoration-[#ddd] underline-offset-4 hover:decoration-[#161616]"
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
  return (
    <div className="theme-dots min-h-[100dvh]">
      <header className="dots-nav">
        <div className="dots-nav-inner">
          <Link href="/" className="dots-wordmark">
            Devyanshu
          </Link>
          <nav className="flex items-center gap-5" aria-label="Primary">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <a href={SITE.blogUrl} className="pill">
              Writing
            </a>
          </nav>
        </div>
      </header>
      {inner}
    </div>
  );
}
