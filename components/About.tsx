import React from 'react';

const About = () => {
    return (
        <div className="md:col-span-6 lg:col-span-7 md:row-span-1 bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-center overflow-hidden">
            <h3 className="text-lg font-medium text-zinc-900 mb-2">About Me</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
                I build production-grade AI systems and resilient backend platforms with a strong focus on agentic workflows, multimodal LLM applications, and cloud-native architecture. My recent work spans model orchestration, RAG with observability, evaluation-driven development, and secure API design. I enjoy shipping practical AI experiences that stay reliable at scale.
            </p>
        </div>
    );
};

export default About;
