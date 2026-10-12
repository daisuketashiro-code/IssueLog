import { getOpenAI, getModelName } from "../../lib/openai";
import { clampJapanese } from "../../lib/text";

type SummaryInput = {
  title: string;
  url: string;
};

async function draftSummary(input: SummaryInput): Promise<string> {
  const completion = await getOpenAI().chat.completions.create({
    model: getModelName(),
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "Write an original two-sentence summary using only the title and the URL string. Do not open or fetch the URL. Do not quote or reproduce an article body. Do not invent numbers, quotes, or outcomes. If the headline is ambiguous, say what is unclear. Do not copy the headline verbatim.",
      },
      {
        role: "user",
        content: `Title: ${input.title}\nURL string (do not open): ${input.url}`,
      },
    ],
  });
  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) throw new Error("要約の下書きが空です");
  return text.replace(input.url, "").trim();
}

async function translateToJapanese(draft: string): Promise<string> {
  const completion = await getOpenAI().chat.completions.create({
    model: getModelName(),
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "次の原文要約を、自然な日本語へ翻訳する。160字前後に収める。要約にない事実、数字、引用は足さない。見出しの引き写しにしない。URLは書かない。日本語の本文だけを返す。",
      },
      { role: "user", content: draft },
    ],
  });
  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) throw new Error("日本語訳が空です");
  return clampJapanese(text);
}

export async function summarize(input: SummaryInput): Promise<string> {
  const draft = await draftSummary(input);
  return translateToJapanese(draft);
}
