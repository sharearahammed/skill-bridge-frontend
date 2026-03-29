"use client";

import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="mt-5 cursor-pointer w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition font-medium text-gray-700"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  );
}