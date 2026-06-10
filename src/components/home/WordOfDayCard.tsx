import type { WordOfDay } from "./types";

type WordOfDayCardProps = {
  wordOfDay: WordOfDay | null;
};

export default function WordOfDayCard({
  wordOfDay,
}: WordOfDayCardProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[40px] bg-blue-200/40 blur-3xl" />

      <div className="relative overflow-hidden rounded-[36px] border border-white/50 bg-white/75 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-300 via-indigo-500 to-violet-200" />

        <div className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-500">
                Word of the Day
              </p>

              <h2 className="mt-3 break-words text-4xl font-black tracking-tight text-zinc-900">
                {wordOfDay?.word ?? "Loading..."}
              </h2>
            </div>

            <div className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  {wordOfDay?.language ?? "Daily Pick"}
                </span>
              </div>
            </div>
          </div>

          {/* Meaning */}
          <div className="mt-8 rounded-[24px] border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-blue-500" />

              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                Meaning
              </h3>
            </div>

            <p className="text-[17px] leading-8 text-zinc-700">
              {wordOfDay?.meaning ??
                "Fetching today's highlighted word."}
            </p>
          </div>

          {/* Example */}
          {wordOfDay?.example && (
            <div className="mt-5 rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-violet-500" />

                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Example
                </h3>
              </div>

              <p className="italic leading-8 text-zinc-600">
                “{wordOfDay.example}”
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Updated daily
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}