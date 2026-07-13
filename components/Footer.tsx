import React from "react";

const Footer = () => {
  return (
    <footer className="px-6 sm:px-10 lg:px-16 pb-12">
      <div className="mx-auto max-w-[920px] border-t border-line pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-ink-3">
          © {new Date().getFullYear()} Devyanshu Jadon
        </p>
        <p className="text-sm text-ink-3">
          India · Working remotely
        </p>
      </div>
    </footer>
  );
};

export default Footer;
