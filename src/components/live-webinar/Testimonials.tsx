import { Container } from "@/components/live-webinar/Container";
import type { WebinarPageContent } from "@/lib/live-webinar/types/content";

type TestimonialsProps = {
  content: WebinarPageContent;
};

function VideoTestimonialCard({ videoSrc }: { videoSrc: string }) {
  return (
    <article className="flex relative overflow-hidden h-[400px] snap-center flex-col rounded-2xl border border-brand-border bg-[#F8F0E5]/88 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-premium max-sm:min-w-[70vw] sm:aspect-[9/16]">
      <video 
        src={videoSrc} 
        controls
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
    </article>
  );
}

export function Testimonials({ content }: TestimonialsProps) {
  const videos = [
    "/live-webinar/videos/video1.mp4",
    "/live-webinar/videos/video2.mp4",
    "/live-webinar/videos/video3.mp4",
    "/live-webinar/videos/video4.mp4"
  ];

  return (
    <section id="testimonials" className="border-b border-brand-border bg-brand-bg py-10 sm:py-14">
      <Container>
        <div className="mb-5">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-bronze">
            {content.testimonialsKicker}
          </p>
          <h2 className="font-serif text-4xl font-black text-brand-text">
            {content.testimonialsHeading}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-12 rounded-full bg-brand-bronze" />
        </div>

        <div className="grid gap-5 lg:grid-cols-4 xl:items-stretch">
          <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:col-span-4 lg:contents">
            {videos.map((src) => (
              <VideoTestimonialCard
                key={src}
                videoSrc={src}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
