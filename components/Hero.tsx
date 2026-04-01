import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[70vh] flex flex-col justify-center">
            <div className="mb-8 flex items-center gap-4">
                <div className="h-px w-12 bg-brass-500"></div>
                <span className="text-xs uppercase tracking-[0.2em] text-brass-500">00 — Introduction</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-serif mb-12 text-parchment-200">
                Devyanshu <br/> Jadon.
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full">
                <div className="md:col-span-4 lg:col-span-3">
                    <p className="text-sm text-parchment-400 font-light leading-relaxed">
                        Based in India.<br/>
                        Available for remote engagements.<br/>
                        Operating globally.
                    </p>
                </div>
                <div className="md:col-span-8 lg:col-span-6">
                    <h2 className="text-xl md:text-3xl font-serif text-parchment-300 leading-snug mb-8">
                        Architecting intelligent systems and refined backend infrastructure. Bridging the elegance of design with the rigor of engineering.
                    </h2>
                    
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/devyanshujadon" target="_blank" rel="noopener noreferrer" className="text-parchment-500 hover:text-brass-500 transition-colors duration-500">
                            <span className="sr-only">GitHub</span>
                            <Github size={20} strokeWidth={1} />
                        </a>
                        <a href="https://linkedin.com/in/devyanshu-jadon" target="_blank" rel="noopener noreferrer" className="text-parchment-500 hover:text-brass-500 transition-colors duration-500">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin size={20} strokeWidth={1} />
                        </a>
                        <a href="mailto:jadon.devyanshu@gmail.com" className="text-parchment-500 hover:text-brass-500 transition-colors duration-500">
                            <span className="sr-only">Email</span>
                            <Mail size={20} strokeWidth={1} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;