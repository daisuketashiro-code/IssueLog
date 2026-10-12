import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-20">
      <h1 className="font-serif text-4xl">ページが見つかりません</h1>
      <p className="mt-4 leading-8 text-muted">課題の一覧から入り直してください。</p>
      <Link href="/" className="mt-6 inline-block underline decoration-line underline-offset-4">
        トップへ戻る
      </Link>
    </div>
  );
}
