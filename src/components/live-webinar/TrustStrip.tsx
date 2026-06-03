import { Award, Landmark, Presentation, UsersRound } from "lucide-react";
import { Container } from "@/components/live-webinar/Container";
import type { TrustMetric } from "@/lib/live-webinar/types/content";

type TrustStripProps = {
  metrics: TrustMetric[];
};

const icons = [Award, UsersRound, Landmark, Presentation];

export function TrustStrip({ metrics }: TrustStripProps) {
  return (
    <section
      aria-label="Authority highlights"
      className="border-y border-brand-border bg-[#F3EBDE]"
    >
      <Container>
        <div className="grid grid-cols-1 divide-y divide-brand-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = icons[index] || Award;
            return (
              <div
                key={`${metric.value}-${metric.label}`}
                className="flex min-h-28 items-center gap-4 px-2 py-6 sm:px-5"
              >
                <Icon
                  aria-hidden="true"
                  className="shrink-0 text-brand-bronze"
                  size={44}
                  strokeWidth={1.55}
                />
                <div>
                  <p className="font-serif text-4xl font-black leading-none text-brand-bronze">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm font-extrabold leading-tight text-brand-text">
                    {metric.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
