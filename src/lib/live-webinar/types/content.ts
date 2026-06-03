export type FeatureItem = {
  label: string;
  description?: string;
};

export type TrustMetric = {
  value: string;
  label: string;
  detail?: string;
};

export type AudienceCard = {
  title: string;
  description: string;
  icon?: "student" | "professional" | "growth";
};

export type LearningCard = {
  number: string;
  title: string;
  description: string;
  icon?: "link" | "clipboard" | "mic" | "users" | "question";
};

export type AgendaItem = {
  time: string;
  title: string;
  description: string;
  icon?: "brain" | "clipboard" | "mic" | "users" | "question";
};

export type Mentor = {
  name: string;
  title: string;
  bio: string;
  photo?: string;
  stats: TrustMetric[];
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  photo?: string;
  rating?: number;
  type?: "text" | "image" | "video";
  videoUrl?: string;
  cloudinaryPublicId?: string;
  featured?: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
  order?: number;
};

export type SiteSettings = {
  brandName: string;
  logo?: string;
  webinarRegistrationUrl?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
};

export type WebinarPageContent = {
  siteSettings: SiteSettings;
  eyebrow: string;
  headline: string;
  subheadline: string;
  promise: string;
  description: string;
  transformationBullets: string[];
  shortCtaLine: string;
  heroFeatures: FeatureItem[];
  webinarDetails: FeatureItem[];
  trustMetrics: TrustMetric[];
  audienceIntroKicker: string;
  audienceHeading: string;
  audienceIntro: string;
  audienceCards: AudienceCard[];
  learnKicker: string;
  learnHeading: string;
  learnIntro: string;
  learningCards: LearningCard[];
  agendaKicker: string;
  agendaHeading: string;
  agendaIntro: string;
  agendaItems: AgendaItem[];
  mentor: Mentor;
  testimonialsKicker: string;
  testimonialsHeading: string;
  testimonials: Testimonial[];
  testimonialCtaHeadline: string;
  testimonialCtaNote: string;
  faqHeading: string;
  faqs: FAQItem[];
  finalCtaHeadline: string;
  finalCtaSubheadline: string;
  finalCtaNote: string;
};
