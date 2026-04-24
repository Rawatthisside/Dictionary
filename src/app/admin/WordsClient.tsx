"use client";

import { useEffect, useState } from "react";

export default function WordsClient() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const res = await fetch(
      `/api/admin/words?q=${query}&lang=${lang}&page=${page}`
    );
    const json = await res.json();

    setData(json.words);
    setTotalPages(json.totalPages);
  };

  useEffect(() => {
    const delay = setTimeout(fetchData, 300); // debounce
    return () => clearTimeout(delay);
  }, [query, lang, page]);

return (
  <div>
    {/* 🔍 Search + Filter */}
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        placeholder="Search..."
        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-black bg-zinc-100 rounded text-black placeholder:text-gray-500 font-medium focus:outline-none focus:ring-1 focus:ring-black"
      />

      <select
        value={lang}
        onChange={(e) => {
          setLang(e.target.value);
          setPage(1);
        }}
        className="w-full sm:w-auto p-2 sm:p-3 text-sm sm:text-base text-black border border-black bg-zinc-100 rounded font-medium"
      >
        <option value="">Select Language</option>
        <option value="GARHWALI">Garhwali</option>
        <option value="KUMAONI">Kumaoni</option>
        <option value="JAUNSARI">Jaunsari</option>
      </select>
    </div>

    {/* 📚 Results */}
    <div className="space-y-3 sm:space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="p-3 sm:p-4 bg-white border rounded"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <h2 className="font-semibold text-black text-sm sm:text-base">
              {item.word}
            </h2>
            <span className="text-blue-600 text-xs sm:text-sm">
              {item.language}
            </span>
          </div>

          <p className="text-gray-600 text-sm sm:text-base mt-1">
            {item.meaning}
          </p>

          {item.example && (
            <p className="text-xs sm:text-sm italic text-gray-500 mt-1">
              {item.example}
            </p>
          )}
        </div>
      ))}
    </div>

    {/* 📄 Pagination */}
    <div className="flex items-center justify-between mt-4 sm:mt-6 gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base bg-black text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-xs sm:text-sm px-2 sm:px-4 py-2 bg-black text-white rounded text-center">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base bg-black text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
);
}