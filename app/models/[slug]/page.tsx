import { CaseCard } from "@/components/CaseCard";
import { ModelCombo } from "@/components/ModelCombo";
import { getModel } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = await getModel(slug);
  return { title: model.name, description: model.summary };
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = await getModel(slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-sm text-muted">
        <Link href="/models" className="hover:text-ink">
          ビジネスモデル
        </Link>
      </p>
      <div className="mt-6">
        <ModelCombo components={model.components} />
      </div>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{model.name}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8">{model.summary}</p>
      <p className="mt-4 text-sm text-muted">
        成功 {model.successCount}　失敗 {model.failureCount}
        {model.unknownCount > 0 ? `　経過 ${model.unknownCount}` : ""}
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="border border-line bg-white p-6">
          <h2 className="font-serif text-2xl">続きやすい条件</h2>
          <p className="mt-3 leading-8 text-muted">{model.worksWhen}</p>
        </section>
        <section className="border border-line bg-white p-6">
          <h2 className="font-serif text-2xl">崩れやすい条件</h2>
          <p className="mt-3 leading-8 text-muted">{model.failsWhen}</p>
        </section>
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-3xl">この型が関係する課題</h2>
        <ul className="mt-4 border-t border-line">
          {model.issues.map((issue) => (
            <li key={issue.slug} className="border-b border-line">
              <Link href={`/issues/${issue.slug}`} className="block py-4 font-serif text-xl hover:text-clay">
                {issue.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-serif text-3xl">事例</h2>
        {model.caseViews.length === 0 ? (
          <p className="mt-4 text-muted">この型の事例はまだありません。</p>
        ) : (
          model.caseViews.map((item) => <CaseCard key={item.id} item={item} />)
        )}
      </section>
    </div>
  );
}
