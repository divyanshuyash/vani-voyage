import { sanityFetch } from "@/lib/one-on-one-sessions/sanity";

const defaultBookingUrl =
  "https://learn.vanisumanth.com/web/lite/events/6954f0dd1937ead215fe45ba";

export type ImageContent = {
  src: string;
  alt: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
};

export type CtaContent = {
  label: string;
  href?: string;
};

export type SiteSettings = {
  brandName: string;
  logo: ImageContent;
  tagMangoBookingUrl: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
};

export type CardContent = {
  title: string;
  description: string;
  icon: string;
};

export type FrameworkItem = {
  letter: string;
  title: string;
  description: string;
};

export type LandingPageContent = {
  heroEyebrow: string;
  heroHeadline: string[];
  heroAccent: string;
  heroSubheadline: string;
  heroQuote: string;
  heroQuoteAuthor: string;
  primaryCta: CtaContent;
  secondaryCta: CtaContent;
  trustText: string;
  heroImage: ImageContent;
  whoTitle: string;
  whoSubtitle: string;
  whoCards: CardContent[];
  whatTitle: string;
  whatSubtitle: string;
  whatBullets: string[];
  frameworkTitle: string;
  frameworkItems: FrameworkItem[];
  finalCta: {
    headline: string;
    bullets: string[];
    buttonLabel: string;
    note: string;
  };
};

export type MentorContent = {
  name: string;
  title: string;
  bio: string;
  photo: ImageContent;
  quote: string;
  stats: {
    value: string;
    label: string;
    icon: string;
  }[];
};

export type TestimonialContent = {
  name: string;
  role: string;
  photo: ImageContent;
  text: string;
  rating: number;
  type: "text" | "image" | "video";
  imageProof?: ImageContent;
  videoUrl?: string;
  cloudinaryPublicId?: string;
  featured?: boolean;
};

export type FaqContent = {
  question: string;
  answer: string;
};

export type LandingContent = {
  siteSettings: SiteSettings;
  page: LandingPageContent;
  mentor: MentorContent;
  testimonials: TestimonialContent[];
  faqs: FaqContent[];
};

export const fallbackContent: LandingContent = {
  siteSettings: {
    brandName: "Vani's Voice Voyage",
    logo: {
      src: "/one-on-one-sessions/images/logo.png?v=2",
      alt: "Vani's Voice Voyage logo"
    },
    tagMangoBookingUrl:
      process.env.NEXT_PUBLIC_TAGMANGO_BOOKING_URL || defaultBookingUrl,
    socialLinks: {
      instagram: "https://www.instagram.com/vani.sumanth?igsh=MXZuY3loYzR0OGt4aQ==",
      linkedin: "https://www.linkedin.com/in/vani-sumanth-1a32182a4",
      facebook: "https://www.facebook.com/profile.php?id=61575009214873#"
    }
  },
  page: {
    heroEyebrow: "30-MINUTE 1:1 CONSULTATION",
    heroHeadline: ["Get Clarity.", "Find Direction."],
    heroAccent: "Speak with Confidence.",
    heroSubheadline:
      "A focused, personalised 1:1 session to help you break through what’s holding you back and create your next step with clarity.",
    heroQuote:
      "I did not build this to teach textbook English. I built this to transform confidence, mindset, and voice.",
    heroQuoteAuthor: "Vani Sumanth",
    primaryCta: {
      label: "Book Your 1:1 Session"
    },
    secondaryCta: {
      label: "Learn More",
      href: "#what-youll-get"
    },
    trustText: "Trusted by 8,000+ learners worldwide",
    heroImage: {
      src: "/one-on-one-sessions/images/hero-mentor.jpg?v=3",
      alt: "Vani Sumanth mentor portrait"
    },
    whoTitle: "Who is this for?",
    whoSubtitle: "This 1:1 session is perfect for you if you...",
    whoCards: [
      {
        title: "Ambitious Students",
        description: "Exploring future-ready skills and preparing for what’s next.",
        icon: "graduation"
      },
      {
        title: "Working Professionals",
        description: "Seeking expert guidance for career growth and leadership.",
        icon: "briefcase"
      },
      {
        title: "High-Potential Individuals",
        description:
          "Who want to improve communication, confidence, and presence.",
        icon: "person-star"
      }
    ],
    whatTitle: "What You’ll Get",
    whatSubtitle: "A focused session designed around you.",
    whatBullets: [
      "Personalised feedback & honest insights on your current strengths and blockers",
      "Clarity on your goals and what’s holding you back",
      "Practical strategies for real-life speaking situations",
      "A clear next-step roadmap to move forward with confidence"
    ],
    frameworkTitle: "How It Works (C.L.E.A.R.S)",
    frameworkItems: [
      {
        letter: "C",
        title: "Clarify",
        description: "Understand your current challenge and goals."
      },
      {
        letter: "L",
        title: "Listen",
        description: "Deep listening to your story and aspirations."
      },
      {
        letter: "E",
        title: "Evaluate",
        description: "Identify gaps, strengths, and opportunities."
      },
      {
        letter: "A",
        title: "Advise",
        description: "Receive practical strategies and actions."
      },
      {
        letter: "R",
        title: "Roadmap",
        description: "Build your personalised next step."
      },
      {
        letter: "S",
        title: "Support",
        description: "Get guidance for consistent growth."
      }
    ],
    finalCta: {
      headline: "Small conversations can lead to life-changing clarity.",
      bullets: [
        "30-Minute 1:1 Consultation",
        "Personalised Guidance",
        "Web Conferencing Session"
      ],
      buttonLabel: "Book Your 1:1 Session",
      note: "Secure your spot on TagMango."
    }
  },
  mentor: {
    name: "Vani Sumanth",
    title: "Communication, Confidence & Mindset Mentor",
    bio: "With 20+ years in education and corporate training, I’ve helped 8,000+ learners find their voice, build confidence, and achieve their goals. My sessions are practical, personalised, and result-driven.",
    photo: {
      src: "/one-on-one-sessions/images/mentor.jpg",
      alt: "Vani Sumanth seated mentor portrait"
    },
    quote:
      "I did not build this to teach textbook English. I built this to transform confidence, mindset, and voice.",
    stats: [
      {
        value: "20+",
        label: "Years of Experience",
        icon: "clock"
      },
      {
        value: "8,000+",
        label: "Learners Transformed",
        icon: "users"
      },
      {
        value: "BOSCH",
        label: "Corporate Training Partner",
        icon: "badge"
      },
      {
        value: "Live Classrooms",
        label: "& Workshops",
        icon: "presentation"
      }
    ]
  },
  testimonials: [
    {
      name: "Neha R.",
      role: "Marketing Professional",
      photo: {
        src: "/one-on-one-sessions/images/avatar-1.jpg",
        alt: "Neha R. avatar"
      },
      text: "Vani ma’am’s guidance gave me the confidence to speak up in meetings. It changed my career journey.",
      rating: 5,
      type: "text",
      featured: true
    },
    {
      name: "Arjun K.",
      role: "Engineering Student",
      photo: {
        src: "/one-on-one-sessions/images/avatar-2.jpg",
        alt: "Arjun K. avatar"
      },
      text: "The 1:1 session helped me identify my weaknesses and improve fast. Highly recommended.",
      rating: 5,
      type: "text",
      featured: true
    },
    {
      name: "Priya S.",
      role: "Entrepreneur",
      photo: {
        src: "/one-on-one-sessions/images/avatar-3.jpg",
        alt: "Priya S. avatar"
      },
      text: "Her practical approach and personal feedback made all the difference. I found my voice.",
      rating: 5,
      type: "text",
      featured: true
    },
    {
      name: "Sana M.",
      role: "Young Professional",
      photo: {
        src: "/one-on-one-sessions/images/avatar-4.jpg",
        alt: "Sana M. avatar"
      },
      text: "I walked in confused about how I came across and left with clear direction, stronger confidence, and practical next steps I could use immediately.",
      rating: 5,
      type: "text",
      featured: true
    }
  ],
  faqs: [
    {
      question: "How long is the session?",
      answer: "The session is designed as a focused 30-minute 1:1 consultation."
    },
    {
      question: "Where will the session happen?",
      answer:
        "The session will happen online. Web conferencing details will be provided after booking."
    },
    {
      question: "Will I get a recording?",
      answer:
        "Recording availability can be confirmed after booking or based on the session setup."
    },
    {
      question: "What should I prepare before the session?",
      answer:
        "Come with your current communication challenge, goal, and any situation where you feel stuck or hesitant."
    },
    {
      question: "Who is this session not for?",
      answer:
        "This is not for someone looking for generic textbook English lessons. It is for people who want personalised clarity, confidence, and practical speaking guidance."
    },
    {
      question: "Will there be follow-up support?",
      answer:
        "Follow-up support depends on the session plan and recommendations shared after the call."
    }
  ]
};

type SanityLandingPayload = {
  siteSettings?: Partial<SiteSettings>;
  page?: Partial<LandingPageContent>;
  mentor?: Partial<MentorContent>;
  testimonials?: Partial<TestimonialContent>[];
  faqs?: Partial<FaqContent>[];
};

const landingQuery = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    brandName,
    "logo": {"src": logo.asset->url, "alt": coalesce(logo.alt, "Vani's Voice Voyage logo")},
    tagMangoBookingUrl,
    socialLinks
  },
  "page": *[_type == "landingPage"][0]{
    heroEyebrow,
    heroHeadline,
    heroAccent,
    heroSubheadline,
    heroQuote,
    heroQuoteAuthor,
    primaryCta,
    secondaryCta,
    trustText,
    "heroImage": {"src": heroImage.asset->url, "alt": coalesce(heroImage.alt, "Vani Sumanth mentor portrait")},
    whoTitle,
    whoSubtitle,
    whoCards,
    whatTitle,
    whatSubtitle,
    whatBullets,
    frameworkTitle,
    frameworkItems,
    finalCta
  },
  "mentor": *[_type == "mentor"][0]{
    name,
    title,
    bio,
    "photo": {"src": photo.asset->url, "alt": coalesce(photo.alt, "Vani Sumanth mentor portrait")},
    quote,
    stats
  },
  "testimonials": *[_type == "testimonial" && featured == true] | order(_createdAt asc)[0...4]{
    name,
    role,
    "photo": {"src": photo.asset->url, "alt": coalesce(photo.alt, name)},
    text,
    rating,
    type,
    "imageProof": {"src": imageProof.asset->url, "alt": coalesce(imageProof.alt, "Learner proof image")},
    videoUrl,
    cloudinaryPublicId,
    featured
  },
  "faqs": *[_type == "faq"] | order(order asc){
    question,
    answer
  }
}`;

function mergeImage(fallback: ImageContent, incoming?: Partial<ImageContent>) {
  return {
    ...fallback,
    ...Object.fromEntries(
      Object.entries(incoming || {}).filter(([, value]) => Boolean(value))
    )
  };
}

export async function getLandingPageContent(): Promise<LandingContent> {
  const sanityData = await sanityFetch<SanityLandingPayload>(landingQuery);
  const bookingUrl =
    sanityData?.siteSettings?.tagMangoBookingUrl ||
    process.env.NEXT_PUBLIC_TAGMANGO_BOOKING_URL ||
    fallbackContent.siteSettings.tagMangoBookingUrl;

  return {
    siteSettings: {
      ...fallbackContent.siteSettings,
      ...sanityData?.siteSettings,
      logo: mergeImage(
        fallbackContent.siteSettings.logo,
        sanityData?.siteSettings?.logo
      ),
      tagMangoBookingUrl: bookingUrl
    },
    page: {
      ...fallbackContent.page,
      ...sanityData?.page,
      primaryCta: {
        ...fallbackContent.page.primaryCta,
        ...sanityData?.page?.primaryCta
      },
      secondaryCta: {
        ...fallbackContent.page.secondaryCta,
        ...sanityData?.page?.secondaryCta
      },
      heroImage: mergeImage(
        fallbackContent.page.heroImage,
        sanityData?.page?.heroImage
      ),
      whoCards: sanityData?.page?.whoCards?.length
        ? sanityData.page.whoCards
        : fallbackContent.page.whoCards,
      whatBullets: sanityData?.page?.whatBullets?.length
        ? sanityData.page.whatBullets
        : fallbackContent.page.whatBullets,
      frameworkItems: sanityData?.page?.frameworkItems?.length
        ? sanityData.page.frameworkItems
        : fallbackContent.page.frameworkItems,
      finalCta: {
        ...fallbackContent.page.finalCta,
        ...sanityData?.page?.finalCta
      }
    },
    mentor: {
      ...fallbackContent.mentor,
      ...sanityData?.mentor,
      photo: mergeImage(fallbackContent.mentor.photo, sanityData?.mentor?.photo),
      stats: sanityData?.mentor?.stats?.length
        ? sanityData.mentor.stats
        : fallbackContent.mentor.stats
    },
    testimonials: sanityData?.testimonials?.length
      ? sanityData.testimonials.map((testimonial, index) => ({
          ...fallbackContent.testimonials[index % fallbackContent.testimonials.length],
          ...testimonial,
          photo: mergeImage(
            fallbackContent.testimonials[index % fallbackContent.testimonials.length].photo,
            testimonial.photo
          )
        }))
      : fallbackContent.testimonials,
    faqs: sanityData?.faqs?.length
      ? sanityData.faqs.map((faq, index) => ({
          ...fallbackContent.faqs[index % fallbackContent.faqs.length],
          ...faq
        }))
      : fallbackContent.faqs
  };
}
