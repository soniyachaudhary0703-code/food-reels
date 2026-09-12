
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/categories";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <p className="text-sm font-bold tracking-wide text-orange-500 sm:text-base">
          REAL FOOD • REAL REELS
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Discover food that makes you hungry.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 sm:mt-5 sm:text-lg">
          Scroll real cooking videos, discover dishes and order favourites.
        </p>

        <Link
          to="/reels/all"
          className="mt-6 inline-flex items-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 sm:mt-7 sm:px-6 sm:text-base"
        >
          Watch Reels →
        </Link>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <h2 className="mb-5 text-2xl font-black sm:mb-6 sm:text-3xl">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard
              key={c.slug}
              c={c}
            />
          ))}
        </div>
      </section>
    </>
  );
}
