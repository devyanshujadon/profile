"use client";
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base border-b-3 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-tight hover:text-accent transition-colors">
          DEVYANSHU<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="hidden md:block section-label">
            AI + BACKEND ENGINEER
          </span>
          <button
            className="font-display font-bold text-sm uppercase tracking-wider hover:text-accent transition-colors">
            CONTACT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
