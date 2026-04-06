'use client'
import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, GitCompare } from 'lucide-react'
import { useState } from 'react'
import { useCartStore, useCompareStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const count = useCartStore(s => s.count())
  const compareCount = useCompareStore(s => s.items.length)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Perfumes' },
    { href: '/watches', label: 'Watches' },
    { href: '/compare', label: 'Compare' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">
              <svg width="28" height="28" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="body-clip">
                    <rect x="8" y="17" width="24" height="27" rx="6" />
                  </clipPath>
                </defs>
                <rect x="8" y="23" width="24" height="21" fill="#C8920A" opacity="0.55" clip-path="url(#body-clip)" />
                <path d="M21 7 L34 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <rect x="15" y="3" width="12" height="8" rx="4" stroke="currentColor" stroke-width="1.8" fill="none" />
                <rect x="17" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.7" />
                <rect x="8" y="17" width="24" height="27" rx="6" stroke="currentColor" stroke-width="1.8" fill="none" />
                <line x1="20" y1="17" x2="20" y2="44" stroke="currentColor" stroke-width="0.8" opacity="0.2" />
              </svg>
            </span>
            <span className="font-bold text-xl tracking-wide">Sillage</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className="text-gray-600 hover:text-black transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Link href="/products" className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5" />
            </Link>

            {compareCount > 0 && (
              <Link href="/compare" className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <GitCompare className="w-5 h-5" />
                <span className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              </Link>
            )}

            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -left-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
{/* 
            <Link href="/admin" className="hidden md:block">
              <Button variant="outline" size="sm">Admin</Button>
            </Link> */}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t flex flex-col gap-3">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className="text-gray-600 hover:text-black py-2 font-medium"
                onClick={() => setIsOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}