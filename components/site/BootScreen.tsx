"use client";

import { useEffect, useState } from "react";

export function BootScreen() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = reduced ? 180 : 1100;
    const started = performance.now();
    let settled = false;
    let hideTimer = 0;
    let finishTimer = 0;

    function finish() {
      if (settled) return;
      settled = true;
      const wait = Math.max(0, min - (performance.now() - started));
      finishTimer = window.setTimeout(() => {
        setLeaving(true);
        hideTimer = window.setTimeout(() => setShow(false), reduced ? 0 : 380);
      }, wait);
    }

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = window.setTimeout(finish, reduced ? 400 : 2600);

    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(finishTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={leaving ? "boot is-leaving" : "boot"} role="status" aria-live="polite">
      <p className="sr-only">Loading</p>
      <div className="boot-plate">
        <p className="boot-name">Devyanshu Jadon</p>
        <div className="boot-track" aria-hidden="true">
          <span className="boot-shuttle" />
        </div>
      </div>
    </div>
  );
}
