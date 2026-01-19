import AddToCartButton from "@/app/components/add-to-cart-button"
import { Metadata } from "next"
import Image from "next/image"

// ข้อมูลสินค้าทั้งหมด (Mock Data - ในโปรเจคจริงควรดึงจาก API หรือ Database)
const products = [
  { id: 1, name: 'โทรศัพท์มือถือ Samsung Galaxy S24', price: 25900, category: 'phone', description: 'สมาร์ทโฟนรุ่นล่าสุดพร้อมกล้อง AI และหน้าจอ Dynamic AMOLED 2X', image: '/products/galaxy-s24.jpg' },
  { id: 2, name: 'แล็ปท็อป MacBook Air M3', price: 42900, category: 'laptop', description: 'แล็ปท็อปบางเบาพร้อมชิป M3 ประสิทธิภาพสูงและแบตเตอรี่ใช้งานได้ยาวนาน', image: '/products/macbook-air.jpg'},
  { id: 3, name: 'หูฟังไร้สาย AirPods Pro', price: 8990, category: 'audio', description: 'หูฟังระดับพรีเมียมพร้อม Active Noise Cancellation และ Spatial Audio', image: '/products/airpods-pro.jpg' },
  { id: 4, name: 'แท็บเล็ต iPad Air', price: 21900, category: 'tablet', description: 'แท็บเล็ตอเนกประสงค์พร้อมชิป M2 และจอ Liquid Retina ขนาด 11 นิ้ว', image: '/products/ipad-air.jpg' },
  { id: 5, name: 'โทรศัพท์มือถือ iPhone 15 Pro', price: 41900, category: 'phone', description: 'iPhone รุ่นท็อปพร้อมชิป A17 Pro และกล้องระดับมืออาชีพ', image: '/products/iphone15-pro.jpg' },
  { id: 6, name: 'หูฟัง Sony WH-1000XM3', price: 7990, category: 'audio', description: 'หูฟังตัดเสียงรบกวนระดับพรีเมียม', image: '/products/sony-wh1000xm3.jpg' },
];

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

// ฟังก์ชันดึงข้อมูล (ในงานจริงอาจเป็น SQL หรือ fetch API)
function getProductById(id: string) {
  return products.find(p => p.id === parseInt(id))
}

// 2. จัดการ SEO (ทำงานบน Server เท่านั้น)
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  return { title: product?.name ?? 'ไม่พบสินค้า' }
}

// 3. Main Component
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) return <h1 className="text-center mt-20">ไม่พบสินค้า</h1>

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* แสดงรูปและรายละเอียด (Static Content) */}
        <div className="flex justify-center mb-6">
          <Image src={product.image} alt={product.name} width={500} height={400} className="rounded-lg" />
        </div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-green-600 font-semibold mb-4">฿{product.price.toLocaleString()}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        
        <hr className="my-6" />

        {/* 4. การส่งต่อข้อมูล (Passing Props) ไปยัง Client Component */}
        <div className="flex justify-center">
          <AddToCartButton 
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
          />
        </div>
      </div>
    </main>
  )
}