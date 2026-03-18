import PrivateRoute from "@/src/components/PrivateRoute";
import TutorSidebar from "@/src/components/Tutor/TutorSidebar";
import { userService } from "@/src/services/user.service";
export const dynamic = "force-dynamic";
export default async function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const user = data?.user;
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <TutorSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 mt-10 bg-gray-50 min-h-screen">
        <PrivateRoute user={user} role={"TUTOR"}>
          {children}
        </PrivateRoute>
      </main>
    </div>
  );
}
