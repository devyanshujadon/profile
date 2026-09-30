"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RoamingBot() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLButtonElement>(null);
  const squishRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const pupilLRef = useRef<HTMLSpanElement>(null);
  const pupilRRef = useRef<HTMLSpanElement>(null);
  const hopRef = useRef(0);
  const seenPath = useRef(pathname);

  useEffect(() => {
    if (seenPath.current !== pathname) {
      seenPath.current = pathname;
      hopRef.current = -720;
    }
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    const mover = moverRef.current;
    const squish = squishRef.current;
    const shadow = shadowRef.current;
    const pupilL = pupilLRef.current;
    const pupilR = pupilRRef.current;
    if (!root || !mover || !squish || !shadow || !pupilL || !pupilR) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pos = { x: 0, y: 0, vx: 0, vy: 0 };
    const look = { x: 0, y: 0, vx: 0, vy: 0 };
    const lag = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0, on: false };
    const hold = { on: false, id: -1, ox: 0, oy: 0, moved: 0, lx: 0, ly: 0, lt: 0 };
    let hot = false;
    let suppressClick = false;
    let freeUntil = 0;
    let poke = 0;
    let moodTimer = 0;
    let scanned = 0;
    let anchor: { x: number; y: number } | null = null;
    let clearHere = false;
    let boxes: { l: number; t: number; r: number; b: number; hard: number }[] = [];
    let frame = 0;
    let last = 0;
    let booted = false;
    let maxScroll = 1;
    let frames = 0;
    let size = 0;
    let stopped = false;

    const sizeFor = () => (window.innerWidth < 700 ? 104 : 142);

    const ensureSize = () => {
      const next = sizeFor();
      if (next === size) return size;
      size = next;
      const px = `${size}px`;
      mover.style.width = px;
      mover.style.height = px;
      shadow.style.width = px;
      shadow.style.height = px;
      return size;
    };

    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const hardSelector =
      "a, button, input, textarea, select, label, img, video, h1, h2, h3, h4, h5, h6, p, li, dt, dd, time, figcaption, blockquote, pre, code, nav, header, footer, .dots-menu-panel, .dots-nav, .register";

    const refreshObstacles = () => {
      const found: { l: number; t: number; r: number; b: number; hard: number }[] = [];
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const push = (list: NodeListOf<Element>, hard: number) => {
        list.forEach((el) => {
          if (el.closest(".roam-root")) return;
          const rect = el.getBoundingClientRect();
          if (rect.width < 2 || rect.height < 2) return;
          if (rect.bottom < 0 || rect.top > viewH || rect.right < 0 || rect.left > viewW) return;
          found.push({ l: rect.left, t: rect.top, r: rect.right, b: rect.bottom, hard });
        });
      };
      push(document.querySelectorAll(hardSelector), 1);
      push(document.querySelectorAll(".stage-window"), 0);
      boxes = found;
    };

    const overlapAt = (cx: number, cy: number, reach: number) => {
      const l = cx - reach;
      const t = cy - reach;
      const r = cx + reach;
      const b = cy + reach;
      let hard = 0;
      let soft = 0;
      for (let i = 0; i < boxes.length; i += 1) {
        const box = boxes[i];
        const iw = Math.max(0, Math.min(r, box.r) - Math.max(l, box.l));
        if (iw === 0) continue;
        const ih = Math.max(0, Math.min(b, box.b) - Math.max(t, box.t));
        if (ih === 0) continue;
        const area = iw * ih;
        if (box.hard) hard += area;
        else soft += area;
      }
      return { hard, soft };
    };

    const aimEmpty = (wantX: number, wantY: number) => {
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const reach = size / 2 + 10;
      const step = Math.max(32, Math.round(size * 0.36));
      const margin = 10;
      const min = margin + size / 2;
      const maxX = viewW - margin - size / 2;
      const maxY = viewH - margin - size / 2;
      let best: { x: number; y: number } | null = null;
      let bestHard = Infinity;
      let bestSoft = Infinity;
      let bestNear = 1;
      let bestDist = Infinity;
      const keep = size * 0.9;
      const keep2 = keep * keep;

      const consider = (cx: number, cy: number) => {
        if (cx < min || cy < min || cx > maxX || cy > maxY) return;
        const hit = overlapAt(cx, cy, reach);
        const gap = pointer.on ? (cx - pointer.x) ** 2 + (cy - pointer.y) ** 2 : Infinity;
        const near = gap < keep2 ? 1 : 0;
        const dist = (cx - wantX) ** 2 + (cy - wantY) ** 2;
        const better =
          hit.hard < bestHard ||
          (hit.hard === bestHard && hit.soft < bestSoft) ||
          (hit.hard === bestHard && hit.soft === bestSoft && near < bestNear) ||
          (hit.hard === bestHard && hit.soft === bestSoft && near === bestNear && dist < bestDist);
        if (!better) return;
        bestHard = hit.hard;
        bestSoft = hit.soft;
        bestNear = near;
        bestDist = dist;
        best = { x: cx, y: cy };
      };

      for (let cy = min; cy <= maxY; cy += step) {
        for (let cx = min; cx <= maxX; cx += step) consider(cx, cy);
      }
      if (!best) return null;

      if (
        anchor &&
        anchor.x >= min &&
        anchor.y >= min &&
        anchor.x <= maxX &&
        anchor.y <= maxY
      ) {
        const held = overlapAt(anchor.x, anchor.y, reach);
        const gap = pointer.on ? (anchor.x - pointer.x) ** 2 + (anchor.y - pointer.y) ** 2 : Infinity;
        const near = gap < keep2 ? 1 : 0;
        const dist = (anchor.x - wantX) ** 2 + (anchor.y - wantY) ** 2;
        if (
          held.hard <= bestHard &&
          held.soft <= bestSoft + size * 12 &&
          near <= bestNear &&
          dist < bestDist + 170 * 170
        ) {
          return anchor;
        }
      }

      anchor = best;
      return best;
    };

    const texture = (play: boolean) => {
      root.querySelectorAll("animate").forEach((node) => {
        if (!(node instanceof SVGAnimateElement)) return;
        try {
          if (play) node.beginElement();
          else node.endElement();
        } catch {
          if (!play) node.remove();
        }
      });
    };

    const park = () => {
      const parked = ensureSize();
      refreshObstacles();
      const pocket = aimEmpty(window.innerWidth - parked, window.innerHeight - parked);
      const x = pocket
        ? Math.max(10, Math.min(window.innerWidth - parked - 10, pocket.x - parked / 2))
        : Math.max(10, window.innerWidth - parked - 20);
      const y = pocket
        ? Math.max(10, Math.min(window.innerHeight - parked - 10, pocket.y - parked / 2))
        : Math.max(10, window.innerHeight - parked - 22);
      pos.x = x;
      pos.y = y;
      mover.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      squish.style.transform = "none";
      shadow.style.transform = `translate3d(${x}px, ${y + parked * 0.74}px, 0) scale(0.72, 0.32)`;
      pupilL.style.transform = "translate3d(0, 0, 0)";
      pupilR.style.transform = "translate3d(0, 0, 0)";
      mover.dataset.ready = "true";
      shadow.dataset.ready = "true";
    };

    const showHappy = () => {
      mover.dataset.mood = "happy";
      window.clearTimeout(moodTimer);
      moodTimer = window.setTimeout(() => {
        delete mover.dataset.mood;
      }, 680);
    };

    const pokeBot = () => {
      showHappy();
      poke = 1;
      if (!motion.matches) hopRef.current = -760;
    };

    const onPointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onGrab = (event: PointerEvent) => {
      if (event.button !== 0) return;
      hold.on = true;
      hold.id = event.pointerId;
      hold.ox = event.clientX - pos.x;
      hold.oy = event.clientY - pos.y;
      hold.moved = 0;
      hold.lx = event.clientX;
      hold.ly = event.clientY;
      hold.lt = performance.now();
      mover.dataset.drag = "true";
      shadow.dataset.drag = "true";
      mover.setPointerCapture(event.pointerId);
    };
    const onDrag = (event: PointerEvent) => {
      if (!hold.on || event.pointerId !== hold.id) return;
      const now = performance.now();
      const dt = Math.max(8, now - hold.lt);
      hold.moved += Math.hypot(event.clientX - hold.lx, event.clientY - hold.ly);
      pos.vx = ((event.clientX - hold.lx) / dt) * 1000;
      pos.vy = ((event.clientY - hold.ly) / dt) * 1000;
      hold.lx = event.clientX;
      hold.ly = event.clientY;
      hold.lt = now;
      pos.x = event.clientX - hold.ox;
      pos.y = event.clientY - hold.oy;
      if (motion.matches) {
        const parked = ensureSize();
        mover.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        shadow.style.transform = `translate3d(${pos.x}px, ${pos.y + parked * 0.76}px, 0) scale(0.78, 0.3)`;
      }
    };
    const onDrop = (event: PointerEvent) => {
      if (!hold.on || event.pointerId !== hold.id) return;
      hold.on = false;
      delete mover.dataset.drag;
      delete shadow.dataset.drag;
      scanned = 0;
      clearHere = false;
      if (hold.moved < 10) {
        pos.vx = 0;
        pos.vy = 0;
        return;
      }
      suppressClick = true;
      if (motion.matches) {
        pos.vx = 0;
        pos.vy = 0;
        return;
      }
      freeUntil = performance.now() + 700;
    };
    const onClick = () => {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      pokeBot();
    };
    const onHot = () => {
      hot = true;
      mover.dataset.hot = "true";
    };
    const onCold = () => {
      hot = false;
      delete mover.dataset.hot;
    };
    const onResize = () => {
      measure();
      anchor = null;
      scanned = 0;
      if (motion.matches) park();
    };
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        return;
      }
      if (!motion.matches && !stopped) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const onMotion = () => {
      cancelAnimationFrame(frame);
      if (motion.matches) {
        texture(false);
        pos.vx = 0;
        pos.vy = 0;
        park();
        return;
      }
      texture(true);
      last = 0;
      booted = false;
      frame = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      if (stopped || motion.matches) return;
      frame = requestAnimationFrame(tick);
      if (!last) last = now;
      const dt = Math.min(0.034, (now - last) / 1000);
      last = now;
      if (dt <= 0) return;

      if ((frames & 23) === 0) measure();
      frames += 1;

      const current = ensureSize();
      const t = now / 1000;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const phase = t * 0.36 + progress * Math.PI * 3.5;
      const wobble = t * 0.2 + progress * 1.8;
      const pad = Math.max(8, current * 0.08);
      const travelX = Math.max(1, window.innerWidth - current - pad * 2);
      const travelY = Math.max(1, window.innerHeight - current - pad * 2);
      let nx = 0.5 + Math.sin(phase) * 0.4 + Math.sin(wobble * 2.05) * 0.07;
      let ny = 0.48 + Math.sin(phase * 0.73 + 1.35) * 0.38 + Math.cos(wobble) * 0.08;
      nx = Math.min(0.97, Math.max(0.03, nx));
      ny = Math.min(0.95, Math.max(0.05, ny));
      let tx = pad + nx * travelX;
      let ty = pad + ny * travelY;
      if (!hold.on && now - scanned > 280) {
        scanned = now;
        refreshObstacles();
        anchor = aimEmpty(tx + current / 2, ty + current / 2);
        const cover = overlapAt(pos.x + current / 2, pos.y + current / 2, current * 0.42);
        clearHere = cover.hard === 0;
      }
      if (!hold.on && hot && clearHere) {
        tx = pos.x;
        ty = pos.y;
      } else if (!hold.on && anchor) {
        tx = anchor.x - current / 2 + Math.sin(t * 1.35) * 6;
        ty = anchor.y - current / 2 + Math.cos(t * 1.1) * 5;
      }

      if (!booted) {
        booted = true;
        pos.x = tx;
        pos.y = ty;
        lag.x = tx;
        lag.y = ty;
        pos.vy = -180;
        mover.dataset.ready = "true";
        shadow.dataset.ready = "true";
      } else if (!hold.on) {
        if (hopRef.current) {
          pos.vy += hopRef.current;
          hopRef.current = 0;
        }
        const loose = performance.now() < freeUntil;
        const spring = loose ? 3.5 : 18;
        const damp = loose ? 2.4 : 7.4;
        pos.vx += (spring * (tx - pos.x) - damp * pos.vx) * dt;
        pos.vy += (spring * (ty - pos.y) - damp * pos.vy) * dt;
        pos.x += pos.vx * dt;
        pos.y += pos.vy * dt;
      }

      const maxX = Math.max(pad, window.innerWidth - current - pad);
      const maxY = Math.max(pad, window.innerHeight - current - pad);
      if (pos.x < pad) {
        pos.x = pad;
        pos.vx *= -0.28;
      } else if (pos.x > maxX) {
        pos.x = maxX;
        pos.vx *= -0.28;
      }
      if (pos.y < pad) {
        pos.y = pad;
        pos.vy *= -0.28;
      } else if (pos.y > maxY) {
        pos.y = maxY;
        pos.vy *= -0.28;
      }

      const bob = hold.on ? 0 : Math.sin(t * 5.15);
      const lift = bob * current * 0.045;
      const speed = Math.hypot(pos.vx, pos.vy);
      const stretch = Math.min(0.2, speed / 1450);
      const land = Math.max(0, -bob) * 0.075;
      poke = Math.max(0, poke - dt * 2.4);
      const poked = Math.sin(Math.min(1, poke) * Math.PI) * 0.16;
      const greet = hot && !hold.on ? 0.06 : 0;
      const held = hold.on ? 0.1 : 0;
      const sx = 1 + stretch + poked + greet + held;
      const sy = Math.max(0.72, 1 - stretch * 0.72 - poked + greet - held);
      const ang = speed > 36 ? Math.atan2(pos.vy, pos.vx) : 0;
      const lean = Math.max(-11, Math.min(11, pos.vx / 68));

      mover.style.transform = `translate3d(${pos.x}px, ${pos.y + lift}px, 0) rotate(${lean}deg)`;
      squish.style.transform = `scale(${1 + land}, ${1 - land}) rotate(${ang}rad) scale(${sx}, ${sy}) rotate(${-ang}rad)`;

      lag.x += (pos.x - lag.x) * Math.min(1, dt * 7);
      lag.y += (pos.y - lag.y) * Math.min(1, dt * 7);
      const shade = 0.84 - bob * 0.1;
      shadow.style.transform = `translate3d(${lag.x}px, ${lag.y + current * 0.76}px, 0) scale(${shade}, 0.34)`;

      const cx = pos.x + current / 2;
      const cy = pos.y + lift + current * 0.46;
      const dx = pointer.on ? pointer.x - cx : Math.sin(t * 0.82) * current * 0.85;
      const dy = pointer.on ? pointer.y - cy : Math.cos(t * 0.61) * current * 0.4;
      const dist = Math.hypot(dx, dy) || 1;
      const maxLook = current * 0.032;
      const mag = Math.min(maxLook, dist) / dist;
      const targetX = dx * mag;
      const targetY = dy * mag;
      look.vx += (64 * (targetX - look.x) - 14 * look.vx) * dt;
      look.vy += (64 * (targetY - look.y) - 14 * look.vy) * dt;
      look.x += look.vx * dt;
      look.y += look.vy * dt;
      const gaze = `translate3d(${look.x}px, ${look.y}px, 0)`;
      pupilL.style.transform = gaze;
      pupilR.style.transform = gaze;
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    motion.addEventListener("change", onMotion);
    mover.addEventListener("pointerdown", onGrab);
    mover.addEventListener("pointermove", onDrag);
    mover.addEventListener("pointerup", onDrop);
    mover.addEventListener("pointercancel", onDrop);
    mover.addEventListener("pointerenter", onHot);
    mover.addEventListener("pointerleave", onCold);
    mover.addEventListener("click", onClick);

    measure();
    if (motion.matches) {
      texture(false);
      park();
    } else {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      motion.removeEventListener("change", onMotion);
      mover.removeEventListener("pointerdown", onGrab);
      mover.removeEventListener("pointermove", onDrag);
      mover.removeEventListener("pointerup", onDrop);
      mover.removeEventListener("pointercancel", onDrop);
      mover.removeEventListener("pointerenter", onHot);
      mover.removeEventListener("pointerleave", onCold);
      mover.removeEventListener("click", onClick);
      window.clearTimeout(moodTimer);
    };
  }, []);

  return (
    <div className="roam-root" ref={rootRef}>
      <svg className="roam-defs" aria-hidden focusable="false">
        <filter id="roam-felt" x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="big">
            <animate
              attributeName="baseFrequency"
              values="0.032;0.052;0.038;0.046;0.032"
              dur="6.4s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="big" stdDeviation="0.7" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="11" xChannelSelector="R" yChannelSelector="G" result="wool">
            <animate attributeName="scale" values="9;12;10;11.5;9" dur="5.6s" repeatCount="indefinite" />
          </feDisplacementMap>
          <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed="9" result="fine" />
          <feDisplacementMap in="wool" in2="fine" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="roam-nap" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.045 0.86" numOctaves="3" seed="5" result="noise">
            <animate
              attributeName="baseFrequency"
              values="0.04 0.78;0.055 0.94;0.036 0.8;0.04 0.78"
              dur="7.2s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alpha" />
          <feFlood floodColor="#059676" floodOpacity="1" result="dye" />
          <feComposite in="dye" in2="alpha" operator="in" result="fibers" />
          <feComposite in="fibers" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="roam-grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.45" numOctaves="4" seed="3" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            result="colored"
            values="0.08 0 0 0 0.01  0 0.55 0 0 0.1  0 0 0.4 0 0.07  0 0 0 0.95 0"
          />
          <feComposite in="colored" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="roam-lint" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="2" seed="11" result="noise" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alpha" />
          <feComponentTransfer in="alpha" result="sparse">
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0.25 0.9 1" />
          </feComponentTransfer>
          <feFlood floodColor="#fffdfd" floodOpacity="1" result="white" />
          <feComposite in="white" in2="sparse" operator="in" result="specks" />
          <feComposite in="specks" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>

      <div className="roam-shadow" ref={shadowRef} aria-hidden />
      <button
        type="button"
        className="roam-mover"
        ref={moverRef}
        aria-label="Poke or drag the bot"
      >
        <div className="roam-squish" ref={squishRef}>
          <span className="roam-fuzz" />
          <span className="roam-under" />
          <div className="roam-plush">
            <span className="roam-ball" />
            <span className="roam-belly" />
            <span className="roam-sheen" />
            <span className="roam-hairs" />
            <span className="roam-hairs roam-hairs-b" />
            <svg className="roam-map roam-map-nap" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#000" filter="url(#roam-nap)" />
            </svg>
            <svg className="roam-map roam-map-grain" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#000" filter="url(#roam-grain)" />
            </svg>
            <svg className="roam-map roam-map-lint" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#000" filter="url(#roam-lint)" />
            </svg>
          </div>
          <span className="roam-cheek roam-cheek-l" />
          <span className="roam-cheek roam-cheek-r" />
          <div className="roam-face">
            <div className="roam-eyes">
              <span className="roam-eye">
                <span className="roam-pupil" ref={pupilLRef} />
              </span>
              <span className="roam-eye">
                <span className="roam-pupil" ref={pupilRRef} />
              </span>
            </div>
            <svg className="roam-mouth" viewBox="0 0 40 16">
              <path
                d="M4 4.2c6.2 9.2 25.6 9.2 32 0"
                fill="none"
                stroke="#06382e"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
