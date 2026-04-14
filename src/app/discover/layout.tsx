import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Your Communication Score — Vani's Voice Voyage",
  description:
    "Take the Communication Audit quiz and find out how confident your voice really is. Get personalized insights and actionable next steps from Vani Sumanth.",
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
