import PrivateRoute from "@/src/components/PrivateRoute";
import StudentSidebar from "@/src/components/StudentSidebar";
import { userService } from "@/src/services/user.service";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const user = data?.user;
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 mt-10 bg-gray-50 min-h-screen">
        <PrivateRoute user={user} role={"STUDENT"}>
          {children}
        </PrivateRoute>
      </main>
    </div>
  );
}
