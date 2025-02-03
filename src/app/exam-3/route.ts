import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Get users",
  });
}

export async function POST() {
  return NextResponse.json({
    message: "Create user success",
  });
}

export async function PUT() {
  return NextResponse.json({
    message: "Update user",
  });
}

export async function DELETE() {
  return NextResponse.json({
    message: "Delete user",
  });
}
