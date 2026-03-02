import AvailabilitySlot from "@/src/components/AvailabilitySlot";
import ReviewCard from "@/src/components/ReviewCard";
import { fetcher } from "@/src/lib/fetcher";

// types.ts
export type User = {
  id: string;
  name: string;
  image?: string | null;
};

export type AvailabilitySlotType = {
  id: string;
  startTime: string;
  endTime: string;
};

export type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  student: {
    id: string;
    name: string;
  };
};

export type Tutor = {
  id: string;
  bio?: string;
  rating?: number;
  pricePerHour?: number;
  user: User;
  availability: AvailabilitySlotType[];
  reviews: Review[];
};

interface Props {
  params: { id: string };
}

export default async function TutorDetail({ params }: Props) {
  const res = await fetcher(`/api/tutors/${params.id}`);
  const tutor = res.data;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{tutor.user.name}</h1>
      <p>{tutor.bio}</p>
      <div className="mt-4">
        <h2 className="font-bold">Availability</h2>
        <div className="flex flex-wrap gap-4">
          {tutor.availability.map((slot: AvailabilitySlotType) => (
            <AvailabilitySlot key={slot.id} slot={slot} tutorId={tutor.id} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold">Reviews</h2>
        {tutor.reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}