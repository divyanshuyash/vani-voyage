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
  { href: "/live-webinar", label: "Live Webinar" },
  { href: "/one-on-one-sessions", label: "1:1 Session" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isOneOnOnePage =
    pathname === "/one-on-one-sessions" || pathname.startsWith("/one-on-one-sessions/");
  const isLiveWebinarPage =
    pathname === "/live-webinar" || pathname.startsWith("/live-webinar/");
  const isThankYouPage =
    pathname === "/thankyoupage" || pathname.startsWith("/thankyoupage/");
  const navSurface = scrolled
    ? "rgba(232, 223, 207, 0.96)"
    : "rgba(232, 223, 207, 0.92)";

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (isLiveWebinarPage || isOneOnOnePage || isThankYouPage) {
    return null;
  }

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
          background: navSurface,
          borderBottom: scrolled
            ? "1px solid rgba(199, 185, 160, 0.72)"
            : "1px solid rgba(199, 185, 160, 0.38)",
          boxShadow: scrolled ? "0 10px 24px rgba(26, 22, 18, 0.08)" : "none",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-full flex justify-between items-center px-4 md:px-7 mx-auto"
          style={{
            maxWidth: 1240,
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
                  letterSpacing: 0,
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
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "clamp(0.08rem, 0.7vw, 0.85rem)" }}>
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === link.href
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 700 : 600,
                    fontSize: "clamp(0.68rem, 1vw, 0.82rem)",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    transition: "color 0.25s, background 0.25s, border-color 0.25s",
                    position: "relative",
                    padding: "clamp(0.3rem, 1.5vw, 0.45rem) clamp(0.4rem, 1vw, 0.72rem)",
                    borderRadius: 999,
                    border: "1px solid transparent",
                    background: isActive ? "var(--accent-soft)" : "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden flex items-center justify-center"
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
            className="lg:hidden"
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(232, 223, 207, 0.98)",
              borderBottom: "1px solid rgba(199, 185, 160, 0.45)",
              boxShadow: "0 10px 24px rgba(26, 22, 18, 0.08)",
              backdropFilter: "blur(10px)",
              padding: "0.85rem clamp(16px, 4vw, 40px) 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
            }}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === link.href
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
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
