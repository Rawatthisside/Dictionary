import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/app/navbar";
import Footer from "@/app/footer";

export const metadata: Metadata = {
  title: "Devasthali Dictionary",
  description:
    "Search words and meanings of garhwali, kumaoni, and jaunsari language instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-[#f4f7fb] text-zinc-900 antialiased">
        {/* Main Wrapper */}
        <div className="relative flex min-h-screen flex-col">
          {/* Global Background */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-3xl" />
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
