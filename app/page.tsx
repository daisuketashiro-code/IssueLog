import { CategoryIndex } from "@/components/CategoryIndex";
import { CaseCard } from "@/components/CaseCard";
import { ModelRank } from "@/components/ModelRank";
import { SectionTitle } from "@/components/SectionTitle";
import { getHomeData } from "@/lib/queries";
import Link from "next/link";

export default async function HomePage() {
  const data = await getHomeData();
  const leading = data.models.find((model) => model.successCount > 0);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.35fr_0.75fr] lg:py-24">
          <div>
            <p className="text-sm text-clay">世の中の困り事を、解決の型まで並べる</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-balance sm:text-6xl">
              課題と解決策と、
              <br />
              うまくいった組み合わせ。
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              カテゴリから課題を選べます。困り事を書くと、近い課題の解決策と類似事例を返します。事例の収集は、許可したRSSだけを日次で行い、記事本文は転載しません。
            </p>
            <form action="/consult" method="get" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="trouble">
                困り事
              </label>
              <input
                id="trouble"
                name="q"
                placeholder="例：急な残業の日に、子どもの預け先が決まらない"
                className="w-full rounded-full border border-line bg-white px-5 py-3 text-base outline-none focus:border-ink"
              />
              <button className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-clay">
                整理してもらう
              </button>
            </form>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <dt className="text-muted">課題</dt>
                <dd className="font-serif text-2xl">{data.issueCount}</dd>
              </div>
              <div>
                <dt className="text-muted">事例</dt>
                <dd className="font-serif text-2xl">{data.caseCount}</dd>
              </div>
              <div>
                <dt className="text-muted">ビジネスモデル</dt>
                <dd className="font-serif text-2xl">{data.models.length}</dd>
              </div>
            </dl>
          </div>
          <aside className="border border-line bg-white p-6">
            <p className="text-sm tracking-[0.16em] text-clay">いま成功例が多い型</p>
            {leading ? (
              <>
                <h2 className="mt-4 font-serif text-3xl leading-snug">
                  <Link href={`/models/${leading.slug}`} className="hover:text-clay">
                    {leading.name}
                  </Link>
                </h2>
                <p className="mt-4 leading-8 text-muted">{leading.summary}</p>
                <p className="mt-6 text-sm">
                  成功 {leading.successCount}　失敗 {leading.failureCount}
                </p>
              </>
            ) : (
              <p className="mt-4 leading-8">成功として整理された事例はまだありません。</p>
            )}
            <Link href="/models" className="mt-6 inline-block text-sm underline decoration-line underline-offset-4">
              組み合わせの一覧を見る
            </Link>
          </aside>
        </div>
      </section>

      <section id="categories" className="mx-auto w-full max-w-6xl px-5 py-16">
        <SectionTitle
          index="01　課題"
          title="カテゴリから入る"
          lead="課題を選ぶと、解決策、関連するビジネスモデル、成功例と失敗例が同じページに並びます。"
        />
        <CategoryIndex categories={data.categories} />
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <SectionTitle
            index="02　ビジネスモデル"
            title="成功が多い組み合わせ"
            lead="サブスク、マッチング、SaaS、コンサルのように、型を部品に分けて事例と紐づけています。"
          />
          <ModelRank models={data.models} limit={4} />
          <Link href="/models" className="mt-6 inline-block text-sm underline decoration-line underline-offset-4">
            すべての型を見る
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16">
        <SectionTitle index="03　事例" title="成功として整理された事例" lead="編集部が登録した整理事例と、許可フィードから追記された事例が混ざります。" />
        <div>
          {data.successCases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-14">
          <h2 className="font-serif text-3xl">新着</h2>
          <p className="mt-3 max-w-2xl leading-8 text-muted">
            日次の収集で入った事例は、成功か失敗かまだ言えないものも含めてここに並びます。
          </p>
          <div className="mt-6">
            {data.latestCases.map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <Link href="/cases" className="mt-6 inline-block text-sm underline decoration-line underline-offset-4">
          新着事例をすべて見る
        </Link>
      </section>
    </>
  );
}
