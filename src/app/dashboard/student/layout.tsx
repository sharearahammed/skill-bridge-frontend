import StudentSidebar from "@/src/components/StudentSidebar";

export default function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}