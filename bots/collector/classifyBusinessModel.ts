import { prisma } from "../../lib/db";
import { getOpenAI, getModelName } from "../../lib/openai";
import { parseStringList } from "../../lib/text";

export async function classifyBusinessModel(summaryJa: string): Promise<{
  id: string;
  name: string;
  components: string[];
}> {
  const models = await prisma.businessModel.findMany({ orderBy: { sortOrder: "asc" } });
  if (models.length === 0) throw new Error("BusinessModelがありません。npm run setup を先に実行してください。");

  const catalog = models.map((model) => ({
    id: model.id,
    name: model.name,
    components: parseStringList(model.components),
    summary: model.summary.slice(0, 160),
  }));

  const completion = await getOpenAI().chat.completions.create({
    model: getModelName(),
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "日本語要約に最も近いビジネスモデルを1件選ぶ。判断は各モデルの components（組み合わせ）を根拠にする。一覧にないモデルは作らない。JSONだけを返す。",
      },
      {
        role: "user",
        content: JSON.stringify({
          summary: summaryJa,
          businessModels: catalog,
          schema: { businessModelId: "一覧のid" },
        }),
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("ビジネスモデル分類の応答が空です");
  const parsed = JSON.parse(raw) as { businessModelId?: string };
  const found = models.find((model) => model.id === parsed.businessModelId);
  if (!found) throw new Error("分類結果がBusinessModel一覧にありません");
  return { id: found.id, name: found.name, components: parseStringList(found.components) };
}
