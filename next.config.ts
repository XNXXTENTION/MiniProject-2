import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* การตั้งค่าประสิทธิภาพอื่นๆ */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.codingthailand.com', // อนุญาตเฉพาะ Unsplash
        port: '',
        pathname: '/**', // อนุญาตทุก Path ภายใต้ Hostname นี้
      },
      {
        protocol: 'https',
        hostname: 'cdn.your-store.com',
        port: '',
        pathname: '/products/**', // อนุญาตเฉพาะรูปในโฟลเดอร์ products
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // ตัว Domain หลัก
        port: '',                  // เว้นว่างไว้สำหรับพอร์ตมาตรฐาน (80/443)
        pathname: '/**',           // อนุญาตทุกเส้นทาง (Path) ภายใต้ Domain นี้
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;