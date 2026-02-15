"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  //แปลค่า[URL]จากหน้า[seats]จากที่แล้วมาเก็บใน[seatFromUrl]
  const seatFromUrl = searchParams.get("seat") || ""; 

  //สร้างเก็บข้อมูลให้ชื่อตรงกับ[Database]เก็บค่าที่กรอก
  const [formData, setFormData] = useState({
    customerName: "",
    date: "",
    time: "",
    guests: 1,
    seatNumber: seatFromUrl,
  });

  //ถ้า[URL]เปลี่ยนกดเลือกโต๊ะใหม่ให้รีบอัปเดตค่าในฟอร์มทันที
  //ชื่อโต๊ะอาจมาช้ากว่าเข้าเว็บ
  useEffect(() => {
    if (seatFromUrl) {
      setFormData((prev) => ({ ...prev, seatNumber: seatFromUrl }));
    }
  }, [seatFromUrl]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();// ป้องกันไม่ให้หน้าเว็บ Refresh เอง

    //ตรวจสอบวันที่ห้ามจองย้อนหลัง
    const now = new Date();// เวลาปัจจุบัน (รวมชั่วโมง/นาที)
    const selectedDate = new Date(formData.date); //เปลี่ยนคอมพิวเตอร์สามารถคำนวณและเปรียบเทียบได้ครับ
    const todayAtMidnight = new Date();//กำหนกให้เที่ยงคือเพราะเวลาน้อยที่สุด

    todayAtMidnight.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);//กำหนกให้เที่ยงคือเพราะเวลาน้อยที่สุด

    if (selectedDate < todayAtMidnight) {
      alert("❌ ไม่สามารถจองวันที่ย้อนหลังได้");
      return;
    }

    if (selectedDate.getTime() === todayAtMidnight.getTime()) {//เลือกวันนี้ไหม
      const [h, m] = formData.time.split(":").map(Number);//แปลงเป็น"ชั่วโมง"และ"นาที"[16:30]และจะเปลี่ยนพวกมันให้กลายเป็นตัวเลขเพื่อเอาไปคำนวณครับ
      const selectedTime = new Date();
      selectedTime.setHours(h, m, 0, 0);//ตั้งเวลาให้ตรงกับที่ากรอกมา

      if (selectedTime < now) {
        alert("❌ เวลาปัจจุบันคือ " + now.toLocaleTimeString() + " คุณเลือกเวลาที่ผ่านมาแล้ว!");
        return;
      }
    }

    //ส่งข้อมูลไปยัง[API]
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),//แปลงก้อนข้อมูลให้กลายเป็น[String]ส่งไป[Server]
      });

      if (response.ok) {
        alert("✅ จองโต๊ะสำเร็จ!");
        router.push("/dashboard");//จองเสร็จแล้วพาไปหน้าดูรายการจองทั้งหมด
      } else {
        const result = await response.json();
        alert(`❌ ผิดพลาด: ${result.error || "จองไม่ได้"}`);
      }
    } catch (error) {
      alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-md">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">ระบุข้อมูลการจอง</h1>
      
      <form onSubmit={handleBooking} className="bg-white p-8 shadow-xl rounded-2xl border border-slate-100 space-y-4">
        {/* แสดงเลขโต๊ะที่เลือกมา[แก้ไขไม่ได้]*/}
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <span className="text-slate-600">เลขโต๊ะที่เลือก: </span>
          <span className="font-bold text-blue-700 text-xl">{formData.seatNumber || "ยังไม่ได้เลือก"}</span>
        </div>

        {/*ชื่อผู้จอง*/}
        <div>
          <label className="block text-sm font-semibold mb-1">ชื่อลูกค้า:</label>
          <input 
            type="text" 
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            //onChangeดูทุกครั้งทีพิมพ์
            //...คือcopyข้อมูล
            onChange={(e) => setFormData({...formData, customerName: e.target.value})} 
            required 
          />
        </div>

        {/*วันที่*/}
        <div>
          <label className="block text-sm font-semibold mb-1">วันที่จอง:</label>
          <input 
            type="date" 
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setFormData({...formData, date: e.target.value})} 
            required 
          />
        </div>

        {/*เวลา*/}
        <div>
          <label className="block text-sm font-semibold mb-1">เวลาที่จอง:</label>
          <input 
            type="time" 
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setFormData({...formData, time: e.target.value})} 
            required 
          />
        </div>

        {/*จำนวนคน*/}
        <div>
          <label className="block text-sm font-semibold mb-1">จำนวน (คน):</label>
          <input 
            type="number" 
            min="1" max="20"
            value={formData.guests}
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})} 
            required 
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-transform active:scale-95 shadow-lg">
          ยืนยันการจองโต๊ะ {formData.seatNumber}
        </button>
      </form>
    </main>
  );
}

//ใช้[Suspense]ครอบตามมาตรฐาน[Next.js]เพื่อให้อ่านค่าจาก[URL]ได้ถูกต้อง
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-center p-10 font-bold">กำลังโหลดฟอร์ม...</div>}>
      <BookingForm />
    </Suspense>
  );
}