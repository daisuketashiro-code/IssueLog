import { caseInclude, toCaseView } from "./caseView";
import { prisma } from "./db";
import { getOpenAI, getModelName, hasOpenAIKey } from "./openai";
import { parseStringList } from "./text";
import type { CaseView } from "./types";

export type ConsultMatch = {
  matched: true;
  mode: "ai" | "keyword";
  explanation: string;
  category: { slug: string; name: string };
  issue: { slug: string; title: string; description: string };
  solutions: { title: string; description: string }[];
  cases: CaseView[];
  businessModels: { slug: string; name: string; components: string[]; summary: string }[];
};

export type ConsultMiss = {
  matched: false;
  mode: "keyword";
  explanation: string;
  categories: { slug: string; name: string }[];
};

export type ConsultResult = ConsultMatch | ConsultMiss;

type CatalogIssue = Awaited<ReturnType<typeof loadIssues>>[number];

async function loadIssues() {
  return prisma.issue.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      category: true,
      solutions: { orderBy: { sortOrder: "asc" } },
      models: { include: { businessModel: true } },
      cases: { include: caseInclude, orderBy: { publishedAt: "desc" } },
    },
  });
}

function pickCases(cases: CaseView[]): CaseView[] {
  const success = cases.filter((item) => item.outcome === "success").slice(0, 3);
  const failure = cases.filter((item) => item.outcome === "failure").slice(0, 2);
  const unknown = cases.filter((item) => item.outcome === "unknown").slice(0, 2);
  return [...success, ...failure, ...unknown].slice(0, 5);
}

function toMatch(issue: CatalogIssue, mode: ConsultMatch["mode"], explanation: string): ConsultMatch {
  return {
    matched: true,
    mode,
    explanation,
    category: { slug: issue.category.slug, name: issue.category.name },
    issue: { slug: issue.slug, title: issue.title, description: issue.description },
    solutions: issue.solutions.map((solution) => ({
      title: solution.title,
      description: solution.description,
    })),
    cases: pickCases(issue.cases.map(toCaseView)),
    businessModels: issue.models.map((link) => ({
      slug: link.businessModel.slug,
      name: link.businessModel.name,
      summary: link.businessModel.summary,
      components: parseStringList(link.businessModel.components),
    })),
  };
}

function scoreIssue(message: string, issue: CatalogIssue): number {
  const keys = [issue.category.name, issue.title, ...issue.keywords.split(/\s+/)].filter(
    (key) => key.length >= 2,
  );
  let score = 0;
  for (const key of keys) {
    if (message.includes(key)) score += 5 + key.length;
  }
  return score;
}

function matchByKeyword(message: string, issues: CatalogIssue[]): ConsultResult {
  const ranked = issues
    .map((issue) => ({ issue, score: scoreIssue(message, issue) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0];
  if (!best || best.score === 0) {
    const categories = new Map<string, { slug: string; name: string }>();
    for (const issue of issues) {
      categories.set(issue.category.slug, { slug: issue.category.slug, name: issue.category.name });
    }
    return {
      matched: false,
      mode: "keyword",
      explanation: "登録している課題の言葉と重なりが少ないため、近い課題を一つに決められませんでした。",
      categories: [...categories.values()],
    };
  }
  return toMatch(
    best.issue,
    "keyword",
    `入力に近い課題として「${best.issue.title}」を選びました。解決策と事例は、この課題に紐づく登録データです。`,
  );
}

async function matchByAI(message: string, issues: CatalogIssue[]): Promise<ConsultMatch | null> {
  const catalog = issues.map((issue) => ({
    slug: issue.slug,
    category: issue.category.name,
    title: issue.title,
    description: issue.description,
  }));

  const completion = await getOpenAI().chat.completions.create({
    model: getModelName(),
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "あなたは課題分類係です。利用者の困り事を、渡された課題一覧の中で最も近い1件に分類します。一覧にない課題は作らず、企業名や数字を新たに作らない。選んだ理由は日本語で2文まで。JSONだけを返す。",
      },
      {
        role: "user",
        content: JSON.stringify({
          message,
          issues: catalog,
          schema: { issueSlug: "一覧のslug", explanation: "選んだ理由" },
        }),
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) return null;
  const parsed = JSON.parse(raw) as { issueSlug?: string; explanation?: string };
  const issue = issues.find((item) => item.slug === parsed.issueSlug);
  if (!issue) return null;
  const explanation =
    typeof parsed.explanation === "string" && parsed.explanation.trim()
      ? parsed.explanation.trim()
      : `近い課題として「${issue.title}」を選びました。`;
  return toMatch(issue, "ai", explanation);
}

export async function consult(message: string): Promise<ConsultResult> {
  const issues = await loadIssues();
  if (hasOpenAIKey()) {
    try {
      const ai = await matchByAI(message, issues);
      if (ai) return ai;
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
    }
  }
  return matchByKeyword(message, issues);
}
