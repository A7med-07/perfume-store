'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, GitCompare, Star } from 'lucide-react'
import { Perfume } from '../app/data/perfumes'
import { useCartStore, useCompareStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ProductCard({ perfume }: { perfume: Perfume }) {
    const addToCart = useCartStore(s => s.addItem)
    const addToCompare = useCompareStore(s => s.addItem)
    const compareItems = useCompareStore(s => s.items)
    const inCompare = compareItems.some(i => i.id === perfume.id)

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Image */}
            <Link href={`/products/${perfume.id}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
                <Image
                    src={perfume.image}
                    alt={perfume.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {perfume.isNew && <Badge className="bg-emerald-500 text-white text-xs">جديد</Badge>}
                    {perfume.isBestseller && <Badge className="bg-amber-500 text-white text-xs">الأكثر مبيعاً</Badge>}
                    {perfume.originalPrice && (
                        <Badge className="bg-red-500 text-white text-xs">
                            خصم {Math.round((1 - perfume.price / perfume.originalPrice) * 100)}%
                        </Badge>
                    )}
                </div>
            </Link>

            {/* Info */}
            <div className="p-4">
                <p className="text-xs text-gray-400 font-medium mb-1">{perfume.brand}</p>
                <Link href={`/products/${perfume.id}`}>
                    <h3 className="font-bold text-gray-900 hover:text-black mb-2 line-clamp-1">
                        {perfume.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{perfume.rating}</span>
                    <span className="text-xs text-gray-400">({perfume.reviews.toLocaleString()})</span>
                </div>

                {/* Gender & Category */}
                <div className="flex gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                        {perfume.gender === 'men' ? '👔 رجالي' : perfume.gender === 'women' ? '👗 نسائي' : '✨ يونيسكس'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{perfume.category}</Badge>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-lg">{formatPrice(perfume.price)}</span>
                    {perfume.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{formatPrice(perfume.originalPrice)}</span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <Button
                        className="flex-1 bg-black hover:bg-gray-800 text-white gap-2"
                        size="sm"
                        onClick={() => addToCart(perfume, perfume.volume[0])}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        أضف للسلة
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={inCompare ? 'border-blue-500 text-blue-500' : ''}
                        onClick={() => addToCompare(perfume)}
                        disabled={inCompare}
                        title="أضف للمقارنة"
                    >
                        <GitCompare className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}