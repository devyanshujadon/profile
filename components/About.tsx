import React from "react";

const About = () => {
  return (
    <section id="about" className="scroll-mt-8 py-14 md:py-16 border-t border-line">
      <p className="label mb-8">About</p>
      <div className="space-y-4 text-[0.98rem] leading-[1.7] text-ink-2 max-w-[34rem]">
        <p>
          My work sits where models meet production: retrieval pipelines,
          resilient APIs, and the infrastructure that keeps intelligent features
          dependable.
        </p>
        <p>
          I also ship end to end — from libraries like LoomKit to product
          surfaces like FeedFr — when a problem is worth solving cleanly.
        </p>
      </div>
    </section>
  );
};

export default About;
