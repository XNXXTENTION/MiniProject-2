"use client";

import { useEffect, useState, Suspense } from "react"; //
import { useRouter, useParams } from "next/navigation";

// 1. เพิ่ม force-dynamic เพื่อให้ Vercel ไม่ค้างตอน Build หน้าที่มี Dynamic Params


function EditBookingContent() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    customerName: "",
    time: "",
    guests: 1
  });

  const allTimeSlots = [
    "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00",
    "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00",
    "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00",
    "17:00 - 18:00"
  ];

  useEffect(() => {
    async function loadInitialData() {
      try {
        const res = await fetch("/api/bookings");
        const allBookings = await res.json();

        const current = allBookings.find((b: any) => b.id === Number(params.id));
        if (current) {
          setFormData({
            customerName: current.customerName,
            time: current.time,
            guests: current.guests
          });
        }

        const occupied = allBookings
          .filter((b: any) => b.id !== Number(params.id))
          .map((b: any) => b.time);
        
        setBookedTimes(occupied);
        setLoading(false);
      } catch (error) {
        console.error("Load error:", error);
        setLoading(false);
      }
    }
    if (params.id) loadInitialData(); //
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bookedTimes.includes(formData.time)) {
      alert("❌ เวลานี้ถูกจองไปแล้วโดยลูกค้ารายอื่น กรุณาเลือกเวลาใหม่");
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: params.id, 
          time: formData.time, 
          guests: formData.guests 
        }),
      });

      if (response.ok) {
        alert("✅ แก้ไขข้อมูลสำเร็จ!");
        router.push("/dashboard");
      }
    } catch (error) {
      alert("❌ เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-prompt">
      <div className="animate-bounce text-blue-600 font-bold">กำลังดึงข้อมูล...</div>
    </div>
  );

  return (
    <main className="container mx-auto p-8 max-w-lg font-prompt">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">แก้ไขการจอง</h1>
        <p className="text-slate-500">ของลูกค้าคุณ: <span className="font-bold text-slate-800">{formData.customerName}</span></p>
      </div>
      
      <form onSubmit={handleUpdate} className="bg-white p-8 shadow-2xl rounded-[2.5rem] border border-slate-100 space-y-8">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">🕒 เลือกช่วงเวลาใหม่:</label>
          <div className="grid grid-cols-1 gap-3">
            <select 
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 bg-slate-50 font-bold text-blue-700"
            >
              {allTimeSlots.map((slot) => {
                const isTaken = bookedTimes.includes(slot);
                return (
                  <option key={slot} value={slot} disabled={isTaken}>
                    {slot} น. {isTaken ? "(เต็มแล้ว)" : ""}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="mt-2 text-xs text-slate-400 ml-1">* เวลาที่ขึ้นว่า (เต็มแล้ว) จะไม่สามารถเลือกได้</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">👥 แก้ไขจำนวนคน:</label>
          <div className="flex items-center gap-5 bg-slate-50 p-3 rounded-2xl border-2 border-slate-100">
             <button 
              type="button"
              onClick={() => setFormData(p => ({...p, guests: Math.max(1, p.guests - 1)}))}
              className="w-12 h-12 bg-white rounded-xl shadow-md text-xl font-bold hover:text-red-500 transition-all"
            > - </button>
            <span className="flex-1 text-center font-bold text-2xl text-slate-800">{formData.guests}</span>
            <button 
              type="button"
              onClick={() => setFormData(p => ({...p, guests: Math.min(20, p.guests + 1)}))}
              className="w-12 h-12 bg-white rounded-xl shadow-md text-xl font-bold hover:text-green-500 transition-all"
            > + </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-lg active:scale-95"
          >
            บันทึกการเปลี่ยนแปลง
          </button>
          <button 
            type="button"
            onClick={() => router.back()}
            className="w-full text-slate-400 font-bold py-3 hover:text-slate-600 transition-colors"
          >
            ยกเลิกและกลับหน้าหลัก
          </button>
        </div>
      </form>
    </main>
  );
}

// 2. ใช้ Suspense ครอบตัว Content ไว้เพื่อให้ผ่านการตรวจของ Next.js Build
export default function EditBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-prompt">กำลังเตรียมหน้าแก้ไข...</div>}>
      <EditBookingContent />
    </Suspense>
  );
}