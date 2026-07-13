import React from "react";

const About = () => {
  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-20 border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12">
        <h2 className="label pt-1">About</h2>

        <div className="space-y-5 text-[1.05rem] leading-[1.7] text-ink-2 max-w-[38rem]">
          <p>
            My work sits where models meet production: retrieval pipelines,
            resilient APIs, and the unglamorous infrastructure that keeps
            intelligent features dependable.
          </p>
          <p>
            I also ship end to end — from small libraries like LoomKit to
            full product surfaces like FeedFr — when a real problem is worth
            solving cleanly.
          </p>
          <p>
            Based in India, working remotely. I care about clear architecture,
            readable code, and interfaces that stay out of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
