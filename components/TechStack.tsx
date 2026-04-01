import React from 'react';

const techCategories = [
    {
        title: "Languages",
        items: ['JavaScript', 'TypeScript', 'Python', 'Go']
    },
    {
        title: "Intelligence",
        items: ['TensorFlow', 'PyTorch', 'LLMs', 'LangChain', 'LangGraph', 'RAG']
    },
    {
        title: "Infrastructure",
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS']
    },
    {
        title: "Frameworks & Libraries",
        items: ['FastAPI', 'Next.js', 'Node.js', 'Flask', 'Pydantic', 'SQLAlchemy']
    }
];

const TechStack = () => {
    return (
        <section className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-32">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-xs uppercase tracking-[0.2em] text-parchment-500">04 — Arsenal</span>
                            <div className="h-px w-full bg-ink-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-parchment-200">Technical<br/>Foundation.</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {techCategories.map((category, index) => (
                            <div key={index}>
                                <h3 className="text-sm uppercase tracking-[0.15em] text-brass-500 mb-6 pb-2 fine-border-b">{category.title}</h3>
                                <ul className="space-y-3">
                                    {category.items.map((tech) => (
                                        <li key={tech} className="text-lg font-light text-parchment-300">
                                            {tech}
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