"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);

  // 1. ฟังก์ชันดึงข้อมูลจากฐานข้อมูล SQLite
  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. ฟังก์ชันแก้ไขเวลาหรือจำนวนคน (Update)
  const handleEdit = async (id: number, currentTime: string, currentGuests: number) => {
    const newTime = prompt("ระบุเวลาใหม่ (เช่น 18:30):", currentTime);
    const newGuests = prompt("ระบุจำนวนคนใหม่:", currentGuests.toString());

    if (newTime && newGuests) {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: id, 
          time: newTime, 
          guests: parseInt(newGuests) 
        }),
      });

      if (response.ok) {
        alert("✅ อัปเดตข้อมูลสำเร็จ!");
        fetchBookings(); // รีเฟรชข้อมูลในตารางทันที
      }
    }
  };

  // 3. ฟังก์ชันยกเลิกการจอง (Delete)
  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?")) {
      const response = await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ ยกเลิกการจองสำเร็จ!");
        fetchBookings(); // รีเฟรชข้อมูลในตารางทันที
      }
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">รายการจองโต๊ะทั้งหมด (UP Project)</h1>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-slate-200">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 border-b text-left">ชื่อผู้จอง</th>
              <th className="px-4 py-3 border-b text-left">วันที่</th>
              <th className="px-4 py-3 border-b text-left">เวลา</th>
              <th className="px-4 py-3 border-b text-center">จำนวน (คน)</th>
              <th className="px-4 py-3 border-b text-center">สถานะ</th>
              <th className="px-4 py-3 border-b text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {bookings.length > 0 ? (
              bookings.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50 border-b">
                  <td className="px-4 py-3">{item.customerName}</td>
                  <td className="px-4 py-3">{new Date(item.date).toLocaleDateString('th-TH')}</td>
                  <td className="px-4 py-3">{item.time}</td>
                  <td className="px-4 py-3 text-center">{item.guests}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => handleEdit(item.id, item.time, item.guests)}
                      className="bg-amber-500 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-600 transition-colors mr-2"
                    >
                      แก้ไข
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  ยังไม่มีข้อมูลการจองในฐานข้อมูล SQLite
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}