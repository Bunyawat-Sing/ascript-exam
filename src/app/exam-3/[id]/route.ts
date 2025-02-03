import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return NextResponse.json({
    message: `Get user by ${id}`,
  });
}
