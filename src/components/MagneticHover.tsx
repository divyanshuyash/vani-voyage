"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MagneticHoverProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
}

export default function MagneticHover({
  children,
  className,
  strength = 0.22,
  style,
}: MagneticHoverProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) {
      return;
    }

    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (coarsePointer) {
      return;
    }

    let removeListeners = () => {};

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(content, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(content, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      const handleMove = (event: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;

        xTo(offsetX * strength);
        yTo(offsetY * strength);
      };

      const handleLeave = () => {
        xTo(0);
        yTo(0);
      };

      wrapper.addEventListener("mousemove", handleMove);
      wrapper.addEventListener("mouseleave", handleLeave);

      removeListeners = () => {
        wrapper.removeEventListener("mousemove", handleMove);
        wrapper.removeEventListener("mouseleave", handleLeave);
      };
    }, wrapper);

    return () => {
      removeListeners();
      ctx.revert();
    };
  }, [strength]);

  return (
    <div ref={wrapperRef} className={className} style={style}>
      <div ref={contentRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
