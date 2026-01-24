// types/product.ts

/**
 * 1. Category Interface
 * แทนโครงสร้างของหมวดหมู่สินค้า
 */
export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  // ใช้ _count สำหรับเก็บข้อมูล Aggregation (เช่น จำนวนสินค้าในหมวดนี้) 
  // ซึ่งเป็นรูปแบบปกติของ ORM อย่าง Prisma
  _count: {
    products: number;
  };
}

/**
 * 2. Product Interface
 * แทนโครงสร้างข้อมูลสินค้า (Data Entity)
 */
export interface Product {
  id: number;
  barcode: string;
  name: string;
  description: string | null; // รองรับกรณีไม่มีคำอธิบาย
  price: string; // ราคาอาจส่งมาเป็น string จาก backend เพื่อความแม่นยำของทศนิยม (Precision)
  cost: string;
  stock: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  // Relation: เชื่อมโยงข้อมูล Category กลับมาด้วย (Join Table)
  category: Category; 
}

/**
 * 3. Pagination Interface
 * สำหรับจัดการเรื่องการแบ่งหน้าข้อมูล (Metadata ของ Response)
 */
export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 4. CategoriesResponse Interface
 * โครงสร้างข้อมูลเวลา API ตอบกลับมาเมื่อขอรายการหมวดหมู่ทั้งหมด
 */
export interface CategoriesResponse {
  data: Category[];
  pagination: PaginationMetadata;
}