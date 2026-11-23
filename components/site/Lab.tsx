"use client";

import { useEffect, useRef, useState } from "react";
import { HARDWARE } from "@/lib/lab";
import { Snake } from "@/components/site/Snake";

const PADS = [
  { name: "North", key: "1" },
  { name: "East", key: "2" },
  { name: "South", key: "3" },
  { name: "West", key: "4" },
] as const;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function Pulse() {
  const [phase, setPhase] = useState<"idle" | "wait" | "go" | "early" | "done">("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const start = useRef(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current != null) window.clearTimeout(timer.current);
    };
  }, []);

  function arm() {
    if (timer.current != null) window.clearTimeout(timer.current);
    setPhase("wait");
    setMs(null);
    const delay = 700 + Math.random() * 2000;
    timer.current = window.setTimeout(() => {
      start.current = performance.now();
      setPhase("go");
    }, delay);
  }

  function hit() {
    if (phase === "wait") {
      if (timer.current != null) window.clearTimeout(timer.current);
      setPhase("early");
      return;
    }
    if (phase !== "go") return;
    const elapsed = Math.round(performance.now() - start.current);
    setMs(elapsed);
    setBest((prev) => (prev == null || elapsed < prev ? elapsed : prev));
    setPhase("done");
  }

  const status =
    phase === "wait"
      ? "Wait for the light."
      : phase === "go"
        ? "Now."
        : phase === "early"
          ? "Too soon."
          : phase === "done" && ms != null
            ? `${ms} ms`
            : "Click when the pad lights.";

  return (
    <article className="lab-bay">
      <h3>Pulse</h3>
      <p>A reaction timer. Arm it, then hit the pad the moment it lights.</p>
      <p className="lab-status" aria-live="polite">{status}</p>
      <button
        type="button"
        className={phase === "go" ? "lab-pad lab-pulse is-lit" : "lab-pad lab-pulse"}
        onClick={hit}
        disabled={phase !== "wait" && phase !== "go"}
        aria-label={phase === "go" ? "Pad lit, click now" : "Reaction pad"}
      >
        {phase === "go" ? "Click" : "Pad"}
      </button>
      <div className="lab-actions">
        <button type="button" className="btn-ghost" onClick={arm}>
          {phase === "idle" ? "Arm" : "Again"}
        </button>
        {best != null && <span className="lab-best">Best {best} ms</span>}
      </div>
    </article>
  );
}

function Repeat() {
  const [phase, setPhase] = useState<"idle" | "play" | "input" | "fail">("idle");
  const [lit, setLit] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const seq = useRef<number[]>([]);
  const step = useRef(0);
  const alive = useRef(true);
  const token = useRef(0);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  async function playback(pattern: number[], run: number) {
    setPhase("play");
    for (const pad of pattern) {
      if (!alive.current || token.current !== run) return;
      setLit(pad);
      await wait(320);
      if (!alive.current || token.current !== run) return;
      setLit(null);
      await wait(160);
    }
    if (!alive.current || token.current !== run) return;
    step.current = 0;
    setPhase("input");
  }

  function grow() {
    const pattern = [...seq.current, Math.floor(Math.random() * PADS.length)];
    seq.current = pattern;
    setRound(pattern.length);
    const run = token.current + 1;
    token.current = run;
    void playback(pattern, run);
  }

  function press(index: number) {
    if (phase !== "input") return;
    setLit(index);
    window.setTimeout(() => setLit((current) => (current === index ? null : current)), 140);
    if (index !== seq.current[step.current]) {
      setPhase("fail");
      return;
    }
    step.current += 1;
    if (step.current >= seq.current.length) {
      setPhase("play");
      window.setTimeout(() => grow(), 420);
    }
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const index = PADS.findIndex((pad) => pad.key === event.key);
      if (index < 0 || phase !== "input") return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select")) return;
      event.preventDefault();
      press(index);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const status =
    phase === "play"
      ? "Watch."
      : phase === "input"
        ? `Your turn. Round ${round}.`
        : phase === "fail"
          ? `Missed on round ${round}.`
          : "Watch the pads, then repeat them. Keys 1–4 work too.";

  return (
    <article className="lab-bay">
      <h3>Repeat</h3>
      <p>Four pads, one growing pattern. Miss a step and the round ends.</p>
      <p className="lab-status" aria-live="polite">{status}</p>
      <div className="lab-pads" role="group" aria-label="Pattern pads">
        {PADS.map((pad, index) => (
          <button
            key={pad.name}
            type="button"
            className={lit === index ? "lab-pad is-lit" : "lab-pad"}
            onClick={() => press(index)}
            aria-label={`${pad.name} pad`}
            disabled={phase === "play"}
          >
            {pad.name}
          </button>
        ))}
      </div>
      <div className="lab-actions">
        <button type="button" className="btn-ghost" onClick={() => { seq.current = []; grow(); }}>
          {phase === "idle" ? "Start" : "Again"}
        </button>
      </div>
    </article>
  );
}

export function Lab() {
  return (
    <section className="section shell" id="lab" aria-labelledby="lab-title">
      <div className="section-head">
        <div>
          <p className="kicker">Lab</p>
          <h2 id="lab-title">Experiments.</h2>
        </div>
        <p>Minigames you can play here, and hardware from the bench.</p>
      </div>
      <div className="lab-groups">
        <div>
          <h3 className="lab-label">Minigames</h3>
          <div className="lab-games">
            <Pulse />
            <Repeat />
          </div>
          <Snake />
        </div>
        <div>
          <h3 className="lab-label">Hardware</h3>
          {HARDWARE.length === 0 ? (
            <article className="lab-bay">
              <h3>Bench</h3>
              <p>Nothing from the bench is published yet. Boards and sensors will sit here, each with the note that goes with it.</p>
            </article>
          ) : (
            <ul className="lab-hardware">
              {HARDWARE.map((item) => (
                <li key={item.name} className="lab-bay">
                  <h3>{item.name}</h3>
                  <p className="lab-best">{item.year}</p>
                  <p>{item.summary}</p>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
