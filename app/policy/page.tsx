import { ALLOWED_SOURCES } from "@/bots/collector/sources";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "収集方針",
  description: "事例収集は許可したRSSだけを使い、記事本文は転載しません。",
};

export default function PolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14">
      <p className="text-sm tracking-[0.16em] text-clay">方針</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">収集方針</h1>
      <div className="mt-8 grid gap-6 leading-8">
        <p>事例の自動収集は、下の許可リストに書いたRSSとAtomだけを対象にします。リストに無いサイトは取得しません。</p>
        <p>受け取るのは見出し、URL、公開日時です。記事ページのHTMLは取りにいかず、本文やRSSの説明文は保存しません。</p>
        <p>
          要約は、見出しとURL文字列から作った独自の短文を日本語にしたものです。記事の引き写しではありません。出典へ進むリンクだけを残します。
        </p>
        <p>編集部が最初から入れている事例は、公開記事の転載ではなく、課題とビジネスモデルを説明するための整理です。</p>
      </div>
      <h2 className="mt-12 font-serif text-3xl">許可リスト</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {ALLOWED_SOURCES.map((source) => (
          <li key={source.url} className="py-5">
            <p className="font-serif text-xl">{source.name}</p>
            <p className="mt-2 text-sm break-all text-muted">{source.url}</p>
            <p className="mt-2 leading-7">{source.permission}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
