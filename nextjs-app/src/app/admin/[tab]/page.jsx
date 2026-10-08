import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import Protected from "@/features/auth/components/Protected";

export const instant = false;

export default function AdminTabPage() {
  return (
    <Protected role="admin">
      <AdminDashboard />
    </Protected>
  );
}