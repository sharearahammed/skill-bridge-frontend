import TutorCard from "@/src/components/TutorCard";
import { fetcher } from "@/src/lib/fetcher";

type User = {
  id: string;
  name: string;
  image?: string | null;
};

type TutorSubject = {
  category: {
    id: string;
    name: string;
  };
};

type Availability = {
  id: string;
  startTime: string;
  endTime: string;
};

export type Tutor = {
  id: string;
  bio?: string;
  rating?: number;
  pricePerHour?: number;
  user: User;
  tutorSubjects: TutorSubject[];
  availability: Availability[];
};

export default async function TutorsPage() {
  const res = await fetcher('/api/tutors');
  const tutors = res.data;

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {tutors.map((tutor: Tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}