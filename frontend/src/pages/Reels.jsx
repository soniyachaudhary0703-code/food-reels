
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import ReelCard from "../components/ReelCard";

export default function Reels() {
  const { category = "all" } = useParams();

  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadReels = async () => {
      setLoading(true);
      setError("");

      const startTime = performance.now();

      try {
        const url =
          category !== "all"
            ? `/reels?category=${encodeURIComponent(category)}`
            : "/reels";

        const { data } = await api.get(url, {
          signal: controller.signal,
        });

        console.log(
          `Reels API took ${(
            performance.now() - startTime
          ).toFixed(0)} ms`
        );

        setReels(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.code === "ERR_CANCELED") return;

        console.error("Failed to load reels:", error);
        setError("Unable to load reels. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadReels();

    return () => controller.abort();
  }, [category]);

  return (
    <main className="reel-scroll mx-auto w-full max-w-md overflow-y-auto px-2 py-3">
      {loading && (
        <div className="grid h-[70vh] place-items-center text-neutral-500">
          Loading reels...
        </div>
      )}

      {!loading && error && (
        <div className="grid h-[70vh] place-items-center text-center text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && reels.length === 0 && (
        <div className="grid h-[70vh] place-items-center text-center text-neutral-500">
          No reels found. Add real MP4 files and seed the database.
        </div>
      )}

      {!loading &&
        !error &&
        reels.map((reel) => (
          <ReelCard key={reel._id} reel={reel} />
        ))}
    </main>
  );
}
