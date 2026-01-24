import { getProductByBarcode } from '@/services/product-service'
import ProductSearchClient from './product-search-client'

export default async function ProductSearchContainer({ barcode }: { barcode?: string }) {
  let product = null
  let error = null

  if (barcode) {
    try {
      product = await getProductByBarcode(barcode)
      if (!product) error = 'ไม่พบสินค้าที่มีบาร์โค้ดนี้'
    } catch (err) {
      error = 'เกิดข้อผิดพลาดในการค้นหาสินค้า'
    }
  }

  // ส่งข้อมูลที่ดึงได้จาก Server ไปให้ Client แสดงผล
  return <ProductSearchClient initialProduct={product} initialError={error} />
}