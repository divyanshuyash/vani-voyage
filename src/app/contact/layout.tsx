import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Vani - Coaching & Training Enquiries",
  description:
    "Connect with Vani Sumanth for communication coaching, confidence programs, or corporate training enquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
