import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await register({
        name,
        email,
        password,
      });

      toast.success("Account created");
      navigate("/user-login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="mx-auto grid min-h-[75vh] place-items-center px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border bg-white p-7 shadow-xl"
      >
        <h1 className="text-3xl font-black">
          Create User Account
        </h1>

        <input
          required
          placeholder="Name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="mt-6 w-full rounded-xl border px-4 py-3"
        />

        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className="mt-3 w-full rounded-xl border px-4 py-3"
        />

        <input
          required
          minLength={6}
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
          className="mt-5 w-full cursor-pointer rounded-xl bg-neutral-900 py-3 font-bold text-white transition hover:bg-neutral-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}