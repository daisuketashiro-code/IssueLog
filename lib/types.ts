export type CaseView = {
  id: string;
  title: string;
  summary: string;
  outcome: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  publishedAt: string | null;
  issue: { slug: string; title: string } | null;
  businessModel: { slug: string; name: string; components: string[] } | null;
};

export type ModelStat = {
  slug: string;
  name: string;
  summary: string;
  components: string[];
  worksWhen: string;
  failsWhen: string;
  successCount: number;
  failureCount: number;
  unknownCount: number;
  issues: { slug: string; title: string }[];
};

export type CategoryCard = {
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  issueCount: number;
};
