import { CheckCircle2, Quote } from "lucide-react";
import Button from "@/components/one-on-one-sessions/Button";
import Container from "@/components/one-on-one-sessions/Container";
import FloralDecoration from "@/components/one-on-one-sessions/FloralDecoration";
import type { LandingPageContent } from "@/lib/one-on-one-sessions/content";

type CTASectionProps = {
  content: LandingPageContent["finalCta"];
  bookingUrl: string;
};

export default function CTASection({ content, bookingUrl }: CTASectionProps) {
  return (
    <section className="bg-background pb-10 sm:pb-12">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl border border-green/30 bg-cta-green px-6 py-8 text-white shadow-premium sm:px-10 lg:px-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_28%_10%,rgba(163,131,91,0.24),transparent_34%),radial-gradient(circle_at_78%_78%,rgba(232,223,207,0.08),transparent_36%)]" />
          <FloralDecoration className="absolute -left-24 -top-24 h-64 w-64 invert" opacity="opacity-20" />
          <FloralDecoration className="absolute -bottom-28 -right-20 h-72 w-72 rotate-180 invert" opacity="opacity-20" />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr_0.9fr] lg:items-center">
            <div className="flex gap-5">
              <Quote className="mt-1 h-8 w-8 shrink-0 fill-bronze/25 text-bronze" aria-hidden="true" />
              <h2 className="max-w-sm font-serif text-2xl font-medium leading-tight text-[#f5ead7] sm:text-3xl">
                {content.headline}
              </h2>
            </div>

            <ul className="grid gap-3 border-bronze/35 lg:border-x lg:px-10">
              {content.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-sm font-semibold text-[#efe4d0]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="text-center lg:text-left">
              <Button href={bookingUrl} variant="light" className="w-full sm:w-auto lg:w-full">
                {content.buttonLabel}
              </Button>
              <p className="mt-4 text-center text-xs font-semibold text-[#efe4d0]">
                {content.note}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
