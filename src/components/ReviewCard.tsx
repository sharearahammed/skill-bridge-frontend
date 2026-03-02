import { Review } from "../app/tutors/[id]/page";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border p-2 rounded my-2">
      <div className="font-bold">{review.student.name}</div>
      <div>Rating: {review.rating}</div>
      <p>{review.comment}</p>
    </div>
  );
}
