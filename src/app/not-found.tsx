import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-gray-600">
        Sorry, page not found
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-black text-white rounded-md"
      >
        Go Home
      </Link>
    </div>
  );
}
