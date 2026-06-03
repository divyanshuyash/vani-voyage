import { Clock3, Quote, Video } from "lucide-react";
import Image from "next/image";
import Button from "@/components/one-on-one-sessions/Button";
import Container from "@/components/one-on-one-sessions/Container";
import FloralDecoration from "@/components/one-on-one-sessions/FloralDecoration";
import type { LandingPageContent, TestimonialContent } from "@/lib/one-on-one-sessions/content";
import { resolveImageSrc } from "@/lib/one-on-one-sessions/cloudinary";

type HeroProps = {
  content: LandingPageContent;
  bookingUrl: string;
  avatars: TestimonialContent[];
};

export default function Hero({ content, bookingUrl, avatars }: HeroProps) {
  const heroImage = resolveImageSrc(content.heroImage, "/one-on-one-sessions/images/hero-mentor.jpg", {
    width: 1200,
    height: 1600,
    crop: "fill"
  });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-border/55 bg-background"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(255,251,242,0.72),transparent_34%),radial-gradient(circle_at_85%_36%,rgba(163,131,91,0.14),transparent_32%)]" />
      <FloralDecoration className="absolute -right-36 top-8 -z-10 hidden rotate-[18deg] lg:block" opacity="opacity-25" />

      <Container className="grid min-h-[660px] items-center gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)] lg:gap-16 lg:py-8">
        <div className="max-w-[620px] pt-2 lg:pt-0">
          <div className="mb-7 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.34em] text-text">
            <span>{content.heroEyebrow}</span>
            <span className="h-px w-10 bg-bronze" aria-hidden="true" />
          </div>

          <h1 className="vvv-hero-title font-serif font-semibold tracking-normal text-green">
            {content.heroHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <em className="vvv-hero-accent block font-serif font-medium text-bronze">
              {content.heroAccent}
            </em>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-text-dim sm:text-lg">
            {content.heroSubheadline}
          </p>

          <div className="mt-7 grid gap-4 text-sm text-text-dim sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bronze text-bronze">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="pt-1 font-semibold text-text">30-Minute Session</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-bronze text-bronze">
                <Video className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="max-w-[240px] leading-6">
                Web conferencing details provided upon completion
              </span>
            </div>
          </div>

          <div className="mt-8 flex">
            <Button href={bookingUrl} fullWidth className="sm:w-auto sm:min-w-[220px]">
              {content.primaryCta.label}
            </Button>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex -space-x-3">
              {avatars.slice(0, 4).map((avatar, index) => (
                <Image
                  key={`${avatar.name}-${index}`}
                  src={resolveImageSrc(avatar.photo, `/one-on-one-sessions/images/avatar-${index + 1}.jpg`, {
                    width: 120,
                    height: 120
                  })}
                  alt={avatar.photo.alt}
                  width={38}
                  height={38}
                  className="h-10 w-10 rounded-full border-2 border-background object-cover shadow-sm"
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-text-dim">{content.trustText}</p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[700px] lg:mr-0">
          <div className="relative ml-auto aspect-[0.82] w-full max-w-[560px] overflow-hidden rounded-[28px] border border-border/55 bg-surface shadow-premium sm:aspect-[0.88] lg:max-w-[600px]">
            <Image
              src={heroImage}
              alt={content.heroImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 620px"
              className="object-cover object-[56%_38%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/45 to-transparent" />
          </div>

          <aside className="relative mx-auto -mt-12 w-[88%] rounded-2xl border border-border/80 bg-[#f4eee3]/90 p-6 shadow-premium-soft backdrop-blur sm:absolute sm:right-4 sm:bottom-3 sm:mt-0 sm:w-[230px] lg:right-5 lg:bottom-5">
            <Quote className="mb-4 h-7 w-7 fill-bronze/25 text-bronze/70" aria-hidden="true" />
            <p className="text-sm font-medium leading-7 text-text-dim">
              {content.heroQuote}
            </p>
            <p className="mt-6 text-sm font-semibold text-bronze">
              — {content.heroQuoteAuthor}
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
