import type { CategoryCard } from "@/lib/types";
import Link from "next/link";

export function CategoryIndex({ categories }: { categories: CategoryCard[] }) {
  return (
    <div className="grid md:grid-cols-2 md:gap-x-12">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="group border-t border-ink py-6"
        >
          <div className="grid grid-cols-[3.2rem_1fr] gap-4">
            <span className="font-serif text-3xl text-muted transition group-hover:text-clay">
              {String(category.sortOrder).padStart(2, "0")}
            </span>
            <span>
              <span className="block font-serif text-2xl group-hover:text-clay">{category.name}</span>
              <span className="mt-2 block leading-7 text-muted">{category.description}</span>
              <span className="mt-3 block text-sm">課題 {category.issueCount}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
