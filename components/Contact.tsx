import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <section className="relative py-16">
            <div className="text-center flex flex-col items-center">
                <div className="mb-4 px-4 py-1 bg-ink text-base inline-block">
                    <span className="mono text-sm text-base">06 — ENGAGE</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-ink mb-12">
                    LET'S <span className="text-accent">TALK</span>
                </h2>
                
                <a href="mailto:jadon.devyanshu@gmail.com" className="brutal-btn group">
                    <span className="mr-2">jadon.devyanshu@gmail.com</span>
                    <ArrowRight size={18} />
                </a>
            </div>
        </section>
    );
};

export default Contact;
