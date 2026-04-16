"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const heroProof = [
  "8,000+ learners transformed",
  "20+ years in education",
  "Corporate training with BOSCH Group",
];

const painPoints = [
  {
    icon: <MessageCircle size={22} />,
    title: "Thoughts Were Clear, Words Were Not",
    desc: "Many knew what they wanted to say, but struggled to express it clearly in meetings, interviews, and conversations.",
  },
  {
    icon: <Star size={22} />,
    title: "Confidence Dropped Under Pressure",
    desc: "From campus interviews to workplace presentations, fear often took over at the exact moment performance mattered most.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "No Safe Place To Practice",
    desc: "Countless people were ready to grow, but lacked structured guidance, honest feedback, and a supportive space to speak.",
  },
];

const featuredPrograms = [
  {
    number: "01",
    title: "Speak Like An Executive",
    desc: "Executive communication training to help professionals speak with authority, structure, and presence.",
    tag: "Leadership Communication",
  },
  {
    number: "02",
    title: "Unshakable Confidence Webinar",
    desc: "A practical confidence reset for those who know their potential but hold back when it is time to speak.",
    tag: "Confidence Accelerator",
    featured: true,
  },
  {
    number: "03",
    title: "From Silent Strength To Recognised Power",
    desc: "For quiet high-potential voices ready to be seen, heard, and respected in professional spaces.",
    tag: "Personal Brand Presence",
  },
  {
    number: "04",
    title: "Career Catalyst",
    desc: "Communication and mindset coaching designed to support faster career growth and stronger workplace influence.",
    tag: "Career Growth",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════ */}
      <section
        className="bg-accent-glow"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "var(--bg)",
          position: "relative",
          overflow: "hidden",
          paddingTop: 72,
        }}
      >
        <div
          className="max-w"
          style={{
            width: "100%",
            position: "relative",
            zIndex: 1,
            padding: "clamp(1.5rem, 4vw, 3rem) clamp(20px, 6vw, 100px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(1.8rem, 3.6vw, 2.8rem)",
              alignItems: "center",
            }}
            className="lg:!grid-cols-[1fr_1fr]"
          >
            {/* Left — Text */}
            <div style={{ width: "100%", maxWidth: 500, marginInline: "auto" }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  padding: "0.4rem 1rem 0.4rem 0.6rem",
                  marginBottom: "2rem",
                }}
              >
                <span style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "var(--accent-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Sparkles size={12} style={{ color: "var(--accent)" }} />
                </span>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  color: "var(--text-dim)",
                }}>
                  Communication, Confidence, And Mindset Mentor
                </span>
              </motion.div>

              <motion.h1
                className="t-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                style={{ marginBottom: "1.5rem" }}
              >
                Find your voice.
                <br />
                <span style={{ color: "var(--accent)" }}>Speak with confidence.</span>
              </motion.h1>

              <motion.p
                className="t-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease }}
                style={{
                  maxWidth: 560,
                  marginBottom: "2rem",
                  fontSize: "1.04rem",
                }}
              >
                For over two decades in education, I have seen one truth again
                and again: communication changes everything. I do not just teach
                English. I help people express themselves with clarity,
                confidence, and courage in real-life situations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "2rem",
                }}
                className="flex-col sm:!flex-row"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:!w-auto">
                  <Link href="/contact" className="btn-primary">
                    Start Your Journey
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:!w-auto">
                  <Link href="/discover#voice-quiz" className="btn-ghost">
                    <Play size={14} />
                    Take the Quiz
                  </Link>
                </motion.div>
              </motion.div>

              {/* Social proof chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", alignItems: "center" }}
              >
                {heroProof.map((text) => (
                  <span
                    key={text}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "0.74rem",
                      color: "var(--muted)",
                      padding: "0.35rem 0.72rem",
                      background: "var(--surface)",
                      borderRadius: 100,
                      border: "1px solid var(--border)",
                    }}
                  >
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              style={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "min(100%, 500px)",
                  aspectRatio: "4/5",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  border: "1px solid rgba(217, 210, 199, 0.72)",
                  boxShadow: "0 22px 52px rgba(26, 22, 18, 0.14)",
                }}
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
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "35%",
                    background: "linear-gradient(transparent, rgba(26, 22, 18, 0.5))",
                    pointerEvents: "none",
                  }}
                />
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.45, ease }}
                  style={{
                    position: "absolute",
                    left: 14,
                    bottom: 14,
                    borderRadius: 999,
                    padding: "0.4rem 0.75rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.68rem",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "var(--on-dark)",
                    background: "rgba(44, 62, 53, 0.72)",
                    border: "1px solid rgba(245, 240, 232, 0.3)",
                  }}
                >
                  Speak with Confidence
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHO IT'S FOR
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">WHAT I KEPT SEEING</span>
            <h2 className="t-section">A life gap, not just a skill gap</h2>
            <p>
              Across age groups and industries, these patterns kept showing up.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {painPoints.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="glass-card" style={{ height: "100%" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="t-card" style={{ marginBottom: "0.75rem" }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "0.95rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.7,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT VANI
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg)" }}>
        <div className="max-w">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(2rem, 5vw, 4rem)",
              alignItems: "center",
            }}
            className="md:!grid-cols-[1fr_1.2fr]"
          >
            {/* Quote side */}
            <ScrollReveal>
              <div>
                <span className="t-label" style={{ display: "block", marginBottom: "1.5rem" }}>MY STORY</span>
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    lineHeight: 1.25,
                    color: "var(--text)",
                    marginBottom: "1.5rem",
                    position: "relative",
                    paddingLeft: "1.5rem",
                    borderLeft: "3px solid var(--accent)",
                  }}
                >
                  I did not build this to teach textbook English. I built this
                  to transform confidence, mindset, and voice.
                </blockquote>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Through one-on-one conversations across India, it became clear
                  that people are ready to grow but need direction, structure,
                  and a safe space to practice.
                </p>
              </div>
            </ScrollReveal>

            {/* Bio side */}
            <ScrollReveal delay={0.15}>
              <div className="glass-card-static">
                <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", marginBottom: "1rem", lineHeight: 1.8 }}>
                  Hi, I&apos;m <strong style={{ color: "var(--text)" }}>Vani Sumanth</strong>.
                  For over two decades, I have been deeply rooted in education,
                  training students, professionals, and institutions.
                </p>
                <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  This vision became Vani&apos;s Voice Voyage and my C.L.E.A.R.S
                  framework, a result-driven approach that helps learners break
                  hesitation, overcome fear, improve pronunciation and fluency,
                  and build a stronger personal and professional presence.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {[
                    "20+ Years In Education",
                    "8,000+ Learners",
                    "Speak Without Fear",
                    "Clarity + Fluency + Presence",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "0.3rem 0.75rem",
                        background: "var(--accent-soft)",
                        border: "1px solid rgba(240,192,96,0.15)",
                        borderRadius: 100,
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        fontSize: "0.72rem",
                        color: "var(--accent)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROUD MOMENT
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w" style={{ maxWidth: 1020 }}>
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="t-label">A MOMENT I STILL CARRY</span>
            <h2 className="t-section">At BOSCH, hesitation turned into ownership</h2>
            <p>
              One room, one brave comeback, and a transformation that still
              shapes how I coach every batch.
            </p>
          </div>

          <ScrollReveal>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 24px 50px rgba(193, 123, 60, 0.15)" }}
              transition={{ duration: 0.4, ease }}
              className="glass-card-static" style={{ padding: "clamp(1.4rem, 3vw, 2rem)", overflow: "hidden", position: "relative" }}
            >
              {/* Optional ambient background glow */}
              <div style={{
                position: "absolute",
                top: "-20%", right: "-10%",
                width: "50%", height: "80%",
                background: "radial-gradient(ellipse at center, rgba(193, 123, 60, 0.1), transparent 70%)",
                pointerEvents: "none"
              }} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                  alignItems: "stretch",
                }}
                className="md:!grid-cols-[1.05fr_1fr]"
              >
                <div
                  style={{
                    borderRadius: "var(--radius)",
                    border: "1px solid rgba(193, 123, 60, 0.26)",
                    background:
                      "linear-gradient(145deg, rgba(193,123,60,0.16), rgba(193,123,60,0.05))",
                    padding: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        display: "block",
                        marginBottom: "0.65rem",
                      }}
                    >
                      Corporate Breakthrough Story
                    </span>
                    <h3
                      className="t-card"
                      style={{
                        marginBottom: "0.65rem",
                        fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                        lineHeight: 1.35,
                      }}
                    >
                      A participant who froze on day one came back and led the room by day three.
                    </h3>
                    <p
                      style={{
                        color: "var(--text-dim)",
                        fontSize: "0.9rem",
                        lineHeight: 1.75,
                        marginBottom: "1rem",
                      }}
                    >
                      I watched fear turn into ownership when the environment became
                      safe, practical, and deeply supportive.
                    </p>
                  </motion.div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                      gap: "0.6rem",
                    }}
                  >
                    {[
                      { label: "Duration", value: "3 Days" },
                      { label: "Participants", value: "24" },
                      { label: "Result", value: "1 Breakthrough" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(193, 123, 60, 0.24)",
                          background: "rgba(245, 240, 232, 0.74)",
                          padding: "0.55rem 0.65rem",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.66rem",
                            letterSpacing: "0.09em",
                            textTransform: "uppercase",
                            color: "var(--muted)",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            color: "var(--text)",
                            fontSize: "0.95rem",
                          }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {[
                    {
                      step: "Day 1",
                      title: "Fear surfaced early",
                      desc: "A participant from Mandya said speaking in front of colleagues felt impossible.",
                    },
                    {
                      step: "Day 2",
                      title: "Practice became structured",
                      desc: "We shifted into guided drills, feedback loops, and repeat-safe speaking rounds.",
                    },
                    {
                      step: "Day 3",
                      title: "Voice took the lead",
                      desc: "The same participant stood up again and delivered a clear, confident response.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      style={{
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        padding: "0.85rem 0.95rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.step}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "var(--text)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.86rem",
                          color: "var(--text-dim)",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          SIGNATURE PROGRAMS
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">SIGNATURE PROGRAMS</span>
            <h2 className="t-section">Choose your next breakthrough program</h2>
            <p>Each track is built for visible speaking confidence in real professional moments.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {featuredPrograms.map((service, i) => (
              <ScrollReveal key={service.number} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease }}
                  style={{ height: "100%" }}
                >
                  <Link
                    href="/programs"
                  className="glass-card"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minHeight: 310,
                    ...(service.featured
                      ? {
                          borderColor: "rgba(193, 123, 60, 0.45)",
                          boxShadow: "0 24px 48px rgba(193, 123, 60, 0.22)",
                          background:
                            "linear-gradient(150deg, rgba(193,123,60,0.22), rgba(255,255,255,0.38))",
                        }
                      : {}),
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "linear-gradient(90deg, rgba(193,123,60,0.2), var(--accent), rgba(193,123,60,0.2))",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.95rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.66rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: service.featured ? "var(--accent)" : "var(--muted)",
                        padding: "0.28rem 0.62rem",
                        borderRadius: 999,
                        border: "1px solid rgba(193,123,60,0.25)",
                        background: service.featured ? "rgba(193,123,60,0.12)" : "var(--surface)",
                      }}
                    >
                      {service.featured ? "Signature Spotlight" : "Program Journey"}
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        color: "rgba(122, 110, 100, 0.45)",
                        lineHeight: 1,
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  <h3 className="t-card" style={{ marginBottom: "0.75rem" }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.7,
                    flex: 1,
                  }}>
                    {service.desc}
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                    }}>
                      {service.tag}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        color: "var(--accent)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Explore
                      <ArrowRight size={16} style={{ color: "var(--accent)" }} />
                    </span>
                  </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SOCIAL PROOF MARQUEE
          ════════════════════════════════════ */}
      <section style={{ background: "var(--surface)", padding: "1.5rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} style={{ display: "flex", alignItems: "center" }}>
                {[
                  "A mindset shift is the real key to English fluency",
                  "Boardroom Breakthrough",
                  "Corporate Training for BOSCH Group",
                  "Become A Leader And Grow Your Career In 2026",
                  "Own The Boardroom, Scale High In Your Career",
                  "Speak without fear",
                  "Find your voice, create new possibilities",
                ].map((text, i) => (
                  <span
                    key={`${setIndex}-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      color: "var(--text-dim)",
                      padding: "0 1.5rem",
                    }}
                  >
                    <Star size={12} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
