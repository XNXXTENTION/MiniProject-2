// services/product-service.ts
import { Product } from '@/types/product'

const API_URL = 'https://backend.codingthailand.com/v2'

export async function getProductByBarcode(barcode: string): Promise<Product | null> {
  try {
    // ดึงข้อมูลแบบปกติ ไม่ใส่ "use cache"
    const response = await fetch(`${API_URL}/products/barcode/${barcode}`)

    if (!response.ok) {
      if (response.status === 404) return null // จัดการกรณีไม่เจอสินค้าในระบบ
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching product by barcode:', error)
    throw error // Re-throw เพื่อให้ UI จัดการต่อ (เช่น โชว์ Alert)
  }
}