import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 text-sm leading-7 text-muted sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-xl text-ink">課題マップ</p>
          <p className="mt-2 max-w-xl">
            課題、解決策、ビジネスモデルの組み合わせ、事例を同じ棚に置くためのデータベースです。収集は許可したRSSだけを使い、記事本文は転載しません。
          </p>
        </div>
        <div className="flex gap-5">
          <Link href="/policy" className="hover:text-ink">
            収集方針
          </Link>
          <Link href="/contact" className="hover:text-ink">
            問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
}
