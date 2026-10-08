const fs = require('fs');
const path = require('path');

const pages = {
  'src/app/login/page.jsx': `import Login from "@/features/auth/pages/Login";\n\nexport default function LoginPage() {\n  return <Login />;\n}`,
  'src/app/register/page.jsx': `import Register from "@/features/auth/pages/Register";\n\nexport default function RegisterPage() {\n  return <Register />;\n}`,
  'src/app/forgot-password/page.jsx': `import ForgotPassword from "@/features/auth/pages/ForgotPassword";\n\nexport default function ForgotPasswordPage() {\n  return <ForgotPassword />;\n}`,
  'src/app/reset-password/page.jsx': `import ResetPassword from "@/features/auth/pages/ResetPassword";\n\nexport default function ResetPasswordPage() {\n  return <ResetPassword />;\n}`,
  'src/app/sales/page.jsx': `import { redirect } from "next/navigation";\n\nexport default function SalesRoot() {\n  redirect("/sales/overview");\n}`,
  'src/app/sales/[tab]/page.jsx': `import SalesDashboard from "@/features/sales/pages/SalesDashboard";\nimport Protected from "@/features/auth/components/Protected";\n\nexport default function SalesTabPage() {\n  return (\n    <Protected role="sales">\n      <SalesDashboard />\n    </Protected>\n  );\n}`,
  'src/app/admin/page.jsx': `import { redirect } from "next/navigation";\n\nexport default function AdminRoot() {\n  redirect("/admin/system");\n}`,
  'src/app/admin/[tab]/page.jsx': `import AdminDashboard from "@/features/admin/pages/AdminDashboard";\nimport Protected from "@/features/auth/components/Protected";\n\nexport default function AdminTabPage() {\n  return (\n    <Protected role="admin">\n      <AdminDashboard />\n    </Protected>\n  );\n}`,
  'src/app/admin/order/[orderId]/page.jsx': `import AdminOrderDetail from "@/features/admin/components/AdminOrderDetail";\nimport Protected from "@/features/auth/components/Protected";\n\nexport default function AdminOrderDetailPage() {\n  return (\n    <Protected role="admin">\n      <AdminOrderDetail />\n    </Protected>\n  );\n}`
};

for (const [file, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(__dirname, file), content, 'utf8');
}
console.log("Pages generated");
