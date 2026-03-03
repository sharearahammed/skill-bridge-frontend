import Link from "next/link";
import { userService } from "../services/user.service";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const { data } = await userService.getSession();
  const user = data?.user;

  console.log("user", user);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-lg">SkillBridge</div>
      <div className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/tutors">Browse Tutors</Link>

        {user ? (
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
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
