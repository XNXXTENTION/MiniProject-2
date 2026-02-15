"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SeatSelectionPage() {
  const router = useRouter();

  //ส่วนของการเก็บข้อมูล[State]
  const [bookedSeats, setBookedSeats] = useState<string[]>([]); //เก็บรายชื่อโต๊ะที่ถูกจองแล้ว
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null); //เก็บโต๊ะที่ลูกค้ากำลังเลือก

  //ส่วนของการดึงข้อมูลจาก[Database]
  useEffect(() => {
    async function loadSeats() {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        //ดึงเอาแค่เลขโต๊ะ[seatNumber]จากข้อมูลการจองทั้งหมด
        const occupied = data.map((item: any) => item.seatNumber);
        setBookedSeats(occupied);
      } catch (error) {
        console.error("Error loading seats:", error);
      }
    }
    loadSeats();
  }, []);

  //สร้างเลข[โต๊ะ]
  const allSeats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

  //ฟังก์ชันอัปเดตโต๊ะที่เลือก
  const handleSelect = (seatName: string) => {
    setSelectedSeat(seatName);
  };

  const handleConfirm = () => {
    if (selectedSeat) {
      //ส่งเลขโต๊ะไปที่หน้าจองผ่าน[URL-Parameter]
      router.push(`/booking?seat=${selectedSeat}`);
    }
  };

  //ส่วนการแสดงผล[UI]
  return (
    <main className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">กรุณาเลือกโต๊ะ</h1>
      
      {/*ส่วนของผังที่นั่ง*/}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {allSeats.map((seat) => {
          const isBooked = bookedSeats.includes(seat); // เช็คว่าโต๊ะนี้จองไปยัง
          const isSelected = selectedSeat === seat;    // เช็คว่าเราจองอันนี้อยู่ไหม

          return (
            <button
              key={seat}
              disabled={isBooked}
              onClick={() => handleSelect(seat)}
              className={`p-4 rounded-lg font-bold transition-colors
                ${isBooked ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}
                ${isSelected ? "bg-blue-500 text-white ring-2 ring-blue-800" : ""}
                ${!isBooked && !isSelected ? "bg-green-500 text-white hover:bg-green-600" : ""}
              `}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {/*ปุ่มยืนยัน*/}
      <button
        onClick={handleConfirm}
        disabled={!selectedSeat}
        className={`w-full py-3 rounded-xl font-bold text-white transition-all
          ${selectedSeat ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
        `}
      >
        {selectedSeat ? `ยืนยันเลือกโต๊ะ ${selectedSeat}` : "กรุณาเลือกโต๊ะที่ต้องการ"}
      </button>
    </main>
  );
}