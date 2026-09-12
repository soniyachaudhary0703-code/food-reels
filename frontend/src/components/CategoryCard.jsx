
import { Link } from "react-router-dom";

export default function CategoryCard({ c }) {
  return (
    <Link
      to={`/reels/${c.slug}`}
      className="group overflow-hidden rounded-3xl border bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={c.image}
          alt={c.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold">
          {c.icon} {c.name}
        </h3>

        <p className="text-sm text-neutral-500">
          Watch real {c.name.toLowerCase()} reels
        </p>
      </div>
    </Link>
  );
}
