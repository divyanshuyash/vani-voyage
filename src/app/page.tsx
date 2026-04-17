"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";
import CinematicHero from "@/components/CinematicHero";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import VideoCarousel from "@/components/VideoCarousel";

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
      <style dangerouslySetInnerHTML={{
        __html: `

          .hero-grain::before {
            content: "";
            position: absolute;
            inset: -50%;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
            background-size: 256px 256px;
            opacity: 0.6;
            z-index: 0;
          }
          @keyframes pulse-shadow {
            0% { box-shadow: 0 0 0 0 rgba(193, 123, 60, 0.4); }
            70% { box-shadow: 0 0 0 12px rgba(193, 123, 60, 0); }
            100% { box-shadow: 0 0 0 0 rgba(193, 123, 60, 0); }
          }
          .btn-pulse {
            animation: pulse-shadow 3s infinite;
          }
          .card-wipe-border {
            position: relative;
          }
          .card-wipe-border::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--accent);
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 0.4s ease;
            border-radius: 4px 0 0 4px;
          }
          .glass-card:hover .card-wipe-border::before,
          .glass-card:hover::before {
            transform: scaleY(1);
          }
          .glass-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--accent);
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 0.4s ease;
            border-radius: 4px 0 0 4px;
          }
          .explore-link:hover .explore-arrow {
            transform: translateX(6px);
          }
          .explore-arrow {
            transition: transform 0.3s ease;
          }
          .marquee-wrap:hover .marquee-track {
            animation-play-state: paused;
          }

        @media (max-width: 768px) {

          .hero-grid {
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 1rem !important;
          }
          .hero-photo-container {
            width: 100% !important;
            margin-bottom: -110px !important;
            z-index: 0 !important;
            position: relative;
          }
          .hero-text-container {
            z-index: 1 !important;
            position: relative;
            padding-top: 1rem;
          }
          .hero-photo-wrapper {
            border-radius: 0 !important;
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%) !important;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%) !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            aspect-ratio: 1 / 1.15 !important;
          }
          .hero-image-overlay {
            display: none !important;
          }

          .hero-mobile-pad {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .mobile-only-line {
            display: block !important;
            height: 2px !important;
            width: 60px !important;
            background: var(--accent) !important;
            border-radius: 2px !important;
            margin-top: 0.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          .hero-text-paragraph {
            margin-bottom: 32px !important;
          }
          .hero-buttons-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 10px !important;
            margin-bottom: 28px !important;
          }
          .hero-buttons-container > div:first-child {
            width: 65% !important;
            flex-shrink: 0;
          }
          .hero-buttons-container > div:last-child {
            flex-grow: 1 !important;
            width: auto !important;
          }
          .hero-buttons-container .btn-primary,
          .hero-buttons-container .btn-ghost {
            width: 100% !important;
            height: 48px !important;
            padding: 0 !important;
            border-radius: 6px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .hero-buttons-container .btn-primary {
            background: var(--accent) !important;
            background-image: none !important;
            box-shadow: none !important;
          }
          .hero-buttons-container .btn-primary::before,
          .hero-buttons-container .btn-ghost::before,
          .hero-buttons-container .btn-primary::after,
          .hero-buttons-container .btn-ghost::after {
            display: none !important;
          }
          @media (max-width: 359px) {
            .hero-buttons-container {
              flex-direction: column !important;
            }
            .hero-buttons-container > div:first-child,
            .hero-buttons-container > div:last-child {
              width: 100% !important;
            }
          }
          .hero-badges-container {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scrollbar-width: none !important; /* Firefox */
            -ms-overflow-style: none !important; /* IE/Edge */
            gap: 8px !important;
            margin-bottom: 36px !important;
          }
          .hero-badges-container::-webkit-scrollbar {
            display: none !important; /* Chrome/Safari */
          }
          .hero-badges-container > span {
            white-space: nowrap !important;
            padding: 6px 14px !important;
            font-size: 0.78rem !important;
            color: var(--text) !important;
            border-color: var(--border) !important;
            background: var(--surface) !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-only-line {
            display: none !important;
          }
        }
      `}} />
      <CinematicHero />

      {/* ════════════════════════════════════
          WHO IT'S FOR
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w">
          <ScrollReveal variant="clip">
            <div className="section-header">
              <span className="t-label">WHAT I KEPT SEEING</span>
              <h2 className="t-section">A life gap, not just a skill gap</h2>
              <p>
                Across age groups and industries, these patterns kept showing up.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {painPoints.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} variant="scale">
                <TiltCard className="glass-card" style={{ height: "100%" }} maxTilt={4}>
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
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT VANI
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "transparent", position: "relative", zIndex: 1 }}>
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
            <ScrollReveal variant="line">
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
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    style={{ color: "var(--accent)", position: "absolute", left: "-0.5rem", top: "-0.5rem", fontSize: "1.2em", opacity: 0.4, fontStyle: "italic" }}
                  >
                    &quot;
                  </motion.span>
                  {"I did not build this to teach textbook English. I built this to transform confidence, mindset, and voice.".split(" ").map((w, i) => (
                    <motion.span key={i} style={{display:"inline-block", marginRight:"0.28em"}} initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:"-50px"}} transition={{delay: i*0.06, duration:0.3}}>{w}</motion.span>
                  ))}
                </blockquote>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Through one-on-one conversations across India, it became clear
                  that people are ready to grow but need direction, structure,
                  and a safe space to practice.
                </p>
              </div>
            </ScrollReveal>

            {/* Bio side */}
            <ScrollReveal delay={0.15} variant="clip">
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
          <ScrollReveal variant="line">
            <div className="section-header" style={{ marginBottom: "2rem" }}>
              <span className="t-label">A MOMENT I STILL CARRY</span>
              <h2 className="t-section">At BOSCH, hesitation turned into ownership</h2>
              <p>
                One room, one brave comeback, and a transformation that still
                shapes how I coach every batch.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="clip">
            <TiltCard
              className="glass-card-static"
              style={{ padding: "clamp(1.4rem, 3vw, 2rem)", overflow: "hidden", position: "relative" }}
              maxTilt={3.5}
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
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          CLIENT BREAKTHROUGH VIDEOS
          ════════════════════════════════════ */}
      <section id="testimonial-videos" className="section-pad bg-gradient-subtle" style={{ position: "relative", overflow: "hidden" }}>
        <div className="max-w">
          <ScrollReveal variant="line">
            <div className="section-header" style={{ alignItems: "center" }}>
              <span className="t-label">CLIENT BREAKTHROUGH VIDEOS</span>
              <h2 className="t-section" style={{ textAlign: "center" }}>Real Stories, Visible Results.</h2>
            </div>
          </ScrollReveal>
          <VideoCarousel />
        </div>
      </section>

      {/* ════════════════════════════════════
          SIGNATURE PROGRAMS
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w">
          <ScrollReveal variant="clip">
            <div className="section-header">
              <span className="t-label">SIGNATURE PROGRAMS</span>
              <h2 className="t-section">Choose your next breakthrough program</h2>
              <p>Each track is built for visible speaking confidence in real professional moments.</p>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {featuredPrograms.map((service, i) => (
              <ScrollReveal key={service.number} delay={i * 0.1} variant="scale">
                <TiltCard className="card-wipe-border" style={{ height: "100%" }} maxTilt={4}>
                  <Link
                    href="/programs"
                    className="glass-card explore-link"
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
                          color: "rgba(193, 123, 60, 0.5)",
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
                        <ArrowRight size={16} className="explore-arrow" style={{ color: "var(--accent)" }} />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SOCIAL PROOF MARQUEE
          ════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(180deg, rgba(237, 232, 223, 0.96), rgba(245, 240, 232, 0.92))",
          padding: "1.5rem 0",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
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
                    <span style={{color:"var(--accent)", fontStyle:"italic", marginRight:"-0.4rem"}}>“</span>{text}
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
