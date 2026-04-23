import WordsClient from "./WordsClient";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-6 text-black">
          All Words
        </h1>

        <WordsClient />

      </div>
    </div>
  );
}