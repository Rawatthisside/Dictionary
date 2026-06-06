"use client";

import Image from "next/image";

type FloatingWebsiteCTAProps = {
  mobileInline?: boolean;
};

export default function FloatingWebsiteCTA({
  mobileInline = false,
}: FloatingWebsiteCTAProps) {
  const wrapperClassName = mobileInline
    ? "w-[min(280px,calc(100vw-1.5rem))] sm:hidden"
    : "hidden sm:block sm:fixed sm:bottom-6 sm:right-6 sm:z-[100] sm:w-auto";

  return (
    <div className={wrapperClassName}>
      <a
        href="https://www.youtube.com/@TeamDevasthali"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full items-center justify-between gap-2.5 overflow-hidden rounded-[24px] border border-white/75 bg-white/88 px-3 py-2.5 shadow-[0_16px_36px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(37,99,235,0.18)] sm:min-w-[240px] sm:gap-3 sm:px-3.5 sm:py-3"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-emerald-50 opacity-80 transition duration-300 group-hover:opacity-100" />

        <div className="relative flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-zinc-900 shadow-[0_10px_20px_rgba(15,23,42,0.18)] sm:h-11 sm:w-11">
            <Image
              src="/Logo.svg"
              alt="Devasthali logo"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-blue-600 sm:text-[10px] sm:tracking-[0.26em]">
              Explore
            </p>

            <h3 className="truncate text-[13px] font-semibold text-zinc-900 sm:text-sm">
              Devasthali
            </h3>

            <p className="truncate text-[11px] text-zinc-500">
              Official channel
            </p>
          </div>
        </div>

        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white/85 text-zinc-700 transition duration-300 group-hover:border-blue-200 group-hover:text-blue-600 sm:h-9 sm:w-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 sm:h-5 sm:w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </a>
    </div>
  );
}