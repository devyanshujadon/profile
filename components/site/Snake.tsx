"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleStop, Play, RotateCcw } from "lucide-react";

const N = 12;

type Point = { x: number; y: number };

type Theme = {
  plate: string;
  wellTop: string;
  wellBot: string;
  shade: string;
  bodyTop: string;
  bodyBot: string;
  headTop: string;
  headBot: string;
};

const DARK: Theme = {
  plate: "oklch(0.28 0.02 232)",
  wellTop: "oklch(0.18 0.02 236)",
  wellBot: "oklch(0.22 0.02 234)",
  shade: "oklch(0 0 0 / 0.55)",
  bodyTop: "oklch(0.78 0.1 215)",
  bodyBot: "oklch(0.52 0.1 230)",
  headTop: "oklch(0.92 0.06 210)",
  headBot: "oklch(0.66 0.11 220)",
};

const LIGHT: Theme = {
  plate: "oklch(0.95 0.008 240)",
  wellTop: "oklch(0.86 0.014 245)",
  wellBot: "oklch(0.90 0.01 242)",
  shade: "oklch(0.25 0.04 250 / 0.35)",
  bodyTop: "oklch(0.62 0.12 235)",
  bodyBot: "oklch(0.4 0.13 250)",
  headTop: "oklch(0.78 0.1 220)",
  headBot: "oklch(0.46 0.14 245)",
};

function themeNow(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? LIGHT : DARK;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function paintEngraved(ctx: CanvasRenderingContext2D, size: number, theme: Theme) {
  const gap = Math.max(1, Math.round(size * 0.08));
  const x = gap / 2;
  const y = gap / 2;
  const w = size - gap;
  const h = size - gap;
  const radius = Math.max(1.5, size * 0.14);
  const lip = Math.max(1.5, size * 0.2);

  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();
  const floor = ctx.createLinearGradient(x, y, x, y + h);
  floor.addColorStop(0, theme.wellTop);
  floor.addColorStop(1, theme.wellBot);
  ctx.fillStyle = floor;
  ctx.fillRect(x, y, w, h);
  const topShade = ctx.createLinearGradient(x, y, x, y + lip);
  topShade.addColorStop(0, "oklch(0 0 0 / 0.28)");
  topShade.addColorStop(1, "oklch(0 0 0 / 0)");
  ctx.fillStyle = topShade;
  ctx.fillRect(x, y, w, lip);
  const leftShade = ctx.createLinearGradient(x, y, x + lip, y);
  leftShade.addColorStop(0, "oklch(0 0 0 / 0.14)");
  leftShade.addColorStop(1, "oklch(0 0 0 / 0)");
  ctx.fillStyle = leftShade;
  ctx.fillRect(x, y, lip, h);
  const bottomLip = ctx.createLinearGradient(x, y + h - lip, x, y + h);
  bottomLip.addColorStop(0, "oklch(1 0 0 / 0)");
  bottomLip.addColorStop(1, "oklch(1 0 0 / 0.42)");
  ctx.fillStyle = bottomLip;
  ctx.fillRect(x, y + h - lip, w, lip);
  ctx.restore();
}

function paintRaised(
  ctx: CanvasRenderingContext2D,
  size: number,
  top: string,
  bot: string,
  theme: Theme,
) {
  const gap = Math.max(2, Math.round(size * 0.16));
  const x = gap / 2;
  const y = gap / 2;
  const w = size - gap;
  const h = size - gap;
  const radius = Math.max(1.5, size * 0.16);
  const bevel = Math.max(1.25, size * 0.1);

  ctx.save();
  ctx.shadowColor = theme.shade;
  ctx.shadowBlur = Math.max(0.5, size * 0.05);
  ctx.shadowOffsetX = size * 0.02;
  ctx.shadowOffsetY = Math.max(0.6, size * 0.06);
  const fill = ctx.createLinearGradient(x, y, x, y + h);
  fill.addColorStop(0, top);
  fill.addColorStop(1, bot);
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, w, h, radius);
  ctx.fill();
  ctx.restore();

  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();
  const hi = ctx.createLinearGradient(x, y, x, y + bevel * 1.5);
  hi.addColorStop(0, "oklch(1 0 0 / 0.38)");
  hi.addColorStop(1, "oklch(1 0 0 / 0)");
  ctx.fillStyle = hi;
  ctx.fillRect(x, y, w, bevel * 1.5);
  const shade = ctx.createLinearGradient(x, y + h - bevel, x, y + h);
  shade.addColorStop(0, "oklch(0 0 0 / 0)");
  shade.addColorStop(1, "oklch(0 0 0 / 0.26)");
  ctx.fillStyle = shade;
  ctx.fillRect(x, y + h - bevel, w, bevel);
  ctx.restore();
}

function makeTiles(cell: number, dpr: number, theme: Theme) {
  const kinds = ["empty", "body", "head", "food"] as const;
  const tiles = {} as Record<(typeof kinds)[number], HTMLCanvasElement>;
  for (const kind of kinds) {
    const tile = document.createElement("canvas");
    tile.width = Math.round(cell * dpr);
    tile.height = Math.round(cell * dpr);
    const ctx = tile.getContext("2d");
    if (!ctx) continue;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cell, cell);
    if (kind === "empty") paintEngraved(ctx, cell, theme);
    if (kind === "body") paintRaised(ctx, cell, theme.bodyTop, theme.bodyBot, theme);
    if (kind === "head") paintRaised(ctx, cell, theme.headTop, theme.headBot, theme);
    if (kind === "food") paintRaised(ctx, cell, theme.bodyTop, theme.bodyBot, theme);
    tiles[kind] = tile;
  }
  return tiles;
}

function spawn(): Point[] {
  const y = Math.floor(N / 2);
  const x = Math.floor(N / 2) - 2;
  return [
    { x, y },
    { x: x + 1, y },
    { x: x + 2, y },
    { x: x + 3, y },
  ];
}

function occupied(snake: Point[], cell: Point) {
  return snake.some((part) => part.x === cell.x && part.y === cell.y);
}

function placeFood(snake: Point[]): Point {
  for (let i = 0; i < 8000; i++) {
    const cell = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) };
    if (!occupied(snake, cell)) return cell;
  }
  return { x: 0, y: 0 };
}

type Run = {
  snake: Point[];
  dir: Point;
  queued: Point;
  food: Point;
  alive: boolean;
  running: boolean;
  score: number;
  best: number;
};

export function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const run = useRef<Run>({
    snake: spawn(),
    dir: { x: 1, y: 0 },
    queued: { x: 1, y: 0 },
    food: { x: 9, y: 2 },
    alive: true,
    running: false,
    score: 0,
    best: 0,
  });
  const tiles = useRef<ReturnType<typeof makeTiles> | null>(null);
  const cellRef = useRef(12);
  const [hud, setHud] = useState("12 by 12. Click the board, then steer.");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [played, setPlayed] = useState(false);
  const [running, setRunning] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const sprites = tiles.current;
    if (!canvas || !sprites) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cell = cellRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = themeNow().plate;
    ctx.fillRect(0, 0, N * cell, N * cell);
    const { snake, food } = run.current;
    const head = snake[snake.length - 1];
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        ctx.drawImage(sprites.empty, x * cell, y * cell, cell, cell);
      }
    }
    ctx.drawImage(sprites.food, food.x * cell, food.y * cell, cell, cell);
    for (let i = 0; i < snake.length; i++) {
      const part = snake[i];
      const sprite = part === head ? sprites.head : sprites.body;
      ctx.drawImage(sprite, part.x * cell, part.y * cell, cell, cell);
    }
    const dir = run.current.dir;
    const eye = Math.max(2, Math.round(cell * 0.16));
    const ox = dir.x * cell * 0.16;
    const oy = dir.y * cell * 0.16;
    const px = -dir.y * cell * 0.14;
    const py = dir.x * cell * 0.14;
    ctx.fillStyle = "oklch(0.16 0.04 250 / 0.92)";
    for (const side of [-1, 1]) {
      const ex = Math.round(head.x * cell + cell / 2 + ox + px * side - eye / 2);
      const ey = Math.round(head.y * cell + cell / 2 + oy + py * side - eye / 2);
      ctx.fillRect(ex, ey, eye, eye);
    }
  }, []);

  const fit = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const style = getComputedStyle(wrap);
    const pad = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const width = wrap.clientWidth - pad;
    // Same block scale as the old 64-across field (~16px), so 12×12 stays a small board.
    const cell = Math.min(16, Math.max(10, Math.floor(width / N)));
    cellRef.current = cell;
    const px = N * cell;
    canvas.style.width = `${px}px`;
    canvas.style.height = `${px}px`;
    canvas.width = Math.round(px * dpr);
    canvas.height = Math.round(px * dpr);
    tiles.current = makeTiles(cell, dpr, themeNow());
    paint();
  }, [paint]);

  const publish = useCallback((text: string) => {
    const state = run.current;
    setScore(state.score);
    setBest(state.best);
    setHud(text);
  }, []);

  const reset = useCallback(() => {
    const snake = spawn();
    run.current.snake = snake;
    run.current.dir = { x: 1, y: 0 };
    run.current.queued = { x: 1, y: 0 };
    run.current.food = placeFood(snake);
    run.current.alive = true;
    run.current.running = false;
    run.current.score = 0;
    setRunning(false);
    publish("Ready. Arrow keys, WASD, or the pad.");
    paint();
  }, [paint, publish]);

  const turn = useCallback(
    (x: number, y: number) => {
      const state = run.current;
      const next = { x, y };
      if (!state.alive) {
        reset();
        state.dir = next;
        state.queued = next;
        state.running = true;
        setPlayed(true);
        setRunning(true);
        publish("Running.");
        canvasRef.current?.focus();
        return;
      }
      const basis = state.running ? state.dir : state.queued;
      if (next.x === -basis.x && next.y === -basis.y && state.snake.length > 1) return;
      state.queued = next;
      if (!state.running) {
        state.dir = next;
        state.running = true;
        setPlayed(true);
        setRunning(true);
        publish("Running.");
      }
      canvasRef.current?.focus();
    },
    [publish, reset],
  );

  useEffect(() => {
    run.current.food = placeFood(run.current.snake);
    fit();
    const wrap = wrapRef.current;
    const observer = new ResizeObserver(() => fit());
    if (wrap) observer.observe(wrap);
    const theme = new MutationObserver(() => fit());
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      observer.disconnect();
      theme.disconnect();
    };
  }, [fit]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const state = run.current;
      if (!state.running || !state.alive) return;
      const queued = state.queued;
      if (!(queued.x === -state.dir.x && queued.y === -state.dir.y)) state.dir = queued;
      const head = state.snake[state.snake.length - 1];
      const next = {
        x: (head.x + state.dir.x + N) % N,
        y: (head.y + state.dir.y + N) % N,
      };
      const eating = next.x === state.food.x && next.y === state.food.y;
      const body = eating ? state.snake : state.snake.slice(0, -1);
      if (occupied(body, next)) {
        state.alive = false;
        state.running = false;
        setRunning(false);
        publish(`Hit something. Length ${state.snake.length}.`);
        paint();
        return;
      }
      state.snake.push(next);
      if (next.x === state.food.x && next.y === state.food.y) {
        state.score += 1;
        if (state.score > state.best) state.best = state.score;
        state.food = placeFood(state.snake);
        publish(`Ate one. Length ${state.snake.length}.`);
      } else {
        state.snake.shift();
      }
      paint();
    }, 130);
    return () => window.clearInterval(id);
  }, [paint, publish]);

  const stop = useCallback(() => {
    if (!run.current.running) return;
    run.current.running = false;
    setRunning(false);
    publish("Stopped.");
  }, [publish]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function onKey(event: KeyboardEvent) {
      if (document.activeElement !== canvas) return;
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const next = map[event.key];
      if (!next) return;
      event.preventDefault();
      turn(next.x, next.y);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let startX = 0;
    let startY = 0;
    function down(event: TouchEvent) {
      startX = event.changedTouches[0].clientX;
      startY = event.changedTouches[0].clientY;
    }
    function up(event: TouchEvent) {
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.hypot(dx, dy) < 16) return;
      if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 1 : -1, 0);
      else turn(0, dy > 0 ? 1 : -1);
    }
    canvas.addEventListener("touchstart", down, { passive: true });
    canvas.addEventListener("touchend", up, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", down);
      canvas.removeEventListener("touchend", up);
    };
  }, [turn]);

  return (
    <article className="lab-bay lab-snake">
      <h3>Snake</h3>
      <p>A 12 by 12 field of blocks. Eat the lone block. Leave one edge and you come back on the other. Your own tail stops the run.</p>
      <p className="lab-status" aria-live="polite">{hud}</p>
      <div className="lab-actions">
        <button
          type="button"
          className="btn-ghost snake-icon"
          aria-label={played ? "Again" : "Start"}
          title={played ? "Again" : "Start"}
          onClick={() => {
            reset();
            turn(1, 0);
          }}
        >
          {played ? <RotateCcw size={16} strokeWidth={2.2} aria-hidden="true" /> : <Play size={16} strokeWidth={2.2} aria-hidden="true" />}
        </button>
        <button
          type="button"
          className="btn-ghost snake-icon"
          aria-label="Stop"
          title="Stop"
          onClick={stop}
          disabled={!running}
        >
          <CircleStop size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <span className="lab-best">
          Eaten {score}
          {best > 0 ? ` · Best ${best}` : ""}
        </span>
      </div>
      <div className="snake-pad" role="group" aria-label="Steer">
        <button type="button" className="lab-pad" onClick={() => turn(0, -1)} aria-label="Up" title="Up">
          <ChevronUp size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <button type="button" className="lab-pad" onClick={() => turn(-1, 0)} aria-label="Left" title="Left">
          <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <button type="button" className="lab-pad" onClick={() => turn(0, 1)} aria-label="Down" title="Down">
          <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <button type="button" className="lab-pad" onClick={() => turn(1, 0)} aria-label="Right" title="Right">
          <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
      <div className="lab-snake-scroll" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          className="lab-snake-board"
          tabIndex={0}
          role="application"
          aria-label="Snake on a 12 by 12 grid. Arrow keys or W A S D move."
        />
      </div>
    </article>
  );
}
