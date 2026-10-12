import type { ModelStat } from "@/lib/types";
import Link from "next/link";
import { ModelCombo } from "./ModelCombo";

export function ModelRank({ models, limit }: { models: ModelStat[]; limit?: number }) {
  const visible = typeof limit === "number" ? models.slice(0, limit) : models;
  const top = models.find((model) => model.successCount > 0);

  return (
    <div>
      <p className="max-w-2xl leading-8 text-muted">
        {top
          ? `登録事例のなかで成功が最も多い組み合わせは「${top.name}」です。件数は、このサイトに登録された事例の数であり、世の中全体の成功率ではありません。`
          : "成功として整理された事例はまだありません。"}
      </p>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {visible.map((model, index) => {
          const total = model.successCount + model.failureCount;
          const successWidth = total === 0 ? 0 : Math.round((model.successCount / total) * 100);
          const failureWidth = total === 0 ? 0 : 100 - successWidth;
          return (
            <li key={model.slug} className="grid gap-4 py-6 lg:grid-cols-[4rem_1fr_auto] lg:items-center">
              <span className="font-serif text-3xl text-muted">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <Link href={`/models/${model.slug}`} className="font-serif text-2xl hover:text-clay">
                  {model.name}
                </Link>
                <div className="mt-3">
                  <ModelCombo components={model.components} />
                </div>
                <p className="mt-3 max-w-2xl leading-7 text-muted">{model.summary}</p>
                <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-paper-deep">
                  <div className="h-full bg-green" style={{ width: `${successWidth}%` }} />
                  <div className="h-full bg-fail" style={{ width: `${failureWidth}%` }} />
                </div>
              </div>
              <p className="text-sm leading-6 text-muted lg:text-right">
                成功 {model.successCount}
                <br />
                失敗 {model.failureCount}
                {model.unknownCount > 0 && (
                  <>
                    <br />
                    経過 {model.unknownCount}
                  </>
                )}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
