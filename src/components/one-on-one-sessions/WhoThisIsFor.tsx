import { BriefcaseBusiness, GraduationCap, Sparkles, UserRound } from "lucide-react";
import Container from "@/components/one-on-one-sessions/Container";
import SectionHeading from "@/components/one-on-one-sessions/SectionHeading";
import type { CardContent } from "@/lib/one-on-one-sessions/content";

type WhoThisIsForProps = {
  title: string;
  subtitle: string;
  cards: CardContent[];
};

function CardIcon({ icon }: { icon: string }) {
  if (icon === "graduation") {
    return <GraduationCap className="h-12 w-12" aria-hidden="true" />;
  }

  if (icon === "briefcase") {
    return <BriefcaseBusiness className="h-11 w-11" aria-hidden="true" />;
  }

  return (
    <span className="relative inline-flex">
      <UserRound className="h-11 w-11" aria-hidden="true" />
      <Sparkles className="absolute -right-4 bottom-0 h-5 w-5" aria-hidden="true" />
    </span>
  );
}

export default function WhoThisIsFor({
  title,
  subtitle,
  cards
}: WhoThisIsForProps) {
  return (
    <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(255,251,243,0.25),rgba(223,212,193,0.16))] py-10 sm:py-12">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="mt-10 grid overflow-hidden rounded-2xl border border-border/50 bg-background/20 md:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="group relative flex gap-6 border-border/55 p-7 transition duration-200 hover:bg-[#f2eadc]/45 md:min-h-[160px] md:border-l md:first:border-l-0 lg:p-9"
            >
              {index > 0 ? (
                <span className="absolute left-0 top-1/2 hidden h-20 -translate-y-1/2 border-l border-border/70 md:block" />
              ) : null}
              <div className="shrink-0 text-bronze transition duration-200 group-hover:-translate-y-1">
                <CardIcon icon={card.icon} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-text">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-text-dim">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
