"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserSchema } from "@/zod/exam-1";
import { registerUser } from "./action";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(data: UserSchema) {
    setIsLoading(true);
    setServerError("");

    try {
      await registerUser(data);
      router.push("/exam-1/success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ลงทะเบียน</h1>
      {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            อีเมล
          </label>
          <input {...register("email")} type="email" id="email" className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            รหัสผ่าน
          </label>
          <input {...register("password")} type="password" id="password" className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">
            ยืนยันรหัสผ่าน
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-2">
            ชื่อ-นามสกุล
          </label>
          <input {...register("fullName")} type="text" id="fullName" className="w-full p-2 border rounded" />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">
            เบอร์โทรศัพท์
          </label>
          <input {...register("phone")} type="tel" id="phone" className="w-full p-2 border rounded" />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">
            ที่อยู่
          </label>
          <textarea {...register("address")} id="address" className="w-full p-2 border rounded"></textarea>
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">
            เพศ
          </label>
          <select {...register("gender")} id="gender" className="w-full p-2 border rounded">
            <option value="">เลือกเพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่นๆ</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
          {isLoading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
        </button>
      </form>
    </div>
  );
}
