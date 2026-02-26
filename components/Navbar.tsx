"use client";
import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";

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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <div className="font-semibold text-base sm:text-lg tracking-tight truncate mr-2">Devyanshu</div>
        <button
          data-cal-namespace={calNamespace}
          data-cal-link={calLink}
          data-cal-config='{"layout":"month_view"}'
          className="text-xs sm:text-sm font-medium text-white bg-zinc-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap">
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
