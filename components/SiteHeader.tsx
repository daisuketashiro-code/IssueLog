"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/categories", label: "課題" },
  { href: "/cases", label: "事例" },
  { href: "/models", label: "ビジネスモデル" },
  { href: "/consult", label: "相談" },
  { href: "/contact", label: "問い合わせ" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        本文へ
      </a>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="block">
          <span className="block text-xs tracking-[0.18em] text-muted">課題と解決の棚</span>
          <span className="font-serif text-2xl leading-none">課題マップ</span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-clay underline decoration-clay underline-offset-4"
                    : "text-ink hover:text-clay"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
