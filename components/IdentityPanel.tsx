import Stage from "@/components/Stage";
import { EXPERIENCES, SITE } from "@/lib/site";

const IdentityPanel = () => {
  const current = EXPERIENCES[0];

  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-12 md:pt-16 pb-16 md:pb-24">
      <p className="text-[15px] text-[#5e5e5e]">AI and backend engineer</p>
      <h1 className="mt-4 max-w-[12ch] text-[clamp(3.15rem,6.4vw,5rem)] font-medium tracking-[-0.04em] leading-[1.05] text-[#161616]">
        Devyanshu
        <br />
        Jadon
      </h1>
      <p className="mt-5 max-w-[34rem] text-[18px] leading-[1.5] text-[#3f3f3f]">
        I design systems for production and ship products people use.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href="#contact" className="pill">
          Contact
        </a>
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="pill pill-line"
        >
          GitHub
        </a>
      </div>

      <div className="mt-12 md:mt-14">
        <Stage tone="sky">
          <p className="text-[13px] font-medium text-[#5e5e5e]">{current.period}</p>
          <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.25rem)] font-medium tracking-[-0.03em] leading-[1.15] text-[#161616]">
            {current.role}
          </h2>
          <p className="mt-2 text-[17px] text-[#3f3f3f]">{current.company}</p>
          <p className="mt-5 max-w-[38rem] text-[17px] leading-[1.6] text-[#4a4a4a]">
            {current.detail}
          </p>
          <p className="mt-6 text-[15px] text-[#5e5e5e]">{SITE.location}</p>
        </Stage>
      </div>
    </section>
  );
};

export default IdentityPanel;
