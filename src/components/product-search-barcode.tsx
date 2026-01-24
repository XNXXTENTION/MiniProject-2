// components/product-search-barcode.tsx
'use client' // ระบุว่าเป็น Client Component เพราะต้องใช้ State และ Event Handling

import { useState } from 'react'
import { Product } from '@/types/product'

// 1. กำหนดโครงสร้าง Props (Interface) เพื่อทำ Type Safety
interface ProductSearchProps {
  onSearch: (barcode: string) => void // Callback function ส่งค่ากลับไปหา Parent
  product: Product | null             // ข้อมูลสินค้า (ถ้ามี)
  isLoading: boolean                  // สถานะการโหลด (Network Request Pending)
  error: string | null                // ข้อความ Error (ถ้ามี)
}

export default function ProductSearchBarcode({
  onSearch,
  product,
  isLoading,
  error
}: ProductSearchProps) {
  // 2. Local State สำหรับเก็บค่าที่ User พิมพ์ใน Input (Controlled Component)
  const [barcode, setBarcode] = useState('')

  // 3. ฟังก์ชันจัดการการ Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // ป้องกัน Browser Refresh หน้าเว็บ (Default Behavior)
    if (barcode.trim()) {
      onSearch(barcode.trim()) // ส่งค่าที่ตัดช่องว่างออกแล้วไปให้ฟังก์ชัน Parent
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* ส่วนของแบบฟอร์มค้นหา */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="กรอกบาร์โค้ดสินค้า (เช่น 8851234567900)"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading} // ป้องกันการกดซ้ำขณะกำลังโหลด (Idempotency)
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-slate-400 transition-colors"
        >
          {isLoading ? 'กำลังค้นหา...' : 'ค้นหา'}
        </button>
      </form>

      {/* 4. Conditional Rendering: แสดงข้อความเมื่อเกิด Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* 5. Conditional Rendering: แสดงข้อมูลสินค้าเมื่อค้นพบ */}
      {product && (
        <div className="rounded-lg border border-slate-200 p-6 shadow-sm bg-white">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{product.name}</h3>
              <p className="text-sm text-slate-500">บาร์โค้ด: {product.barcode}</p>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {product.category.name}
            </span>
          </div>

          {product.description && (
            <p className="mb-4 text-slate-600 leading-relaxed">{product.description}</p>
          )}

          {/* แสดงราคาและสต็อกด้วย Grid Layout */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm text-green-700 font-medium">ราคาขาย</p>
              <p className="text-2xl font-bold text-green-600">
                ฿{Number(product.price).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-700 font-medium">สต็อกคงเหลือ</p>
              <p className="text-2xl font-bold text-slate-700">
                {product.stock.toLocaleString()} <span className="text-lg font-normal">ชิ้น</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}