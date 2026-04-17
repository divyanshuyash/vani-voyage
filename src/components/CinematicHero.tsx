"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import MagneticHover from "@/components/MagneticHover";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const heroProof = [
  "8,000+ learners transformed",
  "20+ years in education",
  "Corporate training with BOSCH Group",
];

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isPhoneLayout, setIsPhoneLayout] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const disableParallax = isPhoneLayout || shouldReduceMotion;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)");
    const updateLayout = () => setIsPhoneLayout(media.matches);
    updateLayout();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateLayout);
      return () => media.removeEventListener("change", updateLayout);
    }

    media.addListener(updateLayout);
    return () => media.removeListener(updateLayout);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const tiltNode = tiltRef.current;
    if (!tiltNode) {
      return;
    }

    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (coarsePointer) {
      return;
    }

    let removeListeners = () => {};

    const ctx = gsap.context(() => {
      gsap.set(tiltNode, { transformPerspective: 1200, transformStyle: "preserve-3d" });

      const rotateXTo = gsap.quickTo(tiltNode, "rotationX", {
        duration: 0.42,
        ease: "power3.out",
      });
      const rotateYTo = gsap.quickTo(tiltNode, "rotationY", {
        duration: 0.42,
        ease: "power3.out",
      });
      const liftTo = gsap.quickTo(tiltNode, "y", {
        duration: 0.42,
        ease: "power3.out",
      });

      const handleMove = (event: MouseEvent) => {
        const rect = tiltNode.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        rotateXTo(-py * 12);
        rotateYTo(px * 12);
        liftTo(-5);
      };

      const handleLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
        liftTo(0);
      };

      tiltNode.addEventListener("mousemove", handleMove);
      tiltNode.addEventListener("mouseleave", handleLeave);

      removeListeners = () => {
        tiltNode.removeEventListener("mousemove", handleMove);
        tiltNode.removeEventListener("mouseleave", handleLeave);
      };
    }, tiltNode);

    return () => {
      removeListeners();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .cinematic-hero {
              min-height: 100vh;
              display: flex;
              align-items: center;
              position: relative;
              overflow: hidden;
              padding-top: 72px;
            }

            .cinematic-hero-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: clamp(1.8rem, 3.8vw, 3rem);
              align-items: center;
            }

            .cinematic-hero-kicker {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              background: rgba(245, 240, 232, 0.84);
              border: 1px solid rgba(217, 210, 199, 0.9);
              border-radius: 999px;
              padding: 0.4rem 1rem 0.4rem 0.6rem;
              margin-bottom: 2rem;
              backdrop-filter: blur(8px);
            }

            .cinematic-hero-badge-icon {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: var(--accent-soft);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              color: var(--accent);
            }

            .cinematic-hero-text {
              width: 100%;
              max-width: 540px;
              margin-inline: auto;
            }

            .cinematic-hero-title {
              margin-bottom: 1.5rem;
            }

            .cinematic-hero-word {
              display: inline-block;
              margin-right: 0.28em;
            }

            .cinematic-hero-subtext {
              max-width: 560px;
              margin-bottom: 2rem;
              font-size: 1.04rem;
            }

            .cinematic-hero-buttons {
              display: flex;
              flex-wrap: wrap;
              gap: 0.75rem;
              margin-bottom: 2rem;
            }

            .cinematic-hero-proofs {
              display: flex;
              flex-wrap: wrap;
              gap: 0.65rem;
              align-items: center;
            }

            .cinematic-hero-proof-chip {
              font-family: var(--font-body);
              font-weight: 500;
              font-size: 0.74rem;
              color: var(--muted);
              padding: 0.35rem 0.72rem;
              background: rgba(237, 232, 223, 0.78);
              border-radius: 999px;
              border: 1px solid var(--border);
              display: inline-flex;
              align-items: center;
              gap: 6px;
              cursor: default;
            }

            .cinematic-hero-proof-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: var(--accent);
              flex-shrink: 0;
            }

            .cinematic-hero-image-wrap {
              display: flex;
              justify-content: center;
              width: 100%;
            }

            .cinematic-hero-tilt {
              width: 100%;
              max-width: 520px;
              position: relative;
              will-change: transform;
            }

            .cinematic-hero-image-shell {
              position: relative;
              width: 100%;
              aspect-ratio: 4 / 5;
              border-radius: var(--radius);
              overflow: hidden;
              border: 1px solid rgba(217, 210, 199, 0.72);
              box-shadow: 0 26px 56px rgba(26, 22, 18, 0.18);
              background: var(--surface);
            }

            .cinematic-hero-clip {
              border-radius: inherit;
              overflow: hidden;
            }

            .cinematic-hero-vignette {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: radial-gradient(circle at center, rgba(255, 255, 255, 0) 32%, rgba(26, 22, 18, 0.46) 100%);
              z-index: 2;
            }

            .cinematic-hero-image-caption {
              position: absolute;
              left: 14px;
              bottom: 14px;
              border-radius: 999px;
              padding: 0.42rem 0.78rem;
              font-family: var(--font-body);
              font-weight: 600;
              font-size: 0.68rem;
              letter-spacing: 0.07em;
              text-transform: uppercase;
              color: var(--on-dark);
              background: rgba(44, 62, 53, 0.62);
              border: 1px solid rgba(245, 240, 232, 0.36);
              backdrop-filter: blur(7px);
              text-shadow: 0 2px 16px rgba(0, 0, 0, 0.55);
              z-index: 4;
            }

            @media (max-width: 768px) {
              .cinematic-hero {
                padding-top: 72px;
                min-height: auto;
              }

              .cinematic-hero-grid {
                display: flex;
                flex-direction: column-reverse;
                gap: 1.2rem;
              }

              .cinematic-hero-text {
                z-index: 1;
                position: relative;
                padding-top: 0;
              }

              .cinematic-hero-image-wrap {
                width: 100%;
                margin-bottom: 0;
                z-index: 0;
                position: relative;
              }

              .cinematic-hero-tilt {
                max-width: 100%;
              }

              .cinematic-hero-image-shell {
                border-radius: 0;
                border: none;
                box-shadow: none;
                aspect-ratio: 1 / 1.02;
                max-height: 54vh;
                -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 100%);
                mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 100%);
              }

              .cinematic-hero-title {
                margin-bottom: 1rem;
                font-size: clamp(2rem, 10.8vw, 2.8rem);
                line-height: 1.08;
              }

              .cinematic-hero-subtext {
                margin-bottom: 1.2rem;
                font-size: 0.98rem;
                line-height: 1.65;
              }

              .cinematic-hero-buttons {
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                gap: 0.65rem;
                margin-bottom: 1rem;
              }

              .cinematic-hero-buttons > .cinematic-hero-btn-primary {
                width: 100%;
              }

              .cinematic-hero-buttons > .cinematic-hero-btn-secondary {
                width: 100%;
              }

              .cinematic-hero-buttons .btn-primary,
              .cinematic-hero-buttons .btn-ghost {
                width: 100%;
                height: 46px;
                padding: 0;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .cinematic-hero-proofs {
                flex-wrap: nowrap;
                overflow-x: auto;
                scrollbar-width: none;
                -ms-overflow-style: none;
                margin-bottom: 0;
              }

              .cinematic-hero-proofs::-webkit-scrollbar {
                display: none;
              }

              .cinematic-hero-proof-chip {
                white-space: nowrap;
                padding: 6px 14px;
                font-size: 0.78rem;
                color: var(--text);
                border-color: var(--border);
                background: var(--surface);
              }

              .cinematic-hero-image-caption {
                display: none;
              }
            }
          `,
        }}
      />

      <section ref={sectionRef} className="bg-accent-glow hero-grain cinematic-hero">
        <div
          className="max-w hero-mobile-pad overflow-x-hidden w-full"
          style={{
            width: "100%",
            position: "relative",
            zIndex: 1,
            paddingTop: "clamp(1.5rem, 4vw, 3rem)",
            paddingBottom: "clamp(1.5rem, 4vw, 3rem)",
            paddingLeft: "max(16px, clamp(1rem, 5vw, 4rem))",
            paddingRight: "max(16px, clamp(1rem, 5vw, 4rem))",
            overflowX: "hidden",
          }}
        >
          <div className="cinematic-hero-grid lg:!grid-cols-[1fr_1fr]">
            <motion.div
              className="cinematic-hero-text"
              style={disableParallax ? undefined : { y: textParallaxY, opacity: textOpacity }}
            >
              <motion.div
                className="cinematic-hero-kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <span className="cinematic-hero-badge-icon">
                  <Sparkles size={12} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    color: "var(--text-dim)",
                  }}
                >
                  Communication, Confidence, And Mindset Mentor
                </span>
              </motion.div>

              <h1 className="t-hero cinematic-hero-title">
                {"Find your voice.".split(" ").map((word, index) => (
                  <motion.span
                    key={word}
                    className="cinematic-hero-word"
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 1.02 + index * 0.09, duration: 0.56, ease }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <span style={{ color: "var(--accent)" }}>
                  {"Speak with confidence.".split(" ").map((word, index) => (
                    <motion.span
                      key={word}
                      className="cinematic-hero-word"
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 1.32 + index * 0.09, duration: 0.56, ease }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <motion.p
                className="t-body cinematic-hero-subtext"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.55, duration: 0.62, ease }}
              >
                For over two decades in education, I have seen one truth again and again: communication changes
                everything. I do not just teach English. I help people express themselves with clarity, confidence,
                and courage in real-life situations.
              </motion.p>

              <motion.div
                className="cinematic-hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.72, duration: 0.62, ease }}
              >
                <MagneticHover className="cinematic-hero-btn-primary">
                  <Link href="/contact" className="btn-primary btn-pulse">
                    Start Your Journey
                    <ArrowRight size={16} />
                  </Link>
                </MagneticHover>
                <MagneticHover className="cinematic-hero-btn-secondary">
                  <Link href="/discover#voice-quiz" className="btn-ghost">
                    <Play size={14} />
                    Take the Quiz
                  </Link>
                </MagneticHover>
              </motion.div>

              <motion.div
                className="cinematic-hero-proofs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.85, duration: 0.6 }}
              >
                {heroProof.map((item, index) => (
                  <motion.span
                    key={item}
                    className="cinematic-hero-proof-chip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.92 + index * 0.08, duration: 0.46, ease }}
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(193, 123, 60, 0.12)" }}
                  >
                    <span className="cinematic-hero-proof-dot" />
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="cinematic-hero-image-wrap" style={disableParallax ? undefined : { y: imageParallaxY }}>
              <div ref={tiltRef} className="cinematic-hero-tilt">
                <motion.div
                  className="cinematic-hero-clip"
                  initial={{ clipPath: "inset(48% 0 48% 0 round 20px)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0% round 20px)" }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="cinematic-hero-image-shell"
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease }}
                  >
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: 0,
                        willChange: "transform",
                      }}
                      animate={{ scale: [1, 1.05, 1], x: ["0%", "-1.5%", "0%"], y: ["0%", "-1.2%", "0%"] }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Image
                        src="/vani-sumanth-hero.webp"
                        alt="Vani Sumanth — Communication & Confidence Coach"
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="(max-width: 1024px) 88vw, 38vw"
                        style={{ filter: "contrast(1.05)" }}
                      />
                    </motion.div>

                    <div className="cinematic-hero-vignette" />

                    <motion.span
                      className="cinematic-hero-image-caption"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.58, duration: 0.5, ease }}
                    >
                      {"Speak with Confidence".split(" ").map((word, index) => (
                        <motion.span
                          key={word}
                          style={{ display: "inline-block", marginRight: "0.3em", mixBlendMode: "screen" }}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7 + index * 0.1, duration: 0.34, ease }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
