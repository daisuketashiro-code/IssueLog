import { prisma } from "../lib/db";
import { hashSourceUrl } from "../bots/collector/sourceHash";
import { cases, categories, issues, models } from "./seed-data";

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
  }

  for (const model of models) {
    const data = { ...model, components: JSON.stringify(model.components) };
    await prisma.businessModel.upsert({
      where: { id: model.id },
      update: data,
      create: data,
    });
  }

  for (const issue of issues) {
    const data = {
      id: issue.id,
      slug: issue.slug,
      categoryId: issue.categoryId,
      title: issue.title,
      description: issue.description,
      keywords: issue.keywords,
      sortOrder: issue.sortOrder,
    };
    await prisma.issue.upsert({
      where: { id: issue.id },
      update: data,
      create: data,
    });
  }

  const issueIds = issues.map((issue) => issue.id);
  await prisma.solution.deleteMany({ where: { issueId: { in: issueIds } } });
  await prisma.issueBusinessModel.deleteMany({ where: { issueId: { in: issueIds } } });

  for (const issue of issues) {
    await prisma.solution.createMany({
      data: issue.solutions.map((solution, index) => ({
        id: `${issue.id}-s${index + 1}`,
        issueId: issue.id,
        title: solution.title,
        description: solution.description,
        sortOrder: index + 1,
      })),
    });
    await prisma.issueBusinessModel.createMany({
      data: issue.modelIds.map((businessModelId) => ({
        issueId: issue.id,
        businessModelId,
      })),
    });
  }

  for (const item of cases) {
    const sourceUrl = `seed://cases/${item.id}`;
    const data = {
      title: item.title,
      summary: item.summary,
      outcome: item.outcome,
      tags: JSON.stringify(item.tags),
      sourceName: "課題マップ編集部",
      sourceUrl,
      sourceType: "curated",
      sourceUrlHash: hashSourceUrl(sourceUrl),
      publishedAt: new Date(item.publishedAt),
      issueId: item.issueId,
      businessModelId: item.businessModelId,
    };
    await prisma.case.upsert({
      where: { sourceUrlHash: data.sourceUrlHash },
      update: data,
      create: { id: item.id, ...data },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
