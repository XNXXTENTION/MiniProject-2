import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. [CREATE] บันทึกการจอง พร้อมเช็คที่นั่งซ้ำ
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, date, time, guests, seatNumber } = body;

    // ตรวจสอบว่าที่นั่งนี้ ในวันนี้ มีการจองไปแล้วหรือยัง
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

    // ถ้ายังไม่มีการจอง ให้บันทึกข้อมูล
    const newBooking = await prisma.booking.create({
      data: {
        customerName: name,
        date: new Date(date),
        time: time,
        guests: Number(guests),
        seatNumber: seatNumber,
      },
    });
    
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "บันทึกข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}

// 2. [READ] ดึงรายการทั้งหมดไปโชว์ที่ Dashboard
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

// 3. [UPDATE] แก้ไขเวลาหรือจำนวนคน
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, time, guests } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { 
        time: time,
        guests: Number(guests) 
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    return NextResponse.json({ error: "แก้ไขข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}

// 4. [DELETE] ยกเลิกการจอง
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