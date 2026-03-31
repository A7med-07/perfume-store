'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  ShoppingBag, Package, TrendingUp, Users, 
  Plus, Pencil, Trash2, Search, X, Check
} from 'lucide-react'

// استيراد الـ Stores والبيانات
import { useOrderStore } from '../../lib/order-store'
import { perfumes as initialPerfumes } from '../data/perfumes'
import { watches as initialWatches } from '../data/watches'
import { formatPrice } from '@/lib/utils'

// المكونات من UI
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type Tab = 'dashboard' | 'products' | 'orders'

// دمج كافة المنتجات في قائمة واحدة للإدارة
const allInitialProducts = [
  ...initialPerfumes.map(p => ({ ...p, type: 'عطر' })),
  ...initialWatches.map(w => ({ ...w, type: 'ساعة' }))
]

const statusConfig: Record<string, { label: string; className: string }> = {
  pending:    { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-700' },
  processing: { label: 'جاري التجهيز', className: 'bg-blue-100 text-blue-700' },
  delivered:  { label: 'تم التسليم',   className: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'ملغي',          className: 'bg-red-100 text-red-700' },
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const { orders, updateOrderStatus } = useOrderStore()
  
  // حالة المنتجات (تشمل العطور والساعات)
  const [products, setProducts] = useState(allInitialProducts)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editPrice, setEditPrice] = useState('')
  const [editStock, setEditStock] = useState('')

  // تصفية المنتجات بناءً على البحث
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  // حساب الإحصائيات الحقيقية
  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0)

  const stats = [
    { label: 'إجمالي المنتجات', value: products.length, icon: <Package className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600' },
    { label: 'طلبات الزبائن', value: orders.length, icon: <ShoppingBag className="w-6 h-6" />, color: 'bg-amber-50 text-amber-600' },
    { label: 'الإيرادات المحصلة', value: formatPrice(totalRevenue), icon: <TrendingUp className="w-6 h-6" />, color: 'bg-green-50 text-green-600' },
    { label: 'العملاء', value: new Set(orders.map(o => o.customerName)).size, icon: <Users className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600' },
  ]

  // وظائف التحكم بالمنتجات
  const handleEdit = (p: any) => {
    setEditingId(p.id)
    setEditPrice(String(p.price))
    setEditStock(String(p.stock))
  }

  const handleSave = (id: number) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, price: Number(editPrice), stock: Number(editStock) } : p
    ))
    setEditingId(null)
  }

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج نهائياً؟')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم الإدارية</h1>
          <p className="text-gray-500 mt-1">إدارة الطلبات، المنتجات، والتقارير المالية الحقيقية</p>
        </div>
        <Badge variant="outline" className="px-4 py-1 text-sm border-black">مسؤول النظام</Badge>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 border-b overflow-x-auto">
        {[
          { key: 'dashboard', label: '📊 الإحصائيات' },
          { key: 'products',  label: '🛍️ المنتجات' },
          { key: 'orders',    label: '📦 الطلبات' },
        ].map(t => (
          <button 
            key={t.key} 
            onClick={() => setTab(t.key as Tab)}
            className={`px-6 py-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              tab === t.key ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. Dashboard Tab */}
      {tab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl border p-6 hover:shadow-sm transition">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-2xl font-black mb-1">{s.value}</p>
                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold">أحدث عمليات الشراء</h2>
               <Button variant="ghost" size="sm" onClick={() => setTab('orders')} className="text-amber-600">عرض الكل</Button>
            </div>
            {orders.length === 0 ? (
              <div className="text-center py-12 text-gray-400">لا توجد طلبات حقيقية مسجلة حالياً.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="py-4 px-4">رقم الطلب</th>
                      <th className="py-4 px-4">العميل</th>
                      <th className="py-4 px-4">المبلغ</th>
                      <th className="py-4 px-4">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4 font-mono font-bold text-amber-700">{order.id}</td>
                        <td className="py-4 px-4 font-medium">{order.customerName}</td>
                        <td className="py-4 px-4 font-black">{formatPrice(order.total)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusConfig[order.status].className}`}>
                            {statusConfig[order.status].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Products Tab (Perfumes + Watches) */}
      {tab === 'products' && (
        <div className="space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="ابحث عن عطر أو ساعة..." 
              value={search}
              onChange={e => setSearch(e.target.value)} 
              className="pr-10" 
            />
          </div>

          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-50 border-b text-gray-500">
                  <tr>
                    <th className="py-4 px-4 font-bold">المنتج</th>
                    <th className="py-4 px-4 font-bold">النوع</th>
                    <th className="py-4 px-4 font-bold">السعر</th>
                    <th className="py-4 px-4 font-bold">المخزون</th>
                    <th className="py-4 px-4 font-bold">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded bg-gray-100 overflow-hidden">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold">{p.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase">{p.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="font-medium">{p.type}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {editingId === p.id ? (
                          <Input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="w-24 h-8" />
                        ) : (
                          <span className="font-bold">{formatPrice(p.price)}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {editingId === p.id ? (
                          <Input type="number" value={editStock} onChange={e => setEditStock(e.target.value)} className="w-20 h-8" />
                        ) : (
                          <span className={`font-bold ${p.stock <= 5 ? 'text-red-500' : 'text-gray-900'}`}>{p.stock}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {editingId === p.id ? (
                            <Button size="sm" onClick={() => handleSave(p.id)} className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0">
                              <Check className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleEdit(p)} className="h-8 w-8 p-0">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleDelete(p.id)} className="h-8 w-8 p-0 text-red-500 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Orders Tab (Full Real Data) */}
      {tab === 'orders' && (
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-4 px-4 font-bold text-gray-500">رقم الطلب</th>
                  <th className="py-4 px-4 font-bold text-gray-500">اسم العميل</th>
                  <th className="py-4 px-4 font-bold text-gray-500">التفاصيل</th>
                  <th className="py-4 px-4 font-bold text-gray-500">الإجمالي</th>
                  <th className="py-4 px-4 font-bold text-gray-500">الحالة</th>
                  <th className="py-4 px-4 font-bold text-gray-500">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={6} className="py-20 text-center text-gray-400">لا توجد طلبات حقيقية للعرض.</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-mono font-black text-amber-700">{order.id}</td>
                      <td className="py-4 px-4 font-bold">{order.customerName}</td>
                      <td className="py-4 px-4">
                        <span className="text-xs text-gray-500">{order.items.length} منتجات</span>
                      </td>
                      <td className="py-4 px-4 font-black text-gray-900">{formatPrice(order.total)}</td>
                      <td className="py-4 px-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`text-[10px] font-bold border rounded-lg px-2 py-1 focus:outline-none ${statusConfig[order.status].className}`}
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="processing">جاري التجهيز</option>
                          <option value="delivered">تم التسليم</option>
                          <option value="cancelled">ملغي</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-xs">{order.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}