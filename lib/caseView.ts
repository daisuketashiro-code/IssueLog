import type { CaseView } from "./types";
import { parseStringList } from "./text";

export type CaseRecord = {
  id: string;
  title: string;
  summary: string;
  outcome: string;
  tags: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  publishedAt: Date | null;
  issue: { slug: string; title: string } | null;
  businessModel: { slug: string; name: string; components: string } | null;
};

export function toCaseView(item: CaseRecord): CaseView {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    outcome: item.outcome,
    tags: parseStringList(item.tags),
    sourceName: item.sourceName,
    sourceUrl: item.sourceUrl,
    sourceType: item.sourceType,
    publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
    issue: item.issue,
    businessModel: item.businessModel
      ? {
          slug: item.businessModel.slug,
          name: item.businessModel.name,
          components: parseStringList(item.businessModel.components),
        }
      : null,
  };
}

export const caseInclude = {
  issue: { select: { slug: true, title: true } },
  businessModel: { select: { slug: true, name: true, components: true } },
} as const;
