import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 correct path to your JSON
const serviceAccountPath = path.join(__dirname, "../../public/bk-eng-firebase-admin.json");
let serviceAccount;

try {
  serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.log("Firebase Admin Initialization Error (could be missing JSON):", error.message);
}

export default admin;