import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <section className="relative pt-32 pb-16">
            <div className="text-center flex flex-col items-center">
                <p className="text-xs uppercase tracking-[0.2em] text-brass-500 mb-8">05 — Engage</p>
                
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-parchment-200 mb-12 hover:italic transition-all duration-700 cursor-default">
                    Initiate a Dialog.
                </h2>
                
                <a href="mailto:jadon.devyanshu@gmail.com" className="group flex items-center gap-6 px-10 py-5 fine-border hover:border-brass-500 transition-colors duration-500">
                    <span className="text-sm uppercase tracking-[0.15em] text-parchment-300 group-hover:text-brass-500 transition-colors duration-500">jadon.devyanshu@gmail.com</span>
                    <ArrowRight size={16} className="text-parchment-500 group-hover:text-brass-500 group-hover:translate-x-2 transition-all duration-500" />
                </a>
            </div>
        </section>
    );
};

export default Contact;