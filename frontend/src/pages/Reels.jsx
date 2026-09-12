import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import ReelCard from "../components/ReelCard";

export default function Reels() {
  const { category } = useParams();

  const [reels, setReels] = useState([]);

  useEffect(() => {
    const loadReels = async () => {
      try {
        const url =
          category !== "all"
            ? `/reels?category=${category}`
            : "/reels";

        const { data } = await api.get(url);

        setReels(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadReels();
  }, [category]);

  return (
    <main className="reel-scroll mx-auto max-w-md space-y-4 overflow-y-auto px-2 py-3">
      {reels.map((reel) => (
        <ReelCard
          key={reel._id}
          reel={reel}
        />
      ))}

      {!reels.length && (
        <div className="grid h-[70vh] place-items-center text-center text-neutral-500">
          No reels found. Add real MP4 files and seed the database.
        </div>
      )}
    </main>
  );
}