// app/cache-demo/page.tsx
import { Suspense } from 'react'
import CategoryList from '@/components/category-list'
import ProductSearchContainer from '@/components/product-search-container'

interface CacheDemoPageProps {
  searchParams: Promise<{ barcode?: string }>
}

export default async function CacheDemoPage({ searchParams }: CacheDemoPageProps) {
  // ใน Next.js 15, searchParams เป็น Promise ต้อง await ก่อนใช้งาน (Runtime Parsing)
  const params = await searchParams
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Cache Component Demo</h1>
      
      <div className="space-y-12">
        {/* 🟢 ส่วนที่ 1: Cached Content (Static Shell) */}
        {/* Render ทันที เพราะ Next.js รู้ว่ามีข้อมูลอยู่ใน Cache แล้ว */}
        <section className="rounded-lg bg-green-50 p-6 shadow-sm">
          <CategoryList />
        </section>

        {/* 🔵 ส่วนที่ 2: Dynamic Content (Streaming Content) */}
        {/* ต้องรอ Network API ดังนั้นต้องมี Suspense มาคุมเพื่อทำ Non-blocking Rendering */}
        <section className="rounded-lg bg-blue-50 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">ค้นหาสินค้าด้วยบาร์โค้ด</h2>
          <p className="mb-4 text-sm text-slate-600">ข้อมูลนี้ดึงใหม่จาก API ทุกครั้ง (No Cache)</p>
          
          <Suspense 
            key={params.barcode || 'empty'} 
            fallback={<SearchLoader />} 
          >
            <ProductSearchContainer barcode={params.barcode} />
          </Suspense>
        </section>
      </div>
    </div>
  )
}

// Loading UI ขนาดเล็กเฉพาะส่วน (Local Fallback)
function SearchLoader() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-inner">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
      <p className="mt-4 text-slate-600">กำลังส่ง Request ไปยัง API...</p>
    </div>
  )
}