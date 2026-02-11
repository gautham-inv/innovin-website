const CLOUDINARY_UPLOAD_BASE = "https://res.cloudinary.com/dejb29i0k/image/upload";

export const TEAM_IMAGE_BASE = `${CLOUDINARY_UPLOAD_BASE}/f_auto,q_auto/v1770295648`;
export const CLOUDINARY_TRANSFORM_BASE = `${CLOUDINARY_UPLOAD_BASE}/f_auto,q_auto`;

export type CloudinaryCrop = "fill" | "fit" | "scale" | "thumb" | "limit";

/**
 * Build a Cloudinary URL with optional size/crop so images are resized at fetch time.
 * @param pathOrFullUrl - Either "version/public_id" (e.g. "v1770654380/IMG_0552_gshpuk.heic") or a full Cloudinary URL (path is extracted)
 * @param options - w/h in pixels; c = crop mode (default "fill" when w&h set)
 */
export function cloudinaryUrl(
  pathOrFullUrl: string,
  options?: { w?: number; h?: number; c?: CloudinaryCrop }
): string {
  let path = pathOrFullUrl;
  if (pathOrFullUrl.startsWith("http")) {
    const segments = pathOrFullUrl.split("/");
    const versionIdx = segments.findIndex((s) => /^v\d+$/.test(s));
    path = versionIdx >= 0 ? segments.slice(versionIdx).join("/") : pathOrFullUrl;
  }
  const parts: string[] = ["f_auto", "q_auto"];
  if (options?.w != null) parts.push(`w_${options.w}`);
  if (options?.h != null) parts.push(`h_${options.h}`);
  if (options?.c) parts.push(`c_${options.c}`);
  const transform = parts.join(",");
  return `${CLOUDINARY_UPLOAD_BASE}/${transform}/${path}`;
}
