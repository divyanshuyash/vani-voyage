import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { fallbackContent } from "@/lib/live-webinar/fallback-content";
import type { WebinarPageContent } from "@/lib/live-webinar/types/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: unknown): ReturnType<typeof imageUrlBuilder> | null {
  if (!builder || !source) {
    return null;
  }

  return builder.image(source);
}

const webinarPageQuery = `{
  "page": *[_type == "webinarPage"][0],
  "siteSettings": *[_type == "siteSettings"][0]{
    brandName,
    "logo": logo.asset->url,
    webinarRegistrationUrl,
    socialLinks
  },
  "mentor": *[_type == "mentor"][0]{
    name,
    title,
    bio,
    "photo": photo.asset->url,
    stats
  },
  "testimonials": *[_type == "testimonial" && featured == true] | order(_createdAt asc)[0...3]{
    name,
    role,
    "photo": photo.asset->url,
    quote,
    rating,
    type,
    videoUrl,
    cloudinaryPublicId,
    featured
  },
  "faqs": *[_type == "faq"] | order(order asc){
    question,
    answer,
    order
  }
}`;

export async function getWebinarPageContent(): Promise<WebinarPageContent> {
  if (!sanityClient) {
    return fallbackContent;
  }

  try {
    const result = await sanityClient.fetch<{
      page?: Partial<WebinarPageContent>;
      siteSettings?: Partial<WebinarPageContent["siteSettings"]>;
      mentor?: Partial<WebinarPageContent["mentor"]>;
      testimonials?: WebinarPageContent["testimonials"];
      faqs?: WebinarPageContent["faqs"];
    }>(webinarPageQuery, {}, { next: { revalidate: 60 } });

    return {
      ...fallbackContent,
      ...result.page,
      siteSettings: {
        ...fallbackContent.siteSettings,
        ...result.siteSettings,
      },
      mentor: {
        ...fallbackContent.mentor,
        ...result.mentor,
        stats: result.mentor?.stats?.length
          ? result.mentor.stats
          : fallbackContent.mentor.stats,
      },
      testimonials: result.testimonials?.length
        ? result.testimonials
        : fallbackContent.testimonials,
      faqs: result.faqs?.length ? result.faqs : fallbackContent.faqs,
    };
  } catch (error) {
    console.warn("Sanity content fetch failed; using fallback content.", error);
    return fallbackContent;
  }
}
