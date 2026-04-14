"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 400, damping: 28 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isTouchDevice) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 8);
      y.set(e.clientY - 8);
      if (!visible) setVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseEnter, { passive: true });
    document.addEventListener("mouseout", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [x, y, visible]);

  return (
    <motion.div
      ref={cursorRef}
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
