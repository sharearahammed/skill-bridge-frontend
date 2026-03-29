"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";
import defaultImage from "../../assets/people avatar.png";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  image?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(data.data.users);
      setTotalPages(data.data.totalPages);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, current: "ACTIVE" | "BANNED") => {
    try {
      const newStatus = current === "ACTIVE" ? "BANNED" : "ACTIVE";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(`User status updated to ${newStatus}`);
      fetchUsers();
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    }
  };

  const handleStatusClick = async (
    id: string,
    current: "ACTIVE" | "BANNED",
  ) => {
    const actionText = current === "ACTIVE" ? "ban" : "activate";
    const result = await Swal.fire({
      title: `Are you sure you want to ${actionText} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      toggleStatus(id, current);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">Loading users...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide">
        Users Management
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gradient-to-r from-[#00B5BA]/20 to-[#5672C4]/20 text-gray-700 uppercase text-sm tracking-wider">
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No users found
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr
                key={u.id}
                className="bg-white border rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <td className="p-3">
                  <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-[#00B5BA]">
                    <Image
                      src={u.image || defaultImage}
                      alt={u.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-3 text-gray-800 font-medium">{u.name}</td>
                <td className="p-3 text-gray-600">{u.email}</td>
                <td className="p-3 text-gray-600 capitalize">{u.role}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-sm ${
                      u.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                      u.status === "ACTIVE"
                        ? "bg-[#f87171] hover:bg-[#f87171]/90"
                        : "bg-[#00B5BA] hover:bg-[#00B5BA]/90"
                    }`}
                    onClick={() => handleStatusClick(u.id, u.status)}
                  >
                    {u.status === "ACTIVE" ? "Ban" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 transition"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-[#00B5BA] text-white hover:opacity-90 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}