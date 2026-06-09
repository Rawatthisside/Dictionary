"use client";

import { useState } from "react";

const weekdays = [
  {
    english: "Monday",
    garhwali: "सोमवार",
    kumaoni: "सोमवार",
    jaunsari: "सोमवार",
  },
  {
    english: "Tuesday",
    garhwali: "मंगलवार",
    kumaoni: "मंगलवार",
    jaunsari: "मंगलवार",
  },
  {
    english: "Wednesday",
    garhwali: "बुधवार",
    kumaoni: "बुधवार",
    jaunsari: "बुधवार",
  },
  {
    english: "Thursday",
    garhwali: "गुरुवार",
    kumaoni: "गुरुवार",
    jaunsari: "गुरुवार",
  },
  {
    english: "Friday",
    garhwali: "शुक्रवार",
    kumaoni: "शुक्रवार",
    jaunsari: "शुक्रवार",
  },
  {
    english: "Saturday",
    garhwali: "शनिवार",
    kumaoni: "शनिवार",
    jaunsari: "शनिवार",
  },
  {
    english: "Sunday",
    garhwali: "रविवार",
    kumaoni: "रविवार",
    jaunsari: "रविवार",
  },
];

type Language = "garhwali" | "kumaoni" | "jaunsari";

export default function WeekdaysCard() {
  const [language, setLanguage] = useState<Language>("garhwali");

  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleDay = (index: number) => {
    setExpandedDay((current) => (current === index ? null : index));
  };

  return (
    <section className="h-md rounded-[28px] border border-white/50 bg-white/75 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl">
      <div className="mb-5">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700">
          Learn
        </span>

        <div className="mt-3">
          <h2 className="text-2xl font-black text-zinc-900">Week Days</h2>

          {/* Language switch*/}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-zinc-100 p-2">
            <button
              onClick={() => setLanguage("garhwali")}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                language === "garhwali"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-zinc-600"
              }`}
            >
              Garhwali
            </button>

            <button
              onClick={() => setLanguage("kumaoni")}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                language === "kumaoni"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-zinc-600"
              }`}
            >
              Kumaoni
            </button>

            <button
              onClick={() => setLanguage("jaunsari")}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                language === "jaunsari"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-zinc-600"
              }`}
            >
              Jaunsari
            </button>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {weekdays.map((day, index) => (
          <div
            key={day.english}
            className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-all duration-100 ease-out hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
          >
            <button
              type="button"
              onClick={() => toggleDay(index)}
              aria-expanded={expandedDay === index}
              className="flex w-full items-center justify-between p-3 text-left transition-colors duration-300 ease-out group-hover:bg-zinc-50/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                  {index + 1}
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900">
                    {language === "garhwali" && day.garhwali}
                    {language === "kumaoni" && day.kumaoni}
                    {language === "jaunsari" && day.jaunsari}
                  </span>

                  <span className="text-xs text-zinc-400 capitalize">
                    {language}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-zinc-700">
                  {day.english}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${
                    expandedDay === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>

            {/* Expandable Content */}
            <div
              className={`overflow-hidden border-t bg-zinc-50 px-4 transition-all duration-300 ease-out ${
                expandedDay === index
                  ? "max-h-40 border-zinc-100"
                  : "max-h-0 border-transparent"
              }`}
            >
              <div className="space-y-2 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Garhwali</span>
                  <span>{day.garhwali}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Kumaoni</span>
                  <span>{day.kumaoni}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Jaunsari</span>
                  <span>{day.jaunsari}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
