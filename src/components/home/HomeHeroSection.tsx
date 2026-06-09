"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { AnimatedLanguage } from "./types";

type HomeHeroSectionProps = {
  language: AnimatedLanguage;
  query: string;
  onQueryChange: (value: string) => void;
  isTyping: boolean;
  isLoading: boolean;
  error: string;
  showNoResults: boolean;
};

export default function HomeHeroSection({
  language,
  query,
  onQueryChange,
  isTyping,
  isLoading,
  error,
  showNoResults,
}: HomeHeroSectionProps) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />

        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Multilingual Dictionary
        </span>
      </div>

      <div className="relative mt-8 h-[150px] sm:h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={language.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-6xl">
              <span
                className={`block transition-colors duration-500 ${language.color}`}
              >
                {language.name}
              </span>

              <span className="mt-8 block text-zinc-700">Dictionary</span>
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
        Search words, discover meanings, and improve your vocabulary with a
        clean and modern dictionary experience.
      </p>

      <div className="mt-8 rounded-[28px] border border-white/50 bg-white/80 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:mt-10 sm:p-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-[52px] w-full min-w-0 items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 shadow-sm sm:h-14 sm:flex-1 sm:px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 shrink-0 text-zinc-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
              />
            </svg>

            <input
              id="main-search"
              className="w-full min-w-0 bg-transparent text-[15px] font-medium outline-none placeholder:text-zinc-400 sm:text-base"
              placeholder="Search words, meanings, phrases..."
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </div>

          <button className="flex h-12 w-full shrink-0 items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-700 sm:h-14 sm:w-auto sm:min-w-[148px] sm:px-7">
            {(isTyping || isLoading) && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
              />
            )}

            <span>{isTyping || isLoading ? "Searching..." : "Search"}</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        {error && <p className="text-md font-bold text-red-500">{error}</p>}

        {showNoResults && (
          <p className="text-md mt-5 font-bold text-zinc-800 text-center">
            No matches found.
          </p>
        )}
      </div>
    </div>
  );
}
