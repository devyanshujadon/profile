import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex flex-col justify-center py-12">
            <div className="mb-4 px-4 py-1 bg-ink text-base inline-self">
                <span className="mono text-sm text-base">01 — INTRO</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] font-display font-bold text-ink mb-2">
                DEVYANSHU
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] font-display font-bold text-ink mb-12">
                JADON<span className="text-accent">.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full">
                <div className="md:col-span-5 lg:col-span-4">
                    <div className="brutal-card p-4 bg-accent-2">
                        <p className="mono text-sm text-ink leading-relaxed">
                            &gt; BASED IN INDIA<br/>
                            &gt; AVAILABLE REMOTE<br/>
                            &gt; OPERATING GLOBAL
                        </p>
                    </div>
                </div>
                <div className="md:col-span-7 lg:col-span-6">
                    <p className="text-lg md:text-xl font-display font-medium text-ink leading-relaxed mb-8 max-w-xl">
                        BUILDING INTELLIGENT SYSTEMS AND SCALABLE BACKEND INFRASTRUCTURE. WHERE DESIGN MEETS ENGINEERING.
                    </p>
                    
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/devyanshujadon" target="_blank" rel="noopener noreferrer" className="brutal-border p-3 bg-white hover:bg-accent transition-colors">
                            <Github size={20} strokeWidth={2} />
                        </a>
                        <a href="https://linkedin.com/in/devyanshu-jadon" target="_blank" rel="noopener noreferrer" className="brutal-border p-3 bg-white hover:bg-accent transition-colors">
                            <Linkedin size={20} strokeWidth={2} />
                        </a>
                        <a href="mailto:jadon.devyanshu@gmail.com" className="brutal-border p-3 bg-white hover:bg-accent transition-colors">
                            <Mail size={20} strokeWidth={2} />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-8 left-0 flex items-center gap-2">
                <span className="w-3 h-3 bg-accent"></span>
                <span className="mono text-xs font-bold uppercase">Available for work</span>
            </div>
        </section>
    );
};

export default Hero;
