"use client";
import { useState, useEffect, Suspense } from "react"; // เพิ่ม Suspense เพื่อความปลอดภัยของ Next.js
import { useRouter, useSearchParams } from "next/navigation"; 

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seatFromUrl = searchParams.get("seat") || ""; // ดึงค่า ?seat=A1 จาก URL

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
    seatNumber: seatFromUrl, // เพิ่มฟิลด์นี้เพื่อให้ตรงกับ Database
  });

  // อัปเดตค่า seatNumber หาก URL เปลี่ยนแปลง
  useEffect(() => {
    if (seatFromUrl) {
      setFormData((prev) => ({ ...prev, seatNumber: seatFromUrl }));
    }
  }, [seatFromUrl]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- Validation ส่วนวันที่และเวลาเหมือนเดิมที่คุณทำไว้ ---
    const now = new Date();
    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("❌ ไม่สามารถจองวันที่ย้อนหลังได้ครับ");
      return;
    }

    if (selectedDate.getTime() === today.getTime()) {
      const [inputHours, inputMinutes] = formData.time.split(':').map(Number);
      const bookingDateTime = new Date();
      bookingDateTime.setHours(inputHours, inputMinutes, 0, 0);
      if (bookingDateTime.getTime() < now.getTime()) {
        alert("❌ เวลา " + formData.time + " ผ่านมาแล้วครับ");
        return;
      }
    }

    // --- ส่วนการส่งข้อมูลที่แก้ไขใหม่ ---
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // ตอนนี้ formData มี seatNumber แล้ว
      });

      if (response.ok) {
        alert("✅ จองโต๊ะสำเร็จ!");
        router.push("/dashboard"); 
      } else {
        const errorMsg = await response.json();
        alert(`❌ ผิดพลาด: ${errorMsg.error || "บันทึกข้อมูลไม่สำเร็จ"}`);
      }
    } catch (error) {
      alert("❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">จองโต๊ะอาหาร</h1>
        <p className="text-slate-500 mt-2">หมายเลขที่นั่งที่เลือก: <span className="font-bold text-orange-500">{formData.seatNumber || "ยังไม่ได้เลือก"}</span></p>
      </div>
      
      <form onSubmit={handleBooking} className="space-y-5 bg-white p-8 shadow-2xl rounded-2xl border border-slate-100">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อผู้จอง:</label>
          <input type="text" className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">วันที่จอง:</label>
          <input type="date" className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, date: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">เวลาที่จอง:</label>
          <input type="time" className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, time: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">จำนวนที่นั่ง (คน):</label>
          <input type="number" min="1" max="20" value={formData.guests} className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})} required />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95">
          ยืนยันการจองที่นั่ง {formData.seatNumber}
        </button>
      </form>
    </main>
  );
}

// แนะนำให้ใช้ Suspense ครอบเพื่อให้ Next.js จัดการ Client Component ที่มีการใช้ searchParams ได้ถูกต้อง
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">กำลังโหลด...</div>}>
      <BookingForm />
    </Suspense>
  );
}