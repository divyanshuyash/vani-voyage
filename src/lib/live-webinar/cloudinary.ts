type CloudinaryResourceType = "image" | "video";

type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "scale";
  quality?: "auto" | number;
  format?: "auto" | "jpg" | "png" | "webp" | "mp4";
  resourceType?: CloudinaryResourceType;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function buildCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {},
) {
  if (!cloudName || !publicId) {
    return "";
  }

  const resourceType = options.resourceType || "image";
  const transforms = [
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
    options.crop ? `c_${options.crop}` : null,
    options.quality ? `q_${options.quality}` : "q_auto",
    options.format ? `f_${options.format}` : "f_auto",
  ]
    .filter(Boolean)
    .join(",");

  const transformPath = transforms ? `${transforms}/` : "";

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transformPath}${publicId}`;
}

export function buildCloudinaryVideoPoster(publicId: string) {
  return buildCloudinaryUrl(publicId, {
    resourceType: "video",
    width: 1200,
    crop: "limit",
    quality: "auto",
    format: "jpg",
  });
}
