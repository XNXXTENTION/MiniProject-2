"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      
      <section className="relative h-[85vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        {/*พื้นหลัง*/}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-slate-900 to-black opacity-80 z-0"></div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            UP <span className="text-blue-500">RESTAURANT</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            ระบบจองโต๊ะอาหารอัจฉริยะ พัฒนาโดยนิสิตวิทยาการคอมพิวเตอร์ 
            <br className="hidden md:block" /> มหาวิทยาลัยพะเยา
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="/seats" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-blue-500/20 active:scale-95">
              เริ่มการจองโต๊ะ
            </Link>
            <Link href="/dashboard" 
              className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-xl backdrop-blur-sm transition-all">
              จัดการหลังบ้าน
            </Link>
          </div>
        </div>
      </section>

      {/*ข้อมูลประกอบการตัดสินใจ*/}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">ทำไมต้องใช้ระบบของเรา?</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/*Card[1]*/}
          <div className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800">รวดเร็ว</h3>
            <p className="text-slate-600 leading-relaxed">
              ลดขั้นตอนการรอคิวด้วยระบบจองแบบ Real-time ที่เชื่อมต่อกับฐานข้อมูล SQLite โดยตรง
            </p>
          </div>

          {/*Card[2]*/}
          <div className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800">แม่นยำ</h3>
            <p className="text-slate-600 leading-relaxed">
              ระบุเลขโต๊ะที่ต้องการได้ทันทีผ่านแผนผังร้าน หมดปัญหาการจองซ้ำซ้อน
            </p>
          </div>

          {/*Card[3]*/}
          <div className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🛠️</div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800">จัดการง่าย</h3>
            <p className="text-slate-600 leading-relaxed">
              มีระบบ Dashboard สำหรับแอดมินในการตรวจสอบ แก้ไข และยกเลิกการจองได้อย่างอิสระ
            </p>
          </div>
        </div>
      </section>

      {/*ข้อมูลส่งท้าย*/}
      <footer className="py-12 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-slate-500 font-medium italic">
          &copy; 2026 CS @ University of Phayao - Final Project
        </p>
      </footer>
    </main>
  );
}