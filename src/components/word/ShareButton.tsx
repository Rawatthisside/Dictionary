// src/components/word/ShareButton.tsx

"use client";

import { toast } from "sonner";

export default function ShareButton({
  word,
  meaning,
}: {
  word: string;
  meaning: string;
}) {
  const handleShare = async () => {
    try {
      const shareData = {
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      toast.error("Failed to share link");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-100"
    >
      Share
    </button>
  );
}
