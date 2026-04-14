import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Vani — Let's Start with Hello",
  description:
    "Reach out to Vani Sumanth for communication coaching inquiries, workshop bookings, or just to say hello. No corporate forms — just a real conversation.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
