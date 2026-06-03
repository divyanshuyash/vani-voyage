import AboutMentor from "@/components/one-on-one-sessions/AboutMentor";
import CTASection from "@/components/one-on-one-sessions/CTASection";
import FAQ from "@/components/one-on-one-sessions/FAQ";
import Hero from "@/components/one-on-one-sessions/Hero";
import Testimonials from "@/components/one-on-one-sessions/Testimonials";
import WhatYouGet from "@/components/one-on-one-sessions/WhatYouGet";
import WhoThisIsFor from "@/components/one-on-one-sessions/WhoThisIsFor";
import { getLandingPageContent } from "@/lib/one-on-one-sessions/content";
import { Manrope, Noto_Serif } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap"
});

export default async function Home() {
  const content = await getLandingPageContent();

  return (
    <div
      className={`${manrope.variable} ${notoSerif.variable} vvv-one-on-one`}
      style={{ paddingTop: 72 }}
    >
      <main>
        <Hero
          content={content.page}
          bookingUrl={content.siteSettings.tagMangoBookingUrl}
          avatars={content.testimonials}
        />
        <WhoThisIsFor
          title={content.page.whoTitle}
          subtitle={content.page.whoSubtitle}
          cards={content.page.whoCards}
        />
        <WhatYouGet content={content.page} />
        <AboutMentor mentor={content.mentor} />
        <Testimonials />
        <FAQ faqs={content.faqs} />
        <CTASection
          content={content.page.finalCta}
          bookingUrl={content.siteSettings.tagMangoBookingUrl}
        />
      </main>
    </div>
  );
}
