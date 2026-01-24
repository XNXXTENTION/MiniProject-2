// app/products/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import ProductSearch from '@/components/product-search'
import { api } from '@/lib/axios' // 1. Import axios instance ที่เราสร้างไว้

// 1. กำหนดโครงสร้างข้อมูล (Interface) เพื่อให้ TypeScript ช่วยเช็ค error
interface Product {
  id: number
  name: string
  price: number
  barcode?: string
  image?: string
}

// 2. กำหนด Type สำหรับ Props ของหน้า Page (ใน Next.js searchParams จะเป็น Promise)
interface ProductsPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

// 3. ฟังก์ชันดึงข้อมูลทั้งหมดจาก API (Server-side function)
// async function getProducts() {
//   // Next.js จะทำการ Caching ข้อมูลนี้ให้อัตโนมัติ
//   const res = await fetch('https://backend.codingthailand.com/v2/products');

//   if (!res.ok) {
//     // ถ้า API พัง Next.js จะไปเรียกหน้า error.tsx มาแสดงแทน
//     throw new Error('Failed to fetch products')
//   }

//   const data = await res.json()
//   return data as Product[]
// }

async function getProducts() { 
  try {
    // 2. ใช้ api.get แทน fetch 
    // สังเกตว่าไม่ต้องใส่ URL เต็ม เพราะเราตั้ง baseURL ไว้แล้วใน lib/axios.ts
    const response = await api.get<Product[]>('/products')
    
    // 3. Axios เก็บข้อมูลจริงไว้ใน property ชื่อ 'data'
    return response.data 
  } catch (error) {
    // 4. Axios จะ throw error อัตโนมัติถ้า HTTP status ไม่ใช่ 2xx
    // ซึ่ง Next.js จะไปเรียกไฟล์ error.tsx ที่เราสร้างไว้ให้ทำงานทันที
    throw new Error('Failed to fetch products with Axios')
  }
}

// 4. ฟังก์ชันสำหรับกรองข้อมูล (Search Logic) รันบน Server
async function searchProducts(query: string) {
  const products = await getProducts()
  return products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}

// 5. Main Page Component (ต้องเป็น async เพราะมีการดึงข้อมูล)
export default async function ProductsPage({ searchParams }: ProductsPageProps) {

  // รอรับค่า search จาก URL เช่น /products?search=iphone
  const search = (await searchParams).search?.trim()

  // เลือกว่าจะดึงข้อมูลทั้งหมด หรือดึงตามคำค้นหา
  const products = search
    ? await searchProducts(search)
    : await getProducts()

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">รายการสินค้า</h1>

      {/* ส่วนช่องค้นหา (Client Component) */}
      <ProductSearch initialQuery={search} />

      {/* ส่วนแสดงผลข้อมูล */}
      {products.length === 0 ? (
        <p className="text-slate-600">ไม่พบสินค้าที่ค้นหา</p>
      ) : (
        <>
          <p className="mb-4 text-slate-600">
            พบ {products.length} รายการ
            {search ? ` สำหรับ "${search}"` : ''}
          </p>

          {/* Grid Responsive: มือถือ 2 คอลัมน์, แท็บเล็ต 3, จอคอม 4 */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block overflow-hidden rounded-lg border border-slate-200 transition hover:shadow-md bg-white"
              >

                <div className="relative h-48 bg-slate-100">
                  {/* ถ้ามี product.image ให้ใช้รูปนั้น ถ้าไม่มี (||) ให้ใช้รูปจาก picsum.photos แทน */}
                  <Image
                    src={
                      product.image ||
                      `https://picsum.photos/seed/${product.id}/400/300` ||
                      '/images/No_image_available.svg' // ค่าสำรองสุดท้าย (ควรเป็นรูปที่มีอยู่ในเครื่องเราจริง)
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* ส่วนแสดงรายละเอียดสินค้า */}
                <div className="p-4">
                  <h2 className="mb-2 text-sm font-medium line-clamp-2 text-slate-800">
                    {product.name}
                  </h2>
                  <p className="font-bold text-blue-600">
                    ฿{product.price?.toLocaleString() || 'ไม่ระบุ'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  )
}