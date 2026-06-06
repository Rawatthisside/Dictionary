import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const getWordOfDay = unstable_cache(
  async () => {
    const count = await prisma.word.count();

    if (count === 0) {
      return null;
    }

    const dayNumber = Math.floor(
      Date.now() / MILLISECONDS_PER_DAY
    );

    return prisma.word.findFirst({
      skip: dayNumber % count,
      select: {
        word: true,
        meaning: true,
        example: true,
        language: true,
      },
    });
  },
  ["word-of-day"],
  {
    revalidate: 86400,
  }
);