export function getOptimizedUrl(src: unknown, width = 800) {
  if (typeof src !== "string" || !src) return "";
  if (!src.includes("res.cloudinary.com")) return src;

  // Check if it's a video file or uses video upload URL
  const isVideo = src.includes("/video/upload/") || src.endsWith(".mp4") || src.endsWith(".webm");

  if (src.includes("/upload/")) {
    const parts = src.split("/upload/");
    let transform = "q_auto,f_auto";
    if (!isVideo && width) {
      transform += `,w_${width},c_limit`;
    }
    return `${parts[0]}/upload/${transform}/${parts[1]}`;
  }

  return src;
}
