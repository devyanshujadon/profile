import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="scroll-mt-8 py-14 md:py-16 border-t border-line"
    >
      <p className="label mb-8">Contact</p>

      <p className="font-display text-xl md:text-2xl tracking-tight text-ink max-w-[22ch] leading-[1.3]">
        Open to thoughtful collaborations and interesting problems.
      </p>
      <p className="mt-4 text-[0.98rem] text-ink-2 max-w-[30rem] leading-[1.7]">
        If you&apos;re building something that needs AI depth, backend
        architecture, or a product-minded engineer — write.
      </p>

      <a
        href="mailto:jadon.devyanshu@gmail.com"
        className="mt-6 inline-block text-[1.05rem] text-mark hover:text-ink transition-colors"
      >
        jadon.devyanshu@gmail.com
      </a>
    </section>
  );
};

export default Contact;
