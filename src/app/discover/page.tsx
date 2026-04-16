"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useMotionValue,
  useAnimate,
  animate,
  stagger,
} from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  BarChart3,
  Target,
  Users,
  TrendingUp,
  MessageCircle,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useQuizStore, quizQuestions } from "@/store/quizStore";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type NumberMode = "count" | "typewriter";

type GraphVariant =
  | "silent-majority"
  | "seven-second"
  | "three-in-five"
  | "donut-73"
  | "donut-91"
  | "one-voice";

interface StatCardData {
  icon: LucideIcon;
  numberText: string;
  label: string;
  context: string;
  mode: NumberMode;
  value?: number;
  suffix?: string;
  graph: GraphVariant;
}

const statsData: StatCardData[] = [
  {
    icon: Users,
    numberText: "85%",
    label: "STAY SILENT IN MEETINGS",
    context: "85% of Indian professionals say they hold back ideas at work out of fear of judgment.",
    mode: "count",
    value: 85,
    suffix: "%",
    graph: "silent-majority",
  },
  {
    icon: BarChart3,
    numberText: "7 sec",
    label: "TO FORM A FIRST IMPRESSION",
    context: "Employers decide your competence in under 7 seconds - mostly from how you speak.",
    mode: "typewriter",
    graph: "seven-second",
  },
  {
    icon: MessageCircle,
    numberText: "3 in 5",
    label: "KNOW ENGLISH, CAN'T SPEAK IT",
    context: "3 in 5 educated Indians can read and write English fluently but freeze when speaking it.",
    mode: "typewriter",
    graph: "three-in-five",
  },
  {
    icon: Target,
    numberText: "73%",
    label: "LOSE JOBS TO COMMUNICATION",
    context: "73% of hiring managers reject candidates for poor communication over poor skills.",
    mode: "count",
    value: 73,
    suffix: "%",
    graph: "donut-73",
  },
  {
    icon: TrendingUp,
    numberText: "8,000+",
    label: "LEARNERS GUIDED SO FAR",
    context: "8,000+ students and professionals have trained with Vani across confidence and communication programs.",
    mode: "count",
    value: 8000,
    suffix: "+",
    graph: "one-voice",
  },
  {
    icon: Sparkles,
    numberText: "1 voice",
    label: "IS ALL IT TAKES",
    context: "One clear, confident voice in a room changes everything. That voice can be yours.",
    mode: "typewriter",
    graph: "one-voice",
  },
];

function CountUpNumber({
  value,
  suffix,
  inView,
  shouldReduceMotion,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
  shouldReduceMotion: boolean;
}) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !inView) {
      return;
    }

    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration: 1.1,
      ease,
    });

    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, motionValue, shouldReduceMotion, value]);

  const renderedValue = shouldReduceMotion ? value : displayValue;

  return (
    <span>
      {renderedValue}
      {suffix}
    </span>
  );
}

function TypewriterNumber({
  text,
  inView,
  shouldReduceMotion,
}: {
  text: string;
  inView: boolean;
  shouldReduceMotion: boolean;
}) {
  const [scope, runAnimation] = useAnimate();

  useEffect(() => {
    if (shouldReduceMotion || !inView) {
      return;
    }

    runAnimation(
      "span",
      {
        opacity: [0, 1],
        y: [8, 0],
      },
      {
        duration: 0.2,
        delay: stagger(0.05),
        ease,
      }
    );
  }, [inView, runAnimation, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span>{text}</span>;
  }

  return (
    <span ref={scope} style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          style={{ opacity: 0, transform: "translateY(8px)", display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function StatGraph({
  variant,
  inView,
  shouldReduceMotion,
}: {
  variant: GraphVariant;
  inView: boolean;
  shouldReduceMotion: boolean;
}) {
  const showFinal = inView || shouldReduceMotion;
  const graphViewport = { once: true, amount: 0.55 } as const;
  const motionDuration = (duration: number) => (shouldReduceMotion ? 0 : duration);

  const renderArcGraph = ({
    percent,
    duration,
    sparkles = false,
  }: {
    percent: number;
    duration: number;
    sparkles?: boolean;
  }) => {
    const activeColor = "var(--accent)";
    const trackColor = "#C17B3C18";

    const cx = 110;
    const cy = 102;
    const r = 92;
    const progress = percent / 100;
    const angle = Math.PI * (1 - progress);
    const markerX = cx + r * Math.cos(angle);
    const markerY = cy - r * Math.sin(angle);

    const sparkleOffsets = [
      { x: -12, y: -8 },
      { x: 0, y: -14 },
      { x: 10, y: -6 },
    ];

    return (
      <div style={{ height: 64, position: "relative", display: "flex", alignItems: "flex-end" }}>
        <svg width="100%" height="64" viewBox="0 0 220 120" preserveAspectRatio="none">
          <path
            d="M18 102 A92 92 0 0 1 202 102"
            fill="none"
            stroke={trackColor}
            strokeWidth={8}
            strokeLinecap="round"
          />

          <motion.path
            d="M18 102 A92 92 0 0 1 202 102"
            fill="none"
            stroke={activeColor}
            strokeWidth={8}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: progress }}
            viewport={graphViewport}
            transition={{ duration: motionDuration(duration), ease }}
          />

          <motion.g
            transform={`translate(${markerX} ${markerY})`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={graphViewport}
            transition={{
              duration: motionDuration(0.24),
              delay: shouldReduceMotion ? 0 : duration,
              ease,
            }}
          >
            <circle cx="0" cy="0" r="6" fill={activeColor} />
          </motion.g>

          {sparkles &&
            sparkleOffsets.map((offset, index) => (
              <motion.text
                key={`${variant}-sparkle-${index}`}
                x={markerX + offset.x}
                y={markerY + offset.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={activeColor}
                style={{ fontSize: 10, fontFamily: "var(--font-display)" }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={graphViewport}
                transition={{
                  duration: motionDuration(0.25),
                  delay: shouldReduceMotion ? 0 : duration + 0.1 * (index + 1),
                  ease,
                }}
              >
                ✦
              </motion.text>
            ))}
        </svg>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={graphViewport}
          transition={{ duration: motionDuration(0.2), delay: shouldReduceMotion ? 0 : 0.35, ease }}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 4,
            transform: "translateX(-50%)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: activeColor,
          }}
        >
          {percent}%
        </motion.span>
      </div>
    );
  };

  if (variant === "silent-majority") {
    return renderArcGraph({ percent: 85, duration: 1.2 });
  }

  if (variant === "seven-second") {
    return (
      <div style={{ height: 64, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8 }}>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: "#C17B3C18",
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={graphViewport}
            transition={{ duration: motionDuration(0.7), ease }}
            style={{
              display: "block",
              height: "100%",
              background: "var(--accent)",
            }}
          />

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0] }}
            viewport={graphViewport}
            transition={{
              duration: motionDuration(0.15),
              delay: shouldReduceMotion ? 0 : 0.7,
              ease,
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--accent)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 2 }}>
          {Array.from({ length: 7 }).map((_, index) => (
            <motion.div
              key={`${variant}-tick-${index}`}
              initial={{ scale: 1, color: "var(--muted)" }}
              whileInView={{
                scale: [1, 1.4, 1],
                color: ["var(--muted)", "var(--accent)", "var(--muted)"],
              }}
              viewport={graphViewport}
              transition={{
                duration: motionDuration(0.3),
                delay: shouldReduceMotion ? 0 : ((index + 1) / 7) * 0.7,
                ease,
              }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  lineHeight: 1,
                  color: "currentColor",
                }}
              >
                {index + 1}
              </span>
              <span style={{ width: 1, height: 8, background: "currentColor" }} />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "three-in-five") {
    return (
      <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {Array.from({ length: 5 }).map((_, index) => {
            const isActive = index < 3;
            const fillColor = isActive ? "var(--accent)" : "#C17B3C18";
            const iconColor = isActive ? "#F5F0E8" : "#C17B3C85";
            const fillDelay = shouldReduceMotion ? 0 : index * 0.15;

            return (
              <motion.div
                key={`${variant}-${index}`}
                initial={{ boxShadow: "0 0 0 0 rgba(193,123,60,0)" }}
                animate={
                  isActive && !shouldReduceMotion
                    ? showFinal
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(193,123,60,0.45)",
                            "0 0 0 8px rgba(193,123,60,0)",
                            "0 0 0 8px rgba(193,123,60,0)",
                          ],
                        }
                      : {
                        boxShadow: [
                          "0 0 0 0 rgba(193,123,60,0)",
                          "0 0 0 0 rgba(193,123,60,0)",
                          "0 0 0 8px rgba(193,123,60,0)",
                        ],
                      }
                    : undefined
                }
                transition={{
                  duration: motionDuration(0.6),
                  delay: shouldReduceMotion ? 0 : 0.72,
                  ease,
                }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "2px solid var(--accent)",
                  background: "transparent",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.span
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={showFinal ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
                  transition={{ duration: motionDuration(0.4), delay: fillDelay, ease }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: fillColor,
                  }}
                />

                <motion.span
                  initial={{ color: "#C17B3C85" }}
                  animate={showFinal ? { color: iconColor } : { color: "#C17B3C85" }}
                  transition={{ duration: motionDuration(0.25), delay: fillDelay + motionDuration(0.18), ease }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <User size={20} />
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "donut-73") {
    return renderArcGraph({ percent: 73, duration: 1.2 });
  }

  if (variant === "donut-91") {
    return renderArcGraph({ percent: 91, duration: 1.4, sparkles: true });
  }

  const bars = [16, 16, 16, 16, 56, 16, 16, 16, 16];

  return (
    <div style={{ height: 64, display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative" }}>
      <div style={{ height: 56, display: "flex", alignItems: "flex-end", gap: 6 }}>
        {bars.map((height, index) => {
          const isCenter = index === 4;

          return (
            <motion.span
              key={`${variant}-${index}`}
              initial={{
                height: 0,
                boxShadow: isCenter ? "0 0 0 0 rgba(193,123,60,0)" : "0 0 0 0 rgba(193,123,60,0)",
              }}
              whileInView={{
                height,
                boxShadow: isCenter && !shouldReduceMotion
                  ? showFinal
                    ? [
                        "0 0 0 0 rgba(193,123,60,0.4)",
                        "0 0 0 12px rgba(193,123,60,0)",
                        "0 0 0 12px rgba(193,123,60,0)",
                      ]
                    : [
                        "0 0 0 0 rgba(193,123,60,0)",
                        "0 0 0 0 rgba(193,123,60,0)",
                        "0 0 0 0 rgba(193,123,60,0)",
                      ]
                  : "0 0 0 0 rgba(193,123,60,0)",
              }}
              viewport={graphViewport}
              transition={{
                height: {
                  duration: motionDuration(isCenter ? 0.7 : 0.4),
                  delay: shouldReduceMotion ? 0 : isCenter ? 0.3 : 0,
                  ease,
                },
                boxShadow: {
                  duration: motionDuration(0.8),
                  delay: shouldReduceMotion ? 0 : isCenter ? 1 : 0,
                  ease,
                },
              }}
              style={{
                width: 8,
                borderRadius: 4,
                background: isCenter ? "var(--accent)" : "#C17B3C25",
                display: "block",
              }}
            />
          );
        })}
      </div>

      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={graphViewport}
        transition={{ duration: motionDuration(0.22), delay: shouldReduceMotion ? 0 : 1.02, ease }}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          position: "absolute",
          left: "50%",
          bottom: 58,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

function DiscoverStatCard({
  stat,
  shouldReduceMotion,
}: {
  stat: StatCardData;
  shouldReduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.55 });
  const Icon = stat.icon;

  return (
    <motion.article
      ref={cardRef}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              boxShadow: "0 8px 32px rgba(193,123,60,0.12)",
            }
      }
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        background: "var(--surface)",
        borderRadius: 16,
        boxShadow: "0 2px 16px rgba(26,22,18,0.06)",
        border: "none",
        padding: "1.15rem",
        minHeight: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "var(--accent-soft)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
        }}
      >
        <Icon size={22} />
      </span>

      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.8rem, 5vw, 4rem)",
          lineHeight: 0.95,
          color: "var(--accent)",
          marginTop: "0.9rem",
          minHeight: 66,
          display: "flex",
          alignItems: "center",
        }}
      >
        {stat.mode === "count" && typeof stat.value === "number" ? (
          <CountUpNumber
            value={stat.value}
            suffix={stat.suffix}
            inView={inView}
            shouldReduceMotion={shouldReduceMotion}
          />
        ) : (
          <TypewriterNumber
            text={stat.numberText}
            inView={inView}
            shouldReduceMotion={shouldReduceMotion}
          />
        )}
      </div>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: "0.72rem",
          color: "var(--muted)",
          marginTop: "0.9rem",
        }}
      >
        {stat.label}
      </p>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.88rem",
          color: "var(--muted)",
          lineHeight: 1.6,
          marginTop: "0.6rem",
          minHeight: 86,
          flex: 1,
        }}
      >
        {stat.context}
      </p>

      <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
        <StatGraph
          variant={stat.graph}
          inView={inView}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </motion.article>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      style={{ position: "relative", width: 160, height: 160, filter: "drop-shadow(0 0 30px var(--accent-glow))" }}
    >
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--surface-2)" strokeWidth="8" />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "2.5rem",
          color: "var(--text)",
        }}
      >
        {score}
      </span>
    </motion.div>
  );
}

export default function DiscoverPage() {
  const shouldReduceMotion = useReducedMotion();

  const {
    currentQuestion,
    answers,
    isComplete,
    score,
    setAnswer,
    nextQuestion,
    prevQuestion,
    calculateScore,
    reset,
  } = useQuizStore();

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#voice-quiz") {
      const el = document.getElementById("voice-quiz");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, []);

  const current = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const allAnswered = answers.every((a) => a !== null);

  return (
    <>
      {/* ════════════════════════════════════
          STATS SECTION
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg)", paddingTop: "clamp(110px, 16vw, 190px)" }}>
        <div className="max-w">
          <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", textAlign: "left" }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontSize: "0.75rem",
                color: "var(--accent)",
                marginBottom: "0.95rem",
              }}
            >
              — THE NUMBERS
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1.08,
                color: "var(--text)",
                maxWidth: 760,
              }}
            >
              Most people already know what to say.
              <br />
              They just can&apos;t say it.
            </h2>

            <p
              style={{
                marginTop: "1rem",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: 540,
              }}
            >
              These numbers are about India. About professionals. About people exactly like you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1rem", alignItems: "stretch" }}>
            {statsData.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.06} className="h-full">
                <DiscoverStatCard
                  stat={stat}
                  shouldReduceMotion={Boolean(shouldReduceMotion)}
                />
              </ScrollReveal>
            ))}
          </div>

          <p
            style={{
              marginTop: "1rem",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "var(--muted)",
            }}
          >
            Sources: EF EPI Index, LinkedIn Workforce Report, Internal learner records
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          QUIZ SECTION
          ════════════════════════════════════ */}
      <section id="voice-quiz" className="section-pad bg-gradient-subtle" style={{ position: "relative", overflow: "hidden", scrollMarginTop: 96 }}>
        <div className="max-w" style={{ maxWidth: 680 }}>
          <div className="section-header">
            <span className="t-label">TEST YOURSELF</span>
            <h2 className="t-section">How ready is your communication voice?</h2>
            <p>Quick check. Honest answers.</p>
          </div>

          {/* Quiz Intro Card */}
          {showIntro && !isComplete && (
            <ScrollReveal>
              <div className="glass-card" style={{ textAlign: "center" }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--accent-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <BarChart3 size={24} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="t-card" style={{ marginBottom: "0.5rem" }}>
                  {quizQuestions.length} questions. Honest answers only.
                </h3>
                <p
                  style={{
                    color: "var(--text-dim)",
                    fontSize: "0.9rem",
                    marginBottom: "1.5rem",
                    maxWidth: 400,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  This quick assessment shows where you stand in clarity,
                  confidence, and spoken-English flow.
                </p>
                <button
                  onClick={() => setShowIntro(false)}
                  className="btn-primary"
                >
                  Begin Assessment
                  <ArrowRight size={16} />
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* Quiz Questions */}
          {!showIntro && !isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="glass-card"
            >
              {/* Progress bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.8rem", color: "var(--muted)" }}>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.8rem", color: "var(--accent)" }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="quiz-progress" style={{ marginBottom: "2rem" }}>
                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "var(--text)",
                      lineHeight: 1.4,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {current.question}
                  </h3>

                  <motion.div 
                    initial="hidden" animate="visible" exit="hidden"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
                  >
                    {current.options.map((option) => (
                      <motion.button
                        key={option.value}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                        }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`quiz-option ${answers[currentQuestion] === option.value ? "selected" : ""}`}
                        onClick={() => setAnswer(currentQuestion, option.value)}
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="btn-ghost"
                  style={{
                    opacity: currentQuestion === 0 ? 0.3 : 1,
                    cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                    padding: "0.6rem 1.25rem",
                  }}
                >
                  <ArrowLeft size={14} />
                  Back
                </button>

                {currentQuestion < quizQuestions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    disabled={answers[currentQuestion] === null}
                    className="btn-primary"
                    style={{
                      opacity: answers[currentQuestion] === null ? 0.4 : 1,
                      cursor: answers[currentQuestion] === null ? "not-allowed" : "pointer",
                      padding: "0.6rem 1.25rem",
                    }}
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={calculateScore}
                    disabled={!allAnswered}
                    className="btn-primary"
                    style={{
                      opacity: !allAnswered ? 0.4 : 1,
                      cursor: !allAnswered ? "not-allowed" : "pointer",
                      padding: "0.6rem 1.25rem",
                    }}
                  >
                    See My Score
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="glass-card"
              style={{ textAlign: "center" }}
            >
              <ScoreRing score={score} />

              <h3
                className="t-section"
                style={{ fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}
              >
                {score < 30
                  ? "Your voice is waiting to be found"
                  : score < 60
                  ? "You're halfway there"
                  : score < 80
                  ? "Your voice is strong"
                  : "You're a natural communicator"}
              </h3>

              <p style={{ color: "var(--text-dim)", maxWidth: 400, margin: "0 auto 2rem", fontSize: "0.95rem" }}>
                {score < 50
                  ? "You have the ideas — you just need the confidence to share them. That's exactly what I help with."
                  : "You've got a solid foundation. Let's refine your communication and take it to a whole new level."}
              </p>

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/programs" className="btn-primary">
                  Explore Programs
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => {
                    reset();
                    setShowIntro(true);
                  }}
                  className="btn-ghost"
                >
                  <RotateCcw size={14} />
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
