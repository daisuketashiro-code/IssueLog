import { ModelRank } from "@/components/ModelRank";
import { getModelStats } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ビジネスモデル",
  description: "成功事例が多いビジネスモデルの組み合わせ。",
};

export default async function ModelsPage() {
  const models = await getModelStats();
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-sm tracking-[0.16em] text-clay">ビジネスモデル</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">組み合わせの棚</h1>
      <div className="mt-8">
        <ModelRank models={models} />
      </div>
    </div>
  );
}
