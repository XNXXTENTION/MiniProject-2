// นำเข้า Components และ Types ที่จำเป็น
import Link from 'next/link' // สำหรับการนำทางระหว่างหน้า
import Image from 'next/image'; // Component รูปภาพที่ปรับขนาดอัตโนมัติ
import { Metadata } from "next" // Type สำหรับ SEO metadata
import ProductSearch from '@/app/components/product-search' // นำเข้า Client Component สำหรับค้นหา

// Static Metadata สำหรับหน้ารายการสินค้า
export const metadata: Metadata = {
  title: 'รายการสินค้า',
  description: 'ดูสินค้าทั้งหมดในร้านค้า พร้อมฟีเจอร์ค้นหา',
  openGraph: {
    title: 'รายการสินค้า | My Next.js App',
    description: 'ค้นหาและเลือกซื้อสินค้าที่คุณต้องการ',
  }
}

// กำหนด Props ที่หน้านี้จะรับจาก URL (Query Parameters)
interface ProductsPageProps {
  searchParams: Promise<{
    search?: string // คำค้นหาที่ผู้ใช้พิมพ์ในช่องค้นหา (ไม่บังคับ)
  }>
}

// กำหนดโครงสร้างข้อมูลของสินค้าแต่ละชิ้น (TypeScript Interface)
interface Product {
  id: number;                // รหัสสินค้า (ไม่ซ้ำกัน)
  name: string;              // ชื่อสินค้า
  price: number;             // ราคาสินค้า (บาท)
  category: string;          // หมวดหมู่สินค้า เช่น phone, laptop, audio
  description?: string;      // คำอธิบายสินค้า (ไม่บังคับ - มีเครื่องหมาย ?)
  image: string;             // URL ของรูปภาพสินค้า
}

// ข้อมูลสินค้าทั้งหมด (Mock Data - ในโปรเจคจริงควรดึงจาก API หรือ Database)
const products: Product[] = [
  { id: 1, name: 'โทรศัพท์มือถือ Samsung Galaxy S24', price: 25900, category: 'phone', description: 'สมาร์ทโฟนรุ่นล่าสุดพร้อมกล้อง AI และหน้าจอ Dynamic AMOLED 2X', image: '/products/galaxy-s24.jpg' },
  { id: 2, name: 'แล็ปท็อป MacBook Air M3', price: 42900, category: 'laptop', description: 'แล็ปท็อปบางเบาพร้อมชิป M3 ประสิทธิภาพสูงและแบตเตอรี่ใช้งานได้ยาวนาน', image: '/products/macbook-air.jpg'},
  { id: 3, name: 'หูฟังไร้สาย AirPods Pro', price: 8990, category: 'audio', description: 'หูฟังระดับพรีเมียมพร้อม Active Noise Cancellation และ Spatial Audio', image: '/products/airpods-pro.jpg' },
  { id: 4, name: 'แท็บเล็ต iPad Air', price: 21900, category: 'tablet', description: 'แท็บเล็ตอเนกประสงค์พร้อมชิป M2 และจอ Liquid Retina ขนาด 11 นิ้ว', image: '/products/ipad-air.jpg' },
  { id: 5, name: 'โทรศัพท์มือถือ iPhone 15 Pro', price: 41900, category: 'phone', description: 'iPhone รุ่นท็อปพร้อมชิป A17 Pro และกล้องระดับมืออาชีพ', image: '/products/iphone15-pro.jpg' },
  { id: 6, name: 'หูฟัง Sony WH-1000XM3', price: 7990, category: 'audio', description: 'หูฟังตัดเสียงรบกวนระดับพรีเมียม', image: '/products/sony-wh1000xm3.jpg' },
];

/**
 * ค้นหาสินค้าจาก ID
 * @param id - รหัสสินค้าที่ต้องการค้นหา
 * @returns สินค้าที่พบ หรือ undefined ถ้าไม่พบ
 */
function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

/**
 * หน้ารายการสินค้าทั้งหมด พร้อมฟีเจอร์ค้นหา
 * เป็น Server Component (รันบน Server)
 */
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // รอรับค่า searchParams (เป็น Promise ใน Next.js 15+)
  const { search } = await searchParams
  
  // กรองสินค้าตามคำค้นหา (ถ้ามี)
  // - ถ้ามีคำค้นหา: กรองเฉพาะสินค้าที่ชื่อตรงกับคำค้นหา (ไม่สนพิมพ์ใหญ่-เล็ก)
  // - ถ้าไม่มีคำค้นหา: แสดงสินค้าทั้งหมด
  const filteredProducts = search
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : products

  return (
    <main className="container mx-auto px-4 py-8">
      {/* หัวข้อหลักของหน้า */}
      <h1 className="text-3xl font-bold mb-6">รายการสินค้า</h1>
      
      {/* Component สำหรับค้นหาสินค้า (Client Component) */}
      <ProductSearch initialQuery={search || ''} />

      {/* แสดงผลตามจำนวนสินค้าที่พบ */}
      {filteredProducts.length === 0 ? (
        // กรณีไม่พบสินค้า: แสดงข้อความและปุ่มล้างค่า
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
            <p className="text-slate-500 text-lg">ไม่พบสินค้าที่ค้นหาสำหรับ "{search}"</p>
            <Link href="/products" className="text-blue-600 hover:underline mt-2 inline-block">ล้างการค้นหา</Link>
        </div>
      ) : (
        <>
          {/* แสดงจำนวนสินค้าที่พบ */}
          <p className="mb-6 text-slate-600">
            พบ <strong>{filteredProducts.length}</strong> รายการ
            {search && <span> สำหรับ <mark className="bg-yellow-100 px-1">"{search}"</mark></span>}
          </p>

          {/* Grid Layout แบบ Responsive สำหรับแสดงสินค้า */}
          {/* 1 คอลัมน์บนมือถือ, 2 คอลัมน์บน Tablet, 3 คอลัมน์บน Desktop, 4 คอลัมน์บนจอใหญ่ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              // Card สินค้าแต่ละชิ้น (ใช้ key={product.id} เพื่อ React จะได้ Track ได้)
              <div key={product.id} className="group flex flex-col border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
                
                {/* ส่วนแสดงรูปภาพสินค้า */}
                {/* ต้องมี relative และ overflow-hidden เพื่อให้ Image component fill ทำงานได้ */}
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <Image
                    src={product.image}           // ที่อยู่รูปภาพ
                    alt={product.name}            // คำอธิบายรูป (สำคัญสำหรับ SEO และ Accessibility)
                    fill                          // ทำให้รูปเต็มพื้นที่ Container (แทน width/height)
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // บอก Browser ขนาดรูปที่ต้องการ
                    className="object-cover transition-transform duration-500 group-hover:scale-110" // Hover ซูมรูป
                    priority={product.id === 1}   // รูปแรกโหลดทันที (ปรับปรุง LCP - Largest Contentful Paint)
                  />
                </div>

                {/* ส่วนข้อมูลสินค้า (ชื่อ, ราคา, หมวดหมู่) */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* ชื่อสินค้า - คลิกได้ไปหน้ารายละเอียด */}
                  <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-2"> {/* line-clamp-2 = แสดงแค่ 2 บรรทัด */}
                      {product.name}
                    </h2>
                  </Link>
                  
                  {/* ส่วนราคาและหมวดหมู่ - ใช้ mt-auto เพื่อดันไปด้านล่างสุด */}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    {/* ราคา - ใช้ toLocaleString() เพื่อใส่ comma คั่นหลักพัน */}
                    <p className="text-xl font-bold text-blue-600">
                      ฿{product.price.toLocaleString()}
                    </p>
                    {/* Badge หมวดหมู่สินค้า */}
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                        {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}