import React from 'react';
import { BrainCircuit, Database, Code2, CloudCog } from 'lucide-react';

const skills = [
    { name: 'Machine Learning', icon: BrainCircuit, bg: 'bg-indigo-50/50', color: 'text-indigo-600' },
    { name: 'Database Design', icon: Database, bg: 'bg-violet-50/50', color: 'text-violet-600' },
    { name: 'API Development', icon: Code2, bg: 'bg-blue-50/50', color: 'text-blue-600' },
    { name: 'Cloud Architecture', icon: CloudCog, bg: 'bg-sky-50/50', color: 'text-sky-600' },
];

const Skills = () => {
    return (
        <div className="md:col-span-3 lg:col-span-4 md:row-span-2 glass-card p-6 sm:p-8 min-h-[300px] md:min-h-0 flex flex-col">
            <h3 className="text-sm font-display font-semibold text-surface-900 tracking-widest uppercase mb-6 opacity-50">Core Skills</h3>
            <div className="grid grid-cols-2 gap-3 h-full">
                {skills.map((skill) => (
                    <div key={skill.name} className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl ${skill.bg} subtle-border hover:shadow-sm transition-all duration-300 hover:-translate-y-1`}>
                        <div className={`mb-3 ${skill.color}`}>
                            <skill.icon size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-surface-700">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;