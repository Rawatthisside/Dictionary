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
    alert(data.error); // show duplicate warning
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
  <div className="mt-4 flex gap-3">
    <button
      onClick={approve}
      className="flex-1 px-4 py-2 rounded-lg cursor-pointer bg-green-600 text-white text-sm font-medium 
      hover:bg-green-700 active:scale-95 transition-all duration-150 shadow-sm"
    >
       Approve
    </button>

    <button
      onClick={reject}
      className="flex-1 px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white text-sm font-medium 
      hover:bg-red-700 active:scale-95 transition-all duration-150 shadow-sm"
    >
       Reject
    </button>
  </div>
);
}