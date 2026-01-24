// components/product-search-client.tsx
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'
import ProductSearchBarcode from './product-search-barcode'

interface ProductSearchClientProps {
  initialProduct: Product | null
  initialError: string | null
}

export default function ProductSearchClient({
  initialProduct,
  initialError
}: ProductSearchClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [product] = useState(initialProduct)
  const [error] = useState(initialError)

  const handleSearch = (barcode: string) => {
    startTransition(() => {
      router.push(`/cache-demo?barcode=${barcode}`)
    })
  }

  return (
    <ProductSearchBarcode
      onSearch={handleSearch}
      product={product}
      isLoading={isPending}
      error={error}
    />
  )
}
