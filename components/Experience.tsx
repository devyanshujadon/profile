import React from 'react';

const experiences = [
    {
        role: 'AI Engineer',
        company: 'Tudip Technologies',
        period: '2025 - Present',
    },
    {
        role: 'Software Engineering Intern',
        company: 'Buzzworld',
        period: '2024',
    },
    {
        role: 'Z Ambassador',
        company: 'IBMz',
        period: '2020 - 2022',
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
