import TutorCard from "@/src/components/Tutor/TutorCard";
import { fetcher } from "@/src/lib/fetcher";

export type Tutor = {
  id: string;
  bio: string;
  rating: number;
  pricePerHour: number;
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  reviews: { rating: number; comment: string }[];
  reviewCount: number;
  category: {
    id: string;
    categoryId: string;
    category: { id: string; name: string };
  }[];
};

export default async function TutorsPage() {
  const res = await fetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/allTutors/featured/tutor`,
    { cache: "no-store" },
  );
  const tutors: Tutor[] = res.data;

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Featured Tutors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutors.map((tutor: Tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
}
