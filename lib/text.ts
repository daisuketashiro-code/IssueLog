export function parseStringList(value: string): string[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    return [];
  }
}

export function formatDate(value: string | null): string {
  if (!value) return "日付未設定";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "日付未設定";
  return new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(date);
}

export function clampJapanese(text: string, max = 200): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const end = cut.lastIndexOf("。");
  return end > 80 ? cut.slice(0, end + 1) : cut;
}
