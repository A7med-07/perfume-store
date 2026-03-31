// types.ts
export type Watch = {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  description: string
  category: string
  gender: 'men' | 'women' | 'unisex'
  materials: string[]
  colors: string[]
  stock: number
  rating: number
  reviews: number
  image: string
  images: string[]
  isNew?: boolean
  isBestseller?: boolean
}

export const watches: Watch[] = [
  {
    id: 1,
    name: "Rolex Submariner",
    brand: "Rolex",
    price: 42000,
    originalPrice: 45000,
    description: "ساعة غواص كلاسيكية فاخرة مقاومة للماء حتى 300 متر.",
    category: "غواص",
    gender: "men",
    materials: ["ستانلس ستيل", "سيراميك"],
    colors: ["أسود", "فضي"],
    stock: 10,
    rating: 4.9,
    reviews: 520,
    image: "https://images.unsplash.com/photo-1662384197911-e82189f4dc60?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1600181954007-eda9c1a6b6d3?q=80&w=764&auto=format&fit=crop"],
    isBestseller: true
  },
  {
    id: 2,
    name: "Omega Seamaster",
    brand: "Omega",
    price: 25000,
    description: "ساعة رياضية أنيقة مقاومة للماء ومناسبة للغوص والمغامرة.",
    category: "غواص",
    gender: "men",
    materials: ["ستانلس ستيل", "مطاط"],
    colors: ["أزرق", "فضي"],
    stock: 8,
    rating: 4.8,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1773755060442-6d128b70dd20?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1611826481846-234d08f73b2c?q=80&w=764&auto=format&fit=crop"],
    isNew: true
  },
  {
    id: 3,
    name: "Cartier Tank",
    brand: "Cartier",
    price: 38000,
    description: "ساعة كلاسيكية أنثوية بتصميم مستطيل أنيق وفاخر.",
    category: "كلاسيك",
    gender: "women",
    materials: ["ذهب أصفر", "جلد"],
    colors: ["ذهبي", "أبيض"],
    stock: 5,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1747995525906-b141498b8e7e?q=80&w=694&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1588695330700-5a0f05e8b3db?q=80&w=764&auto=format&fit=crop"],
    isBestseller: true
  },
  {
    id: 4,
    name: "Tag Heuer Carrera",
    brand: "Tag Heuer",
    price: 20000,
    description: "ساعة سباق رياضية تجمع بين الأناقة والأداء العالي.",
    category: "رياضية",
    gender: "unisex",
    materials: ["ستانلس ستيل", "جلد"],
    colors: ["أسود", "فضي"],
    stock: 12,
    rating: 4.7,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1772159150099-d467b3dae614?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1602327352787-f6a5cfe3e18c?q=80&w=764&auto=format&fit=crop"]
  }
  // ممكن تضيف باقي الساعات بنفس الشكل
]