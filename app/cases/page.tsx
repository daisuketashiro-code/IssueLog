import { CaseCard } from "@/components/CaseCard";
import { getCases } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "新着事例",
  description: "許可したRSSと編集部の整理事例。記事本文は転載していません。",
};

const filters = [
  { href: "/cases", label: "すべて", outcome: undefined },
  { href: "/cases?outcome=success", label: "成功", outcome: "success" },
  { href: "/cases?outcome=failure", label: "失敗", outcome: "failure" },
  { href: "/cases?outcome=unknown", label: "経過", outcome: "unknown" },
];

export default async function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ outcome?: string }>;
}) {
  const { outcome } = await searchParams;
  const active = ["success", "failure", "unknown"].includes(outcome ?? "") ? outcome : undefined;
  const cases = await getCases(active);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-sm tracking-[0.16em] text-clay">事例</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">新着事例</h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted">
        日次の収集は、許可リストのRSSから見出しとURLだけを受け取り、独自の短い要約を作ります。記事本文は保存しません。
        <Link href="/policy" className="ml-2 underline decoration-line underline-offset-4">
          収集方針
        </Link>
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((filter) => {
          const current = filter.outcome === active || (!filter.outcome && !active);
          return (
            <Link
              key={filter.label}
              href={filter.href}
              aria-current={current ? "page" : undefined}
              className={
                current
                  ? "rounded-full bg-ink px-4 py-2 text-sm text-paper"
                  : "rounded-full border border-line px-4 py-2 text-sm hover:border-ink"
              }
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
      <div className="mt-8">
        {cases.length === 0 ? (
          <p className="border-t border-line py-8 text-muted">この条件の事例はまだありません。</p>
        ) : (
          cases.map((item) => <CaseCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
