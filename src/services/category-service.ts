// services/category-service.ts
import { cacheLife } from 'next/cache' // Import ฟีเจอร์จัดการ Cache
import { CategoriesResponse } from '@/types/product'

const API_URL = 'https://backend.codingthailand.com/v2'

export async function getCategories(): Promise<CategoriesResponse> {
  // ⚡️ ประกาศใช้ Cache ที่ระดับฟังก์ชัน
  'use cache'
  cacheLife('hours') // ตั้ง TTL (Time-to-Live) เป็นรายชั่วโมง
  
  try {
    const response = await fetch(
      `${API_URL}/categories?page=1&limit=10&search=&sortBy=name&sortOrder=asc&paginate=true`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}