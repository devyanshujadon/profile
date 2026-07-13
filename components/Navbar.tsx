"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-canvas/90 backdrop-blur-sm border-b border-line"
          : ""
      }`}
    >
      <nav className="mx-auto max-w-[920px] px-6 sm:px-10 lg:px-0 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-[1.15rem] tracking-tight text-ink hover:text-mark transition-colors"
        >
          Devyanshu Jadon
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a
            href="https://blog.devyanshu.com"
            className="nav-link"
          >
            Writing
          </a>
        </div>

        <button
          type="button"
          className="sm:hidden text-ink-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-line bg-canvas px-6 py-5 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-link text-base"
            >
              {link.label}
            </a>
          ))}
          <a href="https://blog.devyanshu.com" className="nav-link text-base">
            Writing
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
