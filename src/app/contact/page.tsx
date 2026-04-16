"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Send, CheckCircle, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ── Inline SVG Social Icons ──
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more — even a few words help"),
});

type ContactForm = z.infer<typeof contactSchema>;

const CONTACT_EMAIL = "vanisumanth21@gmail.com";

const socials = [
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vani-sumanth-1a32182a4",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/vani.sumanth?igsh=MXZuY3loYzR0OGt4aQ==",
  },
  {
    icon: InstagramIcon,
    label: "Fluent Convo",
    href: "https://www.instagram.com/fluentconvocoach?igsh=M2hjZjZ3eW41dTNq",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/share/1bPgh7Tmyz/",
  },
  {
    icon: FacebookIcon,
    label: "Community",
    href: "https://www.facebook.com/share/18Cqu8oQxD/",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    const subject = encodeURIComponent(`New enquiry from ${data.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone?.trim() || "Not provided"}`,
        "",
        "Message:",
        data.message,
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* ════════════════════════════════════
          HERO
          ════════════════════════════════════ */}
      <section className="section-pad bg-accent-glow" style={{
        background: "var(--bg)",
        paddingTop: "clamp(110px, 16vw, 190px)",
        paddingBottom: "clamp(40px, 6vw, 60px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="max-w" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-header">
            <span className="t-label">GET IN TOUCH</span>
            <h1 className="t-hero" style={{ maxWidth: 600, margin: "0 auto 1rem" }}>
              Let&apos;s start with <span style={{ color: "var(--accent)" }}>hello.</span>
            </h1>
            <p style={{ maxWidth: 460 }}>
              Whether you are a student, professional, or institution, share
              your goal and I will personally guide you to the right next step.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FORM + SIDEBAR
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg)", paddingTop: "0" }}>
        <div className="max-w">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="md:!grid-cols-[1fr_340px]"
          >
            {/* Form Card */}
            <ScrollReveal>
              <div className="glass-card">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease }}
                    style={{ textAlign: "center", padding: "3rem 1rem" }}
                  >
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
                      <CheckCircle size={28} style={{ color: "var(--accent)" }} />
                    </div>
                    <h3 className="t-card" style={{ marginBottom: "0.5rem" }}>
                      Message sent!
                    </h3>
                    <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                      Your email app has opened with a pre-filled message to {CONTACT_EMAIL}.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <h3 className="t-card" style={{ marginBottom: "1.5rem" }}>
                      <Send size={16} style={{ color: "var(--accent)", display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
                      Send me a message
                    </h3>

                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="name">YOUR NAME</label>
                      <input
                        id="name"
                        type="text"
                        className="form-input"
                        placeholder="What should I call you?"
                        {...register("name")}
                      />
                      {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="email">EMAIL ADDRESS</label>
                      <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder="your.email@example.com"
                        {...register("email")}
                      />
                      {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                      <label htmlFor="phone">
                        PHONE <span style={{ color: "var(--muted)", textTransform: "none", letterSpacing: "normal", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+91 XXXXX XXXXX"
                        {...register("phone")}
                      />
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="message">WHAT&apos;S HOLDING YOU BACK?</label>
                      <textarea
                        id="message"
                        className="form-input"
                        rows={4}
                        placeholder="Tell me what's on your mind. No wrong answers here."
                        style={{ resize: "vertical", minHeight: 100 }}
                        {...register("message")}
                      />
                      {errors.message && <p className="form-error">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: "100%", marginTop: "0.5rem" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <ArrowRight size={16} />}
                    </button>

                    <p
                      style={{
                        marginTop: "0.7rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.76rem",
                        color: "var(--muted)",
                        textAlign: "center",
                      }}
                    >
                      Clicking send opens your email app and drafts a message to {CONTACT_EMAIL}.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Social Links Card */}
              <ScrollReveal delay={0.1}>
                <div className="glass-card-static">
                  <h4 style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                  }}>
                    Connect with me
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.label}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "34px 1fr auto",
                          alignItems: "center",
                          gap: "0.7rem",
                          padding: "0.82rem 0.9rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border)",
                          transition: "all 0.3s var(--ease)",
                          color: "var(--text)",
                          background: "var(--surface)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 10,
                            background: "var(--accent-soft)",
                            color: "var(--accent)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <s.icon size={15} />
                        </span>

                        <span style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>
                            {s.label}
                          </span>
                        </span>

                        <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                      </a>
                    ))}
                  </div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    style={{
                      marginTop: "0.9rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      borderRadius: "var(--radius-sm)",
                      border: "1px dashed rgba(193, 123, 60, 0.35)",
                      background: "rgba(193,123,60,0.06)",
                      padding: "0.62rem 0.8rem",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      color: "var(--accent)",
                    }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    marginTop: "1rem",
                    lineHeight: 1.6,
                  }}>
                    I reply personally to serious growth-focused messages.
                  </p>
                </div>
              </ScrollReveal>

              {/* Location Card */}
              <ScrollReveal delay={0.15}>
                <div className="glass-card-static">
                  <h4 style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                  }}>
                    Offline Sessions
                  </h4>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <MapPin size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", color: "var(--text)", marginBottom: "0.25rem" }}>
                        Bengaluru, India
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6 }}>
                        In-person workshops and coaching sessions available. Drop me a message to know more.
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.8rem", color: "var(--text)", marginTop: "0.45rem" }}>
                        Email: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>


            </div>
          </div>
        </div>
      </section>
    </>
  );
}
