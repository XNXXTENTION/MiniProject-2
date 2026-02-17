"use client";

import { useState, useEffect } from "react"; // โหลดหน้าและเก็บข้อมูล
import { useRouter } from "next/navigation"; // เปลี่ยนหน้า

export default function TimeSelectionPage() {
  const router = useRouter();

  // ส่วนของการเก็บข้อมูล [State]
  const [bookedTimes, setBookedTimes] = useState<string[]>([]); // เก็บช่วงเวลาที่ถูกจองแล้ว
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // เก็บเวลาที่ลูกค้ากำลังเลือก

  // ส่วนของการดึงข้อมูลจาก [Database]
  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetch("/api/bookings"); // ไปดึงข้อมูลการจอง
        const data = await response.json();
        // ดึงค่า time ออกมาเพื่อเช็คว่าเวลาไหนไม่ว่างบ้าง
        const occupied = data.map((item: any) => item.time);
        setBookedTimes(occupied);
      } catch (error) {
        console.error("Error loading bookings:", error);
      }
    }
    loadBookings();
  }, []);

  // สร้างรายการ [ช่วงเวลา] 8:00 - 18:00
  const allTimeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ];

  const handleSelect = (timeSlot: string) => {
    setSelectedTime(timeSlot); // เมื่อคลิกเลือกเวลา ให้จำค่านั้นไว้
  };

  // เมื่อกดปุ่มยืนยัน
  const handleConfirm = () => {
    if (selectedTime) {
      // ส่งช่วงเวลาไปที่หน้าจองผ่าน [URL-Parameter] 
      // เปลี่ยนจาก ?seat= เป็น ?time= เพื่อให้สื่อความหมาย
      router.push(`/booking?time=${selectedTime}`);
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto text-center font-prompt">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">กรุณาเลือกเวลาจองร้านที่ต้องการ</h1>
      <p className="text-slate-500 mb-8">โครงการโดย {`Patsapong`}</p>

      {/* ส่วนของรายการช่วงเวลา */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {allTimeSlots.map((slot) => {
          const isBooked = bookedTimes.includes(slot); // เวลานี้ถูกจองไปหรือยัง
          const isSelected = selectedTime === slot;    // กำลังเลือกอันนี้อยู่ไหม

          return (
            <button
              key={slot}
              disabled={isBooked}
              onClick={() => handleSelect(slot)}
              className={`p-5 rounded-2xl font-bold transition-all border-2 
                ${isBooked 
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
                  : isSelected 
                    ? "bg-blue-600 text-white border-blue-800 shadow-lg scale-105" 
                    : "bg-white text-blue-600 border-blue-100 hover:border-blue-500 hover:bg-blue-50"
                }
              `}
            >
              <div className="flex justify-between items-center px-4">
                <span>🕒 {slot} น.</span>
                <span>{isBooked ? "❌ จองแล้ว" : isSelected ? "✅ เลือกอยู่" : "🟢 ว่าง"}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ปุ่มยืนยัน */}
      <button
        onClick={handleConfirm}
        disabled={!selectedTime}
        className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all shadow-xl
          ${selectedTime 
            ? "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95" 
            : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        {selectedTime ? `ยืนยันการจองเวลา ${selectedTime}` : "กรุณาเลือกช่วงเวลา"}
      </button>
    </main>
  );
}