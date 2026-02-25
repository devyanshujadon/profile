import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <div className="md:col-span-6 lg:col-span-5 md:row-span-2 bg-zinc-900 text-white rounded-3xl p-5 sm:p-6 flex flex-col justify-end relative overflow-hidden group min-h-[300px] md:min-h-0">
            {/* Decorative gradient blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-zinc-800 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col h-full justify-end">
                <h1 className="text-4xl font-light leading-tight mb-2">
                    AI & Backend<br />Engineer
                </h1>
                <p className="text-sm text-zinc-400 mb-6">
                    Building intelligent systems and scalable infrastructure
                </p>

                <div className="flex items-center gap-3 mt-auto">
                    <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 hover:scale-105 transition-all text-zinc-300 hover:text-white">
                        <Github size={18} strokeWidth={2} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 hover:scale-105 transition-all text-zinc-300 hover:text-white">
                        <Linkedin size={18} strokeWidth={2} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 hover:scale-105 transition-all text-zinc-300 hover:text-white">
                        <Mail size={18} strokeWidth={2} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero;
