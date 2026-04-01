"use client";
import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";
import Link from 'next/link';

const Navbar = () => {
  const calNamespace = process.env.NEXT_PUBLIC_CAL_NAMESPACE || "15min";
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "devyanshu/15min";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": calNamespace });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [calNamespace]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-ink-900/80 backdrop-blur-md fine-border-b">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-wide text-parchment-200 hover:text-brass-500 transition-colors duration-500">
          Devyanshu.
        </Link>
        <div className="flex items-center gap-8">
          <span className="hidden md:block text-xs uppercase tracking-[0.2em] text-parchment-500">
            AI & Backend Engineer
          </span>
          <button
            data-cal-namespace={calNamespace}
            data-cal-link={calLink}
            data-cal-config='{"layout":"month_view"}'
            className="text-xs uppercase tracking-widest text-parchment-300 hover:text-brass-500 transition-colors duration-500">
            Inquire
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;