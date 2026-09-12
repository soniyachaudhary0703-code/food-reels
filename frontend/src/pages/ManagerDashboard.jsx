import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import api from "../services/api";

const blank = {
  title: "",
  description: "",
  category: "noodles",
  video: "/videos/noodles.mp4",
  price: 199,
};

export default function ManagerDashboard() {
  const [reels, setReels] = useState([]);
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState(null);

  const loadReels = () => {
    api.get("/reels").then((response) => {
      setReels(response.data);
    });
  };

  useEffect(() => {
    loadReels();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editId) {
        await api.put(`/reels/${editId}`, form);
      } else {
        await api.post("/reels", form);
      }

      toast.success(
        editId ? "Updated successfully" : "Added successfully"
      );

      setForm(blank);
      setEditId(null);
      loadReels();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Action failed"
      );
    }
  };

  const handleEdit = (reel) => {
    setEditId(reel._id);

    setForm({
      title: reel.title,
      description: reel.description,
      category: reel.category,
      video: reel.video,
      price: reel.price,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this reel?")) {
      return;
    }

    try {
      await api.delete(`/reels/${id}`);
      toast.success("Reel deleted");
      loadReels();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-4xl font-black">
        Hotel Manager Dashboard
      </h1>

      {/* Reel Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-7 grid gap-3 rounded-3xl border bg-white p-6 md:grid-cols-2"
      >
        <input
          required
          placeholder="Food title"
          value={form.title}
          onChange={(event) =>
            setForm({
              ...form,
              title: event.target.value,
            })
          }
          className="rounded-xl border px-4 py-3"
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(event) =>
            setForm({
              ...form,
              description: event.target.value,
            })
          }
          className="rounded-xl border px-4 py-3"
        />

        <select
          value={form.category}
          onChange={(event) =>
            setForm({
              ...form,
              category: event.target.value,
            })
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="noodles">Noodles</option>
          <option value="pizza">Pizza</option>
          <option value="burger">Burger</option>
          <option value="biryani">Biryani</option>
          <option value="pasta">Pasta</option>
          <option value="dessert">Dessert</option>
        </select>

        <input
          required
          value={form.video}
          onChange={(event) =>
            setForm({
              ...form,
              video: event.target.value,
            })
          }
          placeholder="Video path"
          className="rounded-xl border px-4 py-3"
        />

        <input
          type="number"
          value={form.price}
          onChange={(event) =>
            setForm({
              ...form,
              price: Number(event.target.value),
            })
          }
          placeholder="Price"
          className="rounded-xl border px-4 py-3"
        />

        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 md:col-span-2"
        >
          {editId ? "Update Reel" : "Add Reel"}
        </button>
      </form>

      {/* Reel List */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {reels.map((reel) => (
          <div
            key={reel._id}
            className="rounded-2xl border bg-white p-4"
          >
            <b>{reel.title}</b>

            <p className="text-sm text-neutral-500">
              {reel.category} • {reel.video}
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(reel)}
                className="cursor-pointer rounded-xl bg-neutral-900 px-4 py-2 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(reel._id)}
                className="cursor-pointer rounded-xl bg-red-500 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}