import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const count = await prisma.word.count();

  if (count === 0) {
    return NextResponse.json(null);
  }

  // 👇 Get today's number
  const today = new Date();
  const dayNumber = Math.floor(
    (today.getTime() / (1000 * 60 * 60 * 24))
  );

  // 👇 Cycle through all words
  const index = dayNumber % count;

  const word = await prisma.word.findFirst({
    skip: index,
  });

  return NextResponse.json(word);
}