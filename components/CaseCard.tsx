import { formatDate } from "@/lib/text";
import type { CaseView } from "@/lib/types";
import Link from "next/link";
import { ModelCombo } from "./ModelCombo";
import { OutcomeBadge } from "./OutcomeBadge";

export function CaseCard({ item }: { item: CaseView }) {
  return (
    <article className="border-t border-line py-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
        <OutcomeBadge outcome={item.outcome} />
        <time dateTime={item.publishedAt ?? undefined}>{formatDate(item.publishedAt)}</time>
        <span>{item.sourceType === "rss" ? "許可フィード" : "編集部の整理"}</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl leading-snug">{item.title}</h3>
      <p className="mt-3 max-w-3xl leading-8 text-muted">{item.summary}</p>
      {item.businessModel && (
        <div className="mt-4">
          <ModelCombo components={item.businessModel.components} />
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {item.issue && (
          <Link href={`/issues/${item.issue.slug}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">
            課題：{item.issue.title}
          </Link>
        )}
        {item.businessModel && (
          <Link
            href={`/models/${item.businessModel.slug}`}
            className="underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            型：{item.businessModel.name}
          </Link>
        )}
        {item.sourceType === "rss" ? (
          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-clay hover:underline">
            出典を開く
          </a>
        ) : (
          <span className="text-muted">記事の転載ではありません</span>
        )}
      </div>
    </article>
  );
}
