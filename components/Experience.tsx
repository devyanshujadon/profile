import React from "react";
import { EXPERIENCES as experiences } from "@/lib/site";

const Experience = () => {
  return (
    <section id="path" className="scroll-mt-16 bg-canvas">
      <div className="px-5 sm:px-7 lg:px-9 py-8 md:py-10 border-b border-ink">
        <h2 className="font-display uppercase text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.03em] text-ink">
          Path
        </h2>
      </div>
      <ul>
        {experiences.map((exp) => (
          <li
            key={exp.company + exp.role}
            className="px-5 sm:px-7 lg:px-9 py-8 border-b border-ink last:border-b-0"
          >
            <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
              {exp.period.replaceAll("—", "-")}
            </p>
            <h3 className="mt-3 font-display uppercase text-xl tracking-[-0.02em] text-ink">
              {exp.company}
            </h3>
            <p className="mt-1 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink-2">
              {exp.role}
            </p>
            <p className="mt-3 max-w-[32rem] text-[0.95rem] leading-relaxed text-ink-2">
              {exp.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Experience;
