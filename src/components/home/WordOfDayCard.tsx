import type { WordOfDay } from "./types";

type WordOfDayCardProps = {
  wordOfDay: WordOfDay | null;
};

export default function WordOfDayCard({ wordOfDay }: WordOfDayCardProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[40px] bg-blue-100 opacity-40 blur-3xl" />

      <div className="relative overflow-hidden rounded-[36px] border border-white/50 bg-white/75 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-zinc-500">Word of the Day</p>

            <h2 className="mt-2 truncate text-4xl font-black tracking-tight text-zinc-900">
              {wordOfDay?.word ?? "Loading..."}
            </h2>
          </div>

          <span className="shrink-0 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
            {wordOfDay?.language ?? "Daily pick"}
          </span>
        </div>

        <div className="my-7 h-px w-full bg-zinc-200" />

        <p className="text-lg leading-8 text-zinc-700">
          {wordOfDay?.meaning ?? "Fetching today's highlighted word."}
        </p>

        {wordOfDay?.example && (
          <div className="mt-7 rounded-2xl bg-zinc-50 p-5">
            <p className="italic leading-7 text-zinc-500">
              &ldquo;{wordOfDay.example}&rdquo;
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Updated daily
          </div>

        </div>
      </div>
    </div>
  );
}
