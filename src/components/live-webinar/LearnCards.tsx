import { Container } from "@/components/live-webinar/Container";
import { DecorativeIcon } from "@/components/live-webinar/DecorativeIcon";
import { SectionHeading } from "@/components/live-webinar/SectionHeading";
import type { WebinarPageContent } from "@/lib/live-webinar/types/content";

type LearnCardsProps = {
  content: WebinarPageContent;
};

export function LearnCards({ content }: LearnCardsProps) {
  return (
    <section className="border-b border-brand-border bg-[#F6EFE4] py-10 sm:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_2.05fr] lg:items-start">
          <SectionHeading
            kicker={content.learnKicker}
            title={content.learnIntro}
            className="max-w-md"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.learningCards.map((card) => (
              <article
                key={card.number}
                className="group flex min-h-[228px] flex-col items-center rounded-2xl border border-brand-border bg-[#FDF8EF]/74 p-5 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-bronze hover:shadow-premium"
              >
                <p className="font-serif text-4xl font-black leading-none text-brand-bronze">
                  {card.number}
                </p>
                <div className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-green transition group-hover:bg-brand-green group-hover:text-[#D6A45C]">
                  <DecorativeIcon name={card.icon} size={33} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-black leading-tight text-brand-text">
                  {card.title}
                </h3>
                <p className="mt-3 text-xs font-semibold leading-5 text-brand-dim">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
