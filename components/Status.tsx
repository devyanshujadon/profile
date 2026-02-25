import React from 'react';

const Status = () => {
    return (
        <div className="md:col-span-3 lg:col-span-4 md:row-span-1 bg-green-500 text-white rounded-3xl p-5 sm:p-6 flex flex-col justify-center relative overflow-hidden group min-h-[150px] md:min-h-0">
            <div className="flex items-center gap-3 mb-2">
                <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                </div>
                <h3 className="text-xl font-medium">Available for work</h3>
            </div>
            <p className="text-sm text-green-100">
                Currently open to new opportunities and exciting projects.
            </p>
        </div>
    );
};

export default Status;
