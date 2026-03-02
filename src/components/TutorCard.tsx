import Link from 'next/link';
import { Tutor } from '../app/tutors/page';

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="border p-4 rounded shadow">
      <div className="font-bold text-lg">{tutor.user.name}</div>
      <div>Price: ${tutor.pricePerHour}/hr</div>
      <div>Rating: {tutor.rating}</div>
      <Link
        href={`/tutors/${tutor.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Profile
      </Link>
    </div>
  );
}