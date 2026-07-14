import React from "react";

const Footer = () => {
  return (
    <footer className="pt-6 pb-2 border-t border-line mt-4 lg:hidden">
      <p className="text-sm text-ink-3">
        © {new Date().getFullYear()} Devyanshu Jadon
      </p>
    </footer>
  );
};

export default Footer;
