import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ShareButton from "@/components/word/ShareButton";

export default async function WordPage({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  const { word } = await params;
  const decodedWord = decodeURIComponent(word).trim();

  const result = await prisma.word.findUnique({
    where: { word: decodedWord },
  });

  if (!result) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-black text-cyan-50">
            Oops! Word Not Found
          </h1>

          <p className="mt-15 text-cyan-50 leading-7">
            The word you're looking for doesn't exist in the dictionary yet, or
            the link may be invalid.
          </p>

          <div className="mt-15 flex justify-center gap-3">
            <Link
              href="/"
              className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Search Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7fb] text-zinc-900">
      {/* bg */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[450px] w-[450px] rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      {/* main*/}
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to search
            </Link>

            <div className="hidden h-10 w-px bg-zinc-200 sm:block" />
          </div>

          {/* Add Word Button */}
          <Link
            href="/submit"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-gray-700"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              +
            </span>
            Add New Word
          </Link>
        </div>

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="transition-colors hover:text-blue-600">
            Home
          </Link>

          <span>/</span>

          <span className="font-medium text-zinc-800">{result.word}</span>
        </div>

        {/*Word card*/}
        <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/75 shadow-[0_12px_50px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

          <div className="p-5 sm:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                {/* Language */}
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                    {result.language}
                  </span>
                </div>

                {/* Word */}
                <h1 className="mt-4 break-words text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
                  {result.word}
                </h1>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-zinc-100 bg-zinc-50/80 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-blue-500" />

                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Meaning
                </h3>
              </div>

              <p className="text-[17px] leading-8 text-zinc-700">
                {result.meaning}
              </p>
            </div>

            {result.example && (
              <div className="mt-5 rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full bg-violet-500" />

                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Example
                  </h3>
                </div>

                <p className="italic leading-8 text-zinc-600">
                  “{result.example}”
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-5"></div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <ShareButton word={result.word} meaning={result.meaning} />

          <Link
            href="/submit"
            className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-100"
          >
            Add Similar Word
          </Link>
        </div>
      </div>
    </div>
  );
}
