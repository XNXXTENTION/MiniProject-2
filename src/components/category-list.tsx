// components/category-list.tsx
import { getCategories } from '@/services/category-service'

export default async function CategoryList() {
  // ดึงข้อมูลผ่าน Service ที่มีการตั้งค่า 'use cache' ไว้แล้ว
  const categoriesData = await getCategories()
  const categories = categoriesData.data

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">หมวดหมู่สินค้าทั้งหมด</h2>
      
      {/* ประโยชน์เชิง UX: บอก User ให้ทราบถึงนโยบาย Cache ของระบบ */}
      <p className="mb-4 text-sm text-slate-500 italic">
        * ข้อมูลนี้ถูก Cache ไว้เป็นเวลา 1 ชั่วโมง (Static Content)
      </p>

      {/* ใช้ Grid System (Responsive) จัดการ Layout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group rounded-lg border border-slate-200 p-4 transition-all hover:shadow-md hover:border-blue-200 bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                  {category.description}
                </p>
              </div>
              
              {/* ข้อมูล Aggregation (Count) จาก Database */}
              <span className="ml-2 shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {category._count.products} สินค้า
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}