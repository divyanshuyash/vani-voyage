import type { Metadata } from "next";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Check,
  Clock3,
  GraduationCap,
  Plus,
  Presentation,
  Timer,
  UserRoundCheck,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./page.module.css";


const BOOKING_URL =
  "https://learn.vanisumanth.com/web/lite/events/6a16f5df073d47ef6cbf0c9f";

export const metadata: Metadata = {
  title: "30-Minute 1:1 Consultation | Vani Sumanth",
  description:
    "Book a focused 30-minute 1:1 consultation with Vani Sumanth for clarity, direction, confidence, and practical next steps.",
};

type IconCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const audienceCards: IconCard[] = [
  {
    icon: GraduationCap,
    title: "Ambitious Students",
    description: "Exploring future-ready skills and preparing for what’s next.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Working Professionals",
    description: "Seeking expert guidance for career growth and leadership.",
  },
  {
    icon: UserRoundCheck,
    title: "High-Potential Individuals",
    description: "Who want to improve communication, confidence, and presence.",
  },
];

const getItems = [
  "Personalized feedback & honest insights on your current strengths and blockers",
  "Clarity on your goals and what’s holding you back",
  "Practical strategies for real-life situations you face",
  "A clear next-step road map to move forward with confidence",
];

const clearsSteps = [
  {
    letter: "C",
    title: "Clarify",
    description: "Understand your current challenge and goals",
  },
  {
    letter: "L",
    title: "Listen",
    description: "Deep listening to your story and aspirations",
  },
  {
    letter: "E",
    title: "Evaluate",
    description: "Identify gaps, strengths, and opportunities",
  },
  {
    letter: "A",
    title: "Advise",
    description: "Receive practical strategies and actions",
  },
  {
    letter: "R",
    title: "Roadmap",
    description: "Build your personalized next steps",
  },
  {
    letter: "S",
    title: "Support",
    description: "Get ongoing guidance for consistent growth",
  },
];

const mentorStats: IconCard[] = [
  {
    icon: Timer,
    title: "20+",
    description: "Years of Experience",
  },
  {
    icon: Users,
    title: "8,000+",
    description: "Learners Transformed",
  },
  {
    icon: UserRoundCheck,
    title: "BOSCH",
    description: "Corporate Training Partner",
  },
  {
    icon: Presentation,
    title: "Live Classrooms",
    description: "& Workshops",
  },
];

const testimonialCards = [
  {
    video: "/videos/new-video-1.mp4#t=0.1",
  },
  {
    video: "/videos/new-video-2.mp4#t=0.1",
  },
  {
    video: "/live-webinar/videos/video3.mp4#t=0.1",
  },
  {
    video: "/live-webinar/videos/video4.mp4#t=0.1",
  },
];

const faqColumns = [
  [
    {
      question: "How long is the session?",
      answer: "The session is a focused 30-minute 1:1 consultation.",
    },
    {
      question: "Where will the session happen?",
      answer: "Web conferencing details are provided after completion.",
    },
    {
      question: "Will I get a recording?",
      answer: "Recording availability is shared with your booking details.",
    },
  ],
  [
    {
      question: "What should I prepare before the session?",
      answer: "Bring your current communication goals, blockers, and questions.",
    },
    {
      question: "Who is this session for?",
      answer:
        "It is for students, professionals, and individuals seeking clarity and confidence.",
    },
    {
      question: "Will there be follow-up support?",
      answer: "Vani will guide you on the most useful next step after the session.",
    },
  ],
];

function SectionTitle({ title }: { title: string }) {
  return (
    <div className={styles.sectionTitle}>
      <span aria-hidden="true" />
      <h2>{title}</h2>
      <span aria-hidden="true" />
    </div>
  );
}

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      className={`${styles.ctaButton} ${className}`}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Register Now</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

export default function OneOnOneSessionsPage() {
  return (
    <main className={`${styles.page} vvv-one-on-one`}>
      <section className={styles.hero} id="top">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              30-MINUTE 1:1 CONSULTATION
              <span aria-hidden="true" />
            </p>
            <h1>
              <span>Get Clarity.</span>
              <span>Find Direction.</span>
              <em>Speak with Confidence.</em>
            </h1>
            <p className={styles.heroLead}>
              A focused, personalized session to help you break through
              <br />
              what’s holding you back and create your next best step.
            </p>
            <div className={styles.heroFeatures} aria-label="Session details">
              <div>
                <Clock3 aria-hidden="true" />
                <span>30-Minute Session</span>
              </div>
              <div>
                <Video aria-hidden="true" />
                <span>Web conferencing details provided upon completion</span>
              </div>
            </div>
            <CtaButton />
            <div className={styles.trustedRow}>
              <div aria-hidden="true" className={styles.avatarStack}>
                {["avatar-1.jpg", "avatar-2.jpg", "avatar-3.jpg", "avatar-4.jpg"].map(
                  (avatar, index) => (
                    <Image
                      key={avatar}
                      src={`/one-on-one-sessions/images/${avatar}`}
                      alt=""
                      width={38}
                      height={38}
                      style={{ zIndex: 4 - index }}
                    />
                  ),
                )}
              </div>
              <p>Trusted by 8,000+ learners worldwide</p>
            </div>
          </div>

          <div className={styles.heroPortrait}>
            <Image
              src="/one-on-one-sessions/images/hero-mentor.jpg"
              alt="Vani Sumanth smiling with folded arms"
              width={6720}
              height={4480}
              priority
            />
          </div>

          <aside className={styles.quoteCard} aria-label="Vani Sumanth quote">
            <span aria-hidden="true">“</span>
            <p>
              I did not build
              <br />
              this to teach
              <br />
              textbook English.
              <br />
              I built this to
              <br />
              transform
              <br />
              confidence,
              <br />
              mindset, and
              <br />
              voice.
            </p>
            <strong>— Vani Sumanth</strong>
          </aside>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className={styles.sectionShell}>
          <SectionTitle title="Who is this for?" />
          <div className={styles.audienceGrid}>
            {audienceCards.map(({ icon: Icon, title, description }) => (
              <article key={title} className={styles.audienceCard}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.ctaWrapper}>
            <CtaButton />
          </div>
        </div>
      </section>

      <section className={styles.clearSection}>
        <div className={styles.clearGrid}>
          <div className={styles.getColumn}>
            <Image
              aria-hidden="true"
              className={styles.leafArt}
              src="/one-on-one-sessions/images/floral-line.svg"
              alt=""
              width={180}
              height={300}
            />
            <div className={styles.leftColumnInner}>
              <h2>What You’ll Get</h2>
              <span className={styles.goldUnderline} aria-hidden="true" />
              <ul>
                {getItems.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">
                      <Check />
                    </span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.howColumn}>
            <h2>How It Works <span>(C.L.E.A.R.S)</span></h2>
            <span className={styles.goldUnderline} aria-hidden="true" />
            <div className={styles.clearsGrid}>
              {clearsSteps.map((step) => (
                <article key={step.letter} className={styles.clearStep}>
                  <span aria-hidden="true">{step.letter}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mentorSection}>
        <div className={styles.mentorImage}>
          <Image
            src="/one-on-one-sessions/images/mentor.jpg"
            alt="Vani Sumanth leading a mentoring session"
            width={6720}
            height={4480}
          />
        </div>
        <div className={styles.mentorCopy}>
          <p className={styles.mentorLabel}>YOUR MENTOR</p>
          <h2>Vani Sumanth</h2>
          <h3>Communication, Confidence & Mindset Mentor</h3>
          <p>
            With 20+ years in education and corporate training, I’ve helped
            8,000+ learners find their voice, build confidence and achieve
            their goals. My sessions are practical, personalized and
            result-driven.
          </p>
          <div className={styles.statsRow}>
            {mentorStats.map(({ icon: Icon, title, description }) => (
              <article key={`${title}-${description}`}>
                <Icon aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.ctaWrapper}>
            <CtaButton />
          </div>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.sectionShell}>
          <SectionTitle title="Video Testimonials" />
          <div className={styles.videoGrid}>
            {testimonialCards.map((testimonial, index) => (
              <article key={testimonial.video} className={styles.videoCard}>
                <div className={styles.videoThumb}>
                  <video
                    src={testimonial.video}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`Video testimonial ${index + 1}`}
                  />
                </div>
              </article>
            ))}
          </div>
          <div className={styles.ctaWrapper}>
            <CtaButton />
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionShell}>
          <SectionTitle title="Frequently Asked Questions" />
          <div className={styles.faqGrid}>
            {faqColumns.map((column, columnIndex) => (
              <div key={`faq-column-${columnIndex}`} className={styles.faqColumn}>
                {column.map((faq) => (
                  <details key={faq.question} className={styles.faqItem}>
                    <summary>
                      <span>{faq.question}</span>
                      <Plus aria-hidden="true" />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
