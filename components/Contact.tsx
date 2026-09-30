import React from "react";
import { SITE } from "@/lib/site";

const Contact = () => {
  return (
    <section
      id="contact"
      className="scroll-mt-24 mx-auto max-w-[1120px] px-5 sm:px-8 py-16 md:py-24"
    >
      <h2 className="max-w-[16ch] text-[clamp(2rem,4.4vw,3.15rem)] font-medium tracking-[-0.035em] leading-[1.12] text-[#161616]">
        Open to thoughtful collaborations
      </h2>
      <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.6] text-[#4a4a4a]">
        If you are building something that needs AI depth, backend architecture,
        or a product-minded engineer, write.
      </p>
      <a href={`mailto:${SITE.email}`} className="pill mt-8">
        Email
      </a>
      <p className="mt-4 text-[15px] text-[#5e5e5e] break-all">{SITE.email}</p>
    </section>
  );
};

export default Contact;
