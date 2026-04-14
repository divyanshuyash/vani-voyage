import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

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
  title: "Vani's Voice Voyage — Communication & Confidence Coach",
  description:
    "Find your voice and speak without fear. Vani Sumanth helps working professionals and students overcome communication anxiety through personalized coaching, group classes, and offline workshops.",
  keywords: [
    "communication coach",
    "confidence coach",
    "public speaking",
    "communication anxiety",
    "voice coaching",
    "Vani Sumanth",
  ],
  openGraph: {
    title: "Vani's Voice Voyage — Communication & Confidence Coach",
    description:
      "Find your voice and speak without fear. Personalized coaching for professionals and students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body>
        <CustomCursor />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
