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
      <div className="flex gap-3 mb-6">
        <input
  value={query}
  onChange={(e) => {
    setQuery(e.target.value);
    setPage(1);
  }}
  placeholder="Search..."
  className="flex-1 p-3 border border-black bg-zinc-100 rounded 
  text-black placeholder:text-gray-500 font-medium 
  focus:outline-none focus:ring-1 focus:ring-black"
/>

        <select
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            setPage(1);
          }}
          className="p-3 text-black border placeholder:text-gray-700 font-medium border-black bg-zinc-100 rounded"
        >
          <option value="">Select Language</option>
          <option value="GARHWALI">Garhwali</option>
          <option value="KUMAONI">Kumaoni</option>
          <option value="JAUNSARI">Jaunsari</option>
        </select>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 bg-white border rounded">
            <div className="flex justify-between">
              <h2 className="font-semibold text-black">{item.word}</h2>
              <span className="text-blue-600">{item.language}</span>
            </div>

            <p className="text-gray-600">{item.meaning}</p>

            {item.example && (
              <p className="text-sm italic text-gray-500">
                {item.example}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 bg-black text-white rounded disabled:opacity-50">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}