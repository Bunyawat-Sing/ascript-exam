import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper function to read and write data to JSON file
const filePath = path.join(process.cwd(), "public/exam-3/exam-3.json");

const readUsers = async () => {
  const data = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeUsers = async (users: any) => {
  await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
};

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const users = await readUsers();
  const user = users.find((user: any) => user.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ message: `User with id ${id} not found` }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const users = await readUsers();
  const userIndex = users.findIndex((user: any) => user.id === parseInt(id));

  if (userIndex === -1) {
    return NextResponse.json({ message: `User with id ${id} not found` }, { status: 404 });
  }

  // Remove the user
  users.splice(userIndex, 1);
  await writeUsers(users);

  return NextResponse.json({ message: `User with id ${id} deleted successfully` });
}
