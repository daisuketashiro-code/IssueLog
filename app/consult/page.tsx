import { CaseCard } from "@/components/CaseCard";
import { ModelCombo } from "@/components/ModelCombo";
import { consult } from "@/lib/consult";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "困り事を相談する",
  description: "困り事を課題に分類し、解決策と類似事例を返します。",
};

export default async function ConsultPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const tooLong = query.length > 2000;
  const result = query && !tooLong ? await consult(query) : null;
  const topic =
    result && result.matched
      ? `${result.issue.title}\n\n相談のきっかけ:\n${query.slice(0, 800)}`
      : query.slice(0, 800);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14">
      <p className="text-sm tracking-[0.16em] text-clay">相談</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">困り事を整理する</h1>
      <p className="mt-4 leading-8 text-muted">
        文章を課題に分類し、登録済みの解決策、類似事例、ビジネスモデルの組み合わせを返します。APIキーがあるときはAIが分類し、ないときは言葉の近さで選びます。
      </p>
      <form action="/consult" method="get" className="mt-8 grid gap-3">
        <label htmlFor="q" className="text-sm font-medium">
          困り事
        </label>
        <textarea
          id="q"
          name="q"
          required
          maxLength={2000}
          defaultValue={query}
          rows={5}
          placeholder="例：親の介護が一人に集中して、仕事の予定が立たない"
          className="w-full rounded-md border border-line bg-white px-3 py-3 text-base outline-none focus:border-ink"
        />
        <button className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-clay">
          整理してもらう
        </button>
      </form>

      {tooLong && <p className="mt-6 text-fail">2000字以内にしてください。</p>}

      {result && (
        <section className="mt-12 border-t border-ink pt-8" aria-live="polite">
          <h2 className="font-serif text-3xl">整理結果</h2>
          <p className="mt-3 text-sm text-muted">
            {result.matched && result.mode === "ai"
              ? "AIが課題を分類し、登録データから解決策と事例を並べました。"
              : "言葉の近さで課題を選び、登録データから解決策と事例を並べました。"}
          </p>
          <p className="mt-4 leading-8">{result.explanation}</p>

          {result.matched ? (
            <div className="mt-8">
              <p className="text-sm text-clay">{result.category.name}</p>
              <h3 className="mt-2 font-serif text-3xl">
                <Link href={`/issues/${result.issue.slug}`} className="hover:text-clay">
                  {result.issue.title}
                </Link>
              </h3>
              <p className="mt-3 leading-8 text-muted">{result.issue.description}</p>

              <h3 className="mt-10 font-serif text-2xl">解決策</h3>
              <ol className="mt-4 grid gap-4">
                {result.solutions.map((solution, index) => (
                  <li key={solution.title} className="border-t border-line pt-4">
                    <span className="text-sm text-clay">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-1 font-serif text-xl">{solution.title}</p>
                    <p className="mt-2 leading-7 text-muted">{solution.description}</p>
                  </li>
                ))}
              </ol>

              <h3 className="mt-10 font-serif text-2xl">類似事例</h3>
              {result.cases.length === 0 ? (
                <p className="mt-3 text-muted">この課題に紐づく事例はまだありません。</p>
              ) : (
                result.cases.map((item) => <CaseCard key={item.id} item={item} />)
              )}

              <h3 className="mt-10 font-serif text-2xl">関連する組み合わせ</h3>
              <div className="mt-4 grid gap-4">
                {result.businessModels.map((model) => (
                  <Link key={model.slug} href={`/models/${model.slug}`} className="border border-line bg-white p-4">
                    <ModelCombo components={model.components} />
                    <p className="mt-3 font-serif text-xl">{model.name}</p>
                    <p className="mt-2 leading-7 text-muted">{model.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <ul className="mt-6 grid gap-3">
              {result.categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/categories/${category.slug}`} className="underline decoration-line underline-offset-4">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/contact?topic=${encodeURIComponent(topic)}`}
            className="mt-10 inline-flex rounded-full border border-ink px-6 py-3 text-sm hover:bg-ink hover:text-paper"
          >
            専門家に相談する
          </Link>
        </section>
      )}
    </div>
  );
}
