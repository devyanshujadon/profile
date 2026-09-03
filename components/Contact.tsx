import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t-2 border-ink px-5 sm:px-7 lg:px-9 py-12 md:py-16"
    >
      <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-ink max-w-[16ch] leading-[0.92]">
        Open to thoughtful collaborations
      </h2>
      <p className="mt-6 max-w-[34rem] text-[1rem] leading-[1.65] text-ink-2">
        If you are building something that needs AI depth, backend architecture,
        or a product-minded engineer, write.
      </p>
      <a
        href="mailto:jadon.devyanshu@gmail.com"
        className="mt-8 inline-block font-display uppercase text-[clamp(1.15rem,2.4vw,1.75rem)] tracking-[-0.02em] text-mark hover:text-ink transition-colors duration-150 cursor-pointer break-all"
      >
        jadon.devyanshu@gmail.com
      </a>
    </section>
  );
};

export default Contact;
