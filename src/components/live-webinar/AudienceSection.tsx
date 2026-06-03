import { Container } from "@/components/live-webinar/Container";
import { DecorativeIcon } from "@/components/live-webinar/DecorativeIcon";
import { SectionHeading } from "@/components/live-webinar/SectionHeading";
import type { WebinarPageContent } from "@/lib/live-webinar/types/content";

type AudienceSectionProps = {
  content: WebinarPageContent;
};

export function AudienceSection({ content }: AudienceSectionProps) {
  return (
    <section id="about" className="border-b border-brand-border bg-brand-bg py-10 sm:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_2.05fr] lg:items-start">
          <SectionHeading
            kicker={content.audienceIntroKicker}
            title={content.audienceHeading}
            intro={content.audienceIntro}
            className="max-w-sm"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {content.audienceCards.map((card) => (
              <article
                key={card.title}
                className="group min-h-[170px] rounded-2xl border border-brand-border bg-[#F3EBDE]/80 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-[#D6A45C] shadow-[inset_0_0_0_1px_rgba(214,164,92,0.28)]">
                  <DecorativeIcon name={card.icon} size={28} strokeWidth={1.8} />
                </div>
                <h3 className="font-serif text-xl font-black leading-tight text-brand-text">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-brand-dim">
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
