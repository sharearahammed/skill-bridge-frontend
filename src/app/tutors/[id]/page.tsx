import Image from "next/image";
import { FaStar } from "react-icons/fa";
import defaultImage from "../../../assets/people avatar.png";
import { getTutorById } from "@/src/services/tutor.service";
import BookingForm from "@/src/components/BookingForm";

type Review = {
  rating: number;
  comment: string;
  createdAt: string;
};

type PageProps = {
  params: { id: string };
};

export default async function TutorProfilePage({ params }: PageProps) {
  const { id } = await params;

  const response = await getTutorById(id);
  const tutor = response.data;

  const averageRating =
    tutor.reviews.length > 0
      ? (
          tutor.reviews.reduce(
            (acc: number, review: { rating: number }) => acc + review.rating,
            0,
          ) / tutor.reviews.length
        ).toFixed(1)
      : "0.0";
  console.log({ tutor });
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Top Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-28 h-28">
            <Image
              src={tutor.user.image || defaultImage}
              alt={tutor.user.name}
              fill
              className="rounded-full object-cover ring-4 ring-[#00B5BA]/20"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {tutor.user.name}
            </h1>

            <div className="flex items-center gap-2 mt-2 text-yellow-500">
              <FaStar />
              <span className="font-semibold">{averageRating}</span>
              <span className="text-gray-500 text-sm">
                ({tutor._count.reviews} reviews)
              </span>
            </div>

            <p className="text-[#00B5BA] font-semibold mt-3 text-xl">
              ${tutor.pricePerHour} / hour
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            About Tutor
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {tutor.bio || "No bio available."}
          </p>
        </div>

        {/* Subjects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Subjects</h2>

          <div className="flex flex-wrap gap-3">
            {tutor.tutorSubjects.map(
              (subject: { id: string; category: { name: string } }) => (
                <span
                  key={subject.id}
                  className="bg-[#00B5BA]/10 text-[#00B5BA] px-4 py-2 rounded-full text-sm font-medium"
                >
                  {subject.category.name}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Book a Slot
          </h2>

          <BookingForm
            tutorSubjects={tutor.tutorSubjects}
            availability={tutor.availability}
          />
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Reviews</h2>

          {tutor.reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          <div className="space-y-4">
            {tutor.reviews.map((review: Review, index: number) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <FaStar size={14} />
                  <span className="font-semibold">{review.rating}</span>
                </div>

                <p className="text-gray-600 text-sm">{review.comment}</p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
