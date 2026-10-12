import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-gothic",
  display: "swap",
});

const mincho = Shippori_Mincho({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mincho",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "課題マップ",
    template: "%s｜課題マップ",
  },
  description: "世の中の課題、解決策、成功しているビジネスモデルの組み合わせと事例を、同じ棚で見る。",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${gothic.variable} ${mincho.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
