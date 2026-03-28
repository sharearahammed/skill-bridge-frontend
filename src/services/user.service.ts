import { cookies } from "next/headers";

const AUTH_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (!token) {
        return { data: null, error: { message: "Session is missing." } };
      }

      const res = await fetch(`${AUTH_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (!res.ok || !session.success) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};