import { AgendaTimeline } from "@/components/live-webinar/AgendaTimeline";
import { AudienceSection } from "@/components/live-webinar/AudienceSection";
import { CTASection } from "@/components/live-webinar/CTASection";
import { FAQ } from "@/components/live-webinar/FAQ";
import { Hero } from "@/components/live-webinar/Hero";
import { LearnCards } from "@/components/live-webinar/LearnCards";
import { SpeakerSection } from "@/components/live-webinar/SpeakerSection";
import { Testimonials } from "@/components/live-webinar/Testimonials";
import { TrustStrip } from "@/components/live-webinar/TrustStrip";
import { getRegistrationUrl } from "@/lib/live-webinar/fallback-content";
import { getWebinarPageContent } from "@/lib/live-webinar/sanity";
import Image from "next/image";
import { Manrope, Noto_Serif } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const revalidate = 60;

export default async function Home() {
  const content = await getWebinarPageContent();
  const registrationUrl = getRegistrationUrl(content);

  return (
    <div
      className={`${manrope.variable} ${notoSerif.variable} vvv-live-webinar`}
      style={{ paddingTop: 72 }}
    >
      <div className="fixed left-4 top-4 z-50 pointer-events-none md:hidden">
        <Image
          src="/live-webinar/images/logo.png"
          alt="Vani's Voice Voyage logo"
          width={64}
          height={64}
          className="h-12 w-auto"
          priority
        />
      </div>
      <main>
        <Hero content={content} registrationUrl={registrationUrl} />
        <TrustStrip metrics={content.trustMetrics} />
        <AudienceSection content={content} />
        <LearnCards content={content} />
        <AgendaTimeline content={content} />
        <SpeakerSection mentor={content.mentor} />
        <Testimonials content={content} />
        <FAQ heading={content.faqHeading} items={content.faqs} />
        <CTASection
          headline={content.finalCtaHeadline}
          subheadline={content.finalCtaSubheadline}
          note={content.finalCtaNote}
          registrationUrl={registrationUrl}
        />
      </main>
    </div>
  );
}
