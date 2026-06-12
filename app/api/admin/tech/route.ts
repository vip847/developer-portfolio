import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Tech from "@/models/Tech";
import { verifyAdminSession } from "@/lib/authCheck";

export async function GET() {
  try {
    await connectToDB();
    const tech = await Tech.find({});
    return NextResponse.json(tech, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tech" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    await connectToDB();
    const newTech = new Tech(body);
    await newTech.save();
    return NextResponse.json(newTech, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifyAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, ...updateData } = await req.json();
    await connectToDB();
    const updated = await Tech.findByIdAndUpdate(id, updateData, { new: true });
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
    await Tech.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}