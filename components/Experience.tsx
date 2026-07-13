import React from "react";

const experiences = [
  {
    role: "AI Engineer",
    company: "Tudip Technologies",
    period: "2025 — Present",
    detail:
      "Intelligent pipelines and LLM integrations for enterprise applications.",
  },
  {
    role: "Z Ambassador",
    company: "IBMz",
    period: "2020 — 2022",
    detail: "Enterprise computing advocacy and technical workshops.",
  },
];

const Experience = () => {
  return (
    <section id="path" className="scroll-mt-8 py-14 md:py-16 border-t border-line">
      <p className="label mb-8">Path</p>

      <ul className="space-y-1">
        {experiences.map((exp) => (
          <li
            key={exp.company + exp.role}
            className="row-hover grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-1 sm:gap-6 px-3 sm:px-4 py-4 -mx-3 sm:-mx-4"
          >
            <p className="font-mono text-xs text-ink-3 sm:pt-1.5">
              {exp.period}
            </p>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <h3 className="font-display text-lg tracking-tight text-ink">
                  {exp.company}
                </h3>
                <span className="text-sm text-ink-3">· {exp.role}</span>
              </div>
              <p className="mt-1 text-ink-2 leading-relaxed max-w-[32rem] text-[0.95rem]">
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
