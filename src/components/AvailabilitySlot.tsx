import { AvailabilitySlotType } from "../app/tutors/[id]/page";

export default function AvailabilitySlot({
  slot,
  tutorId,
}: {
  slot: AvailabilitySlotType;
  tutorId: string;
}) {
  const handleBook = async () => {
    const res = await fetch(`/api/bookings`, {
      method: 'POST',
      body: JSON.stringify({ tutorId, availabilityId: slot.id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) alert('Booking failed');
    else alert('Booking confirmed!');
  };

  return (
    <div className="border p-2 rounded">
      <div>
        {new Date(slot.startTime).toLocaleString()} -{' '}
        {new Date(slot.endTime).toLocaleString()}
      </div>
      <button
        onClick={handleBook}
        className="bg-blue-500 text-white px-2 py-1 mt-1 rounded"
      >
        Book
      </button>
    </div>
  );
}