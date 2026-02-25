import React from 'react';
import { Brain, Database, Code, Cloud } from 'lucide-react';

const skills = [
    { name: 'Machine Learning', icon: Brain, color: 'bg-blue-500' },
    { name: 'Database Design', icon: Database, color: 'bg-purple-500' },
    { name: 'API Development', icon: Code, color: 'bg-green-500' },
    { name: 'Cloud Architecture', icon: Cloud, color: 'bg-orange-500' },
];

const Skills = () => {
    return (
        <div className="md:col-span-3 lg:col-span-4 md:row-span-2 bg-zinc-50 border border-zinc-200 rounded-3xl p-5 sm:p-6 min-h-[300px] md:min-h-0">
            <h3 className="text-lg font-medium text-zinc-900 mb-4">Core Skills</h3>
            <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
                {skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white border border-zinc-100 hover:shadow-sm transition-shadow">
                        <div className={`w-10 h-10 ${skill.color} rounded-full flex items-center justify-center text-white mb-2`}>
                            <skill.icon size={20} strokeWidth={2} />
                        </div>
                        <span className="text-xs font-medium text-zinc-600">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
