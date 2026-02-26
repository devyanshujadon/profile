import React from 'react';

const technologies = [
    'JavaScript', 'TypeScript', 'Next.js', 'Node.js',
    'Python', 'Go', 'TensorFlow', 'PyTorch',
    'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes',
    'AWS', 'Redis', 'LLM', 'RAG', 'LangChain', 'LangGraph'
];

const TechStack = () => {
    return (
        <div className="md:col-span-6 lg:col-span-12 md:row-span-1 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-center">
            <h3 className="text-sm font-medium text-zinc-400 mb-4">Core Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <span
                        key={tech}
                        className="px-3 py-1.5 bg-zinc-800/80 border border-zinc-700/50 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-default"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TechStack;
