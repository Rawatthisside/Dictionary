import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#09090b] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-black shadow-2xl">
                <span className="text-xl font-black text-white">D</span>
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Devasthali
                </h2>

                <p className="text-sm text-zinc-400">
                  Modern Dictionary Platform
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 sm:text-[15px] sm:leading-8">
              Discover meanings, improve vocabulary and explore multiple
              languages through a clean modern dictionary experience built for
              everyday learning.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/submit"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-blue-500 hover:text-white"
              >
                Add New Word
              </Link>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:border-blue-500 hover:bg-blue-500/10"
              >
                Explore Platform
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {/* Navigation */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
                Navigation
              </h3>

              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-sm text-zinc-300 transition-colors hover:text-blue-400"
                >
                  Home
                </Link>

                <Link
                  href="/submit"
                  className="text-sm text-zinc-300 transition-colors hover:text-blue-400"
                >
                  Add Word
                </Link>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 transition-colors hover:text-blue-400"
                >
                  Explore
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
                Platform
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Words
                  </p>

                  <h4 className="mt-2 text-3xl font-black text-white">....</h4>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Languages
                  </p>

                  <h4 className="mt-2 text-3xl font-black text-white">3</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-white/10" />

        {/* bottom */}
        <div className="flex flex-col gap-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-zinc-500">
            © 2026 Devasthali. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 sm:justify-end">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Expand your vocabulary every day
          </div>
        </div>
      </div>
    </footer>
  );
}
