import { CategoryIndex } from "@/components/CategoryIndex";
import { SectionTitle } from "@/components/SectionTitle";
import { getCategories } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "課題",
  description: "子育て、介護、教育、IT、金融、行政などの課題カテゴリ。",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14">
      <SectionTitle index="課題" title="カテゴリ" lead="気になる領域を選ぶと、その中の課題一覧に進みます。" />
      <CategoryIndex categories={categories} />
    </div>
  );
}
