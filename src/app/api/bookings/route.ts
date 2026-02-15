import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//[POST]บันทึกข้อมูลการจองใหม่
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    //ดึงค่าโดยใช้ชื่อ[customerName]ให้ตรงกับหน้าบ้านและ[Schema]
    const { customerName, date, time, guests, seatNumber } = body;

    //ตรวจสอบเบื้องต้นว่ามีข้อมูลครบไหม
    if (!customerName || !date || !seatNumber) {
      return NextResponse.json({ error: "❌ ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    //ตรวจสอบว่าโต๊ะนี้-ในวันนี้-มีคนจองไปหรือยัง[ป้องกันการจองซ้ำ]
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: new Date(date),
        seatNumber: seatNumber,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "❌ ที่นั่งนี้ถูกจองไปแล้วในวันที่ระบุ" }, 
        { status: 400 }
      );
    }

    //บันทึกลง[Database]
    const newBooking = await prisma.booking.create({
      data: {
        customerName: customerName,
        date: new Date(date),
        time: time,
        guests: Number(guests),
        seatNumber: seatNumber,
      },
    });
    
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: "บันทึกข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}

//[GET]ดึงรายการจองทั้งหมด
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "ดึงข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}

//[DELETE]ลบรายการจอง-ใช้IDจากURL
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ต้องระบุ ID" }, { status: 400 });

    await prisma.booking.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "ลบรายการสำเร็จ" });
  } catch (error) {
    return NextResponse.json({ error: "ไม่สามารถลบได้" }, { status: 500 });
  }
}