import { createHash } from "crypto";

export function normalizeSourceUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith("seed:")) return trimmed;
  const parsed = new URL(trimmed);
  parsed.hash = "";
  parsed.hostname = parsed.hostname.toLowerCase();
  for (const key of [...parsed.searchParams.keys()]) {
    if (key.toLowerCase().startsWith("utm_") || key === "fbclid") parsed.searchParams.delete(key);
  }
  if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }
  return parsed.toString();
}

export function hashSourceUrl(url: string): string {
  return createHash("sha256").update(normalizeSourceUrl(url)).digest("hex");
}
