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
              className="group rounded-[30px] border border-white/40 bg-white/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-900">
                    {item.word}
                  </h3>

                  <p className="mt-4 leading-8 text-zinc-600">
                    {item.meaning}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
                  {item.language}
                </span>
              </div>

              {item.example && (
                <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
                  <p className="italic text-zinc-500">
                    &ldquo;{item.example}&rdquo;
                  </p>
                </div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}