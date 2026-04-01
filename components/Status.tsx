import React from 'react';

const Status = () => {
    return (
        <div className="md:col-span-3 lg:col-span-4 md:row-span-1 glass-card bg-emerald-50/50 border-emerald-100/50 p-6 sm:p-8 flex flex-col justify-center relative min-h-[160px] md:min-h-0 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <h3 className="text-lg font-display font-medium text-emerald-900">Available for work</h3>
            </div>
            <p className="text-sm text-emerald-700/80 leading-relaxed relative z-10">
                Currently open to new opportunities and exciting projects.
            </p>
        </div>
    );
};

export default Status;