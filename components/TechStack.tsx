import React from "react";
import { TOOLS as lines } from "@/lib/site";

const TechStack = () => {
  return (
    <section id="tools" className="scroll-mt-24">
      <h2 className="text-[clamp(1.8rem,3vw,2.35rem)] font-medium tracking-[-0.03em] leading-[1.15] text-[#161616]">
        Tools
      </h2>
      <dl className="mt-8 flex flex-col gap-7">
        {lines.map(([title, items]) => (
          <div key={title}>
            <dt className="text-[15px] font-medium text-[#161616]">{title}</dt>
            <dd className="mt-1.5 max-w-[32rem] text-[16px] leading-relaxed text-[#4a4a4a]">
              {items}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TechStack;
