import { createClient, type QueryParams } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  revalidate = 60
): Promise<T | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate }
    });
  } catch (error) {
    console.warn("Sanity fetch failed. Falling back to local content.", error);
    return null;
  }
}

export function sanityImage(source: unknown) {
  return builder && source ? builder.image(source) : null;
}
