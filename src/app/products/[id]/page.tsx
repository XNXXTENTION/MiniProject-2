interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const products = [
  {
    id: 1,
    name: 'โทรศัพท์มือถือ Samsung Galaxy S24',
    price: 25900,
    description: 'สมาร์ตโฟนเรือธงพร้อมชิปประมวลผลรุ่นใหม่และกล้องคุณภาพสูง',
  },
  {
    id: 2,
    name: 'โน้ตบุ๊ก MacBook Air M3',
    price: 42900,
    description: 'โน้ตบุ๊กบางเบาที่มาพร้อมชิป Apple M3 และแบตเตอรี่ใช้งานได้ตลอดวัน',
  },
  {
    id: 3,
    name: 'หูฟังไร้สาย AirPods Pro',
    price: 8990,
    description: 'หูฟังตัดเสียงรบกวน Active Noise Cancellation และ Spatial Audio',
  },
  {
    id: 4,
    name: 'แท็บเล็ต iPad Air',
    price: 21900,
    description: 'แท็บเล็ตหน้าจอ Liquid Retina ขนาด 11 นิ้ว รองรับ Apple Pencil',
  },
];

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>ไม่พบสินค้าที่คุณค้นหา</h1>
        <p>กรุณาตรวจสอบรหัสสินค้าอีกครั้ง</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      >
        <p style={{ fontSize: '1.5rem', color: '#0070f3', fontWeight: 'bold' }}>
          ฿{product.price.toLocaleString()}
        </p>
      </div>
      <p style={{ lineHeight: '1.6', color: '#666' }}>{product.description}</p>
    </main>
  );
}
