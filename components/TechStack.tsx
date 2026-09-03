import React from "react";
import { TOOLS as lines } from "@/lib/site";

const TechStack = () => {
  return (
    <section id="tools" className="scroll-mt-16 bg-canvas border-t border-ink lg:border-t-0 lg:border-l">
      <div className="px-5 sm:px-7 lg:px-9 py-8 md:py-10 border-b border-ink">
        <h2 className="font-display uppercase text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.03em] text-ink">
          Tools
        </h2>
      </div>
      <dl>
        {lines.map(([title, items]) => (
          <div
            key={title}
            className="px-5 sm:px-7 lg:px-9 py-6 border-b border-ink last:border-b-0"
          >
            <dt className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-ink-3">
              {title}
            </dt>
            <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
              {items}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TechStack;
