import React from 'react';

const experiences = [
    {
        role: 'Senior AI Engineer',
        company: 'Tech Corp',
        period: '2023 - Present',
    },
    {
        role: 'Backend Developer',
        company: 'StartupXYZ',
        period: '2021 - 2023',
    },
];

const Experience = () => {
    return (
        <div className="md:col-span-3 lg:col-span-3 md:row-span-2 bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-center min-h-[300px] md:min-h-0">
            <h3 className="text-lg font-medium text-zinc-900 mb-6">Experience</h3>
            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative pl-4 border-l-2 border-zinc-200 group-hover:border-zinc-300 transition-colors">
                        <h4 className="text-sm font-semibold text-zinc-900">{exp.role}</h4>
                        <p className="text-xs text-zinc-500 mb-1">{exp.company}</p>
                        <p className="text-xs text-zinc-400 font-medium">{exp.period}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
