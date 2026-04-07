import React from 'react';

const Footer = () => {
    return (
        <footer className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 bg-ink text-base">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h4 className="font-display font-bold text-lg text-base">DEVYANSHU JADON</h4>
                    <p className="mono text-xs text-base/70">&copy; {new Date().getFullYear()} — ALL RIGHTS RESERVED</p>
                </div>
                <div className="text-right">
                    <p className="mono text-xs text-base/70">
                        BASED IN INDIA <br/> OPERATING GLOBALLY
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
