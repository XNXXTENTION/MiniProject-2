'use client' // <--- สำคัญมาก! บอกว่านี่คือ Client Component

import { useState } from 'react'

// กำหนด Interface สำหรับข้อมูลที่รับมาจาก Server (Props)
interface AddToCartButtonProps {
  productId: number
  productName: string
  productPrice: number
}

export default function AddToCartButton({ 
  productId, 
  productName, 
 
}: AddToCartButtonProps) {
  // สร้าง State สำหรับเก็บจำนวนสินค้า (Interactivity)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    // จำลองการส่งข้อมูลไป API
    console.log('เพิ่มสินค้าลงตะกร้า:', { productId, productName, quantity })
    setIsAdded(true)
    
    // แสดงสถานะ "เพิ่มแล้ว" 2 วินาที แล้วรีเซ็ต
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {/* ส่วนควบคุมจำนวนสินค้า */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          style={buttonStyle}
        > - </button>
        
        <span style={{ minWidth: '2rem', textAlign: 'center' }}>{quantity}</span>
        
        <button 
          onClick={() => setQuantity(quantity + 1)}
          style={buttonStyle}
        > + </button>
      </div>
      
      {/* ปุ่มหลัก */}
      <button
        onClick={handleAddToCart}
        style={{
          ...mainButtonStyle,
          backgroundColor: isAdded ? '#10b981' : '#0070f3',
        }}
      >
        {isAdded ? '✓ เพิ่มแล้ว' : 'เพิ่มลงตะกร้า'}
      </button>
    </div>
  )
}

// สไตล์ตกแต่งปุ่ม (ตัวอย่าง)
const buttonStyle = {
  padding: '0.5rem 1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer'
}

const mainButtonStyle = {
  padding: '0.75rem 2rem',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600'
}