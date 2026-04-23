"use client";

import { useState } from "react";

export default function AddWordPage() {
  const [form, setForm] = useState({
    word: "",
    word_en: "",
    meaning: "",
    example: "",
    language: "GARHWALI",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed");
    }

    setMessage("Submitted successfully ✅");

    setForm({
      word: "",
      word_en: "",
      meaning: "",
      example: "",
      language: "GARHWALI",
    });
  } catch (err: any) {
    setMessage(err.message || "Something went wrong ❌");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
      <div className="w-full max-w-lg px-6">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-zinc-800">Add New Word</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Expand your regional dictionary
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-zinc-200 space-y-5"
        >

          {/* Word */}
          <div>
            <label className="text-sm font-medium text-zinc-900">Word</label>
            <input
              name="word"
              value={form.word}
              onChange={handleChange}
              placeholder="Garhwali / Kumaoni / Jaunsari word"
              className="w-full mt-1 p-3 rounded-lg border text-black placeholder:text-zinc-300 border-zinc-400 focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
              required
            />
          </div>

          {/* English */}
          <div>
            <label className="text-sm font-medium text-zinc-600">Word in Hinglish</label>
            <input
              name="word_en"
              value={form.word_en}
              onChange={handleChange}
              placeholder="like सिमन्या/पैलाग as simanya/pailag"
              className="w-full mt-1 p-3 rounded-lg border text-black placeholder:text-zinc-300 border-zinc-300 focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
            />
          </div>

          {/* Meaning */}
          <div>
            <label className="text-sm font-medium text-zinc-600">Meaning</label>
            <textarea
              name="meaning"
              value={form.meaning}
              onChange={handleChange}
              placeholder="Enter meaning..."
              rows={3}
              className="w-full mt-1 p-3 rounded-lg border text-black placeholder:text-zinc-300 border-zinc-300 focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Example */}
          <div>
            <label className="text-sm font-medium text-zinc-600">Example</label>
            <textarea
              name="example"
              value={form.example}
              onChange={handleChange}
              placeholder="Example sentence..."
              rows={2}
              className="w-full mt-1 p-3 rounded-lg border text-black placeholder:text-zinc-300 border-zinc-300 focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
            />
          </div>

          {/* Language */}
          <div>
            <label className="text-sm font-medium text-zinc-600">Language</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
            >
              <option value="GARHWALI">Garhwali</option>
              <option value="KUMAONI">Kumaoni</option>
              <option value="JAUNSARI">Jaunsari</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-500 active:scale-[0.98] transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Word"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-sm text-center text-zinc-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}