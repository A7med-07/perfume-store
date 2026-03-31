'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useCartStore, useOrderStore } from '../../lib/order-store' // تأكد من استيراد الاثنين
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count, clearCart } = useCartStore()
  const addOrder = useOrderStore((s) => s.addOrder)
  const [isOrdered, setIsOrdered] = useState(false)

  // وظيفة إتمام الشراء وإرسال البيانات للـ Admin
  const handleCheckout = () => {
    if (items.length === 0) return

    // 1. إرسال الطلب للـ Store الخاص بالإدارة
    addOrder({
      customerName: "عميل تجريبي", // يمكن استبدالها بـ Input لاحقاً
      items: items,
      total: total(),
    })

    // 2. مسح السلة
    clearCart()

    // 3. إظهار رسالة نجاح
    setIsOrdered(true)
  }

  // حالة نجاح الطلب
  if (isOrdered) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">شكراً لطلبك!</h2>
        <p className="text-gray-500 max-w-sm mb-8">
          تم استلام طلبك بنجاح وجاري تجهيزه. يمكنك متابعة حالة الطلب من حسابك.
        </p>
        <Link href="/">
          <Button className="bg-black text-white px-8 py-6 rounded-xl text-lg hover:bg-amber-600 transition-all">
            العودة للتسوق
          </Button>
        </Link>
      </div>
    )
  }

  // حالة السلة فارغة
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="bg-gray-50 p-6 rounded-full">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">سلة التسوق فارغة</h2>
        <p className="text-gray-500 text-center max-w-xs">
          ابدأ بإضافة بعض العطور أو الساعات الفاخرة إلى سلتك.
        </p>
        <Link href="/">
          <Button className="bg-black text-white hover:bg-amber-600 transition-all px-8">
            العودة للمتجر
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20" dir="rtl">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
        سلة التسوق
        <span className="text-sm font-normal text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {count()} منتجات
        </span>
      </h1>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* قائمة المنتجات */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => {
            if (!item.product) return null
            return (
              <div 
                key={`${item.product.id}-${item.selectedOption}`}
                className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-sm transition-shadow"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">
                        {item.product.brand}
                      </p>
                      <h3 className="font-bold text-gray-900 leading-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {'materials' in item.product ? 'اللون: ' : 'الحجم: '} 
                        <span className="text-gray-900 font-medium">
                          {item.selectedOption} {'materials' in item.product ? '' : 'مل'}
                        </span>
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.product.id, item.selectedOption)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-9">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.selectedOption, Math.max(1, item.quantity - 1))}
                        className="px-3 hover:bg-gray-100 border-l"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.selectedOption, item.quantity + 1)}
                        className="px-3 hover:bg-gray-100 border-r"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="text-left">
                      <p className="text-lg font-black text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ملخص الفاتورة */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-900">ملخص الطلب</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>إجمالي المنتجات</span>
                <span className="font-medium text-gray-900">{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>الشحن</span>
                <span className="text-emerald-600 font-bold italic underline decoration-dotted">مجاناً</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-900">المبلغ الإجمالي</span>
                <span className="text-2xl font-black text-amber-600">{formatPrice(total())}</span>
              </div>
            </div>

            <Button 
              onClick={handleCheckout}
              className="w-full mt-8 bg-black hover:bg-amber-600 text-white py-6 rounded-xl text-lg font-bold gap-2 transition-all shadow-lg shadow-black/5"
            >
              إتمام الدفع
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Button>

            <p className="text-[10px] text-gray-400 text-center mt-4">
              بالضغط على إتمام الدفع، أنت توافق على شروط الخدمة وسياسة الخصوصية.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}