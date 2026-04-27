"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type SearchResult = {
  id: number;
  word: string;
  meaning: string;
  example?: string;
  language: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordOfDay, setWordOfDay] = useState<any>(null);

  const activeRequestRef = useRef<AbortController | null>(null);

  //  Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  //  Actual API call
  useEffect(() => {
    const search = async () => {
      setError("");

      activeRequestRef.current?.abort();

      if (!debouncedQuery) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const controller = new AbortController();
      activeRequestRef.current = controller;
      setIsLoading(true);

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error("Search failed");

        const data: SearchResult[] = await res.json();
        setResults(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setResults([]);
        setError("Something went wrong while searching.");
      } finally {
        if (activeRequestRef.current === controller) {
          setIsLoading(false);
        }
      }
    };

    search();
  }, [debouncedQuery]);

  // word of the day

  useEffect(() => {
  const fetchWord = async () => {
    const res = await fetch("/api/word-of-day");
    const data = await res.json();
    setWordOfDay(data);
  };

  fetchWord();
}, []);

return (
  <div className="min-h-screen bg-zinc-100 relative overflow-hidden">

    <div className="absolute top-0 left-0 w-full h-70 z-0 overflow-hidden pointer-events-none">
      <div className="animate-scrollWords">
        <img
          src="/dictionarybg.png"
          alt="dictionary-bg"
          className="w-[200%] max-w-none"
        />
      </div>
    </div>

    {/* Yellow Background */}
    <img
      src="/yellowbg.png"
      alt="bg"
      className="absolute top-60 left-0 w-full z-0 rotate-180"
    />

    {/* Main Content */}
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="text-center mt-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-blue-700 tracking-tight">
          गढ़वाली Dictionary
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mt-40 flex items-center bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden">

        <input
          className="flex-1 px-5 py-3 sm:py-2 text-base font-bold placeholder:text-zinc-500 sm:text-lg outline-none"
          placeholder="Search a word or phrase"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold px-6 py-3 sm:py-4">
          Search
        </button>
      </div>

      {/*  Word of the Day */}
      {wordOfDay && (
        <div className="mt-20 bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 sm:p-8">

          <p className="text-sm text-zinc-500 mb-1">
            Word of the Day
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700">
            {wordOfDay.word}
          </h2>

          <p className="text-zinc-600 mt-2 text-sm sm:text-base">
            {wordOfDay.meaning}
          </p>

          {wordOfDay.example && (
            <p className="mt-3 text-sm italic text-zinc-500 border-l-2 pl-3">
              “{wordOfDay.example}”
            </p>
          )}

          <span className="inline-block mt-4 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {wordOfDay.language}
          </span>

        </div>
      )}

      {/* Messages */}
      <div className="mt-4 text-center">
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!isLoading && !error && query && results.length === 0 && (
          <p className="text-sm text-zinc-500">No matches found</p>
        )}
      </div>

      {/* Results */}
      <div className="mt-8 space-y-4">
        {results.map((item) => (
          <Link key={item.id} href={`/word/${item.word}`}>
            <div className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition cursor-pointer">

              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
                  {item.word}
                </h2>

                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {item.language}
                </span>
              </div>

              <p className="mt-2 text-zinc-700">
                {item.meaning}
              </p>

              {item.example && (
                <p className="mt-2 text-sm italic text-zinc-500">
                  “{item.example}”
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

    </div>
  </div>
);

}