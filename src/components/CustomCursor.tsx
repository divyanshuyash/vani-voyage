"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { shouldUseLiteEffects } from "@/lib/effectsBudget";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const visibleRef = useRef(false);
  const hoveringRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const springConfig = { stiffness: 400, damping: 28 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerMedia = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncMode = () => setEnabled(!shouldUseLiteEffects());

    syncMode();

    if (typeof reducedMotionMedia.addEventListener === "function") {
      reducedMotionMedia.addEventListener("change", syncMode);
      coarsePointerMedia.addEventListener("change", syncMode);
      return () => {
        reducedMotionMedia.removeEventListener("change", syncMode);
        coarsePointerMedia.removeEventListener("change", syncMode);
      };
    }

    reducedMotionMedia.addListener(syncMode);
    coarsePointerMedia.addListener(syncMode);
    return () => {
      reducedMotionMedia.removeListener(syncMode);
      coarsePointerMedia.removeListener(syncMode);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      visibleRef.current = false;
      hoveringRef.current = false;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current = {
        x: e.clientX - 8,
        y: e.clientY - 8,
      };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(() => {
          x.set(pointerRef.current.x);
          y.set(pointerRef.current.y);
          rafRef.current = null;
        });
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']") && !hoveringRef.current) {
        hoveringRef.current = true;
        setHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']") && hoveringRef.current) {
        hoveringRef.current = false;
        setHovering(false);
      }
    };

    const handleWindowLeave = () => {
      if (visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" && visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseEnter, { passive: true });
    document.addEventListener("mouseout", handleMouseLeave, { passive: true });
    window.addEventListener("mouseleave", handleWindowLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("mouseleave", handleWindowLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className={`custom-cursor ${hovering ? "hovering" : ""}`}
      style={{
        x,
        y,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    />
  );
}
