type CloudinaryResource = "image" | "video";

type CloudinaryOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "limit";
  quality?: "auto" | number;
  format?: "auto" | string;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function isAbsoluteUrl(value?: string | null) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

export function getCloudinaryUrl(
  publicIdOrUrl?: string | null,
  options: CloudinaryOptions = {},
  resourceType: CloudinaryResource = "image"
) {
  if (!publicIdOrUrl) {
    return undefined;
  }

  if (isAbsoluteUrl(publicIdOrUrl)) {
    return publicIdOrUrl;
  }

  if (!cloudName) {
    return undefined;
  }

  const transforms = [
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
    options.crop ? `c_${options.crop}` : null,
    options.quality ? `q_${options.quality}` : "q_auto",
    options.format ? `f_${options.format}` : "f_auto"
  ]
    .filter(Boolean)
    .join(",");

  const transformPath = transforms ? `${transforms}/` : "";

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transformPath}${publicIdOrUrl}`;
}

export function resolveImageSrc(
  source:
    | string
    | null
    | undefined
    | {
        url?: string | null;
        cloudinaryUrl?: string | null;
        cloudinaryPublicId?: string | null;
      },
  fallback: string,
  options?: CloudinaryOptions
) {
  if (typeof source === "string") {
    return getCloudinaryUrl(source, options) || source || fallback;
  }

  return (
    source?.cloudinaryUrl ||
    getCloudinaryUrl(source?.cloudinaryPublicId, options) ||
    source?.url ||
    fallback
  );
}
