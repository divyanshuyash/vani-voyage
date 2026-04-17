"use client";

import { type CSSProperties, useEffect, useRef } from "react";

const DOT_COUNT = 10;
const RING_COUNT = 2;
const BASE_ENERGY = 0.3;

interface Point {
  x: number;
  y: number;
}

interface Ring {
  x: number;
  y: number;
  life: number;
}

export default function AmbientCursorTrail() {
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const ringRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) {
      return;
    }

    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;

    const points: Point[] = Array.from({ length: DOT_COUNT }, () => ({ x: centerX, y: centerY }));
    const rings: Ring[] = Array.from({ length: RING_COUNT }, () => ({ x: centerX, y: centerY, life: 0 }));

    let raf = 0;
    let targetX = centerX;
    let targetY = centerY;
    let currentX = centerX;
    let currentY = centerY;
    let targetEnergy = BASE_ENERGY;
    let currentEnergy = targetEnergy;
    let lastInteraction = performance.now();

    const animate = (timestamp: number) => {
      currentX += (targetX - currentX) * 0.26;
      currentY += (targetY - currentY) * 0.26;
      targetEnergy += (BASE_ENERGY - targetEnergy) * 0.11;
      currentEnergy += (targetEnergy - currentEnergy) * 0.2;

      points[0].x = currentX;
      points[0].y = currentY;

      for (let i = 1; i < points.length; i += 1) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.44;
        points[i].y += (points[i - 1].y - points[i].y) * 0.44;
      }

      for (let i = 0; i < DOT_COUNT; i += 1) {
        const dot = dotRefs.current[i];
        if (!dot) {
          continue;
        }

        const point = points[i];
        const progress = 1 - i / DOT_COUNT;
        const sizeScale = 0.5 + progress * 0.7;
        const opacity = (0.05 + progress * 0.34) * (0.58 + currentEnergy * 0.55);

        dot.style.transform = `translate3d(${point.x.toFixed(2)}px, ${point.y.toFixed(2)}px, 0) scale(${sizeScale.toFixed(3)})`;
        dot.style.opacity = opacity.toFixed(4);
      }

      let hasActiveRing = false;
      for (let i = 0; i < RING_COUNT; i += 1) {
        const ring = ringRefs.current[i];
        const data = rings[i];

        if (!ring || !data) {
          continue;
        }

        if (data.life <= 0.01) {
          ring.style.opacity = "0";
          continue;
        }

        hasActiveRing = true;
        data.life -= 0.055;
        const progress = 1 - data.life;
        const scale = 0.72 + progress * 1.4;
        const opacity = Math.max(0, data.life) * (0.2 + currentEnergy * 0.28);

        ring.style.transform = `translate3d(${data.x.toFixed(2)}px, ${data.y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        ring.style.opacity = opacity.toFixed(4);
      }

      const settled =
        Math.abs(targetX - currentX) < 0.6 &&
        Math.abs(targetY - currentY) < 0.6 &&
        Math.abs(targetEnergy - currentEnergy) < 0.02;
      const recentlyActive = timestamp - lastInteraction < 120;

      if (!settled || hasActiveRing || recentlyActive) {
        raf = window.requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    };

    const startLoop = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    const spawnRing = (x: number, y: number) => {
      const slot = rings.find((ring) => ring.life <= 0.01) ?? rings[0];
      slot.x = x;
      slot.y = y;
      slot.life = 1;
    };

    const onMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      const speed = Math.hypot(event.movementX, event.movementY);
      targetEnergy = Math.min(0.95, 0.4 + speed * 0.018);
      lastInteraction = performance.now();

      if (speed > 22) {
        spawnRing(event.clientX, event.clientY);
      }

      startLoop();
    };

    const onMouseDown = (event: MouseEvent) => {
      targetEnergy = 1;
      spawnRing(event.clientX, event.clientY);
      lastInteraction = performance.now();
      startLoop();
    };

    const onMouseLeave = () => {
      targetEnergy = 0.2;
      lastInteraction = performance.now();
      startLoop();
    };

    const onResize = () => {
      targetX = window.innerWidth * 0.5;
      targetY = window.innerHeight * 0.5;
      lastInteraction = performance.now();
      startLoop();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);

      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="ambient-cursor-trail">
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <span
          key={`dot-${index}`}
          ref={(node) => {
            dotRefs.current[index] = node;
          }}
          className="ambient-trail-dot"
          style={{
            "--trail-index": index,
          } as CSSProperties}
        />
      ))}
      {Array.from({ length: RING_COUNT }).map((_, index) => (
        <span
          key={`ring-${index}`}
          ref={(node) => {
            ringRefs.current[index] = node;
          }}
          className="ambient-trail-ring"
        />
      ))}
    </div>
  );
}
