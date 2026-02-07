import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import AppQueryProvider from './provider'

// 1. ตั้งค่าฟอนต์ Prompt เพื่อให้อ่านภาษาไทยได้สวยงาม
const promptFont = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-prompt',
})

// 2. ปรับปรุง Metadata ให้เข้ากับโปรเจกต์ร้านอาหาร (ม.พะเยา)
export const metadata: Metadata = {
  title: {
    default: 'UP Restaurant | ระบบจองโต๊ะอาหารหน้า ม.พะเยา',
    template: '%s | UP Restaurant' 
  },
  description: 'จองโต๊ะอาหารออนไลน์ได้ง่ายๆ ตรวจสอบสถานะแบบ Real-time พัฒนาโดยนิสิตวิทยาการคอมพิวเตอร์ ม.พะเยา',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    siteName: 'UP Restaurant',
    title: 'UP Restaurant - รสชาติที่จองได้เพียงปลายนิ้ว',
    description: 'จองโต๊ะอาหารหน้า ม.พะเยา สะดวก รวดเร็ว แม่นยำ',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={promptFont.variable}>
      <body className={`${promptFont.className} bg-slate-50 text-slate-900 antialiased`}>
        <AppQueryProvider>
          
          {/* ส่วน Navigation Bar (Sticky Menu) */}
          <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
              
              {/* Logo ส่วนหน้า ม.พะเยา */}
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent uppercase tracking-tighter">
                  UP Restaurant
                </span>
              </Link>
              
              {/* รายการเมนูนำทาง */}
              <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">หน้าหลัก</Link>
                <Link href="/seats" className="hover:text-blue-600 transition-colors">จองโต๊ะอาหาร</Link>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">รายการจอง</Link>
                <Link href="/about" className="hover:text-blue-600 transition-colors">เกี่ยวกับเรา</Link>
              </nav>

              {/* ปุ่มจองด่วนสำหรับมือถือ */}
              <div className="flex items-center md:hidden">
                <Link href="/booking" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-blue-200">
                  จองเลย
                </Link>
              </div>

            </div>
          </header>
          
          {/* แสดงผล Content ของแต่ละหน้า */}
          <div className="min-h-[calc(100-4rem)]">
            {children}
          </div>

          {/* Footer แบบสั้นๆ */}
          <footer className="py-8 bg-white border-t border-slate-200 mt-12">
            <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
              <p>© 2026 UP Restaurant Project - Computer Science Phayao University</p>
            </div>
          </footer>
          
        </AppQueryProvider>
      </body>
    </html>
  )
}