import React from 'react';
import { Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div className="md:col-span-3 lg:col-span-3 md:row-span-1 bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center group hover:border-zinc-300 transition-colors cursor-pointer min-h-[150px] md:min-h-0">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <Mail size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-zinc-900 mb-1">Let's Connect</h3>
            <p className="text-xs text-zinc-500">hello@example.com</p>
        </div>
    );
};

export default Contact;
