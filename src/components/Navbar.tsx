import Link from "next/link";
import { userService } from "../services/user.service";
import LogoutButton from "./LogoutButton";
import { PiPencilLight } from "react-icons/pi";

export default async function Navbar() {
  const { data } = await userService.getSession();
  const user = data?.user;

  return (
    <nav className="max-w-7xl mx-auto px-6 p-6 flex justify-between items-center">
      {/* Logo */}
      <div className="font-bold text-lg flex items-end text-[#00B5BA] gap-2">
        <PiPencilLight className="text-5xl transform scale-x-[-1]" />
        <p className="text-xl">SkillBridge</p>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
        <Link href="/" className="hover:text-[#5672C4] transition">Home</Link>
        <Link href="/tutors" className="hover:text-[#5672C4] transition">Browse Tutors</Link>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            {user.role === "STUDENT" && (
              <Link href="/dashboard/student" className="text-gray-700 hover:text-[#5672C4] transition">
                Student Dashboard
              </Link>
            )}
            {user.role === "TUTOR" && (
              <Link href="/dashboard/tutor" className="text-gray-700 hover:text-[#5672C4] transition">
                Tutor Dashboard
              </Link>
            )}
            {user.role === "ADMIN" && (
              <Link href="/dashboard/admin" className="text-gray-700 hover:text-[#5672C4] transition">
                Admin Dashboard
              </Link>
            )}
            <LogoutButton user={user} />
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 hover:text-[#5672C4] transition">
              Login
            </Link>
            <Link href="/register" className="bg-[#00B5BA] hover:bg-[#5672C4] text-white px-5 py-2 rounded-full font-semibold transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}