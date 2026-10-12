import { CaseCard } from "@/components/CaseCard";
import { ModelCombo } from "@/components/ModelCombo";
import { getIssue } from "@/lib/queries";
import type { CaseView } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssue(slug);
  return { title: issue.title, description: issue.description };
}

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = await getIssue(slug);
  const success = issue.caseViews.filter((item) => item.outcome === "success");
  const failure = issue.caseViews.filter((item) => item.outcome === "failure");
  const unknown = issue.caseViews.filter((item) => item.outcome === "unknown");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-sm text-muted">
        <Link href="/categories" className="hover:text-ink">
          課題
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/categories/${issue.category.slug}`} className="hover:text-ink">
          {issue.category.name}
        </Link>
      </p>
      <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{issue.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8">{issue.description}</p>

      <section className="mt-14">
        <h2 className="font-serif text-3xl">解決策</h2>
        <ol className="mt-6 grid gap-6">
          {issue.solutions.map((solution, index) => (
            <li key={solution.id} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-line pt-5">
              <span className="font-serif text-2xl text-clay">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-serif text-2xl">{solution.title}</span>
                <span className="mt-2 block leading-8 text-muted">{solution.description}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">関連するビジネスモデル</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {issue.modelViews.map((model) => (
            <Link key={model.slug} href={`/models/${model.slug}`} className="border border-line bg-white p-5 hover:border-ink">
              <ModelCombo components={model.components} />
              <h3 className="mt-4 font-serif text-2xl">{model.name}</h3>
              <p className="mt-3 leading-7 text-muted">{model.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">類似事例</h2>
        <CaseGroup title="成功例" items={success} empty="成功として整理された事例はまだありません。" />
        <CaseGroup title="失敗例" items={failure} empty="失敗として整理された事例はまだありません。" />
        {unknown.length > 0 && <CaseGroup title="経過" items={unknown} empty="" />}
      </section>

      {issue.related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-3xl">同じカテゴリの課題</h2>
          <ul className="mt-6 border-t border-line">
            {issue.related.map((related) => (
              <li key={related.id} className="border-b border-line">
                <Link href={`/issues/${related.slug}`} className="block py-4 font-serif text-xl hover:text-clay">
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link
        href={`/contact?topic=${encodeURIComponent(issue.title)}`}
        className="mt-12 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-clay"
      >
        この課題を専門家に相談する
      </Link>
    </div>
  );
}

function CaseGroup({ title, items, empty }: { title: string; items: CaseView[]; empty: string }) {
  return (
    <div className="mt-8">
      <h3 className="font-serif text-2xl">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-muted">{empty}</p>
      ) : (
        items.map((item) => <CaseCard key={item.id} item={item} />)
      )}
    </div>
  );
}
