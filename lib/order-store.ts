import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Watch } from '../app/data/watches'
import { Perfume } from '../app/data/perfumes'

// 1. تعريف الأنواع
type GenericProduct = Watch | Perfume;

type CartItem = {
  product: GenericProduct
  quantity: number
  selectedOption: string | number
}

// نوع الطلب للإدارة
export type Order = {
  id: string
  customerName: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'delivered' | 'cancelled'
  date: string
}

// 2. ستور السلة (Cart Store)
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
        const existing = items.find(i => i.product?.id === product.id && i.selectedOption === option)
        if (existing) {
          set({ items: items.map(i =>
            i.product?.id === product.id && i.selectedOption === option
              ? { ...i, quantity: i.quantity + 1 } : i
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
      total: () => get().items.reduce((sum, i) => sum + (i.product.price * i.quantity), 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)

// 3. ستور المقارنة (Compare Store)
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

// 4. ستور الطلبات للإدارة (Order Store) - الجديد
type OrderStore = {
  orders: Order[]
  addOrder: (orderData: Omit<Order, 'id' | 'status' | 'date'>) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (orderData) => set((state) => ({
        orders: [
          {
            ...orderData,
            id: `#${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'pending',
            date: new Date().toLocaleDateString('ar-EG'),
          },
          ...state.orders
        ]
      })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      }))
    }),
    { name: 'orders-storage' }
  )
)