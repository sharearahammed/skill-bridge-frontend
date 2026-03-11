import BookingsPage from "@/src/components/Admin/Bookings";

export default function MyBookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      <BookingsPage />
    </div>
  );
}
