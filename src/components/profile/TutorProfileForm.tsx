"use client";

import { useState, useEffect, DragEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa";
import imageCompression from "browser-image-compression";

type TutorUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type TutorSubject = {
  category: {
    id: string;
    name: string;
  };
};

type Availability = {
  startTime: string;
  endTime: string;
};

type TutorProfileData = {
  id: string;
  userId: string;
  bio?: string;
  pricePerHour?: number;
  experience?: number;
  user: TutorUser;
  tutorSubjects?: TutorSubject[];
  availability?: Availability[];
};

type TutorProfileFormProps = {
  user: TutorUser;
};

export default function TutorProfileForm({ user }: TutorProfileFormProps) {
  const [name, setName] = useState<string>(user.name);
  const [bio, setBio] = useState<string>("");
  const [pricePerHour, setPricePerHour] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(
    user.image ?? undefined,
  );
  const [preview, setPreview] = useState<string | undefined>(
    user.image ?? "/default-avatar.png",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/allTutors/${user.id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch tutor profile");

        const data = await res.json();
        const profile: TutorProfileData = data.data;

        setBio(profile.bio ?? "");
        setPricePerHour(profile.pricePerHour?.toString() ?? "");
        setExperience(profile.experience?.toString() ?? "");
        setPreview(profile.user.image ?? "/default-avatar.png");
        setImage(profile.user.image ?? undefined);
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Something went wrong");
      }
    };

    fetchProfile();
  }, [user.id]);

  // Handle file selection & compression
const handleFile = async (file: File) => {
  try {
    const options = {
      maxSizeMB: 0.5,          // 0.5 MB max
      maxWidthOrHeight: 800,   // resize to max 800px
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setImage(base64);
    };
    reader.readAsDataURL(compressedFile);
  } catch (error) {
    console.error(error);
    toast.error("Failed to compress image");
  }
};

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    handleFile(file);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (pricePerHour && Number(pricePerHour) < 0) {
      toast.error("Price must be positive");
      return;
    }

    if (experience && Number(experience) < 0) {
      toast.error("Experience must be positive");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutor/profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email: user.email,
            image,
            bio,
            pricePerHour: pricePerHour ? Number(pricePerHour) : null,
            experience: experience ? Number(experience) : null,
          }),
          credentials: "include",
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Update failed");
      }

      toast.success("Tutor profile updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-32 bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Tutor Profile</h2>

      {/* Profile Image */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-28 h-28">
          <Image
            src={preview || "/default-avatar.png"}
            alt="Tutor Profile"
            fill
            className="rounded-full object-cover border-4 border-[#00B5BA]/20"
            unoptimized
          />
        </div>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          className={`cursor-pointer bg-[#00B5BA]/10 text-[#00B5BA] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#00B5BA]/20 transition border-2 ${
            isDragging
              ? "border-[#00B5BA]"
              : "border-dashed border-[#00B5BA]/30"
          }`}
        >
          <FaCamera />
          Change Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleFile(file);
            }}
          />
        </label>
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Full Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA]"
        />
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA]"
        />
      </div>

      {/* Price + Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Price Per Hour ($)
          </label>
          <input
            type="number"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Experience (Years)
          </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA]"
          />
        </div>
      </div>

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
