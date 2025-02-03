"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchUsers } from "./action";

interface User {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  gender: string;
  age: number;
}

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const gender = searchParams.get("gender") || "";

  useEffect(() => {
    fetchData();
  }, [page, search, gender]);

  async function fetchData() {
    setLoading(true);
    const { users: fetchedUsers, total } = await fetchUsers(page, search, gender);
    setUsers(fetchedUsers);
    setTotalUsers(total);
    setLoading(false);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    router.push(`/exam-2?search=${e.target.value}&gender=${gender}`);
  }

  function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/exam-2?search=${search}&gender=${e.target.value}`);
  }

  function handlePrevPage() {
    if (page > 1) {
      router.push(`/exam-2?page=${page - 1}&search=${search}&gender=${gender}`);
    }
  }

  function handleNextPage() {
    router.push(`/exam-2?page=${page + 1}&search=${search}&gender=${gender}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">รายชื่อผู้ใช้</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหาด้วยชื่อ อีเมล หรือเบอร์โทรศัพท์"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded mr-2"
        />
        <select value={gender} onChange={handleGenderChange} className="p-2 border rounded">
          <option value="">ทั้งหมด</option>
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
          <option value="other">อื่นๆ</option>
        </select>
      </div>
      {loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">ชื่อ-นามสกุล</th>
                <th className="border p-2">อีเมล</th>
                <th className="border p-2">เบอร์โทรศัพท์</th>
                <th className="border p-2">เพศ</th>
                <th className="border p-2">อายุ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.fullName}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2">{user.gender}</td>
                  <td className="border p-2">{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button onClick={handlePrevPage} disabled={page === 1} className="bg-blue-500 text-white p-2 rounded mr-2">
              ก่อนหน้า
            </button>
            <button
              onClick={handleNextPage}
              disabled={users.length < 10}
              className="bg-blue-500 text-white p-2 rounded"
            >
              ถัดไป
            </button>
          </div>
          <p className="mt-2">
            แสดง {users.length} จาก {totalUsers} รายการ
          </p>
        </>
      )}
    </div>
  );
}
