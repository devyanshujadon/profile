import React from 'react';

const techCategories = [
    {
        title: "LANGUAGES",
        items: ['JavaScript', 'TypeScript', 'Python', 'Go']
    },
    {
        title: "INTELLIGENCE",
        items: ['TensorFlow', 'PyTorch', 'LLMs', 'LangChain', 'LangGraph', 'RAG']
    },
    {
        title: "INFRASTRUCTURE",
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS']
    },
    {
        title: "FRAMEWORKS",
        items: ['FastAPI', 'Next.js', 'Node.js', 'Flask', 'Pydantic', 'SQLAlchemy']
    }
];

const TechStack = () => {
    return (
        <section className="relative py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <div className="mb-4 px-4 py-1 bg-ink text-base inline-block">
                            <span className="mono text-sm text-base">05 — ARSENAL</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-ink leading-[0.9]">
                            TECHNICAL<br/>FOUNDATION<span className="text-accent">.</span>
                        </h2>
                    </div>
                </div>
                
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {techCategories.map((category, index) => (
                            <div key={index} className="brutal-card p-4 bg-accent-2">
                                <h3 className="mono text-xs font-bold text-ink mb-4 pb-2 border-b-2 border-ink">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.items.map((tech) => (
                                        <li key={tech} className="mono text-sm font-medium text-ink">
                                            &gt; {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
