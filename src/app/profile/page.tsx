import AdminProfileForm from "@/src/components/profile/AdminProfileForm";
import StudentProfileForm from "@/src/components/profile/StudentProfileForm";
import TutorProfileForm from "@/src/components/profile/TutorProfileForm";
import { userService } from "@/src/services/user.service";

export default async function ProfilePage() {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="mb-28 max-w-3xl mx-auto mt-12 px-6">
      {user.role === "STUDENT" && <StudentProfileForm user={user} />}
      {user.role === "TUTOR" && <TutorProfileForm user={user} />}
      {user.role === "ADMIN" && <AdminProfileForm user={user} />}
    </div>
  );
}
