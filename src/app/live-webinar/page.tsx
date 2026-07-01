import type { Metadata } from "next";
import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock,
  GraduationCap,
  Handshake,
  Medal,
  MessageCircleQuestion,
  Mic2,
  MonitorPlay,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./page.module.css";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Unshakable Confidence Webinar | Vani's Voice Voyage",
  description:
    "A premium live webinar with Vani Sumanth for fluent English, executive-level communication, confidence, and leadership presence.",
};



const heroChecks = [
  "Transform hesitation into confidence.",
  "Speak professionally with ease.",
  "Command attention wherever you go.",
];

const stats: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: "20+", label: "Years Experience", icon: Trophy },
  { value: "8,000+", label: "Learners Transformed", icon: Users },
  { value: "BOSCH", label: "Corporate Training Partner", icon: Medal },
  { value: "Live Classrooms", label: "& Workshops", icon: MonitorPlay },
];

const audienceCards: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
}> = [
  {
    title: "Students",
    copy: "Build confidence, express clearly, and stand out in academics and beyond.",
    icon: GraduationCap,
  },
  {
    title: "Professionals",
    copy: "Communicate with impact, lead teams, and advance your career.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Growth-focused Individuals",
    copy: "Strengthen your mindset, communication, and leadership presence.",
    icon: TrendingUp,
  },
];

const learnCards: Array<{
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
}> = [
  {
    number: "01",
    title: "Break the Fear Loop",
    copy: "Understand what holds you back and how to release it.",
    icon: Handshake,
  },
  {
    number: "02",
    title: "Structure Your Thoughts",
    copy: "Organize ideas clearly and speak with confidence.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Speak with Presence",
    copy: "Use your voice, body language, and tone effectively.",
    icon: Mic2,
  },
  {
    number: "04",
    title: "Handle Real Conversations",
    copy: "Navigate tough situations and influence with ease.",
    icon: Users,
  },
  {
    number: "05",
    title: "Live Q&A with Vani",
    copy: "Get your questions answered in real time.",
    icon: MessageCircleQuestion,
  },
];

const agendaItems = [
  {
    time: "00:00 - 15:00",
    title: "Break the Fear Loop",
    copy: "Identify limiting beliefs and shift your mindset.",
    icon: Handshake,
  },
  {
    time: "15:00 - 30:00",
    title: "Structure Your Thoughts",
    copy: "Simplify, organize, and communicate with clarity.",
    icon: ClipboardList,
  },
  {
    time: "30:00 - 50:00",
    title: "Speak with Presence",
    copy: "Voice, body language and confidence techniques.",
    icon: Mic2,
  },
  {
    time: "50:00 - 70:00",
    title: "Handle Real Conversations",
    copy: "Practical strategies for real-world situations.",
    icon: Users,
  },
  {
    time: "70:00 - 90:00",
    title: "Interactive Q&A",
    copy: "Ask, clarify, and gain actionable insights.",
    icon: MessageCircleQuestion,
  },
];

const mentorStats = [
  { value: "20+", label: "Years of Experience", icon: Trophy },
  { value: "8,000+", label: "Learners Transformed", icon: Users },
  { value: "BOSCH", label: "Corporate Training Partner", icon: Medal },
  { value: "1000+", label: "Live Workshops Delivered", icon: MonitorPlay },
];

const testimonials = [
  {
    video: "/live-webinar/videos/video1.mp4#t=0.1",
  },
  {
    video: "/live-webinar/videos/video2.mp4#t=0.1",
  },
  {
    video: "/live-webinar/videos/video3.mp4#t=0.1",
  },
  {
    video: "/live-webinar/videos/video4.mp4#t=0.1",
  },
];

const faqLeft = [
  {
    question: "Who is this webinar for?",
    answer:
      "This webinar is for students, professionals, and growth-focused individuals who want to communicate with clarity, confidence, and executive presence.",
  },
  {
    question: "Do I need any prior experience?",
    answer:
      "No prior experience is needed. The session is designed to be practical and accessible for every learner.",
  },
  {
    question: "Will the session be recorded?",
    answer:
      "Recording availability will be shared during registration or after the live webinar.",
  },
];

const faqRight = [
  {
    question: "How will the webinar be conducted?",
    answer: "The webinar will be conducted live online via Zoom.",
  },
  {
    question: "Can I ask questions during the webinar?",
    answer:
      "Yes. The webinar includes an interactive Q&A segment so you can ask questions in real time.",
  },
  {
    question: "Is there a certificate for the webinar?",
    answer:
      "Certificate details will be shared with registered learners before or during the session.",
  },
];

function CtaButton({ small }: { small?: boolean } = {}) {
  return (
    <a
      className={small ? styles.ctaButtonSmall : styles.ctaButton}
      href="#booking-form"
    >
      Register Now <span aria-hidden="true">-&gt;</span>
    </a>
  );
}

function SectionIntro({
  label,
  title,
}: {
  label: string;
  title: ReactNode;
}) {
  return (
    <div className={styles.sectionIntro}>
      <p className={styles.sectionLabel}>{label}</p>
      <h2>{title}</h2>
      <span className={styles.goldRule} aria-hidden="true" />
    </div>
  );
}

export default function LiveWebinarPage() {
  return (
    <main className={`${styles.page} vvv-live-webinar`}>
      <section className={styles.hero} aria-label="Live webinar">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.pill}>
              <span aria-hidden="true" />
              LIVE WEBINAR
            </div>
            <h1>Unshakable Confidence</h1>
            <p className={styles.heroGold}>Executive-Level Communication.</p>
            <p className={styles.heroLead}>
              Speak with clarity, confidence, and impact
              <br />
              in every conversation.
            </p>
            <p className={styles.heroSupport}>
              Master fluent English, powerful presentation skills, and executive
              presence to stand out in interviews, meetings, networking, and
              leadership roles.
            </p>
            <ul className={styles.checkList}>
              {heroChecks.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.dateTimeBox}>
              <div className={styles.dateTimeItem}>
                <CalendarDays className={styles.dateTimeIcon} size={20} strokeWidth={2.2} />
                <span>5th July, Saturday</span>
              </div>
              <div className={styles.dateTimeDivider} />
              <div className={styles.dateTimeItem}>
                <Clock className={styles.dateTimeIcon} size={20} strokeWidth={2.2} />
                <span>7:30 PM</span>
              </div>
            </div>

            <CtaButton />
          </div>

          <div className={styles.mentorStage} aria-hidden="true">
            <span className={styles.archGlow} />
            <Image
              src="/live-webinar/images/ChatGPT_Image_May_23__2026__01_20_54_AM-removebg-preview (1).png"
              alt=""
              width={866}
              height={1154}
              priority
              className={styles.heroMentor}
            />
          </div>
        </div>
      </section>

      <section className={styles.statsStrip} aria-label="Highlights">
        <div className={styles.statsInner}>
          {stats.map(({ value, label, icon: Icon }) => (
            <div className={styles.statBlock} key={`${value}-${label}`}>
              <Icon className={styles.statIcon} size={62} strokeWidth={1.35} />
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.sectionInner}>
          <SectionIntro
            label="WHO SHOULD ATTEND?"
            title={
              <>
                Who should attend?
                <br />
                For every voice
                <br />
                ready to grow.
              </>
            }
          />
          <div className={styles.audienceGrid}>
            {audienceCards.map(({ title, copy, icon: Icon }) => (
              <article className={styles.audienceCard} key={title}>
                <span className={styles.greenIcon} aria-hidden="true">
                  <Icon size={32} strokeWidth={1.7} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.sectionInner}>
          <SectionIntro
            label="WHAT YOU'LL LEARN"
            title={
              <>
                Skills that transform
                <br />
                the way you think,
                <br />
                speak and lead.
              </>
            }
          />
          <div className={styles.learnGrid}>
            {learnCards.map(({ number, title, copy, icon: Icon }) => (
              <article className={styles.learnCard} key={number}>
                <span className={styles.cardNumber}>{number}</span>
                <Icon size={38} strokeWidth={1.55} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className={styles.bottomCtaWrapper} style={{ marginTop: 'clamp(50px, 6vw, 80px)', gridColumn: '1 / -1' }}>
            <h2>Master these skills in our live session</h2>
            <CtaButton />
          </div>
        </div>
      </section>

      <section className={styles.agendaSection} id="agenda">
        <div className={styles.sectionInner}>
          <SectionIntro
            label="WEBINAR AGENDA"
            title={
              <>
                A 90-minute
                <br />
                experience
                <br />
                designed for
                <br />
                real change.
              </>
            }
          />
          <div className={styles.timeline}>
            {agendaItems.map(({ time, title, copy, icon: Icon }) => (
              <article className={styles.timelineItem} key={time}>
                <time>{time}</time>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelineIcon} aria-hidden="true">
                  <Icon size={32} strokeWidth={1.55} />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mentorSection}>
        <div className={styles.mentorCard}>
          <div className={styles.mentorIntro}>
            <div className={styles.mentorPhotoWrap}>
              <Image
                src="/live-webinar/images/ChatGPT_Image_May_23__2026__01_20_54_AM-removebg-preview (1).png"
                alt="Vani Sumanth"
                width={866}
                height={1154}
                className={styles.mentorPhoto}
              />
            </div>
            <div>
              <p className={styles.sectionLabel}>MEET YOUR MENTOR</p>
              <h2>Vani Sumanth</h2>
              <p className={styles.mentorRole}>
                Communication & Confidence Mentor
              </p>
              <p className={styles.mentorBio}>
                With 20+ years of experience in communication, training, and
                leadership development, Vani has empowered thousands to
                communicate with clarity, confidence, and authenticity.
              </p>
            </div>
          </div>
          <div className={styles.mentorStats}>
            {mentorStats.map(({ value, label, icon: Icon }) => (
              <div className={styles.mentorStat} key={`${value}-${label}`}>
                <Icon size={58} strokeWidth={1.35} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection} id="testimonials">
        <div className={styles.testimonialsInner}>
          <p className={styles.sectionLabel}>VIDEO TESTIMONIALS</p>
          <div className={styles.videoRow}>
            {testimonials.map(({ video }, index) => (
              <article className={styles.videoCard} key={video}>
                <video
                  src={video}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`Video testimonial ${index + 1}`}
                />
              </article>
            ))}
            <aside className={styles.joinCard}>
              <Sparkles size={72} strokeWidth={1.35} />
              <h2>Join 8,000+ learners</h2>
              <div style={{ width: "100%", marginTop: "auto", paddingTop: "1rem" }}>
                <CtaButton small />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqHeading}>
            <h2>FAQ</h2>
            <span className={styles.goldRule} aria-hidden="true" />
          </div>
          <div className={styles.faqColumns}>
            {[faqLeft, faqRight].map((column, columnIndex) => (
              <div className={styles.faqColumn} key={columnIndex}>
                {column.map(({ question, answer }) => (
                  <details className={styles.faqItem} key={question}>
                    <summary>
                      {question}
                      <ChevronDown size={18} strokeWidth={1.8} />
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bottomCtaWrapper}>
          <h2>Ready to transform your communication?</h2>
          <CtaButton />
        </div>
      </section>

      <section id="booking-form" style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)" }}>
        <LeadForm title="Register for the Webinar" subtitle="Please provide your details below to reserve your spot for the live session." />
      </section>
    </main>
  );
}
