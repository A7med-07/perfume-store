'use client'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, Star, Plus } from 'lucide-react'
import { useCompareStore, useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// الصفوف الأساسية المشتركة والمختلفة
const rows = [
  { label: 'الماركة', key: 'brand' },
  { label: 'السعر', key: 'price' },
  { label: 'التصنيف', key: 'category' },
  { label: 'النوع', key: 'gender' },
  { label: 'التقييم', key: 'rating' },
  { label: 'المراجعات', key: 'reviews' },
  { label: 'المواد / الأحجام', key: 'specs' }, // دمج الخصائص التقنية
  { label: 'المخزون', key: 'stock' },
  { label: 'تفاصيل إضافية', key: 'details' }, // النوتات للعطور أو الألوان للساعات
]

export default function ComparePage() {
  const { items, removeItem, clearAll } = useCompareStore()
  const addToCart = useCartStore(s => s.addItem)

  const getValue = (product: any, key: string) => {
    const isWatch = 'materials' in product;

    switch (key) {
      case 'price':
        return (
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg text-amber-600">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
        )
      case 'gender':
        const genders = { men: '👔 رجالي', women: '👗 نسائي', unisex: '✨ للجنسين' }
        return genders[product.gender as keyof typeof genders] || product.gender
      case 'rating':
        return (
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold">{product.rating}</span>
          </div>
        )
      case 'reviews':
        return `${product.reviews.toLocaleString()} تقييم`
      
      case 'specs':
        if (isWatch) {
          return product.materials?.join(' · ')
        }
        return product.volume ? product.volume.map((v: number) => `${v}مل`).join(' · ') : '-'

      case 'details':
        if (isWatch) {
          return (
            <div className="flex flex-wrap gap-1 justify-center">
              {product.colors?.map((c: string) => (
                <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>
              ))}
            </div>
          )
        }
        return product.notes ? (
          <div className="text-[10px] text-gray-500 text-right space-y-1">
            <p><strong>القمة:</strong> {product.notes.top?.join(', ')}</p>
            <p><strong>القاعدة:</strong> {product.notes.base?.join(', ')}</p>
          </div>
        ) : '-'

      case 'stock':
        return (
          <span className={`font-medium ${product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
            {product.stock > 5 ? '✅ متوفر' : product.stock > 0 ? `⚠️ بقى ${product.stock}` : '❌ نفذ'}
          </span>
        )
      default:
        return product[key] || '-'
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Plus className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold mb-2">قائمة المقارنة فارغة</h1>
        <p className="text-gray-500 mb-8 text-center max-w-sm">أضف بعض المنتجات (عطور أو ساعات) لتقارن بين مواصفاتها وأسعارها.</p>
        <Link href="/"><Button className="bg-black px-10">استعرض المنتجات</Button></Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black">مقارنة المنتجات</h1>
        <Button variant="ghost" onClick={clearAll} className="text-red-500 hover:bg-red-50 gap-2">
          <X className="w-4 h-4" /> مسح الكل
        </Button>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky right-0 bg-white z-20 w-40 min-w-[160px] p-4 text-right font-bold text-gray-400 border-b uppercase text-xs tracking-widest">الميزة</th>
              {items.map(product => (
                <th key={product.id} className="min-w-[250px] p-4 border-b">
                  <div className="relative group">
                    <button 
                      onClick={() => removeItem(product.id)}
                      className="absolute -top-2 -right-2 bg-white shadow-md border rounded-full p-1 hover:bg-red-50 hover:text-red-500 transition-colors z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="aspect-square relative bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100">
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">{product.brand}</p>
                    <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        className="w-full bg-black hover:bg-amber-600 text-white text-xs h-8"
                        onClick={() => addToCart(product, ('materials' in product) ? (product.colors?.[0] || 'Default') : (product.volume?.[0] || 0))}
                      >
                        <ShoppingBag className="w-3 h-3 ml-2" /> أضف للسلة
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.key} className="group">
                <td className="sticky right-0 bg-white group-hover:bg-gray-50 z-20 p-4 font-bold text-sm text-gray-700 border-b border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                  {row.label}
                </td>
                {items.map(product => (
                  <td key={product.id} className="p-6 text-center border-b border-gray-50 group-hover:bg-gray-50/50 transition-colors">
                    {getValue(product, row.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}