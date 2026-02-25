import React from 'react';

const About = () => {
    return (
        <div className="md:col-span-6 lg:col-span-7 md:row-span-1 bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-center">
            <h3 className="text-lg font-medium text-zinc-900 mb-2">About Me</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
                I'm deeply passionate about building scalable backend systems and integrating AI models to solve complex problems. With a strong foundation in software engineering, I love bridging the gap between intelligent algorithms and robust infrastructure.
            </p>
        </div>
    );
};

export default About;
