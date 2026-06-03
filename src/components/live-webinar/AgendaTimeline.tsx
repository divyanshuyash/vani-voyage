import { Container } from "@/components/live-webinar/Container";
import { DecorativeIcon } from "@/components/live-webinar/DecorativeIcon";
import { SectionHeading } from "@/components/live-webinar/SectionHeading";
import type { WebinarPageContent } from "@/lib/live-webinar/types/content";

type AgendaTimelineProps = {
  content: WebinarPageContent;
};

export function AgendaTimeline({ content }: AgendaTimelineProps) {
  return (
    <section id="agenda" className="border-b border-brand-border bg-brand-bg py-10 sm:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_2.05fr] lg:items-start">
          <SectionHeading
            kicker={content.agendaKicker}
            title={content.agendaIntro}
            className="max-w-sm"
          />

          <div>
            <h2 className="sr-only">{content.agendaHeading}</h2>
            <div className="relative hidden grid-cols-5 gap-5 lg:grid">
              <div
                aria-hidden="true"
                className="absolute left-[10%] right-[10%] top-[48px] h-px bg-brand-bronze"
              />
              {content.agendaItems.map((item) => (
                <article key={item.time} className="relative text-center">
                  <p className="mb-5 text-sm font-extrabold text-brand-text">
                    {item.time}
                  </p>
                  <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full border border-brand-bronze bg-[#F8F0E5] text-brand-green shadow-sm">
                    <DecorativeIcon name={item.icon} size={34} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-5 text-base font-black leading-tight text-brand-text">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[150px] text-xs font-semibold leading-5 text-brand-dim">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative grid gap-4 lg:hidden">
              <div
                aria-hidden="true"
                className="absolute bottom-10 left-8 top-6 w-px bg-brand-bronze/55"
              />
              {content.agendaItems.map((item) => (
                <article
                  key={item.time}
                  className="relative flex gap-4 rounded-2xl border border-brand-border bg-[#F8F0E5]/80 p-4 shadow-sm"
                >
                  <div className="z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-brand-bronze bg-[#F8F0E5] text-brand-green">
                    <DecorativeIcon name={item.icon} size={30} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-brand-bronze">
                      {item.time}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-brand-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-brand-dim">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
