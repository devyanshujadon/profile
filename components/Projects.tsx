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
        <section className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-32">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-xs uppercase tracking-[0.2em] text-parchment-500">03 — Works</span>
                            <div className="h-px w-full bg-ink-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-parchment-200">Selected<br/>Exhibits.</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-8">
                    <div className="flex flex-col gap-16">
                        {projects.map((project, index) => (
                            <div key={index} className="group cursor-default">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-6 fine-border-b relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-brass-500 transition-all duration-700 group-hover:w-full"></div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.15em] text-parchment-500 mb-2">{project.tag}</p>
                                        <h3 className="text-3xl md:text-4xl font-serif text-parchment-200 transition-colors duration-500 group-hover:text-brass-500">{project.title}</h3>
                                    </div>
                                    <span className="text-xs font-serif italic text-parchment-500 mt-4 md:mt-0">{project.year}</span>
                                </div>
                                <p className="text-sm md:text-base font-light text-parchment-400 leading-relaxed max-w-2xl">
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