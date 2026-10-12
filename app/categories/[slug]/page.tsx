import { getCategory } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-sm text-muted">
        <Link href="/categories" className="hover:text-ink">
          課題
        </Link>
      </p>
      <p className="mt-6 text-sm tracking-[0.16em] text-clay">{String(category.sortOrder).padStart(2, "0")}</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{category.name}</h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted">{category.description}</p>
      <div className="mt-10 border-t border-ink">
        {category.issues.map((issue) => (
          <Link key={issue.id} href={`/issues/${issue.slug}`} className="block border-b border-line py-6 hover:text-clay">
            <h2 className="font-serif text-2xl">{issue.title}</h2>
            <p className="mt-3 max-w-3xl leading-8 text-muted">{issue.description}</p>
            <p className="mt-3 text-sm text-ink">
              解決策 {issue._count.solutions}　事例 {issue._count.cases}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
