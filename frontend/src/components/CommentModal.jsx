
import { useState } from "react";
import { X } from "lucide-react";

export default function CommentModal({
  open,
  onClose,
  comments,
  onAdd,
}) {
  const [t, setT] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-5">

        {/* Header */}
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">
            Comments
          </h3>

          <button
            onClick={onClose}
            className="cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* Comments List */}
        <div className="my-4 max-h-64 space-y-2 overflow-auto">
          {comments.map((c) => (
            <div
              key={c._id}
              className="rounded-xl bg-neutral-100 p-3"
            >
              <b>{c.user?.name || "User"}</b>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="flex gap-2">
          <input
            value={t}
            onChange={(e) => setT(e.target.value)}
            className="flex-1 rounded-xl border px-3"
            placeholder="Write a comment"
          />

          <button
            onClick={() => {
              if (t.trim()) {
                onAdd(t);
                setT("");
              }
            }}
            className="cursor-pointer rounded-xl bg-orange-500 px-4 text-white"
          >
            Post
          </button>
        </div>

      </div>
    </div>
  );
}
