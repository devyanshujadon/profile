import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-24 py-16 md:py-24 border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12">
        <h2 className="label pt-1">Contact</h2>

        <div>
          <p className="font-display text-2xl md:text-3xl tracking-tight text-ink max-w-[20ch] leading-[1.25]">
            Open to thoughtful collaborations and interesting problems.
          </p>
          <p className="mt-5 text-ink-2 max-w-[32rem] leading-[1.7]">
            If you&apos;re building something that needs AI depth, backend
            architecture, or a product-minded engineer — write.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <a
              href="mailto:jadon.devyanshu@gmail.com"
              className="font-display text-xl md:text-2xl text-mark hover:text-ink transition-colors tracking-tight"
            >
              jadon.devyanshu@gmail.com
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-3">
            <a
              href="https://github.com/devyanshujadon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mark transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/devyanshu-jadon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mark transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://loomkit.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mark transition-colors"
            >
              LoomKit
            </a>
            <a
              href="https://feedfr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mark transition-colors"
            >
              FeedFr
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
