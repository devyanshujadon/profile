import React from "react";
import { Github, Linkedin } from "lucide-react";

const nav = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#path", label: "Path", index: "02" },
  { href: "#tools", label: "Tools", index: "03" },
];

const IdentityPanel = () => {
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:max-h-screen flex flex-col justify-between py-10 lg:py-14 lg:pr-10 xl:pr-12 lg:-ml-2 lg:pl-2">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-7">
          <p className="label">Portfolio</p>
          <span className="status-pill">Open to work</span>
        </div>

        <h1 className="font-display text-[2.15rem] sm:text-[2.5rem] tracking-[-0.03em] text-ink leading-[1.05]">
          Devyanshu
          <br />
          <span className="text-ink-2">Jadon</span>
        </h1>

        <p className="mt-6 text-[0.98rem] leading-[1.7] text-ink-2 max-w-[21rem]">
          AI &amp; backend engineer. I design systems for production and ship
          products people use.
        </p>

        <p className="mt-4 text-sm text-ink-3 max-w-[18rem] leading-relaxed">
          India · Remote
        </p>

        <nav
          className="mt-11 hidden lg:flex flex-col gap-3"
          aria-label="On this page"
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="nav-item w-fit">
              <span className="nav-index">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <nav
          className="mt-8 flex lg:hidden flex-wrap gap-x-1 gap-y-2"
          aria-label="On this page"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 hover:text-mark transition-colors px-2.5 py-1 rounded-full bg-panel/80 border border-line"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-12 lg:mt-0 space-y-5 pt-8 lg:pt-0 border-t lg:border-t-0 border-line">
        <a
          href="mailto:jadon.devyanshu@gmail.com"
          className="block text-[0.95rem] font-medium text-mark hover:text-ink transition-colors break-all"
        >
          jadon.devyanshu@gmail.com
        </a>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-3">
          <a
            href="https://github.com/devyanshujadon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-mark transition-colors"
          >
            <Github size={14} strokeWidth={1.75} />
            GitHub
          </a>
          <span className="text-ink-3/40" aria-hidden>
            ·
          </span>
          <a
            href="https://linkedin.com/in/devyanshu-jadon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-mark transition-colors"
          >
            <Linkedin size={14} strokeWidth={1.75} />
            LinkedIn
          </a>
          <span className="text-ink-3/40" aria-hidden>
            ·
          </span>
          <a
            href="https://blog.devyanshu.com"
            className="hover:text-mark transition-colors"
          >
            Writing
          </a>
        </div>

        <p className="hidden lg:block text-xs text-ink-3/80 pt-1">
          © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
};

export default IdentityPanel;
