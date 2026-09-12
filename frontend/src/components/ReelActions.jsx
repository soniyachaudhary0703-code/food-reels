
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  ShoppingCart,
} from "lucide-react";

export default function ReelActions(p) {
  return (
    <div className="flex flex-col gap-3">

      {/* Like */}
      <button
        onClick={p.onLike}
        className={`cursor-pointer rounded-full p-3 transition hover:scale-105 ${
          p.liked
            ? "bg-red-500 text-white"
            : "bg-white/90"
        }`}
        title="Like"
      >
        <Heart
          fill={p.liked ? "currentColor" : "none"}
        />
      </button>

      {/* Comment */}
      <button
        onClick={p.onComment}
        className="cursor-pointer rounded-full bg-white/90 p-3 transition hover:scale-105"
        title="Comment"
      >
        <MessageCircle />
      </button>

      {/* Save */}
      <button
        onClick={p.onSave}
        className={`cursor-pointer rounded-full p-3 transition hover:scale-105 ${
          p.saved
            ? "bg-orange-500 text-white"
            : "bg-white/90"
        }`}
        title="Save"
      >
        <Bookmark
          fill={p.saved ? "currentColor" : "none"}
        />
      </button>

      {/* Share */}
      <button
        onClick={p.onShare}
        className="cursor-pointer rounded-full bg-white/90 p-3 transition hover:scale-105"
        title="Share"
      >
        <Share2 />
      </button>

      {/* Mute / Unmute */}
      <button
        onClick={p.onMute}
        className="cursor-pointer rounded-full bg-white/90 p-3 transition hover:scale-105"
        title={p.muted ? "Unmute" : "Mute"}
      >
        {p.muted ? <VolumeX /> : <Volume2 />}
      </button>

      {/* Add to Cart */}
      <button
        onClick={p.onOrder}
        className="cursor-pointer rounded-full bg-orange-500 p-3 text-white transition hover:scale-105 hover:bg-orange-600"
        title="Add to Cart"
      >
        <ShoppingCart />
      </button>

    </div>
  );
}
