const fs = require('fs');
const path = require('path');

const salesApiRoutes = {
  'src/app/api/salesOrder/create/route.js': `import { NextResponse } from "next/server";\nimport { connectDB } from "@/lib/db";\nimport { getUser } from "@/lib/auth";\nimport { createOrder } from "@/controllers/salesOrder.controller";\n\nexport async function POST(req) {\n  return createOrder(req);\n}`,
  
  'src/app/api/salesOrder/my/route.js': `import { NextResponse } from "next/server";\nimport { getMyOrders } from "@/controllers/salesOrder.controller";\n\nexport async function GET(req) {\n  return getMyOrders(req);\n}`,
  
  'src/app/api/salesOrder/[id]/route.js': `import { NextResponse } from "next/server";\nimport { getOrderById, deleteOrder } from "@/controllers/salesOrder.controller";\n\nexport async function GET(req, { params }) {\n  return getOrderById(req, params.id);\n}\n\nexport async function DELETE(req, { params }) {\n  return deleteOrder(req, params.id);\n}`,
  
  'src/app/api/salesOrder/search/route.js': `import { NextResponse } from "next/server";\nimport { searchMyOrders } from "@/controllers/salesOrder.controller";\n\nexport async function GET(req) {\n  return searchMyOrders(req);\n}`
};

Object.keys(salesApiRoutes).forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, salesApiRoutes[filePath], 'utf8');
});
console.log("Sales APIs scaffolded");
