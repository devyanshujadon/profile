import React from "react";
import { EXPERIENCES as experiences } from "@/lib/site";

const Experience = () => {
  return (
    <section id="path" className="scroll-mt-24">
      <h2 className="text-[clamp(1.8rem,3vw,2.35rem)] font-medium tracking-[-0.03em] leading-[1.15] text-[#161616]">
        Path
      </h2>
      <ul className="mt-8 flex flex-col gap-8">
        {experiences.map((exp) => (
          <li key={exp.company + exp.role}>
            <p className="text-[13px] font-medium text-[#5e5e5e]">
              {exp.period.replaceAll("—", "-").replaceAll("–", "-")}
            </p>
            <h3 className="mt-2 text-[1.35rem] font-medium tracking-[-0.02em] text-[#161616]">
              {exp.company}
            </h3>
            <p className="mt-1 text-[15px] text-[#525252]">{exp.role}</p>
            <p className="mt-3 max-w-[32rem] text-[16px] leading-relaxed text-[#4a4a4a]">
              {exp.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Experience;
