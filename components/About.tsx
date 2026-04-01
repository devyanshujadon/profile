import React from 'react';

const About = () => {
    return (
        <section className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-32">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-xs uppercase tracking-[0.2em] text-parchment-500">01 — About</span>
                            <div className="h-px w-full bg-ink-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-parchment-200">The<br/>Philosophy.</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-7">
                    <div className="text-lg md:text-xl font-light text-parchment-300 leading-relaxed space-y-8 text-balance">
                        <p>
                            <span className="float-left text-6xl md:text-7xl font-serif text-brass-500 leading-none pr-4 pt-2">I</span>
                            specialize in engineering robust backend systems and seamlessly integrating cutting-edge AI capabilities into scalable applications. My focus lies in designing intelligent architectures, leveraging large language models, and building retrieval-augmented generation pipelines to deploy resilient APIs.
                        </p>
                        <p>
                            I am passionate about bridging the gap between complex machine learning models and elegant, real-world solutions. My approach combines technical rigor with an appreciation for clean, maintainable design, ensuring that what I build isn't just functional, but built to stand the test of time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;