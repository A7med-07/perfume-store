// app/page.tsx
import Link from 'next/link'
import { ArrowLeft, Sparkles, Shield, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'
import { perfumes } from './data/perfumes'


export default function HomePage() {
  const bestsellers = perfumes.filter(p => p.isBestseller).slice(0, 4)
  const newArrivals = perfumes.filter(p => p.isNew).slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-950 text-white overflow-hidden min-h-[85vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>مجموعة {new Date().getFullYear()} متاحة الآن</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              اكتشف
              <span className="block text-amber-400">عطرك المفضل</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              أكثر من 30 عطراً فاخراً من كبرى دور العطور العالمية.
              اعثر على العطر الذي يعبر عن شخصيتك الفريدة.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2 px-8">
                  تسوق الآن
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black gap-2 px-8">
                  قارن العطور
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
              {[
                { num: '30+', label: 'عطر فاخر' },
                { num: '20+', label: 'ماركة عالمية' },
                { num: '500+', label: 'عميل سعيد' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-amber-400">{s.num}</p>
                  <p className="text-gray-400 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Shield className="w-6 h-6" />, title: 'ضمان الأصالة', desc: 'جميع عطورنا أصلية 100% من المصادر الرسمية' },
            { icon: <Truck className="w-6 h-6" />, title: 'توصيل سريع', desc: 'توصيل لجميع أنحاء مصر خلال 2-3 أيام عمل' },
            { icon: <Sparkles className="w-6 h-6" />, title: 'تجربة فاخرة', desc: 'تغليف فاخر مع هدية مجانية مع كل طلب' },
          ].map(f => (
            <div key={f.title} className="flex items-start gap-4 p-6 bg-white rounded-xl">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-600">{f.icon}</div>
              <div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-amber-500 font-medium text-sm mb-1">الأكثر مبيعاً</p>
            <h2 className="text-3xl font-bold">المفضلة لدى عملائنا</h2>
          </div>
          <Link href="/products?filter=bestseller">
            <Button variant="outline" className="gap-2">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(p => <ProductCard key={p.id} perfume={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="mx-4 md:mx-8 rounded-3xl overflow-hidden relative bg-gray-900 text-white py-20 px-8 text-center mb-16">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1400')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative">
          <p className="text-amber-400 font-medium mb-3">عروض محدودة</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">خصومات تصل إلى 30%</h2>
          <p className="text-gray-300 mb-8 text-lg">على مجموعة مختارة من أفخر العطور العالمية</p>
          <Link href="/products?filter=sale">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-10">
              اكتشف العروض
            </Button>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-emerald-500 font-medium text-sm mb-1">وصل حديثاً</p>
            <h2 className="text-3xl font-bold">أحدث الإضافات</h2>
          </div>
          <Link href="/products?filter=new">
            <Button variant="outline" className="gap-2">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(p => <ProductCard key={p.id} perfume={p} />)}
        </div>
      </section>
    </div>
  )
}