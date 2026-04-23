import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const submission = await prisma.submission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // 🔍 Check duplicate
   const exists = await prisma.word.findFirst({
  where: {
    word: {
      equals: submission.word,
      mode: "insensitive",
    },
  },
});

    if (exists) {
      // ❌ Duplicate found
      return NextResponse.json(
        { error: "Word already exists" },
        { status: 400 }
      );
    }

    // ✅ Create new word
    await prisma.word.create({
      data: {
        word: submission.word,
        word_en: submission.word_en,
        meaning: submission.meaning,
        example: submission.example,
        language: submission.language,
      },
    });

    // 🧹 Remove from submissions
    await prisma.submission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}