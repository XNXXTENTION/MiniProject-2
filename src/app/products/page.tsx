import Link from 'next/link'

// จำลองฐานข้อมูลสินค้า (Mock Data)
const products = [
  { id: 1, name: 'Samsung Galaxy S24', price: 25900 },
  { id: 2, name: 'MacBook Air M3', price: 42900 },
  { id: 3, name: 'AirPods Pro', price: 8990 },
  { id: 4, name: 'iPad Air', price: 21900 },
]

export default function ProductsPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>รายการสินค้า</h1>
      
      {/* ใช้ CSS Grid จัดเลย์เอาต์ */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`} // ส่ง id ไปเป็น Dynamic Path
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
              display: 'block',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {product.name}
            </h2>
            <p style={{ color: '#0070f3', fontWeight: 'bold' }}>
              ฿{product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}