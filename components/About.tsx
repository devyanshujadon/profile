import React from 'react';

const About = () => {
    return (
        <section className="relative py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <div className="mb-4 px-4 py-1 bg-ink text-base inline-block">
                            <span className="mono text-sm text-base">02 — ABOUT</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-ink leading-[0.9]">
                            THE<br/>PHILOSOPHY<span className="text-accent">.</span>
                        </h2>
                    </div>
                </div>
                
                <div className="lg:col-span-7 lg:col-start-6">
                    <div className="brutal-card p-6 md:p-8">
                        <p className="text-lg md:text-xl font-display font-medium text-ink leading-relaxed space-y-6">
                            <span className="text-7xl md:text-8xl font-display font-bold text-accent float-left mr-3 mt-[-8px]">I</span>
                            SPECIALIZE IN ENGINEERING ROBUST BACKEND SYSTEMS AND SEAMLESSLY INTEGRATING CUTTING-EDGE AI CAPABILITIES INTO SCALABLE APPLICATIONS. MY FOCUS LIES IN DESIGNING INTELLIGENT ARCHITECTURES, LEVERAGING LARGE LANGUAGE MODELS, AND BUILDING RETRIEVAL-AUGMENTED GENERATION PIPELINES TO DEPLOY RESILIENT APIS.
                        </p>
                        <p className="text-lg md:text-xl font-display font-medium text-ink leading-relaxed mt-6">
                            PASSIONATE ABOUT BRIDGING THE GAP BETWEEN COMPLEX MACHINE LEARNING MODELS AND ELEGANT, REAL-WORLD SOLUTIONS. MY APPROACH COMBINES TECHNICAL RIGOR WITH AN APPRECIATION FOR CLEAN, MAINTAINABLE DESIGN.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
