import AdminSidebar from "@/src/components/Admin/AdminSidebar";
import PrivateRoute from "@/src/components/PrivateRoute";
import { userService } from "@/src/services/user.service";
export const dynamic = "force-dynamic";

export default async function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { data } = await userService.getSession();
  const user = data;
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 mt-10 bg-gray-50 min-h-screen">
        <PrivateRoute user={user} role={"ADMIN"}>
          {children}
        </PrivateRoute>
      </main>
    </div>
  );
}
