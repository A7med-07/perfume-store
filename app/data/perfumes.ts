export type Perfume = {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  description: string
  notes: { top: string[]; middle: string[]; base: string[] }
  category: string
  gender: 'men' | 'women' | 'unisex'
  volume: number[]
  stock: number
  rating: number
  reviews: number
  image: string
  images: string[]
  isNew?: boolean
  isBestseller?: boolean
}


export const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 1299,
    originalPrice: 1599,
    description: "عطر خشبي عطري يجسد روح الحرية والأناقة الفرنسية الراقية",
    notes: {
      top: ["ليمون", "نعناع", "وردة"],
      middle: ["زنجبيل", "جوزة الطيب", "يسمين"],
      base: ["صندل", "باتشولي", "مسك أبيض"]
    },
    category: "خشبي عطري",
    gender: "men",
    volume: [50, 100, 150],
    stock: 15,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80"],
    isBestseller: true
  },
  {
    id: 2,
    name: "Miss Dior",
    brand: "Dior",
    price: 1450,
    description: "عطر زهري رومانسي يحكي قصة أنوثة وجمال لا حدود لهما",
    notes: {
      top: ["وردة", "فراولة", "ليمون"],
      middle: ["فاوانيا", "يسمين", "زنبق"],
      base: ["مسك", "باتشولي", "خشب الصندل"]
    },
    category: "زهري",
    gender: "women",
    volume: [30, 50, 100],
    stock: 20,
    rating: 4.7,
    reviews: 1893,
    image: "https://images.unsplash.com/photo-1678984633768-c4fd5a01732a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80"],
    isNew: true
  },
  {
    id: 3,
    name: "Black Opium",
    brand: "YSL",
    price: 1350,
    originalPrice: 1600,
    description: "عطر شرقي جريء يمزج بين القهوة والفانيليا لإغراء لا يقاوم",
    notes: {
      top: ["كمثرى", "وردة وردية", "برتقال"],
      middle: ["قهوة", "يسمين", "بيتي باو"],
      base: ["فانيليا", "باتشولي", "مسك أبيض", "خشب الأرز"]
    },
    category: "شرقي",
    gender: "women",
    volume: [30, 50, 90],
    stock: 12,
    rating: 4.9,
    reviews: 3102,
    image: "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80"],
    isBestseller: true
  },
  {
    id: 4,
    name: "Acqua di Gio",
    brand: "Giorgio Armani",
    price: 1100,
    description: "عطر مائي منعش يستوحي جماله من مياه البحر الأبيض المتوسط",
    notes: {
      top: ["ليمون", "نارنج", "بيرغامو"],
      middle: ["أعشاب بحرية", "فريزيا", "ياسمين"],
      base: ["أخشاب", "مسك", "مر"]
    },
    category: "مائي",
    gender: "men",
    volume: [50, 100, 200],
    stock: 25,
    rating: 4.6,
    reviews: 4201,
    image: "https://images.unsplash.com/photo-1717376280564-0fd179a9695a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80"],
    isBestseller: true
  },
  {
    id: 5,
    name: "Coco Mademoiselle",
    brand: "Chanel",
    price: 1550,
    description: "عطر شرقي زهري يجمع بين الأناقة الكلاسيكية والحداثة الجريئة",
    notes: {
      top: ["برتقال", "بيرغامو", "جريب فروت"],
      middle: ["وردة تركية", "يسمين", "ميموزا"],
      base: ["باتشولي", "فيتيفير", "مسك أبيض", "أوريس"]
    },
    category: "شرقي زهري",
    gender: "women",
    volume: [35, 50, 100],
    stock: 18,
    rating: 4.8,
    reviews: 2876,
    image: "https://images.unsplash.com/photo-1640975972263-1f73398e943b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80"]
  },
  {
    id: 6,
    name: "Sauvage",
    brand: "Dior",
    price: 1400,
    originalPrice: 1700,
    description: "عطر جريء ونقي يلهمه الطبيعة الوحشية تحت سماء مرصعة بالنجوم",
    notes: {
      top: ["بيرغامو كالابريا", "فلفل"],
      middle: ["فلفل صينى", "لافندر", "فيتيفير"],
      base: ["أميبروكسان", "خشب الأرز", "لابدانوم"]
    },
    category: "خشبي",
    gender: "men",
    volume: [60, 100, 200],
    stock: 30,
    rating: 4.9,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1747916148827-d5fb453bb978?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80"],
    isBestseller: true
  },
  
  {
    id: 7,
    name: "La Vie Est Belle",
    brand: "Lancôme",
    price: 1250,
    description: "احتفال بالحياة والسعادة في عطر زهري غوارمان لا مثيل له",
    notes: {
      top: ["كشمش أسود", "كمثرى"],
      middle: ["ايريس", "فاوانيا", "يسمين"],
      base: ["براليني", "فانيليا", "باتشولي", "مسك"]
    },
    category: "غوارمان",
    gender: "women",
    volume: [30, 50, 75, 100],
    stock: 22,
    rating: 4.7,
    reviews: 3341,
    image: "https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1600612253971-7b8e6f9d7a64?w=600&q=80"]
  },
  {
    id: 8,
    name: "Oud Wood",
    brand: "Tom Ford",
    price: 2800,
    description: "عطر عودي فاخر يمزج بين خشب العود النادر والتوابل الشرقية",
    notes: {
      top: ["عود", "خشب الورد"],
      middle: ["خشب الصندل", "فيتيفير", "كاردامون"],
      base: ["أمبر", "موسيغو دي شين", "توباكو"]
    },
    category: "عودي",
    gender: "unisex",
    volume: [50, 100, 250],
    stock: 8,
    rating: 4.9,
    reviews: 1205,
    image: "https://images.unsplash.com/photo-1739190940453-20900e9d18fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1594038245068-dbe72f4cab8c?w=600&q=80"],
    isNew: true
  },
  {
    id: 9,
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    price: 980,
    description: "عطر منعش يحكي قصة صيف إيطالي مشمس على شواطئ البحر الأبيض",
    notes: {
      top: ["صقلية سيدار", "تفاحة", "بيل فلور"],
      middle: ["يسمين", "بامبو", "جيرانيوم"],
      base: ["مسك", "أمبر", "خشب الأرز"]
    },
    category: "مائي زهري",
    gender: "women",
    volume: [25, 50, 100],
    stock: 19,
    rating: 4.5,
    reviews: 2109,
    image: "https://images.unsplash.com/photo-1706408604086-144590f4020a?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=600&q=80"]
  },
  {
    id: 10,
    name: "Aventus",
    brand: "Creed",
    price: 3500,
    description: "ملك العطور الفاخرة، يجسد القوة والنجاح والأناقة الملكية",
    notes: {
      top: ["أناناس", "بيرغامو", "تفاحة", "كاسيس"],
      middle: ["بتول", "باتشولي", "يسمين", "ورد"],
      base: ["مسك", "خشب الأوك", "أمبرغريس", "فانيليا"]
    },
    category: "فروتي خشبي",
    gender: "men",
    volume: [50, 100, 250],
    stock: 5,
    rating: 4.9,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1624811742200-69166e7b7bcc?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80"],
    isNew: true
  },
  {
    id: 11,
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    price: 1380,
    description: "انفجار من الزهور الفاخرة في قنبلة عطرية لا تُنسى",
    notes: {
      top: ["شاي", "بيرغامو"],
      middle: ["أوركيد", "فريزيا", "ورد", "يسمين"],
      base: ["باتشولي", "مسك", "فانيليا"]
    },
    category: "زهري شرقي",
    gender: "women",
    volume: [30, 50, 100],
    stock: 14,
    rating: 4.7,
    reviews: 1654,
    image: "https://images.unsplash.com/photo-1673443143036-ef6eec48c595?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1588776814546-ec7e2b3c7b7b?w=600&q=80"]
  },
  {
    id: 12,
    name: "1 Million",
    brand: "Paco Rabanne",
    price: 1150,
    originalPrice: 1350,
    description: "عطر فاخر بجرأة الذهب يعكس شخصية الرجل الواثق والجذاب",
    notes: {
      top: ["جريب فروت", "نعناع", "دم التنين"],
      middle: ["ورد", "توابل", "قرفة"],
      base: ["جلد", "أمبر", "باتشولي", "خشب"]
    },
    category: "شرقي فانيلي",
    gender: "men",
    volume: [50, 100, 200],
    stock: 21,
    rating: 4.6,
    reviews: 2890,
    image: "https://images.unsplash.com/photo-1633072437275-ec3344b4b966?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80"],
    isBestseller: true
  },
  {
    id: 13,
    name: "Chance Eau Tendre",
    brand: "Chanel",
    price: 1480,
    description: "عطر زهري طازج يجسد الحظ الجيد في لحظات الفرح والتجدد",
    notes: {
      top: ["جريب فروت", "كيتسون"],
      middle: ["يسمين", "هيسنث"],
      base: ["أمبروكسان", "سيدار", "مسك أبيض"]
    },
    category: "زهري طازج",
    gender: "women",
    volume: [35, 50, 100, 150],
    stock: 16,
    rating: 4.7,
    reviews: 1432,
    image: "https://images.unsplash.com/photo-1588177925144-2fd3e4e7ce57?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1590156562745-5a8541078e29?w=600&q=80"]
  },
  {
    id: 14,
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    price: 2950,
    description: "عطر دافئ وغني يمزج التبغ مع الفانيليا الكريمية في تناغم مثالي",
    notes: {
      top: ["توباكو فلاور", "توابل"],
      middle: ["توباكو", "فانيليا", "كاكاو"],
      base: ["توكا بينز", "خشب القيقب", "أخشاب جافة"]
    },
    category: "شرقي",
    gender: "unisex",
    volume: [50, 100, 250],
    stock: 7,
    rating: 4.8,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1601295452898-a2d949c5b1f5?w=600&q=80"]
  },
  {
    id: 15,
    name: "Good Girl",
    brand: "Carolina Herrera",
    price: 1320,
    description: "عطر ثنائي القطب يجمع بين الأنوثة الرقيقة والجانب الجريء الغامض",
    notes: {
      top: ["لوز", "قهوة"],
      middle: ["يسمين سامباك", "تيوبروز"],
      base: ["كاكاو", "توباكو", "فيتيفير", "أخشاب كاشمير"]
    },
    category: "شرقي زهري",
    gender: "women",
    volume: [30, 50, 80],
    stock: 11,
    rating: 4.7,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?w=600&q=80"],
    isNew: true
  },
  {
    id: 16,
    name: "Baccarat Rouge 540",
    brand: "Maison Margiela",
    price: 4200,
    description: "تحفة عطرية نادرة تجمع بين الياسمين والعود والعنبر في سيمفونية فاخرة",
    notes: {
      top: ["يسمين", "زعفران"],
      middle: ["عود مصري", "أرز"],
      base: ["فيدير دي بوا", "أمبروكسان"]
    },
    category: "فلورال عودي",
    gender: "unisex",
    volume: [35, 70, 200],
    stock: 4,
    rating: 5.0,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1709660628819-c8f1cb5d818b?q=80&w=728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80"],
    isNew: true
  },
  {
    id: 17,
    name: "Allure Homme Sport",
    brand: "Chanel",
    price: 1200,
    description: "عطر رياضي حيوي يمزج الطاقة والأناقة في توازن مثالي للرجل العصري",
    notes: {
      top: ["ليمون", "بيرغامو", "مانداريان"],
      middle: ["نعناع مائي", "فلفل أبيض", "إيليلانج"],
      base: ["خشب الصندل", "توباكو", "مسك"]
    },
    category: "خشبي طازج",
    gender: "men",
    volume: [50, 100, 150],
    stock: 17,
    rating: 4.6,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80"]
  },
  {
    id: 18,
    name: "Si",
    brand: "Giorgio Armani",
    price: 1180,
    originalPrice: 1400,
    description: "عطر أنثوي جريء يقول نعم للحياة بكل ما فيها من جمال وقوة",
    notes: {
      top: ["كاسيس نيو", "برغموت", "مانداريان"],
      middle: ["وردة ماي", "فريزيا", "هيليوتروب"],
      base: ["باتشولي", "فانيليا", "أمبروكسان", "مسك أبيض"]
    },
    category: "شرقي فلورال",
    gender: "women",
    volume: [30, 50, 100],
    stock: 13,
    rating: 4.6,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1725139695447-f75e1b482708?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=80"]
  },
  {
    id: 19,
    name: "Stronger With You",
    brand: "Emporio Armani",
    price: 1050,
    description: "عطر رومانسي دافئ يحتفل بقوة الحب والعلاقات الأصيلة",
    notes: {
      top: ["جريب فروت", "فلفل وردي", "لافندر"],
      middle: ["فيوليت", "سيج", "كاردامون"],
      base: ["فانيليا", "خشب الكاشمير", "مسك"]
    },
    category: "شرقي خشبي",
    gender: "men",
    volume: [50, 100],
    stock: 24,
    rating: 4.5,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1611242956059-53e4c29e6b22?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80"]
  },
  {
    id: 20,
    name: "Neroli Portofino",
    brand: "Tom Ford",
    price: 2600,
    description: "رحلة إلى ساحل البحر الأبيض المتوسط في عطر منعش وفاخر",
    notes: {
      top: ["نيرولي", "برتقال مر", "ليمون"],
      middle: ["بيتانجورا", "لافندر", "روزماري"],
      base: ["أمبر", "مسك", "أخشاب بيضاء"]
    },
    category: "طازج حمضي",
    gender: "unisex",
    volume: [50, 100, 250],
    stock: 9,
    rating: 4.8,
    reviews: 743,
    image: "https://images.unsplash.com/photo-1593105587216-6581c8071e68?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=600&q=80"]
  }
]