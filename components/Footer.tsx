import React from "react";
import { SITE } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="dots-foot">
      <p className="text-[14px] text-[#5e5e5e]">
        © {new Date().getFullYear()} Devyanshu Jadon
      </p>
      <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2" aria-label="Footer">
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="nav-link">
          GitHub
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link">
          LinkedIn
        </a>
        <a href={SITE.blogUrl} className="nav-link">
          Writing
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
