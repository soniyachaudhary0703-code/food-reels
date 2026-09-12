
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import ReelActions from "./ReelActions";
import CommentModal from "./CommentModal";

export default function ReelCard({ reel }) {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const { addToCart } = useCart();

  // Autoplay when reel enters viewport
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setPlaying(true))
            .catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      {
        threshold: 0.7,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // Play / Pause
  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  // Like
  const handleLike = async () => {
    if (!user) {
      return toast("Login first");
    }

    try {
      const { data } = await api.post(
        `/reels/${reel._id}/like`
      );

      setLiked(data.liked);
    } catch {
      toast.error("Like failed");
    }
  };

  // Get comments
  const getComments = async () => {
    try {
      const { data } = await api.get(
        `/comments/${reel._id}`
      );

      setComments(data);
      setOpen(true);
    } catch {
      toast.error("Could not load comments");
    }
  };

  // Add comment
  const addComment = async (text) => {
    try {
      const { data } = await api.post(
        `/comments/${reel._id}`,
        { text }
      );

      setComments((current) => [...current, data]);
    } catch {
      toast.error("Login required");
    }
  };

  // Share
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: reel.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard?.writeText(
          window.location.href
        );

        toast.success("Link copied");
      }
    } catch {
      // User cancelled share
    }
  };

  // Add to cart
  const handleOrder = () => {
    addToCart(reel);
    toast.success("Added to cart");
  };

  return (
    <div className="reel-item relative mx-auto h-[calc(100vh-80px)] w-full max-w-md overflow-hidden rounded-4xl bg-black shadow-2xl sm:h-[calc(100vh-90px)]">

      {/* Food Video */}
      <video
        ref={videoRef}
        src={reel.video}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full cursor-pointer object-cover"
        onError={() =>
          toast.error(`Video missing: ${reel.video}`)
        }
        onClick={togglePlay}
      />

      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      {/* Reel Information */}
      <div className="absolute bottom-6 left-4 right-20 text-white sm:left-5 sm:right-24">
        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold">
          {reel.category}
        </span>

        <h2 className="mt-3 text-xl font-black sm:text-2xl">
          {reel.title}
        </h2>

        <p className="text-sm text-white/80">
          {reel.description}
        </p>

        <p className="mt-2 text-lg font-bold">
          ₹{reel.price}
        </p>
      </div>

      {/* Reel Actions */}
      <div className="absolute bottom-8 right-3 sm:right-4">
        <ReelActions
          liked={liked}
          saved={saved}
          muted={muted}
          onLike={handleLike}
          onSave={() => setSaved((value) => !value)}
          onComment={getComments}
          onShare={handleShare}
          onMute={() => setMuted((value) => !value)}
          onOrder={handleOrder}
        />
      </div>

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="absolute left-3 top-3 cursor-pointer rounded-full bg-white/90 p-3 transition hover:scale-105 sm:left-4 sm:top-4"
        title={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause /> : <Play />}
      </button>

      {/* Comments */}
      <CommentModal
        open={open}
        onClose={() => setOpen(false)}
        comments={comments}
        onAdd={addComment}
      />
    </div>
  );
}
