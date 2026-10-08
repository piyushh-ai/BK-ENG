const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGO_URL;

async function test() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // The logic inside login
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true, select: false },
    });
    userSchema.methods.comparePassword = async function (password) {
      return await bcrypt.compare(password, this.password);
    };

    const User = mongoose.models.User || mongoose.model("User", userSchema);

    const email = "piyushsiroliya115@gmail.com";
    const password = "password123";

    const user = await User.findOne({ email }).select("+password");
    console.log("User:", user ? "Found" : "Not Found");
    if (user) {
      const isPasswordValid = await user.comparePassword(password);
      console.log("Password Valid:", isPasswordValid);
    }
  } catch (error) {
    console.error("Login Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

test();
