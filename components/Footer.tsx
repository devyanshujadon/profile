import React from "react";

const Footer = () => {
  return (
    <footer className="site-foot">
      <p className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-ink-3">
        © {new Date().getFullYear()} Devyanshu Jadon
      </p>
      <nav
        className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1"
        aria-label="Footer"
      >
        <a
          href="https://github.com/devyanshujadon"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/devyanshu-jadon"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          LinkedIn
        </a>
        <a href="https://blog.devyanshu.com" className="nav-highlight">
          Writing
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
