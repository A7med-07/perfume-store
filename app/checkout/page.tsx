'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShoppingBag, MapPin, User, Mail, Phone } from 'lucide-react'
import { useCartStore, useOrderStore } from '@/lib/order-store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

// ─── Types ────────────────────────────────────────────────────
interface FormData {
  name: string
  email: string
  phone: string
  address: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  address?: string
}

// ─── Field Component ──────────────────────────────────────────
function Field({
  icon,
  label,
  error,
  children,
}: {
  icon: React.ReactNode
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-amber-500">{icon}</span>
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, count, clearCart } = useCartStore()
  const addOrder = useOrderStore((s) => s.addOrder)

  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', address: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isOrdered, setIsOrdered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // redirect if cart empty
  if (items.length === 0 && !isOrdered) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4" dir="rtl">
        <div className="bg-gray-50 p-6 rounded-full">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold">السلة فارغة</h2>
        <p className="text-gray-500 text-sm">أضف منتجات أولاً قبل إتمام الطلب.</p>
        <Link href="/">
          <Button className="bg-black text-white hover:bg-amber-600 transition-all">
            العودة للمتجر
          </Button>
        </Link>
      </div>
    )
  }

  // ── Validate ──
  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim())                      e.name    = 'الاسم مطلوب'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'بريد إلكتروني غير صحيح'
    if (!form.phone.match(/^[\d\s\+\-]{8,}$/)) e.phone   = 'رقم هاتف غير صحيح'
    if (!form.address.trim())                   e.address = 'العنوان مطلوب'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit ──
  const handleSubmit = async () => {
    if (!validate()) return
    setIsLoading(true)

    await new Promise(r => setTimeout(r, 900))

    addOrder({
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      customerAddress: form.address,
      items,
      total: total(),
    })

    clearCart()
    setIsLoading(false)
    setIsOrdered(true)
  }

  // ── Success Screen ──
  if (isOrdered) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4" dir="rtl">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 animate-[scale-in_0.4s_ease]">
          <CheckCircle2 className="w-11 h-11 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black mb-2">تم استلام طلبك!</h2>
        <p className="text-gray-500 max-w-sm mb-2">
          شكراً <span className="font-semibold text-gray-800">{form.name}</span>، جاري تجهيز طلبك وسيصلك على
        </p>
        <p className="text-amber-600 font-medium mb-8">{form.email}</p>
        <Link href="/">
          <Button className="bg-black text-white px-10 py-6 rounded-xl text-lg hover:bg-amber-600 transition-all">
            العودة للتسوق
          </Button>
        </Link>
      </div>
    )
  }

  // ── Main Form ──
  return (
    <div className="max-w-6xl mx-auto px-4 py-12" dir="rtl">

      {/* Header */}
      <div className="mb-10">
        <Link href="/cart" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors mb-4">
          <ArrowRight className="w-4 h-4 rotate-180" />
          العودة للسلة
        </Link>
        <h1 className="text-3xl font-black">إتمام الطلب</h1>
        <p className="text-gray-500 mt-1 text-sm">أدخل بياناتك لإتمام عملية الشراء</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">

        {/* ── Form ── */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-gray-900 pb-1 border-b border-gray-100">
              بيانات العميل
            </h2>

            <Field icon={<User className="w-4 h-4" />} label="الاسم الكامل" error={errors.name}>
              <Input
                placeholder="مثال: أحمد صبري"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={errors.name ? 'border-red-400 focus-visible:ring-red-300' : ''}
              />
            </Field>

            <Field icon={<Mail className="w-4 h-4" />} label="البريد الإلكتروني" error={errors.email}>
              <Input
                type="email"
                placeholder="ahmed123@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={errors.email ? 'border-red-400 focus-visible:ring-red-300' : ''}
                dir="ltr"
              />
            </Field>

            <Field icon={<Phone className="w-4 h-4" />} label="رقم الهاتف" error={errors.phone}>
              <Input
                type="tel"
                placeholder="+20 1xx xxx xxxx"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className={errors.phone ? 'border-red-400 focus-visible:ring-red-300' : ''}
                dir="ltr"
              />
            </Field>

            <Field icon={<MapPin className="w-4 h-4" />} label="عنوان الشحن" error={errors.address}>
              <textarea
                placeholder="المدينة، الشارع، رقم المبنى..."
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                rows={3}
                className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors
                  ${errors.address
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-input focus:ring-offset-0'
                  }`}
              />
            </Field>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sticky top-24 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">
              ملخص الطلب
              <span className="text-sm font-normal text-gray-400 mr-2">({count()} منتجات)</span>
            </h2>

            {/* Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pl-1">
              {items.map(item => {
                if (!item.product) return null
                return (
                  <div
                    key={`${item.product.id}-${item.selectedOption}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">{item.selectedOption} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                )
              })}
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>المجموع</span>
                <span className="font-medium text-gray-800">{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>الشحن</span>
                <span className="text-emerald-600 font-bold">مجاناً</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">الإجمالي</span>
              <span className="text-2xl font-black text-amber-600">{formatPrice(total())}</span>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-black hover:bg-amber-600 text-white py-6 rounded-xl text-base font-bold gap-2 transition-all shadow-lg shadow-black/5 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تأكيد الطلب...
                </>
              ) : (
                <>
                  تأكيد الطلب
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </>
              )}
            </Button>

            <p className="text-[10px] text-gray-400 text-center">
              بالضغط على تأكيد الطلب، أنت توافق على شروط الخدمة وسياسة الخصوصية.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}