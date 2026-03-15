// lib/auth.ts
export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const AUTH_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await fetch(`${AUTH_URL}/get-session`, {
      credentials: "include",
      cache: "no-store",
    });

    const session = await res.json();

    return session?.data || null;
  } catch {
    return null;
  }
}