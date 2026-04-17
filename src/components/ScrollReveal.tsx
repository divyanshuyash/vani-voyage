"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

type RevealVariant = "soft" | "clip" | "scale" | "line";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  variant?: RevealVariant;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  once = true,
  variant = "soft",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px" });

  const variants: Record<RevealVariant, { hidden: TargetAndTransition; show: TargetAndTransition }> = {
    soft: {
      hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(10px)" },
      show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    },
    clip: {
      hidden: { opacity: 0, y: 16, clipPath: "inset(0 0 100% 0)", filter: "blur(6px)" },
      show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", filter: "blur(0px)" },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.92, y: 18, filter: "blur(6px)" },
      show: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
    },
    line: {
      hidden: { opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)", filter: "blur(8px)" },
      show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", filter: "blur(0px)" },
    },
  };

  const selected = variants[variant];
  const shouldClip = variant === "clip" || variant === "line";

  return (
    <motion.div
      ref={ref}
      initial={selected.hidden}
      animate={isInView ? selected.show : selected.hidden}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      style={{ willChange: "opacity, transform, filter", overflow: shouldClip ? "hidden" : undefined }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
