"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import FloatingWebsiteCTA from "@/components/home/FloatingWebsiteCTA";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import SearchResultsSection from "@/components/home/SearchResultsSection";
import WordOfDayCard from "@/components/home/WordOfDayCard";
import { HOME_LANGUAGES } from "@/components/home/constants";
import type { SearchResult, WordOfDay } from "@/components/home/types";

import MonthsCard from "@/app/month";
import WeekdaysCard from "@/app/week";

type HomeClientProps = {
  wordOfDay: WordOfDay | null;
};

export default function HomeClient({ wordOfDay }: HomeClientProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [languageIndex, setLanguageIndex] = useState(0);

  const activeRequestRef = useRef<AbortController | null>(null);

  const trimmedQuery = query.trim();
  const isTyping = Boolean(trimmedQuery) && trimmedQuery !== debouncedQuery;

  const showNoResults =
    !isLoading &&
    !isTyping &&
    !error &&
    Boolean(trimmedQuery) &&
    results.length === 0;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLanguageIndex(
        (current) => (current + 1) % HOME_LANGUAGES.length
      );
    }, 2500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, trimmedQuery ? 2000 : 0);

    return () => window.clearTimeout(timer);
  }, [trimmedQuery]);

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

        if (!res.ok) {
          throw new Error("Search failed");
        }

        const data: SearchResult[] = await res.json();
        setResults(data);
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          return;
        }

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7fb] text-zinc-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-3xl" />

        <Image
          src="/dictionarybg.png"
          alt="Background"
          fill
          priority
          className="object-cover opacity-[0.03]"
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <HomeHeroSection
            language={HOME_LANGUAGES[languageIndex]}
            query={query}
            onQueryChange={setQuery}
            isTyping={isTyping}
            isLoading={isLoading}
            error={error}
            showNoResults={showNoResults}
          />

          <WordOfDayCard wordOfDay={wordOfDay} />
        </div>

        <FloatingWebsiteCTA />

        {results.length > 0 && (
          <SearchResultsSection results={results} />
        )}

        <section className="mt-20">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <MonthsCard />
            </div>

            <div className="lg:col-span-6">
              <WeekdaysCard />
            </div>
          </div>

          <div className="mt-8 flex justify-end sm:hidden">
            <FloatingWebsiteCTA mobileInline />
          </div>
        </section>
      </main>
    </div>
  );
}