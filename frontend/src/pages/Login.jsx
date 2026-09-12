import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const isManager = role === "manager";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login(
        email,
        password,
        role
      );

      toast.success("Login successful");

      navigate(
        user.role === "manager"
          ? "/manager"
          : "/"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="mx-auto grid min-h-[75vh] max-w-md place-items-center px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl border bg-white p-7 shadow-xl"
      >
        <h1 className="text-3xl font-black">
          {isManager
            ? "Hotel Manager Login"
            : "User Login"}
        </h1>

        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className="mt-6 w-full rounded-xl border px-4 py-3"
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          className="mt-3 w-full rounded-xl border px-4 py-3"
        />

        <button
          type="submit"
          className="mt-5 w-full cursor-pointer rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}