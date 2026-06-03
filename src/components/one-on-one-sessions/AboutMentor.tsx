import { Award, Clock3, Presentation, UsersRound } from "lucide-react";
import Image from "next/image";
import Container from "@/components/one-on-one-sessions/Container";
import type { MentorContent } from "@/lib/one-on-one-sessions/content";
import { resolveImageSrc } from "@/lib/one-on-one-sessions/cloudinary";

type AboutMentorProps = {
  mentor: MentorContent;
};

function StatIcon({ icon }: { icon: string }) {
  if (icon === "users") {
    return <UsersRound className="h-5 w-5" aria-hidden="true" />;
  }

  if (icon === "presentation") {
    return <Presentation className="h-5 w-5" aria-hidden="true" />;
  }

  if (icon === "badge") {
    return <Award className="h-5 w-5" aria-hidden="true" />;
  }

  return <Clock3 className="h-5 w-5" aria-hidden="true" />;
}

export default function AboutMentor({ mentor }: AboutMentorProps) {
  const mentorImage = resolveImageSrc(mentor.photo, "/one-on-one-sessions/images/mentor.jpg", {
    width: 900,
    height: 1100,
    crop: "fill"
  });

  return (
    <section id="about" className="border-b border-border/60 bg-[linear-gradient(90deg,rgba(223,212,193,0.38),rgba(232,223,207,1))]">
      <Container className="grid gap-0 px-0 lg:grid-cols-[0.44fr_0.56fr] lg:px-10">
        <div className="relative min-h-[430px] overflow-hidden bg-surface lg:min-h-[520px]">
          <Image
            src={mentorImage}
            alt={mentor.photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover object-[52%_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text/14 via-transparent to-transparent" />
        </div>

        <div className="flex items-center px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-bronze">
              Your Mentor
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-green sm:text-5xl">
              {mentor.name}
            </h2>
            <p className="mt-2 text-sm font-bold text-text">
              {mentor.title}
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-text-dim">
              {mentor.bio}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {mentor.stats.map((stat) => (
                <article key={`${stat.value}-${stat.label}`} className="flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bronze/60 text-bronze">
                    <StatIcon icon={stat.icon} />
                  </span>
                  <div>
                    <p className="text-lg font-extrabold leading-tight text-text">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-text-dim">
                      {stat.label}
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
