import React from "react";

/** Kept for compatibility; home uses IdentityPanel instead. */
const Hero = () => {
  return (
    <section className="pb-16">
      <p className="label mb-6">AI &amp; backend engineer</p>
      <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] tracking-tight text-ink max-w-[16ch] leading-[1.1]">
        Systems that hold, products that earn their place.
      </h1>
      <p className="mt-6 prose-measure text-[1.05rem] leading-[1.7] text-ink-2">
        Currently an AI engineer. Recent work includes LoomKit and FeedFr.
      </p>
    </section>
  );
};

export default Hero;
