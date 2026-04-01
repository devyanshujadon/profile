import React from 'react';

const Footer = () => {
    return (
        <footer className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12 fine-border-t">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h4 className="font-serif text-2xl text-parchment-300 mb-1">Devyanshu Jadon</h4>
                    <p className="text-xs uppercase tracking-[0.15em] text-parchment-500">© {new Date().getFullYear()} — All Rights Reserved.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-parchment-500">
                        Based in India <br/> Operating Globally
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;