"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight, RotateCcw, BarChart3, Target, Users, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useQuizStore, quizQuestions } from "@/store/quizStore";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

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

  const current = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const allAnswered = answers.every((a) => a !== null);

  return (
    <>
      {/* ════════════════════════════════════
          STATS SECTION
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg)", paddingTop: "clamp(140px, 18vw, 200px)" }}>
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">THE NUMBERS</span>
            <h2 className="t-section">Communication is the most<br />underrated skill</h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}>
            {[
              { icon: <Users size={20} />, value: "75%", label: "PROFESSIONALS FEEL UNHEARD", context: "In meetings and group settings" },
              { icon: <Target size={20} />, value: "1 in 5", label: "FEEL TRULY CONFIDENT", context: "When speaking publicly" },
              { icon: <BarChart3 size={20} />, value: "40M+", label: "AFFECTED WORLDWIDE", context: "By communication anxiety" },
              { icon: <TrendingUp size={20} />, value: "+85%", label: "OF CAREER SUCCESS", context: "Attributed to communication" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="stat-card">
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--accent-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    margin: "0 auto 1rem",
                  }}>
                    {stat.icon}
                  </div>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-context">{stat.context}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          QUIZ SECTION
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle" style={{ position: "relative", overflow: "hidden" }}>
        <div className="max-w" style={{ maxWidth: 680 }}>
          <div className="section-header">
            <span className="t-label">TEST YOURSELF</span>
            <h2 className="t-section">How loud is your inner voice?</h2>
            <p>Let&apos;s find out. No judgment.</p>
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
                <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", maxWidth: 400, margin: "0 auto 1.5rem" }}>
                  This quick assessment reveals where you stand on the confidence
                  spectrum — and what to work on next.
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
                    {current.options.map((option, i) => (
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
