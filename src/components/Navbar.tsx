"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 72,
          display: "flex",
          alignItems: "center",
          padding: "0",
          background: scrolled ? "rgba(245, 240, 232, 0.95)" : "rgba(245, 240, 232, 0.9)",
          borderBottom: scrolled ? "1px solid rgba(217, 210, 199, 0.72)" : "1px solid rgba(217, 210, 199, 0.45)",
          boxShadow: scrolled ? "0 10px 24px rgba(26, 22, 18, 0.08)" : "0 4px 16px rgba(26, 22, 18, 0.04)",
          backdropFilter: "blur(10px) saturate(150%)",
          WebkitBackdropFilter: "blur(10px) saturate(150%)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-full flex justify-between items-center px-4 md:px-12 max-w-[1040px] mx-auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.2rem",
            pointerEvents: "auto",
            background: "transparent",
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            paddingTop: "0.65rem",
            paddingBottom: "0.65rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Vani's Voice Voyage Home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image
                src="/image-removebg-preview.png"
                alt="Vani's Voice Voyage Logo"
                width={88}
                height={88}
                priority
                style={{
                  height: 38,
                  width: "auto",
                  objectFit: "contain",
                  objectPosition: "center",
                  filter: "drop-shadow(0 8px 16px rgba(193, 123, 60, 0.22))",
                }}
              />
            </span>

            <span
              className="hide-mobile"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.15rem",
                justifyContent: "center",
                lineHeight: 1.02,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.08rem",
                  color: "var(--text)",
                  letterSpacing: "-0.015em",
                  textShadow: "0 2px 10px rgba(193, 123, 60, 0.18)",
                  whiteSpace: "nowrap",
                }}
              >
                Vani&apos;s Voice Voyage
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.56rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                Find your voice. Speak without fear.
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "clamp(0.2rem, 1vw, 1.2rem)" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    transition: "color 0.3s, background 0.3s, transform 0.3s",
                    position: "relative",
                    padding: "clamp(0.3rem, 1.5vw, 0.45rem) clamp(0.5rem, 2vw, 0.8rem)",
                    borderRadius: 999,
                    background: isActive ? "var(--accent-soft)" : "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                         position: "absolute",
                         bottom: 3,
                         left: 0,
                         right: 0,
                         height: 2,
                         background: "var(--accent)",
                         borderRadius: 1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center"
            style={{ width: 44, height: 44, background: "transparent", border: "none", color: "var(--text)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(245, 240, 232, 0.98)",
              borderBottom: "1px solid rgba(217, 210, 199, 0.45)",
              boxShadow: "0 10px 24px rgba(26, 22, 18, 0.08)",
              backdropFilter: "blur(10px)",
              padding: "1rem clamp(12px, 3vw, 64px)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "1rem",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    padding: "0.8rem 1rem",
                    borderRadius: 8,
                    background: isActive ? "var(--accent-soft)" : "transparent",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}