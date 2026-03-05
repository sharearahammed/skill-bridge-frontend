import TutorSidebar from "@/src/components/Tutor/TutorSidebar";

export default function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <TutorSidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}