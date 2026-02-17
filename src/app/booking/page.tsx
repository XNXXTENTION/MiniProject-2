"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. ดึงค่าเวลาที่เลือกมาจาก URL
  const timeFromUrl = searchParams.get("time") || ""; 

  // 2. จัดการเรื่องวันที่ (Default เป็นวันนี้)
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: "",
    date: today,      // ตั้งเป็นวันนี้อัตโนมัติ
    time: timeFromUrl, // ดึงจากหน้าเลือกเวลา
    guests: 1,         // ค่าเริ่มต้น 1 คน
    seatNumber: "Auto-Assign", // หรือจะใส่เป็น Time Slot แทนก็ได้ครับ
  });

  // อัปเดตค่าเวลาเมื่อ URL เปลี่ยน
  useEffect(() => {
    if (timeFromUrl) {
      setFormData((prev) => ({ ...prev, time: timeFromUrl }));
    }
  }, [timeFromUrl]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      alert("⚠️ กรุณากรอกชื่อผู้จองด้วยครับ");
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ จองสำเร็จเรียบร้อย!");
        router.push("/dashboard");
      } else {
        const result = await response.json();
        alert(`❌ ผิดพลาด: ${result.error || "จองไม่ได้"}`);
      }
    } catch (error) {
      alert("❌ เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-md font-prompt">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">สรุปรายการจอง</h1>
      <p className="text-center text-slate-400 mb-8 italic">Project by Patsapong</p>
      
      <form onSubmit={handleBooking} className="bg-white p-8 shadow-2xl rounded-[2rem] border border-slate-100 space-y-6">
        
        {/* ส่วนแสดงข้อมูลที่เลือกมาแล้ว (ReadOnly) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-2xl">
            <span className="text-slate-500">ช่วงเวลา</span>
            <span className="font-bold text-blue-700">{formData.time || "ไม่ได้ระบุ"}</span>
          </div>
          
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
            <span className="text-slate-500">วันที่จอง</span>
            <span className="font-bold text-slate-700">{new Date(formData.date).toLocaleDateString('th-TH')}</span>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* ส่วนที่ลูกค้าต้องกรอก: ชื่อ */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            👤 ชื่อผู้จอง <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="กรอกชื่อ-นามสกุล ของคุณ"
            className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})} 
            required 
            autoFocus
          />
        </div>

        {/* จำนวนคน (สามารถกดเลือกได้ง่ายๆ) */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">👥 จำนวนคน</label>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
            <button 
              type="button"
              onClick={() => setFormData(prev => ({...prev, guests: Math.max(1, prev.guests - 1)}))}
              className="w-12 h-12 bg-white rounded-xl shadow-sm text-xl font-bold hover:bg-red-50 hover:text-red-500 transition-colors"
            > - </button>
            <span className="flex-1 text-center font-bold text-xl">{formData.guests}</span>
            <button 
              type="button"
              onClick={() => setFormData(prev => ({...prev, guests: Math.min(20, prev.guests + 1)}))}
              className="w-12 h-12 bg-white rounded-xl shadow-sm text-xl font-bold hover:bg-green-50 hover:text-green-500 transition-colors"
            > + </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200 text-lg"
        >
          ยืนยันการจองทันที 🚀
        </button>

        <button 
          type="button"
          onClick={() => router.back()}
          className="w-full text-slate-400 font-medium py-2 hover:text-slate-600 transition-colors"
        >
          ย้อนกลับไปเปลี่ยนเวลา
        </button>
      </form>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-center p-20 font-bold text-blue-600 animate-pulse">กำลังเตรียมข้อมูลการจอง...</div>}>
      <BookingForm />
    </Suspense>
  );
}