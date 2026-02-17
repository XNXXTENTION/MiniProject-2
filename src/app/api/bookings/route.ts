import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// ป้องกันการสร้าง Prisma Instance ซ้ำซ้อนในโหมด Development 1
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// [GET] ดึงรายการจองทั้งหมด
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

// [POST] บันทึกข้อมูลการจองใหม่
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, date, time, guests, seatNumber } = body;

    const newBooking = await prisma.booking.create({
      data: {
        customerName,
        date: new Date(date), // ตรวจสอบว่า date ไม่เป็นค่าว่าง
        time,
        guests: Number(guests),
        seatNumber,
      },
    });
    
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Post Error:", error); // เพิ่ม log เพื่อดูปัญหาบน Vercel
    return NextResponse.json({ error: "บันทึกไม่สำเร็จ" }, { status: 500 });
  }
}

// [PATCH] แก้ไขข้อมูล
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, time, guests } = body;

    if (!id) return NextResponse.json({ error: "ต้องระบุ ID" }, { status: 400 });

    const updatedBooking = await prisma.booking.update({
      where: { 
        id: Number(id) 
      },
      data: {
        time: time,
        guests: Number(guests),
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "ไม่สามารถอัปเดตได้" }, { status: 500 });
  }
}

// [DELETE] ลบรายการจอง
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ต้องระบุ ID" }, { status: 400 });

    await prisma.booking.delete({
      where: { 
        id: Number(id) 
      },
    });

    return NextResponse.json({ message: "ลบรายการสำเร็จ" });
  } catch (error) {
    return NextResponse.json({ error: "ไม่สามารถลบได้" }, { status: 500 });
  }
}