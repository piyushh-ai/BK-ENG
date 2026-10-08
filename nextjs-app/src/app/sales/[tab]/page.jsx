import SalesDashboard from "@/features/sales/pages/SalesDashboard";
import Protected from "@/features/auth/components/Protected";

export const instant = false;

export default function SalesTabPage() {
  return (
    <Protected role="sales">
      <SalesDashboard />
    </Protected>
  );
}