import React from 'react';
import { Lock } from 'lucide-react';

const projects = [
    {
        title: 'XML Report Validator',
        tag: 'Backend',
        description: 'Automated pipeline for batched XML validation against complex rules.',
    },
    {
        title: 'NPR OCR for Reports',
        tag: 'Computer Vision',
        description: 'Optical character recognition system to extract data from NPRs.',
    },
    {
        title: 'Periodic Summary Generator',
        tag: 'LLMs & RAG',
        description: 'AI-driven system to synthesize and summarize periodic reports.',
    },
];

const Projects = () => {
    return (
        <div className="md:col-span-6 lg:col-span-5 md:row-span-2 bg-zinc-900 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col min-h-[300px] md:min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Selected Projects</h3>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {projects.map((project, index) => (
                    <div key={index} className="bg-zinc-800 rounded-2xl p-4 flex items-start justify-between group">
                        <div>
                            <span className="inline-block px-2 py-1 bg-zinc-700 text-[10px] font-medium text-zinc-300 rounded-md mb-2 group-hover:bg-zinc-600 transition-colors">
                                {project.tag}
                            </span>
                            <h4 className="text-sm font-medium text-zinc-100 mb-1">{project.title}</h4>
                            <p className="text-xs text-zinc-400">{project.description}</p>
                        </div>
                        <div className="text-zinc-500 mt-1" title="Proprietary / Internal Project">
                            <Lock size={16} strokeWidth={2} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Projects;
