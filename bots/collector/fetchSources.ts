import Parser from "rss-parser";
import { ALLOWED_SOURCES } from "./sources";

export type FeedItem = {
  title: string;
  url: string;
  publishedAt: Date | null;
  sourceName: string;
  sourceType: "rss";
};

export type FetchResult = {
  items: FeedItem[];
  errors: string[];
};

const parser = new Parser({
  timeout: 20000,
  headers: {
    "User-Agent": "KadaiMapCollector/1.0 (RSS metadata only)",
    Accept: "application/rss+xml, application/rdf+xml, application/atom+xml, application/xml, text/xml",
  },
});

function publishedAtOf(isoDate?: string, pubDate?: string): Date | null {
  const raw = isoDate || pubDate;
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function fetchSources(): Promise<FetchResult> {
  const items: FeedItem[] = [];
  const errors: string[] = [];
  const perSource = Number(process.env.COLLECT_PER_SOURCE ?? 8);
  const allow = new Set(ALLOWED_SOURCES.map((source) => source.url));

  for (const source of ALLOWED_SOURCES) {
    if (!allow.has(source.url) || source.sourceType !== "rss") continue;
    try {
      const feed = await parser.parseURL(source.url);
      const slice = (feed.items ?? []).slice(0, perSource);
      for (const item of slice) {
        const title = item.title?.replace(/\s+/g, " ").trim();
        const url = item.link?.trim();
        if (!title || !url) continue;
        if (!url.startsWith("https://") && !url.startsWith("http://")) continue;
        items.push({
          title: title.slice(0, 200),
          url,
          publishedAt: publishedAtOf(item.isoDate, item.pubDate),
          sourceName: source.name,
          sourceType: "rss",
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "取得に失敗しました";
      errors.push(`${source.name}: ${message.slice(0, 180)}`);
    }
  }

  return { items, errors };
}
