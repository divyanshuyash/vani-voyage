import Image from "next/image";
import { Button } from "@/components/live-webinar/Button";
import { Container } from "@/components/live-webinar/Container";

type CTASectionProps = {
  headline: string;
  subheadline: string;
  note: string;
  registrationUrl: string;
};

export function CTASection({
  headline,
  subheadline,
  note,
  registrationUrl,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(214,164,92,0.18),transparent_30%),linear-gradient(135deg,#071B16_0%,#102D25_50%,#2C3E35_100%)] py-11 text-center text-[#F7F0E6] sm:py-14">
      <Image
        src="/live-webinar/images/decorative-line.svg"
        alt=""
        width={240}
        height={240}
        className="pointer-events-none absolute -bottom-20 -left-10 opacity-55"
        unoptimized
      />
      <Image
        src="/live-webinar/images/decorative-line.svg"
        alt=""
        width={240}
        height={240}
        className="pointer-events-none absolute -right-10 -top-16 rotate-180 opacity-55"
        unoptimized
      />
      <Container className="relative">
        <h2 className="font-serif text-4xl font-black leading-tight text-[#D6A45C] sm:text-5xl">
          {headline}
        </h2>
        <p className="mt-2 text-xl font-extrabold text-white">{subheadline}</p>
        <Button href={registrationUrl} className="mt-6 min-w-[280px] max-w-full">
          Yes, I Want to Register
        </Button>
        <p className="mt-5 text-base font-extrabold text-[#F2E6D7]">{note}</p>
      </Container>
    </section>
  );
}
