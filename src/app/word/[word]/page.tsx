import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function WordPage({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  const { word } = await params;
  const decodedWord = decodeURIComponent(word);

  const result = await prisma.word.findUnique({
    where: { word: decodedWord },
  });

  if (!result) {
    return <div className="p-10">Word not found</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* 🔙 Back button */}
        <Link
          href="/"
          className="inline-block mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Back to search
        </Link>

        {/* 🍞 Breadcrumbs */}
        <div className="mb-4 text-sm text-zinc-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800 font-medium">
            {result.word}
          </span>
        </div>

        {/* 📦 Word Card */}
        <div className="p-6 rounded-xl bg-white shadow-sm border border-zinc-200">

          <h1 className="text-3xl font-bold text-zinc-900">
            {result.word}
          </h1>

          <p className="mt-4 text-lg text-zinc-700">
            {result.meaning}
          </p>

          {result.example && (
            <p className="mt-4 text-sm text-zinc-500 italic">
              “{result.example}”
            </p>
          )}

          <span className="inline-block mt-5 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded">
            {result.language}
          </span>

        </div>
      </div>
    </div>
  );
}