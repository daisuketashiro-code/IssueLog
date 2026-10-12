import { prisma } from "../../lib/db";
import { hasOpenAIKey } from "../../lib/openai";
import { classifyBusinessModel } from "./classifyBusinessModel";
import { classifyIssue } from "./classifyIssue";
import { fetchSources } from "./fetchSources";
import { inferOutcome } from "./inferOutcome";
import { saveToDB } from "./saveToDB";
import { hashSourceUrl } from "./sourceHash";
import { summarize } from "./summarize";

export type CollectorReport = {
  mode: "fetch-only" | "save";
  message?: string;
  fetched: number;
  saved: number;
  skipped: number;
  failed: number;
  errors: string[];
};

export async function runCollector(): Promise<CollectorReport> {
  const { items, errors } = await fetchSources();
  if (!hasOpenAIKey()) {
    return {
      mode: "fetch-only",
      message: "OPENAI_API_KEY がないため、要約と保存は行っていません。見出しとURLの取得だけ確認しました。",
      fetched: items.length,
      saved: 0,
      skipped: 0,
      failed: 0,
      errors,
    };
  }

  const limit = Number(process.env.COLLECT_LIMIT ?? 12);
  let saved = 0;
  let skipped = 0;
  let failed = 0;
  let considered = 0;

  for (const item of items) {
    if (considered >= limit) break;
    const sourceUrlHash = hashSourceUrl(item.url);
    const existing = await prisma.case.findUnique({ where: { sourceUrlHash } });
    if (existing) {
      skipped += 1;
      continue;
    }
    considered += 1;
    try {
      const summary = await summarize({ title: item.title, url: item.url });
      const issue = await classifyIssue(summary);
      const businessModel = await classifyBusinessModel(summary);
      const outcome = inferOutcome(item.title, summary);
      const result = await saveToDB({
        title: item.title,
        summary,
        outcome,
        tags: [issue.categoryName, ...businessModel.components],
        sourceName: item.sourceName,
        sourceUrl: item.url,
        sourceType: item.sourceType,
        publishedAt: item.publishedAt,
        issueId: issue.id,
        businessModelId: businessModel.id,
      });
      if (result === "duplicate") skipped += 1;
      else saved += 1;
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : "保存に失敗しました";
      errors.push(`${item.sourceName}: ${message.slice(0, 180)}`);
    }
  }

  return { mode: "save", fetched: items.length, saved, skipped, failed, errors };
}

function isDirectRun(): boolean {
  const entry = process.argv[1]?.replace(/\\/g, "/") ?? "";
  return /bots\/collector\/index\.(ts|js)$/.test(entry);
}

if (isDirectRun()) {
  runCollector()
    .then(async (report) => {
      console.log(JSON.stringify(report, null, 2));
      await prisma.$disconnect();
      if (report.failed > 0 && report.saved === 0) process.exitCode = 1;
    })
    .catch(async (error) => {
      console.error(error instanceof Error ? error.message : error);
      await prisma.$disconnect();
      process.exit(1);
    });
}
