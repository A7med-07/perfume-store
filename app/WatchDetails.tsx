'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, GitCompare, Star, ChevronRight, Minus, Plus, Heart } from 'lucide-react'
import { Watch } from '../app/data/watches'
import { useCartStore, useCompareStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import WatchCard from '@/components/WatchCard'

export default function ProductDetails({ watch, related }: { watch: Watch, related: Watch[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const addToCart = useCartStore(s => s.addItem)
  const addToCompare = useCompareStore(s => s.addItem)
  const compareItems = useCompareStore(s => s.items)
  const inCompare = compareItems.some(i => i.id === watch.id)

  const handleAddToCart = () => {
    // تمرير الكمية المختارة للـ Store
    for (let i = 0; i < quantity; i++) {
        addToCart(watch, watch.colors?.[0] || 'Default')
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-black transition">الرئيسية</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/watches" className="hover:text-black transition">الساعات</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black font-bold">{watch.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images Section */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image
              src={watch.image} // تعديل: يقرأ من المصفوفة بناء على الاختيار
              alt={watch.name}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          {watch.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {watch.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === i ? 'border-black scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <Badge variant="outline" className="w-fit mb-4 border-amber-200 text-amber-700 bg-amber-50">
            {watch.brand}
          </Badge>
          <h1 className="text-4xl font-black mb-4 text-gray-900">{watch.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex bg-amber-50 px-2 py-1 rounded-lg">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(watch.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-gray-400 text-sm font-medium">{watch.reviews} مراجعة موثوقة</span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-black">{formatPrice(watch.price)}</span>
            {watch.originalPrice && (
              <span className="text-xl text-gray-400 line-through">{formatPrice(watch.originalPrice)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg italic border-r-4 border-amber-500 pr-4">
            {watch.description}
          </p>

          {/* Controls */}
          <div className="space-y-6 border-t pt-8">
            <div className="flex items-center gap-6">
               <span className="font-bold text-gray-900">الكمية:</span>
               <div className="flex items-center border-2 border-gray-100 rounded-full p-1">
                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-gray-100 rounded-full transition"><Minus className="w-4 h-4"/></button>
                 <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                 <button onClick={() => setQuantity(q => Math.min(watch.stock, q + 1))} className="p-2 hover:bg-gray-100 rounded-full transition"><Plus className="w-4 h-4"/></button>
               </div>
               <span className="text-sm text-gray-400">المتوفر: {watch.stock} قطعة</span>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className={`flex-1 h-16 text-lg rounded-2xl transition-all shadow-lg ${added ? 'bg-green-600 scale-95' : 'bg-black hover:bg-gray-800'}`}
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 w-6 h-6" />
                {added ? 'تمت الإضافة بنجاح' : 'أضف إلى السلة'}
              </Button>
              <Button size="lg" variant="outline" className={`h-16 w-16 rounded-2xl ${inCompare ? 'text-blue-600 border-blue-600 bg-blue-50' : ''}`} onClick={() => addToCompare(watch)}>
                <GitCompare className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-4">
            قد يعجبك أيضاً
            <div className="h-1 flex-1 bg-gray-100"></div>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map(w => <WatchCard key={w.id} watch={w} />)}
          </div>
        </section>
      )}
    </div>
  )
}