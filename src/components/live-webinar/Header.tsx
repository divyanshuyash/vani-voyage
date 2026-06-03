"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/live-webinar/Button";

type HeaderProps = {
  registrationUrl: string;
  logo?: string;
};

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Agenda", href: "#agenda" },
  { label: "Speaker", href: "#speaker" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Header({ registrationUrl, logo = "/live-webinar/images/vanilogo.png" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        isScrolled
          ? "border-b border-[#C7B9A0]/70 bg-[#F4ECDF]/95 shadow-[0_8px_30px_rgba(44,38,33,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-[linear-gradient(180deg,rgba(7,27,22,0.68)_0%,rgba(7,27,22,0.42)_62%,rgba(7,27,22,0.12)_100%)] shadow-none backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="Vani's Voice Voyage home"
          className="flex min-w-0 items-center"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={logo}
            alt="Vani's Voice Voyage"
            width={240}
            height={90}
            priority
            className={`h-[4.25rem] w-auto transition duration-300 sm:h-[4.75rem] ${
              isScrolled
                ? "brightness-100 saturate-100 invert-0 sepia-0 contrast-100 drop-shadow-none"
                : "brightness-0 saturate-100 invert-[92%] sepia-[15%] contrast-[92%] drop-shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
            }`}
            unoptimized={logo.endsWith(".svg")}
          />
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-extrabold transition ${
                isScrolled
                  ? "text-brand-green hover:text-brand-bronze"
                  : "text-[#F3E6D3] hover:text-[#D9B278]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={registrationUrl} size="sm" className="rounded-lg">
            Register for the Webinar
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={registrationUrl}
            className={`rounded-lg px-3 py-2 text-xs font-extrabold shadow-sm transition sm:px-4 ${
              isScrolled
                ? "border border-[#B78343] bg-[#A3835B] text-white hover:bg-[#B78343]"
                : "border border-[#D0AE7A]/75 bg-[#A3835B]/22 text-[#F7EBD9] backdrop-blur hover:bg-[#A3835B]/34"
            }`}
          >
            Register
          </a>
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition ${
              isScrolled
                ? "border border-[#C7B9A0] bg-[#FBF6EE] text-brand-green"
                : "border border-[#D7C2A0]/45 bg-[rgba(247,240,230,0.08)] text-[#F3E6D3] backdrop-blur"
            }`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 top-20 bg-brand-greenInk/45"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <nav
            aria-label="Mobile navigation"
            className="relative border-t border-[#C7B9A0] bg-[#EFE7DA] px-5 py-5 shadow-xl"
          >
            <div className="mx-auto flex max-w-[1200px] flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-extrabold text-brand-text transition hover:bg-brand-surface"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href={registrationUrl}
                className="mt-2 w-full"
                onClick={() => setIsOpen(false)}
              >
                Register for the Webinar
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
