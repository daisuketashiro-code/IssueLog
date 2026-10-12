import OpenAI from "openai";

export function hasOpenAIKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function getModelName(): string {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

export function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) throw new Error("OPENAI_API_KEY が未設定です");
  return new OpenAI({ apiKey, timeout: 30000 });
}
