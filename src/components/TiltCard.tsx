"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className,
  style,
  maxTilt = 5,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const card = cardRef.current;
    if (!card) {
      return;
    }

    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (coarsePointer) {
      return;
    }

    let removeListeners = () => {};

    const ctx = gsap.context(() => {
      gsap.set(card, { transformPerspective: 1200, transformStyle: "preserve-3d" });

      const rotateXTo = gsap.quickTo(card, "rotationX", {
        duration: 0.34,
        ease: "power3.out",
      });
      const rotateYTo = gsap.quickTo(card, "rotationY", {
        duration: 0.34,
        ease: "power3.out",
      });
      const liftTo = gsap.quickTo(card, "y", {
        duration: 0.34,
        ease: "power3.out",
      });

      const handleMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        rotateXTo(-py * maxTilt * 2);
        rotateYTo(px * maxTilt * 2);
        liftTo(-4);
      };

      const handleLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
        liftTo(0);
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      removeListeners = () => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      };
    }, card);

    return () => {
      removeListeners();
      ctx.revert();
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
