import TutorReviewsPage from "@/src/components/Tutor/TutorReviewsPage";
import { userService } from "@/src/services/user.service";
export const dynamic = "force-dynamic";
export default async function TutorDashboard() {
  const { data } = await userService.getSession();
  const user = data;
  return (
    <div className="max-w-7xl mx-auto px-6 pb-12">
      <TutorReviewsPage user={user} />
    </div>
  );
}
