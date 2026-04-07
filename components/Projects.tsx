import React from 'react';

const projects = [
    {
        title: 'XML Report Validator',
        tag: 'Backend Infrastructure',
        description: 'Automated pipeline for batched XML validation against complex, evolving schemas. Designed for absolute reliability at scale.',
        year: '2025'
    },
    {
        title: 'NPR OCR Engine',
        tag: 'Computer Vision',
        description: 'Optical character recognition system to extract precision data from NPRs, bridging physical documents with digital accuracy.',
        year: '2024'
    },
    {
        title: 'Periodic Summary Generator',
        tag: 'LLMs & RAG',
        description: 'AI-driven synthesis engine designed to distill massive periodic reports into actionable, elegant summaries.',
        year: '2024'
    },
];

const Projects = () => {
    return (
        <section className="relative py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <div className="mb-4 px-4 py-1 bg-ink text-base inline-block">
                            <span className="mono text-sm text-base">04 — WORKS</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-ink leading-[0.9]">
                            SELECTED<br/>EXHIBITS<span className="text-accent">.</span>
                        </h2>
                    </div>
                </div>
                
                <div className="lg:col-span-7 lg:col-start-6">
                    <div className="flex flex-col gap-4">
                        {projects.map((project, index) => (
                            <div key={index} className="brutal-card p-6 group cursor-pointer">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 pb-4 border-b-2 border-ink">
                                    <div>
                                        <p className="mono text-xs font-bold text-accent mb-1">{project.tag}</p>
                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-ink group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <span className="mono text-sm font-bold text-ink mt-2 md:mt-0">
                                        [{project.year}]
                                    </span>
                                </div>
                                <p className="text-sm md:text-base font-display project-description leading-relaxed max-w-2xl">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
