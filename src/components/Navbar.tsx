'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCurrentUser, CurrentUser } from '../lib/auth';

export default function Navbar() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold text-lg">SkillBridge</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/tutors">Browse Tutors</Link>
        {user ? (
          <>
            <Link href="/profile">Profile</Link>
            {user.role === 'STUDENT' && <Link href="/dashboard/student">Dashboard</Link>}
            {user.role === 'TUTOR' && <Link href="/dashboard/tutor">Dashboard</Link>}
            {user.role === 'ADMIN' && <Link href="/dashboard/admin">Admin</Link>}
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