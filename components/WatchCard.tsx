'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, GitCompare, Star } from 'lucide-react'
import { Watch } from '../app/data/watches'
import { useCartStore, useCompareStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function WatchCard({ watch }: { watch: Watch }) {
  const addToCart = useCartStore(s => s.addItem)
  const addToCompare = useCompareStore(s => s.addItem)
  const compareItems = useCompareStore(s => s.items)
  const inCompare = compareItems.some(i => i.id === watch.id)

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <Link href={`/watches/${watch.id}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
        <Image 
          src={watch.image} 
          alt={watch.name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          {watch.isNew && <Badge className="bg-emerald-500 text-white text-[10px]">جديد</Badge>}
          {watch.isBestseller && <Badge className="bg-amber-500 text-white text-[10px]">الأكثر مبيعاً</Badge>}
          {watch.originalPrice && (
            <Badge className="bg-red-500 text-white text-[10px]">
              خصم {Math.round((1 - watch.price / watch.originalPrice) * 100)}%
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{watch.brand}</p>
        <Link href={`/watches/${watch.id}`}>
          <h3 className="font-bold text-gray-900 hover:text-amber-600 transition-colors mb-2 line-clamp-1">{watch.name}</h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400"/>
          <span className="text-xs font-bold">{watch.rating}</span>
          <span className="text-[10px] text-gray-400">({watch.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-black text-lg">{formatPrice(watch.price)}</span>
          {watch.originalPrice && (
            <span className="text-xs text-gray-400 line-through decoration-red-400">{formatPrice(watch.originalPrice)}</span>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-black hover:bg-amber-600 text-white gap-2 transition-colors" 
            size="sm" 
            onClick={() => addToCart(watch, watch.colors?.[0] || 'Default')}
          >
            <ShoppingBag className="w-4 h-4"/> أضف للسلة
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`transition-colors ${inCompare ? 'bg-blue-50 border-blue-500 text-blue-500' : 'hover:border-black'}`} 
            onClick={() => addToCompare(watch)} 
            disabled={inCompare}
          >
            <GitCompare className="w-4 h-4"/>
          </Button>
        </div>
      </div>
    </div>
  )
}