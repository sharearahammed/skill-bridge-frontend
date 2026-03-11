import MyBookingsClient from "@/src/components/MyBookingsClient";

export default function MyBookingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <MyBookingsClient />
    </div>
  );
}
