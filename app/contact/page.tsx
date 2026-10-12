import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "問い合わせ",
  description: "専門家への相談を受け付けるフォーム。",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const initialMessage = topic ? `${topic.slice(0, 1500)}\n` : "";

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14">
      <p className="text-sm tracking-[0.16em] text-clay">問い合わせ</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">専門家に相談する</h1>
      <p className="mt-4 leading-8 text-muted">名前、メール、相談内容を送ってください。内容は課題データベースと同じ場所に保存します。</p>
      <div className="mt-8">
        <ContactForm initialMessage={initialMessage} />
      </div>
    </div>
  );
}
