"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { SearchResult } from "./types";

type SearchResultsSectionProps = {
  results: SearchResult[];
};

export default function SearchResultsSection({
  results,
}: SearchResultsSectionProps) {
  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">Search Results</p>

          <h2 className="mt-2 text-4xl font-black tracking-tight text-zinc-900">
            Found Words
          </h2>
        </div>

        <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm sm:block">
          {results.length} results
        </div>
      </div>

    <div className="grid gap-6 md:grid-cols-2">
  {results.map((item) => (
    <Link key={item.id} href={`/word/${item.word}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative overflow-hidden rounded-[30px] border border-white/40 bg-white/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]"
      >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/40 to-violet-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-zinc-900 transition-colors group-hover:text-blue-700">
              {item.word}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              View meaning and examples
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
            {item.language}
          </span>
        </div>

        <div className="relative z-10 mt-5 flex items-center justify-end">
          <span className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3">
            Explore word
            <span>→</span>
          </span>
        </div>
      </motion.div>
    </Link>
  ))}
</div>
    </section>
  );
}