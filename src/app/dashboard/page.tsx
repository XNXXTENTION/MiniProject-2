"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);

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

  //(PATCH) พร้อมดักจับการกรอกจำนวนคนไม่ถูกต้อง
  const handleEdit = async (id: number, bookingDate: string, currentTime: string, currentGuests: number) => {
    const newTime = prompt("ระบุเวลาใหม่ (เช่น 18:30):", currentTime);
    const newGuestsInput = prompt("ระบุจำนวนคนใหม่ (ต้องมากกว่า 0):", currentGuests.toString());

    // ตรวจสอบว่าผู้ใช้ไม่ได้กด Cancel และมีการกรอกข้อมูลมา
    if (newTime && newGuestsInput !== null) {
      const newGuests = parseInt(newGuestsInput);

      // --- ส่วนตรวจสอบจำนวนคน (Guests Validation) ---
      if (isNaN(newGuests) || newGuests <= 0) {
        alert("❌ จำนวนคนต้องมากกว่า 0 และเป็นตัวเลขเท่านั้นครับ");
        return;
      }

      if (newGuests > 20) {
        alert("❌ จำกัดจำนวนคนไม่เกิน 20 คนต่อหนึ่งการจองครับ");
        return;
      }

      // --- ส่วนตรวจสอบเวลาย้อนหลัง (Date/Time Validation) ---
      const now = new Date();
      const selectedDate = new Date(bookingDate);
      const todayAtMidnight = new Date();
      todayAtMidnight.setHours(0, 0, 0, 0);
      const compareDate = new Date(selectedDate);
      compareDate.setHours(0, 0, 0, 0);

      if (compareDate.getTime() === todayAtMidnight.getTime()) {
        const [h, m] = newTime.split(":").map(Number);
        const selectedTime = new Date();
        selectedTime.setHours(h, m, 0, 0);

        if (selectedTime <= now) {
          alert(`❌ ไม่สามารถแก้ไขเป็นเวลา ${newTime} น. ได้ เนื่องจากผ่านมาแล้ว`);
          return;
        }
      }

      if (compareDate < todayAtMidnight) {
        alert("❌ ไม่สามารถแก้ไขรายการจองที่ผ่านมาแล้วได้");
        return;
      }

      // ส่งข้อมูลไปที่ API หลังจากผ่านการตรวจสอบทั้งหมด
      try {
        const response = await fetch("/api/bookings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            id: id, 
            time: newTime, 
            guests: newGuests 
          }),
        });

        if (response.ok) {
          alert("✅ อัปเดตข้อมูลสำเร็จ!");
          fetchBookings();
        } else {
          alert("❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        }
      } catch (error) {
        alert("❌ เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?")) {
      try {
        const response = await fetch(`/api/bookings?id=${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("✅ ยกเลิกการจองสำเร็จ!");
          fetchBookings();
        }
      } catch (error) {
        alert("❌ เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  return (
    <main className="container mx-auto p-8 font-prompt">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">จัดการรายการจองโต๊ะ</h1>
        <p className="text-slate-500 italic">Project by Patsapong</p>
      </div>
      
      <div className="overflow-hidden bg-white shadow-2xl rounded-3xl border border-slate-100">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-5 text-left font-semibold">ชื่อผู้จอง</th>
              <th className="px-6 py-5 text-left font-semibold">เลขโต๊ะ</th>
              <th className="px-6 py-5 text-left font-semibold">วันที่ | เวลา</th>
              <th className="px-6 py-5 text-center font-semibold">จำนวนคน</th>
              <th className="px-6 py-5 text-center font-semibold">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 divide-y divide-slate-100">
            {bookings.length > 0 ? (
              bookings.map((item: any) => (
                <tr key={item.id} className="hover:bg-blue-50/40 transition-all">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.customerName}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                      {item.seatNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.date).toLocaleDateString('th-TH')} | <span className="text-blue-600 font-semibold">{item.time} น.</span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-800">{item.guests}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleEdit(item.id, item.date, item.time, item.guests)}
                      className="bg-amber-100 text-amber-600 px-4 py-2 rounded-xl hover:bg-amber-200 transition-colors mr-2 text-sm font-bold"
                    >
                      แก้ไข
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-100 text-red-500 px-4 py-2 rounded-xl hover:bg-red-200 transition-colors text-sm font-bold"
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
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