'use client' // บอกว่าเป็น Client Component เพราะมีการใช้ Hook และ Event

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ProductSearch({ initialQuery = '' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // สร้าง State เพื่อเก็บสิ่งที่ User พิมพ์
  const [query, setQuery] = useState(searchParams.get('search') || initialQuery)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      // เปลี่ยน URL เป็น /products?search=...
      router.push(`/products?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/products')
    }
  }

  return (
    <form onSubmit={handleSearch} className="mb-8 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาสินค้า..."
        className="flex-1 rounded-lg border border-slate-300 px-3 py-3 text-base"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors"
      >
        ค้นหา
      </button>
    </form>
  )
}