import { Check } from "lucide-react";
import Container from "@/components/one-on-one-sessions/Container";
import ClearsFramework from "@/components/one-on-one-sessions/ClearsFramework";
import FloralDecoration from "@/components/one-on-one-sessions/FloralDecoration";
import type { LandingPageContent } from "@/lib/one-on-one-sessions/content";

type WhatYouGetProps = {
  content: LandingPageContent;
};

export default function WhatYouGet({ content }: WhatYouGetProps) {
  return (
    <section
      id="what-youll-get"
      className="relative overflow-hidden border-b border-border/60 bg-background"
    >
      <Container className="grid gap-0 px-0 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="relative border-b border-border/60 px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:px-0 lg:py-16 lg:pr-16">
          <FloralDecoration className="absolute -bottom-24 -left-24 hidden h-72 w-72 lg:block" opacity="opacity-35" />
          <h2 className="font-serif text-3xl font-semibold text-text sm:text-4xl">
            {content.whatTitle}
          </h2>
          <span className="mt-4 block h-px w-12 bg-bronze" aria-hidden="true" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-text-dim sm:text-base">
            {content.whatSubtitle}
          </p>

          <ul className="mt-9 grid gap-5">
            {content.whatBullets.map((item) => (
              <li key={item} className="flex gap-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bronze text-white shadow-sm">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="max-w-md text-sm font-semibold leading-7 text-text-dim">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 py-14 sm:px-8 lg:py-16 lg:pl-16 lg:pr-0">
          <ClearsFramework
            title={content.frameworkTitle}
            items={content.frameworkItems}
          />
        </div>
      </Container>
    </section>
  );
}
