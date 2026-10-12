import { prisma } from "../../lib/db";
import { getOpenAI, getModelName } from "../../lib/openai";

export async function classifyIssue(summaryJa: string): Promise<{ id: string; title: string; categoryName: string }> {
  const issues = await prisma.issue.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  if (issues.length === 0) throw new Error("Issueがありません。npm run setup を先に実行してください。");

  const catalog = issues.map((issue) => ({
    id: issue.id,
    category: issue.category.name,
    title: issue.title,
    description: issue.description.slice(0, 180),
  }));

  const completion = await getOpenAI().chat.completions.create({
    model: getModelName(),
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "日本語要約を、渡されたIssueの中で最も関連する1件に分類する。一覧にない課題は作らない。記事本文は参照できない前提で、要約だけで判断する。JSONだけを返す。",
      },
      {
        role: "user",
        content: JSON.stringify({ summary: summaryJa, issues: catalog, schema: { issueId: "一覧のid" } }),
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("課題分類の応答が空です");
  const parsed = JSON.parse(raw) as { issueId?: string };
  const found = issues.find((issue) => issue.id === parsed.issueId);
  if (!found) throw new Error("分類結果がIssue一覧にありません");
  return { id: found.id, title: found.title, categoryName: found.category.name };
}
