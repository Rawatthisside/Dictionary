import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const lang = searchParams.get("lang") || "";
  const page = Number(searchParams.get("page") || "1");

  const limit = 10;
  const skip = (page - 1) * limit;

  // ✅ Build where safely
  const where: any = {};

  if (q) {
    where.OR = [
      {
        word: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        meaning: {
          contains: q,
          mode: "insensitive",
        },
      },
    ];
  }

  if (lang) {
    where.language = lang;
  }

  const [words, total] = await Promise.all([
    prisma.word.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.word.count({ where }),
  ]);

  return NextResponse.json({
    words,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}