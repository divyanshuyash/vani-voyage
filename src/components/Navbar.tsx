"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          background: scrolled ? "rgba(245, 240, 232, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(217, 210, 199, 0.6)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 clamp(20px, 6vw, 100px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Tiny sound bars icon */}
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
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
                fontSize: "1.05rem",
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              Vani&apos;s Voice Voyage
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    transition: "color 0.3s",
                    position: "relative",
                    paddingBottom: 4,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: 0,
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

            <Link href="/contact" className="btn-pill">
              Book a Call
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hide-desktop"
            style={{ color: "var(--text)", padding: 8 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="mobile-menu-overlay"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: pathname === link.href ? "var(--accent)" : "var(--text)",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ marginTop: "1rem" }}
            >
              <Link href="/contact" className="btn-primary">
                Book a Call
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
