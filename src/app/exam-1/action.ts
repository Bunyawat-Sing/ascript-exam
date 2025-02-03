"use server";

import { userSchema, type UserSchema } from "@/zod/exam-1";

export async function registerUser(data: UserSchema) {
  try {
    // Validate the input data
    const validatedData = userSchema.parse(data);

    // Simulate saving user data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("User registered:", validatedData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("เกิดข้อผิดพลาดในการลงทะเบียน");
  }
}
