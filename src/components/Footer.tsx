"use client";

import Link from "next/link";
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
        background: "var(--secondary)",
        borderTop: "none",
        padding: "clamp(2.5rem, 5vw, 4rem) clamp(20px, 6vw, 100px)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Logo + tagline */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <svg width="18" height="14" viewBox="0 0 20 16" fill="none">
                {[
                  { x: 0, h: 8, y: 4 },
                  { x: 5, h: 14, y: 1 },
                  { x: 10, h: 16, y: 0 },
                  { x: 15, h: 10, y: 3 },
                ].map((bar, i) => (
                  <rect
                    key={i}
                    x={bar.x}
                    y={bar.y}
                    width="3"
                    height={bar.h}
                    rx="1.5"
                    fill="var(--accent)"
                  />
                ))}
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--bg)",
                }}
              >
                Vani&apos;s Voice Voyage
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.85rem",
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
            paddingTop: "1.5rem",
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
