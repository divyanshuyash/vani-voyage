import Image from "next/image";
import { Award, Landmark, Presentation, UsersRound } from "lucide-react";
import { Container } from "@/components/live-webinar/Container";
import type { Mentor } from "@/lib/live-webinar/types/content";

type SpeakerSectionProps = {
  mentor: Mentor;
};

const statIcons = [Award, UsersRound, Landmark, Presentation];

export function SpeakerSection({ mentor }: SpeakerSectionProps) {
  return (
    <section id="speaker" className="border-b border-brand-border bg-[#F4ECDF] py-8 sm:py-10">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-[linear-gradient(110deg,#F4ECDF_0%,#E2D7C6_100%)] p-5 shadow-[0_16px_45px_rgba(44,38,33,0.08)] sm:p-7">
          <Image
            src="/live-webinar/images/decorative-line.svg"
            alt=""
            width={210}
            height={210}
            className="pointer-events-none absolute -bottom-14 -left-8 opacity-50"
            unoptimized
          />
          <div className="relative grid gap-7 xl:grid-cols-[0.72fr_1.28fr] xl:items-center">
            <div className="mx-auto w-full max-w-[220px] xl:mx-0">
              <div className="rounded-full border-[8px] border-brand-bronze bg-brand-green p-2 shadow-premium">
                <Image
                  src={mentor.photo || "/live-webinar/images/speaker-vani.svg"}
                  alt={`${mentor.name}, ${mentor.title}`}
                  width={420}
                  height={420}
                  className="aspect-square rounded-full object-cover object-top"
                  unoptimized={(mentor.photo || "").endsWith(".svg")}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-bronze">
                Meet Your Mentor
              </p>
              <h2 className="mt-2 font-serif text-4xl font-black leading-tight text-brand-bronze sm:text-5xl">
                {mentor.name}
              </h2>
              <p className="mt-1 text-sm font-extrabold text-brand-text">
                {mentor.title}
              </p>
              <p className="mt-5 text-sm font-semibold leading-6 text-brand-dim">
                {mentor.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-brand-border overflow-hidden rounded-2xl border border-brand-border bg-[#F7F0E6]/55 sm:grid-cols-4 sm:divide-y-0 xl:col-span-2">
              {mentor.stats.map((stat, index) => {
                const Icon = statIcons[index] || Award;
                return (
                  <div key={`${stat.value}-${stat.label}`} className="p-5 text-center sm:p-6">
                    <Icon
                      aria-hidden="true"
                      className="mx-auto text-brand-bronze"
                      size={42}
                      strokeWidth={1.5}
                    />
                    <p className="mt-3 break-words font-serif text-2xl font-black leading-none text-brand-bronze sm:text-[2rem]">
                      {stat.value}
                    </p>
                    <p className="mx-auto mt-2 max-w-[12ch] text-[11px] font-extrabold leading-tight text-brand-text sm:max-w-[15ch] sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
