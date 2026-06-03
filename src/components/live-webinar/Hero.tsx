import Image from "next/image";
import { BadgeCheck, CalendarDays, Radio, Video } from "lucide-react";
import { Button } from "@/components/live-webinar/Button";
import { Container } from "@/components/live-webinar/Container";
import type { WebinarPageContent } from "@/lib/live-webinar/types/content";

type HeroProps = {
  content: WebinarPageContent;
  registrationUrl: string;
};

const detailIcons = [CalendarDays, Video, Radio];

export function Hero({ content, registrationUrl }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden min-h-[100dvh] flex flex-col justify-center bg-[radial-gradient(circle_at_64%_22%,rgba(203,156,89,0.26),transparent_27%),linear-gradient(135deg,#071B16_0%,#102D25_46%,#2C3E35_100%)] pt-0 text-[#F7F0E6] lg:pt-0"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(232,223,207,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(232,223,207,0.18)_1px,transparent_1px)] [background-size:42px_42px]"
      />
      <Image
        src="/live-webinar/images/decorative-line.svg"
        alt=""
        width={240}
        height={240}
        className="pointer-events-none absolute -right-8 top-16 hidden opacity-60 lg:block"
        unoptimized
      />
      <Image
        src="/live-webinar/images/decorative-line.svg"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute -bottom-20 -left-12 hidden rotate-180 opacity-45 lg:block"
        unoptimized
      />

      <Container className="relative grid items-end gap-8 pb-10 pt-4 xl:min-h-[610px] xl:grid-cols-[1.26fr_0.92fr_0.52fr] xl:gap-7 xl:pb-0">
        <div className="z-10 max-w-[680px] pb-2 xl:pb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#A3835B]/70 bg-[#102D25]/70 px-3 py-2 text-xs font-extrabold tracking-[0.08em] text-[#F4E5CB] shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D6A45C] shadow-[0_0_18px_rgba(214,164,92,0.75)]" />
            {content.eyebrow}
          </div>

          <h1 className="vvv-webinar-title font-serif font-black tracking-normal text-[#FFF8EA]">
            {content.headline}
          </h1>
          <p className="vvv-webinar-subtitle mt-2 font-serif font-black text-[#C99B62]">
            {content.subheadline}
          </p>
          <p className="mt-5 max-w-xl text-lg font-extrabold leading-8 text-white sm:text-xl xl:text-2xl">
            {content.promise}
          </p>
          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#ECE2D2]">
            {content.description}
          </p>

          <ul className="mt-4 grid gap-2.5">
            {content.transformationBullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-sm font-bold text-[#F5ECDE] sm:text-base"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A3835B] text-white">
                  <BadgeCheck size={14} strokeWidth={2.5} />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={registrationUrl} size="lg">
              Register for the Webinar
            </Button>
            <Button href="#agenda" variant="secondary" size="lg">
              See Agenda
            </Button>
          </div>

          <div className="mt-5 grid max-w-xl grid-cols-3 gap-2 text-xs font-extrabold text-[#F4E8D8] sm:gap-3 sm:text-sm">
            {content.heroFeatures.map((feature, index) => {
              const Icon = detailIcons[index] || BadgeCheck;
              return (
                <div
                  key={feature.label}
                  className="flex min-h-16 flex-col items-start justify-center gap-1.5 rounded-xl border border-[#A3835B]/35 bg-[#F7F0E6]/8 px-2.5 py-2.5 backdrop-blur sm:min-h-0 sm:flex-row sm:items-center sm:justify-start sm:gap-2 sm:px-3 sm:py-3"
                >
                  <Icon size={18} className="text-[#D6A45C]" />
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-0 mx-auto flex w-full max-w-[320px] items-end justify-center self-stretch sm:max-w-[430px] xl:max-w-none">
          <div
            aria-hidden="true"
            className="absolute bottom-1 left-1/2 h-[89%] w-[84%] -translate-x-1/2 rounded-[999px] border-2 border-[#D6A45C] shadow-glow xl:h-[94%] xl:w-[88%]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-[82%] w-[76%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,#E4B46D_0%,rgba(228,180,109,0.22)_43%,transparent_70%)] blur-xl opacity-70 xl:h-[88%] xl:w-[80%]"
          />
          <Image
            src="/live-webinar/images/ChatGPT_Image_May_23__2026__01_20_54_AM-removebg-preview (1).png"
            alt="Vani Sumanth, Communication and Confidence Mentor"
            width={620}
            height={790}
            priority
            className="relative z-10 h-auto w-full max-w-[320px] object-contain drop-shadow-[0_24px_42px_rgba(0,0,0,0.35)] sm:max-w-[430px] xl:max-w-[620px] xl:origin-bottom xl:scale-[1.28] xl:translate-x-3 2xl:max-w-[700px] 2xl:scale-[1.34]"
          />
        </div>

        <aside className="z-10 mb-7 rounded-2xl border border-[#C79D61] bg-[#102D25]/82 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-md xl:mb-12">
          <div className="mb-5 flex items-center gap-3">
            <Radio className="text-[#D6A45C]" size={26} />
            <h2 className="text-xl font-extrabold text-white">Live Webinar</h2>
          </div>
          <div className="divide-y divide-[#A3835B]/25">
            {content.webinarDetails.map((detail, index) => {
              const Icon = detailIcons[index] || BadgeCheck;
              return (
                <div key={detail.label} className="flex items-center gap-4 py-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C99B62] text-[#D6A45C]">
                    <Icon size={20} />
                  </span>
                  <span className="text-base font-extrabold text-[#F7F0E6]">
                    {detail.label}
                  </span>
                </div>
              );
            })}
          </div>
          <Button href={registrationUrl} className="mt-5 w-full">
            Save My Spot
          </Button>
        </aside>
      </Container>
    </section>
  );
}
