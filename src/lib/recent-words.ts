import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getRecentWords = unstable_cache(
  async () => {
    return prisma.word.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      select: {
        word: true,
        meaning: true,
        language: true,
      },
    });
  },
  ["recent-words"],
  {
    revalidate: 86400,
  },
);