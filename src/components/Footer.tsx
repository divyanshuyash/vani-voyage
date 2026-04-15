"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg, rgba(44, 62, 53, 0.98) 0%, rgba(28, 39, 33, 1) 100%)",
        borderTop: "1px solid rgba(193, 123, 60, 0.18)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(20px, 6vw, 100px)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 -24px 60px rgba(26, 22, 18, 0.14)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1.3fr) repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.75rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(245, 240, 232, 0.12)",
          }}
        >
          {/* Logo + tagline */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                marginBottom: "0.75rem",
              }}
            >
              <Image
                src="/image-removebg-preview.png"
                alt="Vani's Voice Voyage Logo"
                width={88}
                height={88}
                style={{
                  height: 42,
                  width: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 14px rgba(193, 123, 60, 0.24))",
                }}
              />
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.12rem",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.02rem",
                    color: "var(--bg)",
                    letterSpacing: "-0.012em",
                  }}
                >
                  Vani&apos;s Voice Voyage
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    color: "rgba(245, 240, 232, 0.78)",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  Find your voice. Speak without fear.
                </span>
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.9rem",
                color: "rgba(245, 240, 232, 0.7)",
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              Helping professionals and students find their voice and speak with
              clarity and confidence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245, 240, 232, 0.5)",
                marginBottom: "0.75rem",
              }}
            >
              Navigate
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover-underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "0.85rem",
                    color: "rgba(245, 240, 232, 0.85)",
                    display: "inline-block",
                    width: "fit-content",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245, 240, 232, 0.5)",
                marginBottom: "0.75rem",
              }}
            >
              Get in touch
            </h4>
            <a
              href="mailto:hello@vanisvoicevoyage.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: "rgba(245, 240, 232, 0.85)",
                transition: "color 0.3s",
                  padding: "0.45rem 0.65rem",
                  borderRadius: 999,
                  border: "1px solid rgba(245, 240, 232, 0.08)",
                  background: "rgba(255, 255, 255, 0.03)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 240, 232, 0.85)")}
            >
              <Mail size={14} />
              hello@vanisvoicevoyage.com
            </a>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(245, 240, 232, 0.15)",
            paddingTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "rgba(245, 240, 232, 0.5)",
            }}
          >
            © {new Date().getFullYear()} Vani&apos;s Voice Voyage. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "rgba(245, 240, 232, 0.5)",
            }}
          >
            Bengaluru, India
          </p>
        </div>
      </div>
    </footer>
  );
}
