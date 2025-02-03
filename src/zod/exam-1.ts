import * as z from "zod";

export const userSchema = z
  .object({
    email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
    password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: z.string(),
    fullName: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
    phone: z.string().regex(/^[0-9]{10}$/, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)"),
    address: z.string().min(1, "กรุณากรอกที่อยู่"),
    gender: z.enum(["male", "female", "other"], {
      required_error: "กรุณาเลือกเพศ",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type UserSchema = z.infer<typeof userSchema>;
