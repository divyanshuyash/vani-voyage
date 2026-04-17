import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import AmbientAlphabetBackground from "@/components/AmbientAlphabetBackground";
import AmbientCursorTrail from "@/components/AmbientCursorTrail";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vani's Voice Voyage - Communication, Confidence & Leadership",
  description:
    "For over 20 years, Vani Sumanth has helped 8,000+ learners build communication confidence, spoken fluency, and professional presence through result-driven coaching and programs.",
  keywords: [
    "communication coach",
    "confidence coach",
    "public speaking",
    "executive communication",
    "career growth communication",
    "Vani Sumanth",
    "Vani's Voice Voyage",
  ],
  openGraph: {
    title: "Vani's Voice Voyage - Find Your Voice, Speak with Confidence",
    description:
      "Communication and confidence transformation for students and professionals. 8,000+ learners trained with practical, real-life outcomes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`overflow-x-hidden w-full max-w-[100vw] ${notoSerif.variable} ${manrope.variable}`}>
      <body className="overflow-x-hidden w-full max-w-[100vw]">
        <div aria-hidden="true" className="site-backdrop" />
        <AmbientAlphabetBackground />
        <AmbientCursorTrail />
        <div aria-hidden="true" className="site-grain-overlay" />
        <div className="site-content">
          <CustomCursor />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
