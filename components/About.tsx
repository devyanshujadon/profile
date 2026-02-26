import React from 'react';

const About = () => {
    return (
        <div className="md:col-span-6 lg:col-span-7 md:row-span-1 bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-center overflow-hidden">
            <h3 className="text-lg font-medium text-zinc-900 mb-2">About Me</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
                I specialize in engineering robust backend systems and seamlessly integrating cutting-edge AI capabilities into scalable applications. My focus lies in designing intelligent architectures, leveraging LLMs, and building retrieval-augmented generation (RAG) pipelines to deploy resilient APIs. I am passionate about bridging the gap between complex machine learning models and real-world, user-centric solutions.
            </p>
        </div>
    );
};

export default About;
