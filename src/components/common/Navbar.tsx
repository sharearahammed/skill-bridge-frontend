"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { PiPencilLight } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";

export type User = {
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

export interface NavbarProps {
  user?: User | null;
}



export default function Navbar({ user }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tutors/all", label: "Browse Tutors" },
  ];

  if (user?.role === "STUDENT")
    navLinks.push({ href: "/dashboard/student", label: "Student Dashboard" });

  if (user?.role === "TUTOR")
    navLinks.push({ href: "/dashboard/tutor", label: "Tutor Dashboard" });

  if (user?.role === "ADMIN")
    navLinks.push({ href: "/dashboard/admin", label: "Admin Dashboard" });

  return (
    <nav className="bg-white w-full py-4 fixed top-0 z-50 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto md:px-6 px-5 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="inline-block">
          <div className="font-bold text-lg flex items-end text-[#00B5BA] gap-2 cursor-pointer">
            <PiPencilLight className="md:text-5xl text-3xl transform scale-x-[-1]" />
            <p className="md:text-2xl sm:text-xl text-[15px] tracking-tight">
              SkillBridge
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-1 py-1 hover:text-[#5672C4] transition-all
                         after:content-[''] after:absolute after:bottom-0 after:left-0
                         after:w-0 after:h-0.5 after:bg-[#5672C4] after:transition-all
                         hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">

          {!user && (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-[#5672C4] font-medium transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-[#00B5BA] hover:bg-[#5672C4] text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && <LogoutButton user={user} />}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-[#5672C4]"
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white w-full px-5 pb-5 flex flex-col space-y-3 border-t border-gray-200">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-gray-700 hover:text-[#5672C4] font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {!user && (
            <div className="flex flex-col space-y-2 mt-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-[#5672C4] hover:bg-gray-100 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-[#00B5BA] hover:bg-[#5672C4] text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && <LogoutButton user={user} />}
        </div>
      )}
    </nav>
  );
}