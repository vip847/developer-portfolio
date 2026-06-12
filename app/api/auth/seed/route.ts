import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectToDB();

    // 1. Check if an admin already exists to prevent duplicates
    const existingAdmin = await Admin.findOne({ email: "viplaoitankar26@gmail.com" });
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists!" }, { status: 200 });
    }

    // 2. Hash your password securely (Change "your_secure_password" to what you actually want to use)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Viplao847526@", salt);

    // 3. Save the admin to the database
    const newAdmin = new Admin({
      email: "viplaoitankar26@gmail.com",
      password: hashedPassword,
    });

    await newAdmin.save();

    return NextResponse.json({ message: "Admin created successfully! DELETE THIS ROUTE NOW." }, { status: 201 });
  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}