"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y: 28, scale: 0.985, filter: "blur(10px)" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      style={{ willChange: "opacity, transform, filter" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
