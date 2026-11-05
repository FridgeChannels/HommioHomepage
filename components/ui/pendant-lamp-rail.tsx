"use client";

import * as React from "react";
import "./pendant-lamp-rail.css";

export interface PendantLamp {
  id: string;
  name: string;
  description?: string;
  /** Full explanation shown with the active lamp. */
  body?: string;
  image: string;
  imageOn?: string;
  drop?: number;
  glow?: string;
  tag?: string;
  details?: string[];
}

export interface PendantLampRailProps extends React.ComponentProps<"section"> {
  items: PendantLamp[];
  eyebrow?: string;
  heading?: string;
  caption?: string;
  action?: React.ReactNode;
  autoplay?: boolean;
  interval?: number;
  active?: number | null;
  onActiveChange?: (index: number | null) => void;
}

const ASPECT = 2 / 3;
const MAX_HEIGHT = 200;
const CAROUSEL_HEIGHT = 224;
const LAMP_IMAGES = [
  {
    image: "https://cdn.21st.dev/assets/mirror/fc/fcfdfbf3d62f14d97eb23453aa9fe6772f7c09b521226442621e4f187d79b4d6.webp",
    imageOn: "https://cdn.21st.dev/assets/mirror/2d/2d2990c7f5d56e69848237695a204baf6a366d180facb94c62b78cdc3e37dd13.webp",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/ba/ba2f12a44156865baeb4c1173a7d320384edc5156dcaf1d4e44e684ae780ba57.webp",
    imageOn: "https://cdn.21st.dev/assets/mirror/a5/a55502eb9cf6cac0bd52969eb61bb546a478e861f3568aad6875e4dad5c03f6e.webp",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/96/968b92c5f3adc4a3f45d627f339fa2c4017a70a0d57f7c68b8a0c5b4ace6aef3.webp",
    imageOn: "https://cdn.21st.dev/assets/mirror/cc/cc2aa1c7f32e04bc950f63274f28986c573a8ad2c27f84eef148191a1178d424.webp",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/12/1237597f711ee8334bad09432954cf04fe8cc104877dece6d0986441e59030a9.webp",
    imageOn: "https://cdn.21st.dev/assets/mirror/39/394b02f1dff009ebace53699c42c4d817dfffd5aff943d888454a83036ce1fb.webp",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/dd/dd85e367f381884fa9147495c1025af4faed8a2f7ec1bc3cd82bbdc9a3c2815b.webp",
    imageOn: "https://cdn.21st.dev/assets/mirror/a9/a9e6b40b11b3abca1a39acd32489b66f6094f3ecb5361862c16a1d36599ad60c.webp",
  },
];

export function makeGoalLamps<T extends { id: string; number: string; title: string; summary: string; description: string }>(goals: T[]): PendantLamp[] {
  return goals.map((goal, index) => ({
    ...LAMP_IMAGES[index % LAMP_IMAGES.length],
    id: goal.id,
    name: `${goal.number}. ${goal.title}`,
    description: goal.summary,
    body: goal.description,
    drop: [0.62, 0.9, 0.74, 1, 0.68][index % 5],
    glow: index % 2 ? "#d3e6ff" : "#d8dfc1",
  }));
}

type RailSize = { width: number; height: number; lampHeight: number; lampWidth: number; carousel: boolean; pivot: number; cords: number[]; centers: number[] };
type PointerState = { id: number; index: number; x: number; lastX: number; kind: string; moved: boolean; swipe: number };

function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)); }

function makeSize(width: number, count: number, drops: number[], carouselIndex: number, swipe: number): RailSize {
  const fit = (width - 32) / (Math.max(1, count) * ASPECT * 1.1);
  const carousel = count > 1 && fit < 112;
  const lampHeight = Math.round((carousel ? Math.min(CAROUSEL_HEIGHT, Math.max(170, width * 0.56)) : Math.min(MAX_HEIGHT, Math.max(60, fit))) * 10) / 10;
  const lampWidth = lampHeight * ASPECT;
  const track = Math.round(clamp(lampHeight * 0.05, 6, 12));
  const adapter = Math.round(clamp(lampHeight * 0.075, 8, 17));
  const pivot = 8 + Math.round(track * 0.6) + adapter;
  const cords = drops.map(drop => Math.round(lampHeight * 0.7 * drop));
  const centers = carousel
    ? Array.from({ length: count }, (_, index) => width / 2 + (index - carouselIndex) * lampWidth * 1.08 + swipe)
    : (() => {
        const edge = Math.max(16, lampWidth * 0.3);
        const foot = lampWidth * 0.88;
        const spacing = clamp((width - edge * 2) / Math.max(1, count), foot * 1.04, lampWidth * 1.42);
        const start = (width - spacing * count) / 2 + spacing / 2;
        return Array.from({ length: count }, (_, index) => start + index * spacing);
      })();
  return { width, height: Math.round(pivot + Math.max(0, ...cords) + lampHeight * 0.98), lampHeight, lampWidth, carousel, pivot, cords, centers };
}

export function PendantLampRail({
  items,
  eyebrow,
  heading,
  caption,
  action,
  autoplay = false,
  interval = 2600,
  active: activeProp,
  onActiveChange,
  className,
  onPointerLeave,
  ...rest
}: PendantLampRailProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const slotRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const pointer = React.useRef<PointerState>({ id: -1, index: -1, x: 0, lastX: 0, kind: "", moved: false, swipe: 0 });
  const controlled = activeProp !== undefined;
  const [innerActive, setInnerActive] = React.useState<number | null>(null);
  const [size, setSize] = React.useState({ width: 0, carousel: false, lampHeight: 150 });
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const [swipe, setSwipe] = React.useState(0);
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [swing, setSwing] = React.useState(0);
  const [failed, setFailed] = React.useState<number[]>([]);
  const [playing, setPlaying] = React.useState(autoplay);
  const [reduced, setReduced] = React.useState(false);
  const count = items.length;
  const requested = controlled ? activeProp : innerActive;
  const active = requested !== null && requested !== undefined && requested >= 0 && requested < count ? requested : null;
  const drops = React.useMemo(() => items.map(item => clamp(item.drop ?? 0.75, 0.3, 1.2)), [items]);
  const geometry = React.useMemo(() => makeSize(size.width, count, drops, active ?? carouselIndex, swipe), [size.width, count, drops, active, carouselIndex, swipe]);
  const carousel = size.width > 0 && geometry.carousel;
  const currentIndex = active ?? (carousel ? carouselIndex : null);
  const current = currentIndex === null ? null : (items[currentIndex] ?? null);

  React.useEffect(() => {
    setPlaying(autoplay);
  }, [autoplay]);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const width = stage.clientWidth;
      const next = makeSize(width, count, drops, active ?? carouselIndex, swipe);
      setSize(old => old.width === width && old.carousel === next.carousel && old.lampHeight === next.lampHeight ? old : { width, carousel: next.carousel, lampHeight: next.lampHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [count, drops, active, carouselIndex, swipe]);

  const choose = React.useCallback((index: number | null) => {
    if (index !== null) setCarouselIndex(index);
    if (!controlled) setInnerActive(index);
    onActiveChange?.(index);
  }, [controlled, onActiveChange]);

  React.useEffect(() => {
    if (!playing || reduced || count === 0 || !size.width) return;
    const timer = window.setInterval(() => {
      const base = active ?? carouselIndex;
      choose((base + 1) % count);
    }, interval);
    return () => window.clearInterval(timer);
  }, [playing, reduced, count, size.width, interval, active, carouselIndex, choose]);

  function nearest(clientX: number) {
    const stage = stageRef.current;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    const x = clientX - rect.left;
    let best: number | null = null;
    let distance = Infinity;
    geometry.centers.forEach((center, index) => {
      const next = Math.abs(x - center);
      if (next < distance) { best = index; distance = next; }
    });
    return distance < geometry.lampWidth * 0.8 ? best : null;
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const index = nearest(event.clientX);
    if (index === null) return;
    pointer.current = { id: event.pointerId, index, x: event.clientX, lastX: event.clientX, kind: event.pointerType, moved: false, swipe: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPlaying(false);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = pointer.current;
    if (state.id === event.pointerId) {
      const delta = event.clientX - state.x;
      if (Math.abs(delta) > 6) state.moved = true;
      state.lastX = event.clientX;
      if (state.moved && carousel) {
        state.swipe = delta;
        setSwipe(delta);
      } else if (state.moved && state.index >= 0) {
        setDragIndex(state.index);
        setDragOffset(delta);
        setSwing(clamp(delta * 0.035, -14, 14));
      }
      return;
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = pointer.current;
    if (state.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointer.current = { ...state, id: -1 };
    if (state.moved && carousel) {
      const delta = event.clientX - state.x;
      const shift = Math.abs(delta) > 40 ? (delta < 0 ? 1 : -1) : 0;
      const next = clamp((active ?? carouselIndex) + shift, 0, count - 1);
      setSwipe(0);
      choose(next);
      return;
    }
    if (state.moved) {
      setDragOffset(0);
      window.setTimeout(() => { setSwing(0); setDragIndex(null); }, 520);
      choose(state.index);
      return;
    }
    if (state.kind !== "mouse" && state.index >= 0) choose(state.index);
  };

  return <section
    {...rest}
    data-slot="pendant-lamp-rail"
    data-mode={carousel ? "carousel" : "rail"}
    data-active={active ?? ""}
    aria-roledescription="lighting track"
    className={`relative isolate w-full overflow-hidden bg-background text-foreground ${className ?? ""}`}
    onPointerLeave={onPointerLeave}
  >
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(62% 48% at 50% 46%, color-mix(in oklab, var(--color-foreground) 4%, transparent), transparent)" }} />
    {(eyebrow || heading) && <header className="relative z-10 flex flex-col items-center gap-2 px-6 pt-8 text-center">
      {eyebrow && <p className="text-[11px] font-medium tracking-[0.22em] text-muted-foreground">{eyebrow}</p>}
      {heading && <h2 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">{heading}</h2>}
    </header>}

    <div
      ref={stageRef}
      data-stage
      role="group"
      aria-label={heading ?? "Pendant lamps"}
      className="relative mt-3 w-full touch-pan-y select-none"
      style={{ height: geometry.height, overflow: "visible", visibility: size.width ? "visible" : "hidden" }}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={event => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        setPlaying(false);
        const from = active ?? carouselIndex;
        const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : clamp(from + (event.key === "ArrowRight" ? 1 : -1), 0, count - 1);
        choose(next);
        slotRefs.current[next]?.focus({ preventScroll: true });
      }}
    >
      <div aria-hidden="true" data-track className="pointer-events-none absolute z-[1]" style={{ left: carousel ? 0 : 8, right: carousel ? 0 : 8, top: 8, height: clamp(geometry.lampHeight * 0.05, 6, 12) }}>
        <div className="absolute inset-x-0 h-3 rounded-full bg-foreground/10 blur-[5px]" style={{ top: 10 }} />
        <div className="absolute inset-0 rounded-[3px]" style={{ background: "linear-gradient(to bottom, color-mix(in oklab, var(--color-muted-foreground) 35%, white) 0%, white 16%, color-mix(in oklab, var(--color-muted-foreground) 70%, white) 36%, var(--color-muted-foreground) 64%, color-mix(in oklab, var(--color-muted-foreground) 55%, black) 100%)", boxShadow: "0 1px 0 color-mix(in oklab, var(--color-foreground) 18%, transparent)" }} />
        <div className="absolute inset-0 rounded-[3px] opacity-40 mix-blend-overlay" style={{ background: "repeating-linear-gradient(90deg, transparent 0 2px, color-mix(in oklab, white 40%, transparent) 2px 3px, transparent 3px 7px)" }} />
        {!carousel && [0, 1].map(side => <span key={side} className="absolute top-1/2 h-5 w-3 -translate-y-1/2 rounded-[3px]" style={{ [side ? "right" : "left"]: -4, background: "linear-gradient(to right, #8c8b86, #f8f6f0 50%, #96938c)", boxShadow: "0 3px 6px rgb(33 12 2 / .18)" }} />)}
      </div>

      {items.map((item, index) => {
        const center = geometry.centers[index] ?? 0;
        const cord = geometry.cords[index] ?? 0;
        const lit = currentIndex === index;
        const localOffset = dragIndex === index ? dragOffset : 0;
        const localSwing = dragIndex === index ? swing : 0;
        const failedImage = failed.includes(index);
        const style = {
          left: 0,
          top: geometry.pivot - 8,
          width: geometry.lampWidth,
          height: cord + geometry.lampHeight + 14,
          zIndex: lit ? 20 : 10,
          transform: `translate3d(${(center - geometry.lampWidth / 2 + localOffset).toFixed(2)}px,0,0)`,
          "--lit": lit ? 1 : 0.12,
          "--lamp-glow": item.glow ?? "#e7d4a2",
          "--lamp-height": `${geometry.lampHeight}px`,
          "--cord-height": `${cord}px`,
          "--swing": `${localSwing}deg`,
        } as React.CSSProperties;
        return <React.Fragment key={item.id}>
          <span aria-hidden="true" className="plr-light-pool" style={{ left: center, top: geometry.pivot + cord + geometry.lampHeight * 0.63, opacity: lit ? 0.8 : 0.08, "--lamp-glow": item.glow ?? "#e7d4a2" } as React.CSSProperties} />
          <span aria-hidden="true" className="plr-light-beam" style={{ left: center, top: geometry.pivot + cord + geometry.lampHeight * 0.28, height: geometry.lampHeight * 1.15, opacity: lit ? 0.34 : 0.035, "--lamp-glow": item.glow ?? "#e7d4a2" } as React.CSSProperties} />
          <button
            ref={node => { slotRefs.current[index] = node; }}
            type="button"
            data-lamp={index}
            data-lit={lit ? "true" : "false"}
            aria-label={item.name}
            tabIndex={index === (active ?? carouselIndex) ? 0 : -1}
            className="plr-pendant absolute left-0 cursor-pointer outline-none"
            style={style}
            onFocus={() => { setPlaying(false); choose(index); }}
            onPointerEnter={event => { if (event.pointerType === "mouse") { setPlaying(false); choose(index); } }}
          >
            <span aria-hidden="true" className="plr-adapter" />
            <span aria-hidden="true" className="plr-pendulum">
              <span aria-hidden="true" className="plr-cord" style={{ height: cord }} />
              <span className="plr-photo" style={{ top: cord, height: geometry.lampHeight }}>
                {failedImage ? <LampFallback name={item.name} /> : <>
                  {item.imageOn && <img src={item.imageOn} alt="" aria-hidden="true" draggable={false} className="plr-image plr-image--on" style={{ opacity: lit ? 1 : 0 }} onError={event => { event.currentTarget.style.display = "none"; }} />}
                  <img src={item.image} alt="" aria-hidden="true" draggable={false} className="plr-image" onError={() => setFailed(old => old.includes(index) ? old : [...old, index])} />
                </>}
                <span aria-hidden="true" className="plr-focus-ring" />
              </span>
            </span>
          </button>
        </React.Fragment>;
      })}

    </div>

    {carousel && count > 1 && <div aria-label="Choose a retention goal" className="relative z-10 mt-1 flex justify-center gap-1.5">
      {items.map((item, index) => <button key={item.id} type="button" aria-label={`Show ${item.name}`} aria-current={(active ?? carouselIndex) === index} onClick={() => { setPlaying(false); choose(index); }} className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${(active ?? carouselIndex) === index ? "w-6 bg-[var(--lamp-accent)]" : "w-1.5 bg-foreground/25"}`} />)}
    </div>}

    <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-8 pt-3 text-center">
      <div id={`${uid}-caption`} aria-live="polite" className="min-h-[4.25rem]">
          <p className="text-sm font-medium">
            {current ? current.name : caption}
            {current?.tag && <span className="ml-2 inline-flex -translate-y-px items-center rounded-full border border-border px-2 py-0.5 align-middle text-[11px] font-medium text-muted-foreground">{current.tag}</span>}
          </p>
          {current?.description && <p className="mx-auto mt-1 max-w-[46ch] text-balance text-[13px] leading-relaxed text-muted-foreground">{current.description}</p>}
          {current?.body && <p className="mx-auto mt-1 max-w-[46ch] text-balance text-[13px] leading-relaxed text-muted-foreground">{current.body}</p>}
          {current?.details?.map(detail => <p key={detail} className="mx-auto mt-1 max-w-[46ch] text-balance text-[13px] leading-relaxed text-muted-foreground">{detail}</p>)}
      </div>
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span aria-hidden="true" />
        <div className="justify-self-center">{action}</div>
        <span aria-hidden="true" />
      </div>
    </div>

  </section>;
}

function LampFallback({ name }: { name: string }) {
  return <svg aria-hidden="true" viewBox="0 0 200 300" className="plr-image plr-fallback">
    <defs><linearGradient id="plr-shade" x1="0" x2="1"><stop stopColor="#aaa99f"/><stop offset=".38" stopColor="#3f3c36"/><stop offset="1" stopColor="#171614"/></linearGradient></defs>
    <rect x="98" y="0" width="4" height="95" fill="#554f46"/>
    <path d={/globe|lantern|paper/i.test(name) ? "M100 85 C154 85 175 126 175 165 C175 210 144 236 100 236 C56 236 25 210 25 165 C25 126 46 85 100 85Z" : "M100 84 C60 86 38 123 23 218 C60 235 140 235 177 218 C162 123 140 86 100 84Z"} fill="url(#plr-shade)"/>
    <ellipse cx="100" cy="220" rx="46" ry="8" fill="var(--lamp-glow)" opacity="var(--lit)"/>
  </svg>;
}

export default PendantLampRail;
