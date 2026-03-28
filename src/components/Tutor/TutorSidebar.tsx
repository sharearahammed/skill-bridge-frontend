"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

export default function TutorSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/dashboard/tutor/availability", label: "Availability Slots" },
    { href: "/dashboard/tutor/sessions", label: "My Sessions" },
    { href: "/dashboard/tutor/reviews", label: "Reviews" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden sm:mt-9 mt-3 flex items-center justify-between p-4 bg-white border-b shadow-md">
        <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 text-2xl"
        >
          <HiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          lg:sticky fixed mt-10 lg:z-0 z-50 inset-y-0 left-0 w-64 bg-white border-r shadow-lg p-6
          transform lg:translate-x-0 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-between lg:hidden mb-6 ">
          <h2 className="text-2xl font-bold text-gray-800">Tutor Dashboard</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-700 text-xl">
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // mobile এ close হবে
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[#00B5BA] text-white"
                    : "text-gray-700 hover:bg-[#00B5BA]/10 hover:text-[#00B5BA]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}