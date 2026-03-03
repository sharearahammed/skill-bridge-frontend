"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  phone?: string | null;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};

type LogoutButtonProps = {
  user: User;
};

export default function LogoutButton({ user }: LogoutButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-out`, {
      method: "POST",
      credentials: "include",
    });

    router.refresh();
    router.push("/");
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Image */}
      {user.image && (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 relative rounded-full overflow-hidden">
            <Image
              src={user.image}
              alt={user.name}
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
        </button>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
