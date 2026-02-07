"use client";
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section: ส่วนต้อนรับด้านบน */}
      <section className="relative h-[80vh] flex items-center justify-center bg-slate-900 text-white">
        {/* ใส่ภาพพื้นหลังสวยๆ หรือใช้สี Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-slate-900 z-0"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            UP Restaurant
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-2xl mx-auto">
            สัมผัสประสบการณ์การทานอาหารที่เหนือระดับ 
            พร้อมระบบจองโต๊ะที่รวดเร็วและแม่นยำที่สุดหน้า ม.พะเยา
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              จองโต๊ะตอนนี้
            </Link>
            <Link href="/about" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all">
              รู้จักเรามากขึ้น
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section: จุดเด่นของร้าน */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-800">ทำไมต้องเลือกเรา?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 hover:shadow-lg transition-all border border-slate-100">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-2">จองง่ายใน 1 นาที</h3>
              <p className="text-slate-600">ระบบจองแบบ Real-time ที่ช่วยให้คุณไม่ต้องรอคิวนานอีกต่อไป</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 hover:shadow-lg transition-all border border-slate-100">
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="text-xl font-bold mb-2">วัตถุดิบคุณภาพ</h3>
              <p className="text-slate-600">คัดสรรวัตถุดิบสดใหม่จากเกษตรกรในจังหวัดพะเยาทุกวัน</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 hover:shadow-lg transition-all border border-slate-100">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2">ระบบจัดการทันสมัย</h3>
              <p className="text-slate-600">เทคโนโลยีจากนิสิตคอมพิวเตอร์ UP เพื่อความถูกต้องของข้อมูล</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Quick Access: สำหรับนิสิตไว้ใช้พรีเซนต์งาน */}
      <section className="py-10 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm mb-4">ส่วนจัดการสำหรับเจ้าของร้าน (Admin Only)</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline font-semibold">
            เข้าสู่ระบบ Dashboard เพื่อจัดการข้อมูลการจอง →
          </Link>
        </div>
      </section>
    </main>
  );
}