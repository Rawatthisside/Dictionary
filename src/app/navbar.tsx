"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const focusSearch = () => {
    const element = document.getElementById("main-search");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        (element as HTMLInputElement).focus();
      }, 400);
    }

    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/30 bg-white/80 shadow-lg backdrop-blur-xl"
          : "border-b border-zinc-200 bg-white shadow-sm backdrop-blur"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between gap-3 transition-all duration-300 ${
            isScrolled ? "min-h-16 py-1" : "min-h-20 py-1"
          }`}
        >
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 sm:gap-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className={`flex shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                isScrolled
                  ? "h-14 w-14 sm:h-14 sm:w-14"
                  : "h-20 w-20 sm:h-16 sm:w-16"
              }`}
            >
              <img
                src="/Logo.svg"
                alt="Logo"
                className={`object-contain transition-all duration-300 ${
                  isScrolled
                    ? "h-12 w-12 sm:h-14 sm:w-14"
                    : "h-14 w-14 sm:h-16 sm:w-16"
                }`}
              />
            </div>

            <div className="min-w-0 leading-none">
              <h2
                className={`truncate font-black tracking-tight text-zinc-800 transition-all duration-300 ${
                  isScrolled ? "text-base sm:text-lg" : "text-lg sm:text-[20px]"
                }`}
              >
                Devasthali
              </h2>

              <p className="mt-1 text-sm text-zinc-600 sm:text-[15px]">
                Dictionary
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              onClick={focusSearch}
              className="flex h-11 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 text-sm font-medium text-zinc-500 transition-all hover:bg-zinc-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                />
              </svg>
              Search words...
            </button>

            <Link
              href="/"
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900"
            >
              Home
            </Link>

            <Link
              href="/submit"
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900"
            >
              Add Word
            </Link>

            <div className="h-6 w-px bg-zinc-200" />

            <a
              href="https://www.youtube.com/@TeamDevasthali"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-semibold text-white transition-all hover:bg-gray-700"
            >
              Explore Devasthali Website
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={focusSearch}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition-all hover:bg-zinc-100"
              aria-label="Focus search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                />
              </svg>
            </button>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition-all hover:bg-zinc-100"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMenuOpen
                      ? "M6 18 18 6M6 6l12 12"
                      : "M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-zinc-200 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="rounded-2xl px-4 py-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/submit"
                className="rounded-2xl px-4 py-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Word
              </Link>

              <a
                href="https://www.youtube.com/@TeamDevasthali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-semibold text-white transition-all hover:bg-gray-700"
              >
                Explore Devasthali Website
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
