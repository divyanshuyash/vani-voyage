"use client";

import { clsx } from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import Container from "@/components/one-on-one-sessions/Container";
import SectionHeading from "@/components/one-on-one-sessions/SectionHeading";
import type { FaqContent } from "@/lib/one-on-one-sessions/content";

type FAQProps = {
  faqs: FaqContent[];
};

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-background py-14 sm:py-16">
      <Container>
        <SectionHeading title="Frequently Asked Questions" />

        <div className="mt-9 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-xl border border-border bg-[#efe6d8]/36"
              >
                <button
                  type="button"
                  className="flex min-h-[62px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-text transition hover:bg-[#f5eddf]/55"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span>{faq.question}</span>
                  <Plus
                    className={clsx(
                      "h-4 w-4 shrink-0 text-bronze transition duration-200",
                      open && "rotate-45"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={clsx(
                    "grid transition-all duration-300",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-border/70 px-5 py-4 text-sm leading-7 text-text-dim">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
