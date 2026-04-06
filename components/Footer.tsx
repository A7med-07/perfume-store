import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🧴</span>
            <span className="text-white font-bold text-xl">Sillage</span>
          </div>
          <p className="text-sm leading-relaxed">
            وجهتك الأولى لأرقى العطور العالمية. نقدم لك تجربة تسوق فاخرة مع ضمان الأصالة.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-white transition">الرئيسية</Link>
            <Link href="/products" className="hover:text-white transition">العطور</Link>
            <Link href="/watches" className="hover:text-white transition">الساعات</Link>
            <Link href="/compare" className="hover:text-white transition">مقارنة العطور</Link>
            <Link href="/cart" className="hover:text-white transition">السلة</Link>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">تواصل معنا</h3>
          <div className="flex flex-col gap-2 text-sm">
            <p>📧 SillagePerfumes@gmail.com</p>
            <p>📞 01001992889</p>
            <p>📍 الدلنجات، البحيرة، مصر</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm" dir="ltr">
        <p>© {new Date().getFullYear()} Sillage. All rights reserved. | By <span className='text-amber-300 hover:text-emerald-400 cursor-pointer'>
          <Link href="https://www.linkedin.com/in/ahmed-sabry-a67015376" target="_blank">
            Ahmed Sabry
          </Link>
        </span></p>
      </div>
    </footer>
  )
}