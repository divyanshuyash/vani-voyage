"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
        <div className="max-w" style={{ width: "100%", padding: "3rem clamp(20px, 6vw, 100px)", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="lg:!grid-cols-[1.1fr_0.9fr]"
          >
            {/* Left — Text */}
            <div>
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
                  Communication & Confidence Coach
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
                <span style={{ color: "var(--accent)" }}>Speak without fear.</span>
              </motion.h1>

              <motion.p
                className="t-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease }}
                style={{
                  maxWidth: 480,
                  marginBottom: "2rem",
                  fontSize: "1.1rem",
                }}
              >
                I don&apos;t teach English. I help you express what you already
                know — with clarity, confidence, and zero fear. Because the world
                needs to hear what you have to say.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/contact" className="btn-primary">
                    Start Your Journey
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/discover" className="btn-ghost">
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
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}
              >
                {["500+ students coached", "4.9★ rated", "8+ years experience"].map((text) => (
                  <span
                    key={text}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      padding: "0.35rem 0.75rem",
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
              className="hide-mobile"
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                  maxWidth: 420,
                  marginLeft: "auto",
                }}
              >
                <Image
                  src="/vani-portrait.png"
                  alt="Vani Sumanth — Communication & Confidence Coach"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ filter: "grayscale(15%) contrast(1.05)" }}
                />
                {/* Amber gradient overlay at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: "linear-gradient(transparent, rgba(245, 240, 232, 0.85))",
                    pointerEvents: "none",
                  }}
                />
                {/* Floating quote card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease }}
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    right: 20,
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    borderRadius: 12,
                    padding: "1rem 1.25rem",
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    fontStyle: "normal",
                    lineHeight: 1.5,
                  }}>
                    &ldquo;She didn&apos;t just teach me to speak — she helped me believe I had something worth saying.&rdquo;
                  </p>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                    marginTop: "0.35rem",
                    fontWeight: 600,
                  }}>
                    — Former student
                  </p>
                </motion.div>
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
            <span className="t-label">WHO THIS IS FOR</span>
            <h2 className="t-section">Sound familiar?</h2>
            <p>You&apos;re not alone. Here&apos;s who benefits most from working with Vani.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                icon: <MessageCircle size={22} />,
                title: "The Working Professional",
                desc: "You know what to say in your head, but the words freeze the moment you open your mouth in a meeting.",
              },
              {
                icon: <Star size={22} />,
                title: "The Final-Year Student",
                desc: "Campus placements and interviews terrify you more than any exam ever did. You need real practice, not tips.",
              },
              {
                icon: <Sparkles size={22} />,
                title: "The Silent Expert",
                desc: "You know English perfectly. Grammar, vocabulary — all fine. But expressing yourself still feels impossible.",
              },
            ].map((item, i) => (
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
                <span className="t-label" style={{ display: "block", marginBottom: "1.5rem" }}>ABOUT VANI</span>
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
                  I&apos;m not the teacher on stage. I&apos;m the guide beside
                  you — helping you find your own voice.
                </blockquote>
              </div>
            </ScrollReveal>

            {/* Bio side */}
            <ScrollReveal delay={0.15}>
              <div className="glass-card-static">
                <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", marginBottom: "1rem", lineHeight: 1.8 }}>
                  Hi, I&apos;m <strong style={{ color: "var(--text)" }}>Vani Sumanth</strong>.
                  For years I watched brilliant people stay silent — not because they
                  lacked ideas, but because they lacked the courage to voice them.
                </p>
                <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  That&apos;s what I change. Through patience, practice, and a whole
                  lot of genuine belief in you, I help you transform from someone who
                  hesitates to someone who speaks with clarity and confidence.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["8+ Years", "500+ Students", "Corporate Training", "1:1 Coaching"].map((tag) => (
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
          WHAT SHE OFFERS
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">WHAT SHE OFFERS</span>
            <h2 className="t-section">Three pillars of transformation</h2>
            <p>Choose the format that fits your journey.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                number: "01",
                title: "Group Classes",
                desc: "Find your voice in a safe circle of fellow learners. Build confidence together through guided practice and peer support.",
                tag: "8 Weeks · Online",
              },
              {
                number: "02",
                title: "1:1 Coaching",
                desc: "Your pace, your goals, your growth. Personalized attention for your unique challenges and communication blocks.",
                tag: "Flexible · Online/Offline",
                featured: true,
              },
              {
                number: "03",
                title: "Offline Sessions",
                desc: "Immersive in-person workshops that transform how you communicate. Real practice, real-time feedback, real transformation.",
                tag: "2 Days · In-Person",
              },
            ].map((service, i) => (
              <ScrollReveal key={service.number} delay={i * 0.1}>
                <Link
                  href="/programs"
                  className="glass-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    ...(service.featured ? { borderColor: "rgba(240, 192, 96, 0.3)" } : {}),
                  }}
                >
                  {service.featured && (
                    <span
                      style={{
                        alignSelf: "flex-start",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "var(--accent)",
                        color: "var(--bg)",
                        padding: "0.25rem 0.65rem",
                        borderRadius: 100,
                        marginBottom: "1rem",
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "2.5rem",
                      color: "var(--border)",
                      lineHeight: 1,
                      marginBottom: "1rem",
                    }}
                  >
                    {service.number}
                  </span>
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
                    <ArrowRight size={16} style={{ color: "var(--accent)" }} />
                  </div>
                </Link>
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
                  "Spoke in a meeting for the first time",
                  "Got the job I wanted",
                  "Stopped dreading phone calls",
                  "Led a team presentation — and enjoyed it",
                  "Finally said what I was thinking",
                  "My confidence changed everything",
                  "I found my voice",
                  "No more rehearsing in my head",
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

      {/* ════════════════════════════════════
          NEWSLETTER CTA
          ════════════════════════════════════ */}
      <section className="section-pad bg-accent-glow" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
        <div className="max-w" style={{ maxWidth: 580, textAlign: "center", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="t-label" style={{ display: "block", marginBottom: "0.75rem" }}>STAY CONNECTED</span>
            <h2 className="t-section" style={{ marginBottom: "0.75rem" }}>
              Not ready yet? That&apos;s okay.
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-dim)",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}>
              Subscribe for weekly micro-tips on communication. No spam. Just a little courage in your inbox.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                gap: "0.75rem",
                maxWidth: 440,
                margin: "0 auto",
              }}
              className="flex-col sm:!flex-row"
            >
              <input
                type="email"
                placeholder="your.email@example.com"
                className="form-input"
                style={{ flex: 1, borderRadius: 100, padding: "0.75rem 1.25rem" }}
                required
              />
              <button type="submit" className="btn-primary" style={{ borderRadius: 100 }}>
                Subscribe
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
