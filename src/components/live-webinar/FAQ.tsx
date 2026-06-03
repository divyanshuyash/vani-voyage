import { ChevronDown } from "lucide-react";
import { Container } from "@/components/live-webinar/Container";
import type { FAQItem } from "@/lib/live-webinar/types/content";

type FAQProps = {
  heading: string;
  items: FAQItem[];
};

export function FAQ({ heading, items }: FAQProps) {
  return (
    <section id="faq" className="border-b border-brand-border bg-[#F7F0E6] py-10 sm:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.22fr_1fr]">
          <div>
            <h2 className="font-serif text-4xl font-black text-brand-text">
              {heading}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-1 w-12 rounded-full bg-brand-bronze" />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-brand-border bg-[#EFE7DA]/70 shadow-sm"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-sm font-extrabold text-brand-text">
                  <span>{item.question}</span>
                  <ChevronDown
                    className="shrink-0 text-brand-muted transition group-open:rotate-180"
                    size={18}
                  />
                </summary>
                <div className="px-5 pb-4 text-sm font-semibold leading-6 text-brand-dim">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
