import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") || "").trim();

  if (!query) return NextResponse.json([]);

  try {
    const results = await prisma.word.findMany({
      where: {
        OR: [
          { word: { contains: query, mode: "insensitive" } },
          { word_en: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        word: "asc",
      },
      take: 10,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search request failed:", error);
    return NextResponse.json(
      { message: "Unable to search right now." },
      { status: 500 }
    );
  }
}
