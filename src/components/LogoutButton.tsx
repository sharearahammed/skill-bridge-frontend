"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import defaultImage from "../assets/people avatar.png";
import Link from "next/link";
import { User } from "./common/Navbar";

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

    router.push("/");
    router.refresh();
  };

  // Close dropdown on click outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="focus:outline-none cursor-pointer"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 border-[#00B5BA]/30 hover:border-[#00B5BA] transition-all duration-200">
          <Image
            src={user.image || defaultImage}
            alt={user.name}
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-44 bg-white text-black shadow-lg rounded-md z-50 origin-top-right transform transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <Link
          href="/profile"
          className="block px-4 py-2 hover:bg-gray-100 transition"
          onClick={() => setOpen(false)}
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
