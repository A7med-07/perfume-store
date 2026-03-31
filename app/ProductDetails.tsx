// app/products/[id]/ProductDetails.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, GitCompare, Star, ChevronRight, Minus, Plus, Heart } from 'lucide-react'
import { Perfume } from '../app/data/perfumes'
import { useCartStore, useCompareStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ProductCard from '@/components/ProductCard'

export default function ProductDetails({ perfume, related }: { perfume: Perfume, related: Perfume[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVolume, setSelectedVolume] = useState(perfume.volume[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const addToCart = useCartStore(s => s.addItem)
  const addToCompare = useCompareStore(s => s.addItem)
  const compareItems = useCompareStore(s => s.items)
  const inCompare = compareItems.some(i => i.id === perfume.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(perfume, selectedVolume)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-black transition">الرئيسية</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-black transition">العطور</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black font-medium">{perfume.name}</span>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <Image
              src={perfume.image}
              alt={perfume.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {perfume.isNew && (
              <Badge className="absolute top-4 right-4 bg-emerald-500 text-white">جديد</Badge>
            )}
            {perfume.isBestseller && (
              <Badge className="absolute top-4 left-4 bg-amber-500 text-white">الأكثر مبيعاً</Badge>
            )}
          </div>
          {perfume.images.length > 1 && (
            <div className="flex gap-3">
              {perfume.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${selectedImage === i ? 'border-black' : 'border-transparent'}`}>
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-amber-600 font-semibold text-lg mb-1">{perfume.brand}</p>
          <h1 className="text-4xl font-bold mb-4">{perfume.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-5 h-5 ${s <= Math.round(perfume.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="font-bold">{perfume.rating}</span>
            <span className="text-gray-400 text-sm">({perfume.reviews.toLocaleString()} تقييم)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(perfume.price)}</span>
            {perfume.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">{formatPrice(perfume.originalPrice)}</span>
                <Badge className="bg-red-500 text-white">
                  خصم {Math.round((1 - perfume.price / perfume.originalPrice) * 100)}%
                </Badge>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{perfume.description}</p>

          <div className="flex gap-2 mb-6">
            <Badge variant="secondary">
              {perfume.gender === 'men' ? '👔 رجالي' : perfume.gender === 'women' ? '👗 نسائي' : '✨ يونيسكس'}
            </Badge>
            <Badge variant="outline">{perfume.category}</Badge>
            <Badge variant={perfume.stock > 10 ? 'outline' : 'destructive'} className={perfume.stock > 10 ? 'text-green-600 border-green-600' : ''}>
              {perfume.stock > 10 ? '✅ متوفر' : perfume.stock > 0 ? `⚠️ ${perfume.stock} قطع فقط` : '❌ نفذ'}
            </Badge>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-3">الحجم (مل)</p>
            <div className="flex gap-2">
              {perfume.volume.map(v => (
                <button key={v} onClick={() => setSelectedVolume(v)}
                  className={`px-4 py-2 rounded-xl border-2 font-medium transition ${selectedVolume === v ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}`}>
                  {v} مل
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-3">الكمية</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-black transition">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(perfume.stock, q + 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-black transition">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg"
              className={`flex-1 gap-2 transition-all ${added ? 'bg-green-600 hover:bg-green-600' : 'bg-black hover:bg-gray-800'}`}
              onClick={handleAddToCart} disabled={perfume.stock === 0}>
              <ShoppingBag className="w-5 h-5" />
              {added ? '✅ تمت الإضافة!' : 'أضف إلى السلة'}
            </Button>
            <Button size="lg" variant="outline"
              className={inCompare ? 'border-blue-500 text-blue-500' : ''}
              onClick={() => addToCompare(perfume)} disabled={inCompare}>
              <GitCompare className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">مكونات العطر 🌿</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'النوتات العلوية', notes: perfume.notes.top, icon: '🌬️', color: 'bg-blue-50 border-blue-100' },
            { label: 'النوتات الوسطى', notes: perfume.notes.middle, icon: '🌸', color: 'bg-pink-50 border-pink-100' },
            { label: 'النوتات القاعدية', notes: perfume.notes.base, icon: '🌲', color: 'bg-amber-50 border-amber-100' },
          ].map(section => (
            <div key={section.label} className={`rounded-xl p-5 border ${section.color}`}>
              <p className="font-bold mb-3 flex items-center gap-2">
                <span>{section.icon}</span>{section.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {section.notes.map(note => (
                  <span key={note} className="bg-white px-3 py-1 rounded-full text-sm border shadow-sm">{note}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">قد يعجبك أيضاً</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} perfume={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
