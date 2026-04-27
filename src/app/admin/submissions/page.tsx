import { prisma } from "@/lib/prisma";
import ApproveRejectButtons from "./Actions";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-900">
        Pending Submissions
      </h1>

      <div className="space-y-4 sm:space-y-5">
        {submissions.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 tracking-tight">
                {item.word}
              </h2>

              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
                {item.language}
              </span>
            </div>

            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              {item.meaning}
            </p>

            {item.example && (
              <p className="mt-2 text-md sm:text-sm italic text-zinc-600 border-l-2 border-zinc-200 pl-3">
                “{item.example}”
              </p>
            )}

            <div className="mt-3">
              <ApproveRejectButtons id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
