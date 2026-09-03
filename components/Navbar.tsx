"use client";

import React, { useState } from "react";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#path", label: "Path" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="register">
      <Link href="/" className="font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase text-ink hover:text-mark transition-colors duration-150 cursor-pointer">
        DJ
      </Link>

      <nav className="hidden sm:flex items-center gap-4" aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
        <a href="https://blog.devyanshu.com" className="nav-highlight">
          Writing
        </a>
      </nav>

      <button
        type="button"
        className="sm:hidden font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div className="sm:hidden absolute left-0 right-0 top-full border-b-2 border-ink bg-canvas px-5 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-link text-sm"
            >
              {link.label}
            </a>
          ))}
          <a href="https://blog.devyanshu.com" className="nav-highlight w-fit">
            Writing
          </a>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
