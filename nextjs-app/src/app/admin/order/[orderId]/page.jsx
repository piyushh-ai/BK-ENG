import AdminOrderDetail from "@/features/admin/components/AdminOrderDetail";
import Protected from "@/features/auth/components/Protected";

export const instant = false;

export default function AdminOrderDetailPage() {
  return (
    <Protected role="admin">
      <AdminOrderDetail />
    </Protected>
  );
}