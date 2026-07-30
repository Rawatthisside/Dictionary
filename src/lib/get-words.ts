import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getWord = (word: string) =>
  unstable_cache(
    async () => {
      return prisma.word.findUnique({
        where: { word },
      });
    },
    ["word-lookup"],
    {
      revalidate: 86400, // Cache for 24 hrs
      tags: [`word-${word}`], 
    },
  )();
