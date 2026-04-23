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

  // 🔥 Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // 🔥 Actual API call
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
   <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100">
    <img src="/dictionarybg.png" alt="Background" className="fixed inset-0 w-full h-[50%] pointer-events-none" />
  <div className="max-w-2xl mx-auto px-6 py-16">

    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
        Dictionary
      </h1>
      <p className="text-zinc-500 mt-2">
        Explore words across languages
      </p>
    </div>

    {/* Search Box */}
    <div className="relative">
      <input
        className="w-full p-4 rounded-xl border border-zinc-200 shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        placeholder="Search words..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && (
        <span className="absolute right-4 top-4 text-sm text-zinc-900">
          Searching...
        </span>
      )}
    </div>
{wordOfDay && (
  <div className="mt-8 p-5 rounded-xl bg-white border border-zinc-200 shadow-sm">
    
    <p className="text-xs text-blue-600 mb-1 font-medium">
      Word of the Day
    </p>

    <h2 className="text-2xl font-bold text-zinc-900">
      {wordOfDay.word}
    </h2>

    <p className="text-zinc-700 mt-1">
      {wordOfDay.meaning}
    </p>

    {wordOfDay.example && (
      <p className="text-sm text-zinc-500 italic mt-2">
        “{wordOfDay.example}”
      </p>
    )}

    <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
      {wordOfDay.language}
    </span>
  </div>
)}
    {/* Messages */}
    <div className="mt-4">
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!isLoading && !error && query && results.length === 0 && (
        <p className="text-sm text-zinc-500">No matches found</p>
      )}
    </div>

    {/* Results */}
    <div className="mt-6 space-y-4">
      {results.map((item) => (
        <Link key={item.id} href={`/word/${item.word}`}>
          <div className="p-5 rounded-xl bg-white shadow-sm border border-zinc-200 hover:shadow-md transition cursor-pointer">

            {/* Top row */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-zinc-900">
                {item.word}
              </h2>

              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {item.language}
              </span>
            </div>

            {/* Meaning */}
            <p className="mt-2 text-zinc-700">
              {item.meaning}
            </p>

            {/* Example */}
            {item.example && (
              <p className="mt-3 text-sm text-zinc-500 italic">
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