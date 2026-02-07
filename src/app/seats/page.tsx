"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SeatSelectionPage() {
  const router = useRouter();
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  // 1. ดึงข้อมูลที่นั่งที่ถูกจองแล้วจากฐานข้อมูลจริง
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        
        // ดึงเฉพาะ seatNumber จากข้อมูลการจองใน SQLite
        const occupied = data.map((b: any) => b.seatNumber);
        setBookedSeats(occupied);
      } catch (error) {
        console.error("ไม่สามารถโหลดข้อมูลที่นั่งได้:", error);
      }
    };
    fetchBookedSeats();
  }, []);

  // รายชื่อที่นั่งในร้าน (คุณสามารถเพิ่มหรือลดได้ตามใจชอบ)
  const seats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

  const handleSeatClick = (seat: string) => {
    // ถ้าที่นั่งอยู่ในรายการ bookedSeats (สีแดง) จะกดไม่ได้
    if (bookedSeats.includes(seat)) return;
    setSelectedSeat(seat);
  };

  const goToBooking = () => {
    if (selectedSeat) {
      // ส่งเลขที่นั่งไปยังหน้าจองผ่าน URL Query
      router.push(`/booking?seat=${selectedSeat}`);
    }
  };

  return (
    <main className="container mx-auto p-8 text-center min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">แผนผังที่นั่งในร้าน</h1>
      <p className="text-slate-500 mb-8">โปรดเลือกที่นั่งที่คุณต้องการก่อนกรอกข้อมูลการจอง</p>
      
      {/* ส่วนแสดงสถานะสี (Legend) */}
      <div className="flex justify-center gap-6 mb-10 bg-white p-4 rounded-2xl shadow-sm max-w-fit mx-auto border border-slate-100">
        <div className="flex items-center text-sm font-medium text-slate-600">
          <span className="w-5 h-5 bg-green-500 rounded-lg mr-2 shadow-sm shadow-green-200"></span> โต๊ะว่าง
        </div>
        <div className="flex items-center text-sm font-medium text-slate-600">
          <span className="w-5 h-5 bg-red-500 rounded-lg mr-2 shadow-sm shadow-red-200"></span> จองโต๊ะแล้ว
        </div>
        <div className="flex items-center text-sm font-medium text-slate-600">
          <span className="w-5 h-5 bg-blue-500 rounded-lg mr-2 shadow-sm shadow-blue-200"></span> ที่คุณเลือก
        </div>
      </div>

      {/* แผนผังที่นั่ง (Grid Layout) */}
      <div className="grid grid-cols-4 gap-6 max-w-sm mx-auto mb-12">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeat === seat;

          return (
            <button
              key={seat}
              disabled={isBooked}
              onClick={() => handleSeatClick(seat)}
              className={`h-16 rounded-2xl font-bold transition-all duration-200 shadow-md flex items-center justify-center ${
                isBooked 
                  ? "bg-red-500 text-white cursor-not-allowed opacity-80 scale-95" 
                  : isSelected 
                    ? "bg-blue-500 text-white ring-4 ring-blue-100 scale-110" 
                    : "bg-green-500 text-white hover:bg-green-600 hover:scale-105"
              }`}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {/* ปุ่มไปต่อ */}
      <button 
        onClick={goToBooking}
        disabled={!selectedSeat}
        className={`px-12 py-4 rounded-2xl font-bold text-lg text-white transition-all shadow-xl ${
          selectedSeat 
            ? "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200" 
            : "bg-slate-300 cursor-not-allowed"
        }`}
      >
        {selectedSeat ? `จองที่นั่ง ${selectedSeat} และกรอกข้อมูล` : "โปรดเลือกที่นั่ง"}
      </button>
    </main>
  );
}