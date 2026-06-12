import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { verifyAdminSession } from "@/lib/authCheck";

export async function GET() {
  try {
    await connectToDB();
    const experiences = await Experience.find({}).sort({ order: 1 });
    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    await connectToDB();
    const newExp = new Experience(body);
    await newExp.save();
    return NextResponse.json(newExp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifyAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, ...updateData } = await req.json();
    await connectToDB();
    const updated = await Experience.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await verifyAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await connectToDB();
    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}