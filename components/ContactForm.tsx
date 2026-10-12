"use client";

import { FormEvent, useState } from "react";

const fieldClass =
  "mt-2 w-full rounded-md border border-line bg-white px-3 py-3 text-base text-ink outline-none focus:border-ink";

export function ContactForm({ initialMessage }: { initialMessage: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [website, setWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string; id?: string };
      if (!response.ok || !data.ok || !data.id) {
        setError(data.error ?? "送信できませんでした。");
        return;
      }
      setReceipt(data.id);
    } catch {
      setError("送信できませんでした。時間をおいてもう一度試してください。");
    } finally {
      setPending(false);
    }
  }

  if (receipt) {
    return (
      <div className="border border-line bg-white p-6" role="status">
        <p className="font-serif text-2xl">受け付けました</p>
        <p className="mt-3 leading-8 text-muted">
          担当者が内容を確認し、記入されたメールアドレスへ連絡します。受付番号は {receipt} です。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <label className="block">
        <span className="text-sm font-medium">名前</span>
        <input
          className={fieldClass}
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">メール</span>
        <input
          className={fieldClass}
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={200}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">相談内容</span>
        <textarea
          className={`${fieldClass} min-h-40`}
          name="message"
          required
          maxLength={4000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <label className="hidden" aria-hidden="true">
        ウェブサイト
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
      </label>
      {error && (
        <p className="text-sm text-fail" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-fit items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-clay disabled:opacity-60"
      >
        {pending ? "送信しています" : "送信する"}
      </button>
    </form>
  );
}
