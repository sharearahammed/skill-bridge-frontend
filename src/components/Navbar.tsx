import Link from "next/link";
import { userService } from "../services/user.service";
import LogoutButton from "./LogoutButton";
import { PiPencilLight } from "react-icons/pi";

export default async function Navbar() {
  const { data } = await userService.getSession();
  const user = data?.user;

  console.log("user", user);

  return (
    <nav className="bg-[#FFFFFF] p-4 flex justify-between items-center">
      <div className="font-bold text-lg flex items-end text-[#00B5BA]">
        <PiPencilLight className="text-5xl transform scale-x-[-1]" />
        <p className="text-xl">SkillBridge</p>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/tutors">Browse Tutors</Link>
      </div>
      <div>
        {!user ? (
          <>
            <Link href="/profile">Profile</Link>
            {user.role === "STUDENT" && (
              <Link href="/dashboard/student">Student Dashboard</Link>
            )}
            {user.role === "TUTOR" && (
              <Link href="/dashboard/tutor">Dashboard</Link>
            )}
            {user.role === "ADMIN" && (
              <Link href="/dashboard/admin">Admin</Link>
            )}

            <LogoutButton user={user} />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div>
              <Link href="/login">Login</Link>
            </div>
            <div className="bg-[#00B5BA] px-5 py-2 rounded-full text-[#ffff] ">
              <Link href="/register">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
