import Container from "@/components/one-on-one-sessions/Container";
import SectionHeading from "@/components/one-on-one-sessions/SectionHeading";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-14 sm:py-16">
      <Container>
        <SectionHeading title="Loved by Learners Like You" />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((videoNum) => (
            <article
              key={`video-${videoNum}`}
              className="group relative aspect-[9/16] max-h-[470px] min-h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-[#eee5d6]/42 shadow-[0_12px_32px_rgba(44,38,33,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <video
                src={`/one-on-one-sessions/videos/video${videoNum}.mp4`}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover object-center"
                aria-label={`Learner testimonial video ${videoNum}`}
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
