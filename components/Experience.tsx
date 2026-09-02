import React from "react";
import { EXPERIENCES as experiences } from "@/lib/site";

const Experience = () => {
  return (
    <section id="path" className="scroll-mt-8 py-14 md:py-16 border-t border-line">
      <p className="label mb-8">Path</p>

      <ul className="space-y-8">
        {experiences.map((exp) => (
          <li
            key={exp.company + exp.role}
            className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6"
          >
            <p className="font-mono text-xs text-ink-3 sm:pt-1.5">
              {exp.period}
            </p>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-display text-lg tracking-tight text-ink">
                  {exp.company}
                </h3>
                <span className="text-sm text-ink-3">· {exp.role}</span>
              </div>
              <p className="mt-1 text-[0.95rem] text-ink-2 leading-relaxed max-w-[30rem]">
                {exp.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Experience;
