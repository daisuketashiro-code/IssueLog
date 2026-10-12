import { notFound } from "next/navigation";
import { caseInclude, toCaseView } from "./caseView";
import { prisma } from "./db";
import { parseStringList } from "./text";
import type { CategoryCard, ModelStat } from "./types";

export async function getModelStats(): Promise<ModelStat[]> {
  const models = await prisma.businessModel.findMany({
    include: {
      cases: { select: { outcome: true } },
      issues: { include: { issue: { select: { slug: true, title: true } } } },
    },
  });

  return models
    .map((model) => ({
      slug: model.slug,
      name: model.name,
      summary: model.summary,
      components: parseStringList(model.components),
      worksWhen: model.worksWhen,
      failsWhen: model.failsWhen,
      successCount: model.cases.filter((item) => item.outcome === "success").length,
      failureCount: model.cases.filter((item) => item.outcome === "failure").length,
      unknownCount: model.cases.filter((item) => item.outcome === "unknown").length,
      issues: model.issues.map((link) => link.issue),
    }))
    .sort(
      (a, b) =>
        b.successCount - a.successCount ||
        a.failureCount - b.failureCount ||
        a.name.localeCompare(b.name, "ja"),
    );
}

export async function getCategories(): Promise<CategoryCard[]> {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { issues: true } } },
  });
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    description: category.description,
    sortOrder: category.sortOrder,
    issueCount: category._count.issues,
  }));
}

export async function getHomeData() {
  const [categories, successPool, latestCases, models, caseCount, issueCount] = await Promise.all([
    getCategories(),
    prisma.case.findMany({
      where: { outcome: "success" },
      orderBy: { publishedAt: "desc" },
      take: 8,
      include: caseInclude,
    }),
    prisma.case.findMany({
      orderBy: { publishedAt: "desc" },
      take: 4,
      include: caseInclude,
    }),
    getModelStats(),
    prisma.case.count(),
    prisma.issue.count(),
  ]);

  const latestViews = latestCases.map(toCaseView);
  const latestIds = new Set(latestViews.map((item) => item.id));
  const successViews = successPool.map(toCaseView);
  const successCases = [
    ...successViews.filter((item) => !latestIds.has(item.id)),
    ...successViews.filter((item) => latestIds.has(item.id)),
  ].slice(0, 3);

  return {
    categories,
    successCases,
    latestCases: latestViews,
    models,
    caseCount,
    issueCount,
  };
}

export async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      issues: {
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { solutions: true, cases: true } } },
      },
    },
  });
  if (!category) notFound();
  return category;
}

export async function getIssue(slug: string) {
  const issue = await prisma.issue.findUnique({
    where: { slug },
    include: {
      category: true,
      solutions: { orderBy: { sortOrder: "asc" } },
      models: { include: { businessModel: true } },
      cases: { include: caseInclude, orderBy: { publishedAt: "desc" } },
    },
  });
  if (!issue) notFound();

  const related = await prisma.issue.findMany({
    where: { categoryId: issue.categoryId, NOT: { id: issue.id } },
    orderBy: { sortOrder: "asc" },
  });

  return {
    ...issue,
    related,
    caseViews: issue.cases.map(toCaseView),
    modelViews: issue.models.map((link) => ({
      slug: link.businessModel.slug,
      name: link.businessModel.name,
      summary: link.businessModel.summary,
      components: parseStringList(link.businessModel.components),
      worksWhen: link.businessModel.worksWhen,
      failsWhen: link.businessModel.failsWhen,
    })),
  };
}

export async function getCases(outcome?: string) {
  const allowed = outcome && ["success", "failure", "unknown"].includes(outcome) ? outcome : undefined;
  const cases = await prisma.case.findMany({
    where: allowed ? { outcome: allowed } : {},
    orderBy: { publishedAt: "desc" },
    include: caseInclude,
  });
  return cases.map(toCaseView);
}

export async function getModel(slug: string) {
  const model = await prisma.businessModel.findUnique({
    where: { slug },
    include: {
      issues: { include: { issue: { select: { slug: true, title: true } } } },
      cases: { include: caseInclude, orderBy: { publishedAt: "desc" } },
    },
  });
  if (!model) notFound();
  const [stat] = (await getModelStats()).filter((item) => item.slug === slug);
  return {
    ...model,
    components: parseStringList(model.components),
    issues: model.issues.map((link) => link.issue),
    caseViews: model.cases.map(toCaseView),
    successCount: stat?.successCount ?? 0,
    failureCount: stat?.failureCount ?? 0,
    unknownCount: stat?.unknownCount ?? 0,
  };
}
