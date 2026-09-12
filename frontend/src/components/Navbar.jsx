
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, LogOut } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 mx-auto flex w-full max-w-6xl items-center justify-between rounded-b-3xl border bg-white/90 px-4 py-3 shadow-lg backdrop-blur sm:px-5 sm:py-4">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-black sm:text-2xl"
      >
        Food<span className="text-orange-500">Reel</span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-1.5 sm:gap-2">

        {/* Manager Dashboard */}
        {user?.role === "manager" && (
          <Link
            to="/manager"
            className="cursor-pointer rounded-xl bg-neutral-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-neutral-800 sm:px-4 sm:text-sm"
          >
            Manager
          </Link>
        )}

        {/* Cart */}
        {user?.role === "user" && (
          <Link
            to="/cart"
            className="relative cursor-pointer rounded-xl bg-orange-50 p-2.5 transition hover:bg-orange-100 sm:p-3"
          >
            <ShoppingBag size={19} />

            <span className="absolute -right-1 -top-1 rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
              {cart.length}
            </span>
          </Link>
        )}

        {/* Logout */}
        {user ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-xl p-2.5 transition hover:bg-neutral-100 sm:p-3"
            title="Logout"
          >
            <LogOut size={19} />
          </button>
        ) : (
          <>
            {/* Hotel Manager Login */}
            <Link
              to="/manager-login"
              className="cursor-pointer rounded-xl px-2.5 py-2 text-xs font-semibold transition hover:bg-neutral-100 sm:px-3 sm:text-sm"
            >
              Hotel Manager
            </Link>

            {/* User Login */}
            <Link
              to="/user-login"
              className="cursor-pointer rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-orange-600 sm:px-4 sm:text-sm"
            >
              User Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
