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
      router.push("/exam-1/success"); // Redirect หลังจากลงทะเบียนสำเร็จ
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">ลงทะเบียน</h1>
        {serverError && <p className="text-red-500 mb-4">{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { id: "email", label: "อีเมล", type: "email" },
            { id: "password", label: "รหัสผ่าน", type: "password" },
            { id: "confirmPassword", label: "ยืนยันรหัสผ่าน", type: "password" },
            { id: "fullName", label: "ชื่อ-นามสกุล", type: "text" },
            { id: "phone", label: "เบอร์โทรศัพท์", type: "tel" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-gray-600 font-medium mb-1">
                {label}
              </label>
              <input
                {...register(id as keyof UserSchema)}
                type={type}
                id={id}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
              />
              {errors[id as keyof UserSchema] && (
                <p className="text-red-500">{errors[id as keyof UserSchema]?.message}</p>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="address" className="block text-gray-600 font-medium mb-1">
              ที่อยู่
            </label>
            <textarea
              {...register("address")}
              id="address"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            ></textarea>
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>

          <div>
            <label htmlFor="gender" className="block text-gray-600 font-medium mb-1">
              เพศ
            </label>
            <select
              {...register("gender")}
              id="gender"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            >
              <option value="">เลือกเพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="other">อื่นๆ</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded transition"
            disabled={isLoading}
          >
            {isLoading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </button>
        </form>
      </div>
    </div>
  );
}
