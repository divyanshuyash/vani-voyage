"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Tone = "accent" | "secondary" | "muted";

interface GlyphConfig {
  token: string;
  left: string;
  top: string;
  size: number;
  depth: number;
  delay: number;
  spin: number;
  tone: Tone;
}

const glyphs: GlyphConfig[] = [
  { token: "A", left: "4%", top: "10%", size: 54, depth: 1.18, delay: -2.2, spin: -3, tone: "accent" },
  { token: "E", left: "11%", top: "28%", size: 34, depth: 0.62, delay: -4.8, spin: 1.8, tone: "secondary" },
  { token: "I", left: "18%", top: "8%", size: 28, depth: 0.48, delay: -1.4, spin: -1.2, tone: "muted" },
  { token: "O", left: "26%", top: "22%", size: 58, depth: 1.22, delay: -3.6, spin: 2.4, tone: "accent" },
  { token: "U", left: "34%", top: "12%", size: 36, depth: 0.72, delay: -6.1, spin: -2, tone: "secondary" },
  { token: "VOICE", left: "43%", top: "8%", size: 22, depth: 0.84, delay: -5.3, spin: 1.5, tone: "accent" },
  { token: "S", left: "54%", top: "16%", size: 46, depth: 0.94, delay: -7.2, spin: -1.6, tone: "secondary" },
  { token: "P", left: "62%", top: "10%", size: 32, depth: 0.58, delay: -2.7, spin: 2.1, tone: "accent" },
  { token: "Q", left: "70%", top: "18%", size: 44, depth: 0.84, delay: -3.1, spin: -2.6, tone: "muted" },
  { token: "R", left: "78%", top: "10%", size: 34, depth: 0.56, delay: -1.9, spin: 1.6, tone: "accent" },
  { token: "FLUENCY", left: "88%", top: "16%", size: 20, depth: 0.88, delay: -6.9, spin: -1.1, tone: "secondary" },
  { token: "C", left: "6%", top: "50%", size: 46, depth: 0.96, delay: -5.7, spin: 2.3, tone: "secondary" },
  { token: "L", left: "14%", top: "64%", size: 32, depth: 0.62, delay: -4.3, spin: -1.8, tone: "muted" },
  { token: "T", left: "24%", top: "54%", size: 40, depth: 0.76, delay: -2.9, spin: 1.4, tone: "accent" },
  { token: "CLARITY", left: "34%", top: "68%", size: 20, depth: 0.82, delay: -6.4, spin: -1.6, tone: "secondary" },
  { token: "K", left: "47%", top: "58%", size: 42, depth: 0.9, delay: -3.4, spin: 2.7, tone: "muted" },
  { token: "M", left: "55%", top: "74%", size: 32, depth: 0.56, delay: -5.4, spin: -2.3, tone: "accent" },
  { token: "B", left: "66%", top: "62%", size: 38, depth: 0.7, delay: -7.9, spin: 1.9, tone: "secondary" },
  { token: "D", left: "74%", top: "76%", size: 32, depth: 0.6, delay: -2.1, spin: -1.6, tone: "muted" },
  { token: "F", left: "84%", top: "58%", size: 44, depth: 0.82, delay: -4.7, spin: 2.2, tone: "accent" },
  { token: "H", left: "92%", top: "38%", size: 26, depth: 0.42, delay: -3.3, spin: -1.3, tone: "secondary" },
  { token: "SPEAK", left: "92%", top: "76%", size: 18, depth: 0.74, delay: -5.8, spin: 1.4, tone: "accent" },
  { token: "CONFIDENCE", left: "50%", top: "88%", size: 17, depth: 0.92, delay: -8.1, spin: -1.1, tone: "secondary" },
];

export default function AmbientAlphabetBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const layer = layerRef.current;
    if (!layer) {
      return;
    }

    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (coarsePointer) {
      return;
    }

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetPointerX = window.innerWidth * 0.5;
    let targetPointerY = window.innerHeight * 0.5;
    let currentPointerX = targetPointerX;
    let currentPointerY = targetPointerY;
    let targetActive = 0.35;
    let currentActive = targetActive;
    let targetPulse = 0.55;
    let currentPulse = targetPulse;
    let targetTilt = 0;
    let currentTilt = targetTilt;

    const syncVars = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      currentPointerX += (targetPointerX - currentPointerX) * 0.18;
      currentPointerY += (targetPointerY - currentPointerY) * 0.18;
      currentActive += (targetActive - currentActive) * 0.16;
      targetPulse += (0.55 - targetPulse) * 0.1;
      currentPulse += (targetPulse - currentPulse) * 0.16;
      currentTilt += (targetTilt - currentTilt) * 0.14;

      layer.style.setProperty("--ambient-mx", currentX.toFixed(4));
      layer.style.setProperty("--ambient-my", currentY.toFixed(4));
      layer.style.setProperty("--ambient-cx", `${currentPointerX.toFixed(2)}px`);
      layer.style.setProperty("--ambient-cy", `${currentPointerY.toFixed(2)}px`);
      layer.style.setProperty("--ambient-active", currentActive.toFixed(4));
      layer.style.setProperty("--ambient-pulse", currentPulse.toFixed(4));
      layer.style.setProperty("--ambient-tilt", `${currentTilt.toFixed(3)}deg`);

      const isSettled =
        Math.abs(targetX - currentX) < 0.002 &&
        Math.abs(targetY - currentY) < 0.002 &&
        Math.abs(targetPointerX - currentPointerX) < 0.5 &&
        Math.abs(targetPointerY - currentPointerY) < 0.5 &&
        Math.abs(targetActive - currentActive) < 0.01 &&
        Math.abs(targetPulse - currentPulse) < 0.01 &&
        Math.abs(targetTilt - currentTilt) < 0.01;

      if (isSettled) {
        raf = 0;
        return;
      }

      raf = window.requestAnimationFrame(syncVars);
    };

    const onMove = (event: MouseEvent) => {
      targetX = ((event.clientX / window.innerWidth) - 0.5) * 2;
      targetY = ((event.clientY / window.innerHeight) - 0.5) * 2;
      targetPointerX = event.clientX;
      targetPointerY = event.clientY;
      targetActive = 1;
      targetPulse = Math.min(1.1, 0.6 + Math.hypot(event.movementX, event.movementY) * 0.025);
      targetTilt = ((event.clientX / window.innerWidth) - 0.5) * 1.2;

      if (!raf) {
        raf = window.requestAnimationFrame(syncVars);
      }
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      targetPointerX = window.innerWidth * 0.5;
      targetPointerY = window.innerHeight * 0.5;
      targetActive = 0.35;
      targetPulse = 0.55;
      targetTilt = 0;

      if (!raf) {
        raf = window.requestAnimationFrame(syncVars);
      }
    };

    const onResize = () => {
      targetPointerX = window.innerWidth * 0.5;
      targetPointerY = window.innerHeight * 0.5;

      if (!raf) {
        raf = window.requestAnimationFrame(syncVars);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="site-ambient-alphabet"
      style={{
        "--ambient-mx": 0,
        "--ambient-my": 0,
        "--ambient-cx": "50vw",
        "--ambient-cy": "50vh",
        "--ambient-active": 0.35,
        "--ambient-pulse": 0.55,
        "--ambient-tilt": "0deg",
      } as CSSProperties}
    >
      {glyphs.map((glyph) => (
        <span
          key={`${glyph.token}-${glyph.left}-${glyph.top}`}
          className={`site-ambient-glyph tone-${glyph.tone}`}
          style={{
            left: glyph.left,
            top: glyph.top,
            fontSize: `${glyph.size}px`,
            "--glyph-depth": glyph.depth,
            "--glyph-delay": `${glyph.delay}s`,
            "--glyph-spin": `${glyph.spin}deg`,
          } as CSSProperties}
        >
          <span className="site-ambient-glyph-inner">{glyph.token}</span>
        </span>
      ))}
    </div>
  );
}
