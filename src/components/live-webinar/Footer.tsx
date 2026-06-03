import Image from "next/image";
import { Container } from "@/components/live-webinar/Container";
import type { SiteSettings } from "@/lib/live-webinar/types/content";

type FooterProps = {
  siteSettings: SiteSettings;
};

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Agenda", href: "#agenda" },
  { label: "Speaker", href: "#speaker" },
  { label: "FAQ", href: "#faq" },
];

export function Footer({ siteSettings }: FooterProps) {
  const logo = siteSettings.logo || "/live-webinar/images/vanilogo.png";
  const socials = siteSettings.socialLinks || {};

  return (
    <footer className="bg-[#EFE7DA] py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.35fr_0.8fr_0.8fr] md:items-start">
          <div>
            <a href="#top" aria-label="Back to top" className="inline-flex">
              <Image
                src={logo}
                alt={siteSettings.brandName}
                width={240}
                height={90}
                className="h-20 w-auto"
                unoptimized={logo.endsWith(".svg")}
              />
            </a>
            <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-brand-dim">
              Helping you speak with confidence, lead with clarity and create impact.
            </p>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-brand-bronze">
              Quick links
            </h2>
            <div className="mt-4 grid gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-extrabold text-brand-text transition hover:text-brand-bronze"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-brand-bronze">
              Social
            </h2>
            <div className="mt-4 flex gap-3">
              <a
                href={socials.instagram || "#"}
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-[#F8F0E5] text-brand-text transition hover:border-brand-bronze hover:text-brand-bronze"
              >
                <span className="text-sm font-black leading-none" aria-hidden="true">
                  ig
                </span>
              </a>
              <a
                href={socials.linkedin || "#"}
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-[#F8F0E5] text-brand-text transition hover:border-brand-bronze hover:text-brand-bronze"
              >
                <span className="text-sm font-black leading-none" aria-hidden="true">
                  in
                </span>
              </a>
              <a
                href={socials.facebook || "#"}
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-[#F8F0E5] text-brand-text transition hover:border-brand-bronze hover:text-brand-bronze"
              >
                <span className="text-base font-black leading-none" aria-hidden="true">
                  f
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-brand-border pt-5 text-sm font-semibold text-brand-muted">
          &copy; 2026 Vani&rsquo;s Voice Voyage. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
