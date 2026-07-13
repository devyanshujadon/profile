import React from "react";

const Hero = () => {
  return (
    <section className="pb-20 md:pb-28">
      <p className="label mb-8">AI &amp; backend engineer</p>

      <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] font-medium tracking-[-0.03em] text-ink max-w-[14ch]">
        I build systems that hold, and products that earn their place.
      </h1>

      <p className="mt-8 prose-measure text-lg md:text-[1.2rem] leading-[1.65] text-ink-2">
        Currently an AI engineer by day. Recent projects include{" "}
        <a
          href="https://loomkit.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet"
        >
          LoomKit
        </a>
        , a tiny LLM orchestration core, and{" "}
        <a
          href="https://feedfr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet"
        >
          FeedFr
        </a>
        , feedback tooling for teams.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.95rem]">
        <a href="#work" className="btn-solid">
          Selected work
        </a>
        <a
          href="mailto:jadon.devyanshu@gmail.com"
          className="btn-line"
        >
          jadon.devyanshu@gmail.com
        </a>
      </div>
    </section>
  );
};

export default Hero;
