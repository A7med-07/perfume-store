import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Watch } from '../app/data/watches'
import { Perfume } from '../app/data/perfumes'

// تعريف النوع العام للمنتجات
type GenericProduct = Watch | Perfume;

type CartItem = {
  product: GenericProduct
  quantity: number
  selectedOption: string | number
}

type CartStore = {
  items: CartItem[]
  addItem: (product: GenericProduct, option: string | number) => void
  removeItem: (id: number, option: string | number) => void
  updateQuantity: (id: number, option: string | number, quantity: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, option) => {
        const items = get().items
        // البحث عن المنتج باستخدام الحقل الجديد product
        const existing = items.find(i => i.product?.id === product.id && i.selectedOption === option)
        
        if (existing) {
          set({ items: items.map(i =>
            i.product?.id === product.id && i.selectedOption === option
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )})
        } else {
          set({ items: [...items, { product, quantity: 1, selectedOption: option }] })
        }
      },

      removeItem: (id, option) => set({
        items: get().items.filter(i => !(i.product?.id === id && i.selectedOption === option))
      }),

      updateQuantity: (id, option, quantity) => set({
        items: get().items.map(i =>
          i.product?.id === id && i.selectedOption === option ? { ...i, quantity } : i
        )
      }),

      clearCart: () => set({ items: [] }),

      // تعديل الحسبة هنا لتقرأ من product
      total: () => get().items.reduce((sum, i) => {
        const price = i.product?.price || 0;
        return sum + (price * i.quantity);
      }, 0),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)

// Compare Store
type CompareStore = {
  items: GenericProduct[]
  addItem: (product: GenericProduct) => void
  removeItem: (id: number) => void
  clearAll: () => void
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (get().items.length >= 3) return
        if (get().items.find(i => i.id === product.id)) return
        set({ items: [...get().items, product] })
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      clearAll: () => set({ items: [] }),
    }),
    { name: 'compare-storage' }
  )
)