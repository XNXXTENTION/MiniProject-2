"use client";
import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-64 bg-blue-600 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">เกี่ยวกับเรา</h1>
          <p className="text-blue-100 italic">"รสชาติแห่งความสุข ที่คุณจองได้เพียงปลายนิ้ว"</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 -mt-10">
        <div className="max-w-4xl mx-auto">
          {/* Card 1: Story */}
          <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
              <span className="mr-2">🏠</span> ความเป็นมาของร้าน
            </h2>
            <p className="text-slate-600 leading-relaxed">
              ร้านอาหารของเราเริ่มต้นจากความตั้งใจที่จะมอบประสบการณ์การรับประทานอาหารที่พิเศษที่สุด 
              เราคัดสรรวัตถุดิบคุณภาพเยี่ยมจากท้องถิ่นในจังหวัดพะเยา นำมาปรุงด้วยหัวใจ 
              เพื่อให้ทุกจานที่เสิร์ฟคือความประทับใจสำหรับคุณและคนที่คุณรัก
            </p>
          </div>

          {/* Grid Section: Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:transform hover:scale-105 transition-all">
              <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                <span className="mr-2">📍</span> สถานที่ตั้ง
              </h3>
              <p className="text-slate-500 text-sm">
                หน้ามหาวิทยาลัยพะเยา (ประตู 1) <br />
                ต.แม่กา อ.เมือง จ.พะเยา
              </p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:transform hover:scale-105 transition-all">
              <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                <span className="mr-2">⏰</span> เวลาเปิด-ปิด
              </h3>
              <p className="text-slate-500 text-sm">
                เปิดให้บริการทุกวัน <br />
                10:00 น. - 21:00 น.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-3xl shadow-xl text-white text-center">
            <h2 className="text-2xl font-bold mb-4">สนใจจัดเลี้ยงหรือสอบถามข้อมูล</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <span className="mr-2">📞</span> 054-123-456
              </div>
              <div className="flex items-center">
                <span className="mr-2">🌐</span> www.up-restaurant.com
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}