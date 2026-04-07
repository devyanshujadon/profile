import React from 'react';

const experiences = [
    {
        role: 'AI Engineer',
        company: 'Tudip Technologies',
        period: '2025 — Present',
        description: 'Architecting intelligent pipelines and integrating large language models into enterprise-grade applications.'
    },
    {
        role: 'Z Ambassador',
        company: 'IBMz',
        period: '2020 — 2022',
        description: 'Advocated for enterprise computing solutions and organized technical workshops for the community.'
    },
];

const Experience = () => {
    return (
        <section className="relative py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <div className="mb-4 px-4 py-1 bg-ink text-base inline-block">
                            <span className="mono text-sm text-base">03 — CAREER</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-ink leading-[0.9]">
                            PROFESSIONAL<br/>TRAJECTORY<span className="text-accent">.</span>
                        </h2>
                    </div>
                </div>
                
                <div className="lg:col-span-7 lg:col-start-6">
                    <div className="flex flex-col">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`brutal-card p-6 ${index !== 0 ? 'mt-4' : ''}`}>
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div>
                                        <p className="mono text-xs font-bold text-accent mb-1">{exp.period}</p>
                                        <h3 className="text-xl font-display font-bold text-ink">{exp.company}</h3>
                                    </div>
                                    <div className="flex-1 md:ml-8">
                                        <h4 className="text-lg font-display font-bold text-ink mb-2">{exp.role}</h4>
                                        <p className="text-sm font-display text-[#555555] leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
