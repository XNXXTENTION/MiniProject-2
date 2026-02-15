"use client";
import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/*ส่วนหัวของหน้า*/}
      <section className="relative h-72 bg-blue-600 flex items-center justify-center text-white text-center">
        {/*ร์พื้นหลัง*/}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">เกี่ยวกับเรา</h1>
          <p className="text-blue-100 italic text-lg">"รสชาติแห่งความสุข ที่คุณจองได้เพียงปลายนิ้ว"</p>
        </div>
      </section>

      {/*เนื้อหาหลัก*/}
      <section className="container mx-auto px-6 py-12 -mt-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/*การ์ด[ความเป็นมา]*/}
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-600 mb-5 flex items-center">
              <span className="bg-blue-50 p-2 rounded-lg mr-3">🏠</span> 
              ความเป็นมาของร้าน
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              ร้านอาหารของเราเริ่มต้นจากความตั้งใจที่จะมอบประสบการณ์การรับประทานอาหารที่พิเศษที่สุด 
              เราคัดสรรวัตถุดิบคุณภาพเยี่ยมจากท้องถิ่นในจังหวัดพะเยา นำมาปรุงด้วยหัวใจ 
              เพื่อให้ทุกจานที่เสิร์ฟคือความประทับใจสำหรับคุณและคนที่คุณรัก
            </p>
          </div>

          {/*รายละเอียดเพิ่มเติม[สถานที่/เวลา]*/}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="text-red-500 mr-2">📍</span> สถานที่ตั้ง
              </h3>
              <p className="text-slate-500 leading-relaxed">
                หน้ามหาวิทยาลัยพะเยา (ประตู 1) <br />
                ต.แม่กา อ.เมือง จ.พะเยา
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="text-blue-500 mr-2">⏰</span> เวลาเปิด-ปิด
              </h3>
              <p className="text-slate-500 leading-relaxed">
                เปิดให้บริการทุกวันจันทร์ - อาทิตย์ <br />
                ตั้งแต่เวลา 10:00 น. - 21:00 น.
              </p>
            </div>
          </div>

          {/*การ์ด[ติดต่อเรา]*/}
          <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-10 rounded-[2rem] shadow-2xl text-white text-center">
            <h2 className="text-2xl font-bold mb-6">สนใจจัดเลี้ยงหรือสอบถามข้อมูลเพิ่มเติม</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex items-center text-lg hover:scale-105 transition-transform">
                <span className="bg-white/20 p-2 rounded-full mr-3 text-xl">📞</span> 
                054-123-456
              </div>
              <div className="flex items-center text-lg hover:scale-105 transition-transform">
                <span className="bg-white/20 p-2 rounded-full mr-3 text-xl">🌐</span> 
                www.up-restaurant.com
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}