import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

/**
 * One soft light source for the whole site.
 * - Mouse: follows the cursor with a spring-like ease.
 * - Touch: drifts slowly by itself and responds to scroll.
 * - Reduced motion: fixed at the top-left.
 * Writes --lx / --ly (viewport px) on <html> and notifies subscribers each frame.
 */
const LightContext = createContext({ subscribe: () => () => {} });

export function LightProvider({ children }) {
  const subs = useRef(new Set());
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const start = () => ({ x: window.innerWidth * 0.18, y: window.innerHeight * 0.14 });
    const cur = { ...start() };
    const target = { ...cur };
    let pointerSeen = false;
    let raf = 0;
    let t0 = performance.now();

    const write = () => {
      root.style.setProperty('--lx', `${cur.x.toFixed(1)}px`);
      root.style.setProperty('--ly', `${cur.y.toFixed(1)}px`);
      pos.current = { x: cur.x, y: cur.y };
      subs.current.forEach(fn => fn(cur.x, cur.y));
    };

    if (reduce) {
      write();
      const onResize = () => { Object.assign(cur, start()); write(); };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const onMove = e => {
      if (e.pointerType !== 'mouse') return;
      pointerSeen = true;
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = now => {
      const t = (now - t0) / 1000;
      if (!fine || !pointerSeen) {
        // Autonomous drift: a slow lissajous across the upper part of the viewport, nudged by scroll.
        const w = window.innerWidth;
        const h = window.innerHeight;
        const s = window.scrollY * 0.0006;
        target.x = w * (0.5 + 0.38 * Math.sin(t * 0.22 + s));
        target.y = h * (0.32 + 0.22 * Math.sin(t * 0.31 + 1.3 + s * 1.7));
      }
      const k = pointerSeen ? 0.12 : 0.05;
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        cur.x += dx * k;
        cur.y += dy * k;
        write();
      }
      raf = requestAnimationFrame(tick);
    };
    write();
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { t0 = performance.now() - 1000; raf = requestAnimationFrame(tick); }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const value = useMemo(
    () => ({
      subscribe: fn => {
        subs.current.add(fn);
        fn(pos.current.x, pos.current.y);
        return () => subs.current.delete(fn);
      },
    }),
    []
  );

  return <LightContext.Provider value={value}>{children}</LightContext.Provider>;
}

export const useLight = () => useContext(LightContext);
