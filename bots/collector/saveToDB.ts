import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/db";
import { hashSourceUrl } from "./sourceHash";

export type NewCase = {
  title: string;
  summary: string;
  outcome: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  publishedAt: Date | null;
  issueId: string | null;
  businessModelId: string | null;
};

export async function saveToDB(input: NewCase): Promise<"saved" | "duplicate"> {
  const sourceUrlHash = hashSourceUrl(input.sourceUrl);
  const existing = await prisma.case.findUnique({ where: { sourceUrlHash } });
  if (existing) return "duplicate";

  try {
    await prisma.case.create({
      data: {
        title: input.title,
        summary: input.summary,
        outcome: input.outcome,
        tags: JSON.stringify(input.tags),
        sourceName: input.sourceName,
        sourceUrl: input.sourceUrl.trim(),
        sourceType: input.sourceType,
        sourceUrlHash,
        publishedAt: input.publishedAt,
        issueId: input.issueId,
        businessModelId: input.businessModelId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return "duplicate";
    }
    throw error;
  }

  return "saved";
}
