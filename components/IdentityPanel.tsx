import React from "react";
import { Github, Linkedin } from "lucide-react";

const nav = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#path", label: "Path", index: "02" },
  { href: "#tools", label: "Tools", index: "03" },
  { href: "#contact", label: "Contact", index: "04" },
];

const IdentityPanel = () => {
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:max-h-screen flex flex-col justify-between py-10 lg:py-14">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
          <p className="label">Portfolio</p>
          <span className="status-pill">Open to work</span>
        </div>

        <h1 className="font-display text-[2.25rem] sm:text-[2.5rem] tracking-tight text-ink leading-[1.1]">
          Devyanshu
          <br />
          Jadon
        </h1>

        <p className="mt-5 text-[0.98rem] leading-[1.7] text-ink-2 max-w-[20rem]">
          AI &amp; backend engineer. I design systems for production and ship
          products people use.
        </p>

        <p className="mt-3 text-sm text-ink-3">India · Remote</p>

        <nav
          className="mt-10 hidden lg:flex flex-col gap-2.5"
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
          className="mt-7 flex lg:hidden flex-wrap gap-x-4 gap-y-2"
          aria-label="On this page"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 hover:text-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-12 lg:mt-0 space-y-4 pt-8 lg:pt-0 border-t lg:border-t-0 border-line">
        <a
          href="mailto:jadon.devyanshu@gmail.com"
          className="block text-[0.95rem] text-mark hover:text-ink transition-colors break-all"
        >
          jadon.devyanshu@gmail.com
        </a>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-3">
          <a
            href="https://github.com/devyanshujadon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <Github size={14} strokeWidth={1.75} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/devyanshu-jadon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <Linkedin size={14} strokeWidth={1.75} />
            LinkedIn
          </a>
          <a
            href="https://blog.devyanshu.com"
            className="hover:text-ink transition-colors"
          >
            Writing
          </a>
        </div>

        <p className="hidden lg:block text-xs text-ink-3 pt-2">
          © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
};

export default IdentityPanel;
