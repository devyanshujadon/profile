"use client";

import { useEffect } from "react";

const SCRIPT_ID = "feedfr-widget-script";

/**
 * Floating feedback widget for board:
 * https://acme.feedfr.com/b/feedbackboard
 */
export function FeedFrWidget() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://www.feedfr.com/widget.js";
    script.async = true;
    script.setAttribute("data-board", "feedbackboard");
    script.setAttribute("data-host", "https://www.feedfr.com");
    script.setAttribute("data-color", "#03AED2");
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
