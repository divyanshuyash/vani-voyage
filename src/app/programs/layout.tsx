import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs & Corporate Training - Vani's Voice Voyage",
  description:
    "Explore signature programs like Speak Like an Executive, Boardroom Breakthrough, and leadership communication tracks for 2026 growth.",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
