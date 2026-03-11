import MyBookingsClient from "@/src/components/MyBookingsClient";

export default function MyBookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-12">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <MyBookingsClient />
    </div>
  );
}
