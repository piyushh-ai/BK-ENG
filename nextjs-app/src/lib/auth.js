import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import userModel from "@/models/user.model";
import { connectDB } from "./db";

export async function getUser(req) {
  await connectDB();
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;
  
  if (!token && req?.headers?.get("authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("authorization").split(" ")[1];
  }

  if (!token) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return { error: "User not found", status: 404 };
    }
    
    // Refresh cookie if it came from Bearer (restores session)
    if (!cookieStore.get("token")?.value) {
       cookieStore.set("token", token, {
        httpOnly: true,
        secure: false, // in prod should be true but config said false
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds for nextjs cookies API
       });
    }

    return { user, token };
  } catch (error) {
    return { error: "Invalid token", status: 401 };
  }
}

export async function requireAdmin(req) {
  const result = await getUser(req);
  if (result.error) return result;
  
  if (result.user.role !== "admin") {
    return { error: "Forbidden", status: 403 };
  }
  
  return result;
}
