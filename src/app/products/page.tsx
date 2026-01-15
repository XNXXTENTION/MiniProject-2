import Link from 'next/link'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // อย่าลืม npx shadcn@latest add input

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

const products = [
  { id: 1, name: 'โทรศัพท์มือถือ Samsung Galaxy S24', price: 25900, category: 'phone' },
  { id: 2, name: 'โน้ตบุ๊ก MacBook Air M3', price: 42900, category: 'laptop' },
  { id: 3, name: 'หูฟังไร้สาย AirPods Pro', price: 8990, category: 'audio' },
  { id: 4, name: 'แท็บเล็ต iPad Air', price: 21900, category: 'tablet' },
  { id: 5, name: 'โทรศัพท์มือถือ iPhone 15 Pro', price: 39900, category: 'phone' },
  { id: 6, name: 'หูฟัง Sony WH-1000XM3', price: 12900, category: 'audio' },
];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // 1. เข้าถึง searchParams ด้วย await (Next.js 16)
  const { search } = await searchParams;

  // 2. กรองข้อมูลสินค้าตามคำค้นหา (Server-side Filtering)
  const filteredProducts = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">รายการสินค้า</h1>

      {/* 3. ฟอร์มค้นหาที่ส่งค่าผ่าน URL Query Parameters */}
      <form className="mb-8 max-w-md">
        <div className="flex gap-2">
          <Input 
            type="text" 
            name="search" 
            placeholder="ค้นหาสินค้า..." 
            defaultValue={search || ''} 
          />
          <Button type="submit">ค้นหา</Button>
        </div>
      </form>

      {filteredProducts.length === 0 ? (
        <p className="text-slate-500">ไม่พบสินค้าที่ตรงกับ "{search}"</p>
      ) : (
        <>
          <p className="mb-4 text-slate-600">
            พบ {filteredProducts.length} รายการ {search && `สำหรับ "${search}"`}
          </p>
          
          {/* 4. แสดงผลสินค้าแบบ Grid ด้วย Card component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-1">{product.name}</CardTitle>
                  <CardDescription>{product.category.toUpperCase()}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-2xl font-bold text-blue-600">
                    ฿{product.price.toLocaleString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>รายละเอียดสินค้า</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </main>
  );
}