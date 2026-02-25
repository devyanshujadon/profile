import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        title: 'AI Model API',
        tag: 'NLP',
        description: 'High-performance inference API for language models.',
    },
    {
        title: 'Distributed Cache System',
        tag: 'Backend',
        description: 'In-memory caching layer to scale database reads.',
    },
    {
        title: 'Real-time Analytics',
        tag: 'Data Processing',
        description: 'Streaming pipeline for event-driven architectures.',
    },
];

const Projects = () => {
    return (
        <div className="md:col-span-6 lg:col-span-5 md:row-span-2 bg-zinc-900 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col min-h-[300px] md:h-[316px] md:min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Selected Projects</h3>
                <button className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                    View All
                </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {projects.map((project, index) => (
                    <div key={index} className="bg-zinc-800 rounded-2xl p-4 flex items-start justify-between group hover:bg-zinc-700 transition-colors cursor-pointer">
                        <div>
                            <span className="inline-block px-2 py-1 bg-zinc-700 text-[10px] font-medium text-zinc-300 rounded-md mb-2 group-hover:bg-zinc-600 transition-colors">
                                {project.tag}
                            </span>
                            <h4 className="text-sm font-medium text-zinc-100 mb-1">{project.title}</h4>
                            <p className="text-xs text-zinc-400 line-clamp-1">{project.description}</p>
                        </div>
                        <div className="text-zinc-500 group-hover:text-white transition-colors mt-1">
                            <ArrowUpRight size={18} strokeWidth={2} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Projects;
