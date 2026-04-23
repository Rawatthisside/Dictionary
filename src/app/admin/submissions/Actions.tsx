"use client";

export default function ApproveRejectButtons({ id }: { id: number }) {
 const approve = async () => {
  const res = await fetch("/api/admin/approve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error); // 🔥 show duplicate warning
    return;
  }

  location.reload();
};

  const reject = async () => {
 await fetch("/api/admin/reject", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id }),
});

    location.reload();
  };

  return (
    <div className="mt-3 flex gap-2">
      <button
        onClick={approve}
        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
      >
        Approve
      </button>

      <button
        onClick={reject}
        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
      >
        Reject
      </button>
    </div>
  );
}