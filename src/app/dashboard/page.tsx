"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);

  //(GET)
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

  //(PATCH)
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
        fetchBookings();
      }
    }
  };

  //(DELETE)
  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?")) {
      const response = await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ ยกเลิกการจองสำเร็จ!");
        fetchBookings();
      }
    }
  };

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">จัดการรายการจองโต๊ะ</h1>
      </div>
      
      <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-slate-200">
        <table className="min-w-full table-auto">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-6 py-4 border-b text-left">ชื่อผู้จอง</th>
              <th className="px-6 py-4 border-b text-left">โต๊ะ</th>
              <th className="px-6 py-4 border-b text-left">วันที่/เวลา</th>
              <th className="px-6 py-4 border-b text-center">คน</th>
              <th className="px-6 py-4 border-b text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 divide-y divide-slate-100">
            {bookings.length > 0 ? (
              bookings.map((item: any) => (
                <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.customerName}</td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md font-bold">
                      {item.seatNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.date).toLocaleDateString('th-TH')} | {item.time}
                  </td>
                  <td className="px-6 py-4 text-center">{item.guests}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleEdit(item.id, item.time, item.guests)}
                      className="text-amber-600 hover:text-amber-700 font-semibold mr-4"
                    >
                      แก้ไข
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                  ไม่มีรายการจองในขณะนี้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}