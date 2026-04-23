import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { word, word_en, meaning, example, language } = body;

  if (!word || !meaning) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  await prisma.submission.create({
    data: {
      word,
      word_en,
      meaning,
      example,
      language,
    },
  });

  return NextResponse.json({ success: true });
}