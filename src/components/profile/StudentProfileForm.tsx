"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa";

type StudentUser = {
  id: string;
  name: string;
  image?: string | null;
};

type StudentProfileFormProps = {
  user: StudentUser;
};

export default function StudentProfileForm({
  user,
}: StudentProfileFormProps) {
  const [name, setName] = useState<string>(user.name);
  const [image, setImage] = useState<string | undefined>(
    user.image || undefined
  );
  const [preview, setPreview] = useState<string | undefined>(
    user.image || undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Student Profile
      </h2>

      {/* Profile Image */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-28 h-28">
          <Image
            src={preview || "/default-avatar.png"}
            alt="Student Profile"
            fill
            className="rounded-full object-cover border-4 border-[#00B5BA]/20"
            unoptimized
          />
        </div>

        <label className="cursor-pointer bg-[#00B5BA]/10 text-[#00B5BA] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#00B5BA]/20 transition">
          <FaCamera />
          Change Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result as string;
                setPreview(base64);
                setImage(base64);
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
      </div>

      {/* Name */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Full Name
        </label>
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA] transition"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#00B5BA] hover:bg-[#009ca1] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
}