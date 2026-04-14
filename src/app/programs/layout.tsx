import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs, Events & Courses — Vani's Voice Voyage",
  description:
    "Explore group classes, 1:1 coaching, and offline workshops designed to unlock your communication confidence. Find the right program for your journey.",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
