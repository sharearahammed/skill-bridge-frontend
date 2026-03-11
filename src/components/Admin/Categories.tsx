"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Category = { id: string; name: string };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/categories`);
      const data = await res.json();
      if (res.ok) setCategories(data.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const createCategory = async () => {
    if (!name) return toast.error("Category name required");
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Category created");
      setName("");
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide">
        Categories
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="px-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00B5BA] transition"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={createCategory}
          disabled={loading}
          className="bg-[#00B5BA] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {categories.length === 0 && (
          <p className="text-gray-500 col-span-2 text-center">No categories found</p>
        )}
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-4 bg-[#f1f5f9] rounded-xl shadow hover:shadow-md transition cursor-pointer"
          >
            <p className="text-gray-800 font-medium">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}