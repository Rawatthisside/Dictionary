import { prisma } from "@/lib/prisma";
import ApproveRejectButtons from "./Actions";

export default async function SubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Pending Submissions</h1>

      <div className="space-y-4">
        {submissions.map((item) => (
          <div key={item.id} className="p-4 border rounded bg-white">
            
            <h2 className="font-semibold">{item.word}</h2>
            <p className="text-sm">{item.meaning}</p>

            {item.example && (
              <p className="text-xs italic text-gray-500">
                {item.example}
              </p>
            )}

            <p className="text-xs text-blue-600 mt-1">
              {item.language}
            </p>

            {/* 🔥 Actions */}
            <ApproveRejectButtons id={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}