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
        <section className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-32">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-xs uppercase tracking-[0.2em] text-parchment-500">02 — Career</span>
                            <div className="h-px w-full bg-ink-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-parchment-200">Professional<br/>Trajectory.</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-8">
                    <div className="flex flex-col">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`py-12 ${index !== 0 ? 'fine-border-t' : 'pt-0'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                                    <div className="md:col-span-1">
                                        <p className="text-xs uppercase tracking-[0.15em] text-brass-500 mb-2">{exp.period}</p>
                                        <h3 className="text-xl font-serif text-parchment-200">{exp.company}</h3>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="text-lg font-medium text-parchment-300 mb-3">{exp.role}</h4>
                                        <p className="text-sm font-light text-parchment-400 leading-relaxed">
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