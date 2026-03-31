// app/products/[id]/page.tsx
import { use } from 'react'
import { notFound } from 'next/navigation'
import { perfumes } from '../../data/perfumes'
import ProductDetails from '../../ProductDetails'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const perfume = perfumes.find(p => p.id === Number(id))
  if (!perfume) notFound()

  const related = perfumes
    .filter(p => p.id !== perfume.id && (p.brand === perfume.brand || p.category === perfume.category))
    .slice(0, 4)

  return <ProductDetails perfume={perfume} related={related} />
}