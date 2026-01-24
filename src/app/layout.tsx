// app/layout.tsx
import type { Metadata } from 'next'
import { Prompt } from 'next/font/google' // นำเข้าฟอนต์จาก Google
import Link from 'next/link'
import './globals.css'
import AppQueryProvider from './provider' // นำเข้า Provider ที่เราสร้างไว้

// 1. การตั้งค่า Font (Prompt)
export const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-prompt',
})

// 2. การตั้งค่า Metadata (SEO & Social Share)
export const metadata: Metadata = {
  title: {
    default: 'My Next.js App',
    template: '%s | My Next.js App' // ถ้าหน้าลูกชื่อ "สินค้า" จะกลายเป็น "สินค้า | My Next.js App"
  },
  description: 'เว็บแอปพลิเคชันที่สร้างด้วย Next.js 16',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    siteName: 'My Next.js App',
    // ... ตั้งค่ารูปพรีวิวเวลาแชร์ลิงก์
  }
}

// 3. Main Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className={prompt.className}>
        {/* 4. ฉีด AppQueryProvider เข้าไปในระบบ */}
        <AppQueryProvider>
          
          {/* 5. ส่วน Header (Sticky Menu) */}
          <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center px-4">
              <Link href="/" className="mr-8">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  NextApp
                </span>
              </Link>
              
              <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
                <Link href="/" className="text-slate-600 hover:text-slate-900">หน้าหลัก</Link>
                <Link href="/about" className="text-slate-600 hover:text-slate-900">เกี่ยวกับเรา</Link>
                <Link href="/products" className="text-slate-600 hover:text-slate-900">สินค้า</Link>
              </nav>
            </div>
          </header>
          
          {/* 6. ส่วนเนื้อหาของแต่ละหน้า (Dynamic Content) */}
          {children}
          
        </AppQueryProvider>
      </body>
    </html>
  )
}