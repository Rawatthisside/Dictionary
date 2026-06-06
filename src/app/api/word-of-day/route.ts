import { NextResponse } from "next/server";

import { getWordOfDay } from "@/lib/word-of-day";

export async function GET() {
  const word = await getWordOfDay();

  return NextResponse.json(word);
}