import Link from "next/link";
import type { RecentWord } from "@/components/home/types";

type RecentlyAddedWordsProps = {
  recentWords: RecentWord[];
};

export default function RecentlyAddedWords({
  recentWords,
}: RecentlyAddedWordsProps) {

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Recently Added
            </span>
          </div>

          <p className="mt-2 text-zinc-600">
            Explore the latest words added to the dictionary ...
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recentWords.map((item) => (
          <Link
            key={item.word}
            href={`/word/${encodeURIComponent(item.word)}`}
            className="group rounded-[28px] border border-white/50 bg-white/75 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                {item.language}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-black text-zinc-900 transition-colors group-hover:text-blue-600">
              {item.word}
            </h3>

            <p className="mt-3 leading-7 text-zinc-600">
              {item.meaning.length > 60
                ? `${item.meaning.slice(0, 60)}...`
                : item.meaning}
            </p>

            <div className="mt-5 flex items-center text-sm font-semibold text-blue-600">
              View Details →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}