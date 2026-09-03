import React from "react";

const IdentityPanel = () => {
  return (
    <section className="border-b-2 border-ink px-5 sm:px-7 lg:px-9 pt-10 pb-12 md:pt-12 md:pb-16">
      <p className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-ink-3 mb-6">
        AI and backend engineer
      </p>
      <h1 className="font-display uppercase text-[clamp(2.6rem,12vw,7.25rem)] tracking-[-0.04em] leading-[0.88] text-ink">
        Devyanshu
        <br />
        Jadon
      </h1>
      <div className="rule-mark mt-6 mb-8" aria-hidden />
      <p className="max-w-[34ch] text-[1.05rem] leading-[1.55] text-ink-2">
        I design systems for production and ship products people use.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href="#contact" className="btn-primary">
          Contact
        </a>
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
      </div>
    </section>
  );
};

export default IdentityPanel;
