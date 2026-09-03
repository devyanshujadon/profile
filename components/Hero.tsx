import React from "react";

/** Kept for compatibility; home uses IdentityPanel instead. */
const Hero = () => {
  return (
    <section className="pb-16">
      <p className="label mb-6">AI and backend engineer</p>
      <h1 className="font-display uppercase text-[clamp(2.25rem,6vw,4.5rem)] tracking-[-0.04em] text-ink max-w-[16ch] leading-[0.9]">
        Systems that hold, products that earn their place.
      </h1>
      <p className="mt-6 prose-measure text-[1.05rem] leading-[1.65] text-ink-2">
        Currently an AI engineer. Recent work includes LoomKit and FeedFr.
      </p>
    </section>
  );
};

export default Hero;
