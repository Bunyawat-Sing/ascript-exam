import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex justify-center items-center mx-auto min-h-screen bg-gray-300">
      <div className="flex-col border bg-white border-gray-300 rounded p-6">
        <h1 className="text-2xl font-bold mb-4">ลงทะเบียนสำเร็จ</h1>
        <p className="mb-4">ขอบคุณสำหรับการลงทะเบียน</p>
        <Link href="/exam-1" className="text-blue-500 hover:underline">
          กลับไปหน้าลงทะเบียน
        </Link>
      </div>
    </div>
  );
}
