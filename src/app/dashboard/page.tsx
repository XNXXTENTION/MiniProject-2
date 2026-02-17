"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่มสถานะการโหลด
  const router = useRouter();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      
      const data = await res.json();
      
      // เรียงลำดับ: เอาเวลาเช้าสุด (เช่น 08:00) ขึ้นก่อน
      const sortedData = data.sort((a: any, b: any) => a.time.localeCompare(b.time));
      
      setBookings(sortedData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?")) {
      try {
        const response = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          alert("✅ ยกเลิกสำเร็จ!");
          fetchBookings();
        } else {
          alert("❌ ไม่สามารถลบข้อมูลได้");
        }
      } catch (error) {
        alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ");
      }
    }
  };

  return (
    <main className="container mx-auto p-8 font-prompt">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">รายการจองวันนี้</h1>
          <p className="text-slate-400">เรียงตามลำดับเวลาเช้า - เย็น</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 italic">Project by Patsapong</p>
          <button 
            onClick={() => router.push("/booking")} 
            className="mt-2 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
          >
            + เพิ่มการจองใหม่
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden bg-white shadow-2xl rounded-3xl border border-slate-100">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-5 text-left font-semibold">ชื่อผู้จอง</th>
              <th className="px-6 py-5 text-left font-semibold">เวลาที่จอง</th>
              <th className="px-6 py-5 text-center font-semibold">จำนวนคน</th>
              <th className="px-6 py-5 text-center font-semibold">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-20 text-center text-blue-500 animate-pulse">กำลังโหลดข้อมูลการจอง...</td></tr>
            ) : bookings.length > 0 ? (
              bookings.map((item: any) => (
                <tr key={item.id} className="hover:bg-blue-50/40 transition-all">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.customerName}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                      🕒 {item.time} น.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold">{item.guests} คน</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => {
                        if (item.id) {
                          router.push(`/dashboard/edit/${item.id}`);
                        } else {
                          alert("ไม่พบ ID ของรายการนี้");
                        }
                      }}
                      className="bg-amber-100 text-amber-600 px-4 py-2 rounded-xl hover:bg-amber-200 transition-colors mr-2 font-bold"
                    >
                      แก้ไข
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-100 text-red-500 px-4 py-2 rounded-xl hover:bg-red-200 transition-colors font-bold"
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400">ยังไม่มีข้อมูลการจอง</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}