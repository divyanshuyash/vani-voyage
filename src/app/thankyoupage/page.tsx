import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import MetaPixelEvents from "@/components/MetaPixelEvents";

export const metadata: Metadata = {
  title: "Thank You | Vani's Voice Voyage",
  description:
    "Thank you for joining Vani's Voice Voyage. Chat with us on WhatsApp for further information and next steps.",
};

const whatsappUrl =
  "https://chat.whatsapp.com/HDmwDzZPrQ05CaNNpILIfp";

export default function ThankYouPage() {
  return (
    <>
      <MetaPixelEvents trackLead />
      <main
        style={{
          minHeight: "100svh",
          padding: "clamp(112px, 14vw, 152px) clamp(20px, 5vw, 72px) clamp(56px, 8vw, 92px)",
          background:
            "radial-gradient(circle at 22% 16%, rgba(255, 248, 236, 0.74), transparent 34%), radial-gradient(circle at 78% 22%, rgba(163, 131, 91, 0.18), transparent 30%), #E8DFCF",
          color: "#2C2621",
          overflow: "hidden",
          position: "relative",
        }}
      >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(199,185,160,0.32) 1px, transparent 1px), linear-gradient(rgba(199,185,160,0.22) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.18,
        }}
      />

      <section
        style={{
          width: "min(100%, 980px)",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gap: "clamp(24px, 4vw, 40px)",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(199, 185, 160, 0.82)",
            borderRadius: 28,
            background: "linear-gradient(135deg, rgba(247,240,229,0.92), rgba(223,212,193,0.78))",
            boxShadow: "0 24px 70px rgba(44,38,33,0.11)",
            padding: "clamp(28px, 6vw, 64px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -90,
              top: -90,
              width: 240,
              height: 240,
              borderRadius: "50%",
              border: "1px solid rgba(163,131,91,0.24)",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: -70,
              bottom: -70,
              width: 190,
              height: 190,
              borderRadius: "50%",
              background: "rgba(44,62,53,0.08)",
            }}
          />

          <Image
            src="/image-removebg-preview.png"
            alt="Vani's Voice Voyage logo"
            width={96}
            height={96}
            priority
            style={{
              width: 58,
              height: "auto",
              margin: "0 auto 22px",
              filter: "drop-shadow(0 10px 18px rgba(163,131,91,0.22))",
            }}
          />

          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F7F0E6",
              background: "#17352C",
              boxShadow: "0 16px 36px rgba(23,53,44,0.22)",
            }}
          >
            <CheckCircle2 size={34} strokeWidth={1.9} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#A3835B",
              marginBottom: 12,
            }}
          >
            Form Submitted
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.45rem, 7vw, 5rem)",
              lineHeight: 1.02,
              fontWeight: 700,
              color: "#2C3E35",
              letterSpacing: 0,
              margin: "0 auto",
              maxWidth: 780,
            }}
          >
            Thank you for reaching out!
          </h1>

          <p
            style={{
              margin: "clamp(18px, 3vw, 26px) auto 0",
              maxWidth: 650,
              fontSize: "clamp(1rem, 2.1vw, 1.15rem)",
              lineHeight: 1.8,
              color: "#4D443B",
              fontWeight: 600,
            }}
          >
            We have received your details. Our team will get back to you shortly.
            For immediate assistance or next steps, you can chat directly with Vani&apos;s team on WhatsApp.
          </p>

          <div
            style={{
              margin: "clamp(26px, 4vw, 36px) auto 0",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Join WhatsApp Group"
              style={{
                minHeight: 54,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                borderRadius: 10,
                padding: "0.95rem 1.4rem",
                background: "#A3835B",
                color: "#FFF8EA",
                fontWeight: 800,
                boxShadow: "0 18px 34px rgba(163,131,91,0.25)",
              }}
            >
              <MessageCircle size={20} />
              Join WhatsApp Group
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
