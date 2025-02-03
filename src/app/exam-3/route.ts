import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public/exam-3/exam-3.json");

const readUsers = async () => {
  const data = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeUsers = async (users: any) => {
  await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
};

// GET users
export async function GET() {
  const users = await readUsers();
  return NextResponse.json(users);
}

// POST create user
export async function POST(request: Request) {
  const newUser = await request.json();
  const users = await readUsers();

  // Generate a new ID for the user
  const newId = users.length ? Math.max(...users.map((user: any) => user.id)) + 1 : 1;

  const user = {
    ...newUser,
    id: newId,
  };

  users.push(user);
  await writeUsers(users);

  return NextResponse.json(user, { status: 201 });
}

// PUT update user
export async function PUT(request: Request) {
  const updatedUser = await request.json();
  const { id, email, password, fullName, phone, address, gender } = updatedUser;

  const users = await readUsers();
  const userIndex = users.findIndex((user: any) => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ message: `User with id ${id} not found` }, { status: 404 });
  }

  // Update user
  users[userIndex] = { id, email, password, fullName, phone, address, gender };
  await writeUsers(users);

  return NextResponse.json(users[userIndex]);
}
