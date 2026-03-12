import MyBookingsClient from "@/src/components/MyBookingsClient";

export default function MyBookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6  ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        My Bookings
      </h1>

      {/* Scrollable container */}
      <div className="h-[calc(100vh-120px)] sm:h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollbar-thumb-[#00B5BA]">
        <MyBookingsClient />
      </div>
    </div>
  );
}
