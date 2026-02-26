import React from 'react';

const Footer = () => {
    return (
        <footer className="py-6 mt-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm text-zinc-600">
                    © {new Date().getFullYear()} Devyanshu Jadon. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
