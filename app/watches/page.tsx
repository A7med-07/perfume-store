'use client'
import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { watches } from '../data/watches'
import WatchCard from '../../components/WatchCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categories = ['الكل', ...Array.from(new Set(watches.map(w => w.category)))]
const brands = ['الكل', ...Array.from(new Set(watches.map(w => w.brand)))]
const genders = [
  { value: 'all', label: 'الكل' },
  { value: 'men', label: '👔 رجالي' },
  { value: 'women', label: '👗 نسائي' },
  { value: 'unisex', label: '✨ يونيسكس' },
]
const sortOptions = [
  { value: 'default', label: 'الافتراضي' },
  { value: 'price-asc', label: 'السعر: الأقل أولاً' },
  { value: 'price-desc', label: 'السعر: الأعلى أولاً' },
  { value: 'rating', label: 'الأعلى تقييماً' },
]

export default function WatchesPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [selectedBrand, setSelectedBrand] = useState('الكل')
  const [selectedGender, setSelectedGender] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])

  const filtered = useMemo(() => {
    let result = [...watches]

    if (search) result = result.filter(w =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.brand.toLowerCase().includes(search.toLowerCase()) ||
      w.description.includes(search)
    )
    if (selectedCategory !== 'الكل') result = result.filter(w => w.category === selectedCategory)
    if (selectedBrand !== 'الكل') result = result.filter(w => w.brand === selectedBrand)
    if (selectedGender !== 'all') result = result.filter(w => w.gender === selectedGender)
    result = result.filter(w => w.price >= priceRange[0] && w.price <= priceRange[1])

    switch (sortBy) {
      case 'price-asc': result.sort((a,b) => a.price - b.price); break
      case 'price-desc': result.sort((a,b) => b.price - a.price); break
      case 'rating': result.sort((a,b) => b.rating - a.rating); break
    }

    return result
  }, [search, selectedCategory, selectedBrand, selectedGender, sortBy, priceRange])

  const activeFiltersCount = [
    selectedCategory !== 'الكل',
    selectedBrand !== 'الكل',
    selectedGender !== 'all',
    priceRange[0] > 0 || priceRange[1] < 50000,
  ].filter(Boolean).length

  const resetFilters = () => {
    setSelectedCategory('الكل')
    setSelectedBrand('الكل')
    setSelectedGender('all')
    setPriceRange([0,50000])
    setSearch('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">جميع الساعات</h1>
        <p className="text-gray-500">{filtered.length} ساعة متاحة</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="ابحث باسم الساعة أو الماركة..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <Button variant="outline" className="gap-2 relative" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="w-4 h-4" /> فلترة
          {activeFiltersCount>0 && <span className="absolute -top-2 -left-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">الفلاتر</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-red-500 gap-1">
              <X className="w-4 h-4"/> إعادة تعيين
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender */}
            <div>
              <p className="font-medium mb-3 text-sm text-gray-600">النوع</p>
              <div className="flex flex-wrap gap-2">
                {genders.map(g => (
                  <button key={g.value} onClick={()=>setSelectedGender(g.value)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      selectedGender===g.value ? 'bg-black text-white border-black' : 'bg-white border-gray-200 hover:border-black'
                    }`}>{g.label}</button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div>
              <p className="font-medium mb-3 text-sm text-gray-600">الماركة</p>
              <select value={selectedBrand} onChange={e=>setSelectedBrand(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black">
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Category */}
            <div>
              <p className="font-medium mb-3 text-sm text-gray-600">التصنيف</p>
              <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="font-medium mb-3 text-sm text-gray-600">
              السعر: {priceRange[0].toLocaleString()} — {priceRange[1].toLocaleString()} جنيه
            </p>
            <input type="range" min={0} max={50000} step={500} value={priceRange[1]} onChange={e=>setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full accent-black"/>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {activeFiltersCount>0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedGender!=='all' && <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={()=>setSelectedGender('all')}>{genders.find(g=>g.value===selectedGender)?.label}<X className="w-3 h-3"/></Badge>}
          {selectedBrand!=='الكل' && <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={()=>setSelectedBrand('الكل')}>{selectedBrand}<X className="w-3 h-3"/></Badge>}
          {selectedCategory!=='الكل' && <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={()=>setSelectedCategory('الكل')}>{selectedCategory}<X className="w-3 h-3"/></Badge>}
        </div>
      )}

      {/* Watches Grid */}
      {filtered.length>0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(w => <WatchCard key={w.id} watch={w}/>)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-xl font-bold mb-2">لا توجد نتائج</h3>
          <p className="text-gray-500 mb-4">جرب تغيير الفلاتر أو كلمة البحث</p>
          <Button onClick={resetFilters}>إعادة تعيين الفلاتر</Button>
        </div>
      )}
    </div>
  )
}