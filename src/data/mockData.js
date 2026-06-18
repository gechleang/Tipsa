export const categories = [
  'Fashion',
  'Electronics',
  'Home',
  'Beauty',
  'Sports',
  'Food',
]

export const sellers = [
  {
    id: 's1',
    name: 'Angkor Craft Studio',
    rating: 4.9,
    followers: 12540,
    responseTime: '5 min',
    logo: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=200&q=80',
    banner:
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80',
    bio: 'Handcrafted Khmer lifestyle products made by local artisans.',
  },
  {
    id: 's2',
    name: 'Phnom Tech Hub',
    rating: 4.7,
    followers: 8490,
    responseTime: '9 min',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    banner:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    bio: 'Trusted electronics and accessories for modern Cambodian homes.',
  },
]

export const products = [
  {
    id: 'p1',
    name: 'Khmer Silk Tote Bag',
    price: 39,
    rating: 4.8,
    category: 'Fashion',
    sellerId: 's1',
    inventory: 45,
    sold: 620,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Premium woven silk tote inspired by Khmer motifs. Durable, lightweight, and perfect for daily shopping.',
    specifications: {
      Material: 'Silk blend',
      Weight: '0.45 kg',
      Origin: 'Phnom Penh, Cambodia',
      Warranty: '30 days',
    },
  },
  {
    id: 'p2',
    name: 'Wireless Earbuds Pro',
    price: 59,
    rating: 4.6,
    category: 'Electronics',
    sellerId: 's2',
    inventory: 80,
    sold: 1130,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Noise-reduction earbuds with clear calls and all-day battery life. Includes fast charging case.',
    specifications: {
      Battery: '28 hours with case',
      Connectivity: 'Bluetooth 5.3',
      Weight: '0.07 kg',
      Warranty: '1 year',
    },
  },
  {
    id: 'p3',
    name: 'Ceramic Tea Set',
    price: 42,
    rating: 4.7,
    category: 'Home',
    sellerId: 's1',
    inventory: 26,
    sold: 410,
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Elegant ceramic tea set with a calming minimalist design for modern kitchens and cafes.',
    specifications: {
      Pieces: '6 cups + 1 pot',
      Material: 'High-fired ceramic',
      Capacity: '900 ml',
      Warranty: '14 days',
    },
  },
  {
    id: 'p4',
    name: 'Natural Skincare Kit',
    price: 33,
    rating: 4.5,
    category: 'Beauty',
    sellerId: 's1',
    inventory: 60,
    sold: 540,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Gentle cleanser, toner, and serum made with botanicals suitable for sensitive skin.',
    specifications: {
      Type: 'All skin types',
      Volume: '3 x 120 ml',
      Origin: 'Cambodia',
      Warranty: '7 days',
    },
  },
  {
    id: 'p5',
    name: 'Smart Fitness Watch',
    price: 89,
    rating: 4.4,
    category: 'Sports',
    sellerId: 's2',
    inventory: 40,
    sold: 730,
    images: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Track heart rate, sleep, and workouts with a bright AMOLED display and waterproof build.',
    specifications: {
      Display: '1.62 inch AMOLED',
      Battery: '10 days',
      Waterproof: '5 ATM',
      Warranty: '1 year',
    },
  },
  {
    id: 'p6',
    name: 'Organic Kampot Pepper Set',
    price: 24,
    rating: 4.9,
    category: 'Food',
    sellerId: 's1',
    inventory: 95,
    sold: 1320,
    images: [
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Award-winning organic pepper set including black, red, and white Kampot pepper.',
    specifications: {
      Weight: '3 x 80 g',
      Origin: 'Kampot',
      Certification: 'Organic',
      Warranty: 'Freshness guaranteed',
    },
  },
]

export const reviews = [
  {
    id: 'r1',
    productId: 'p1',
    user: 'Sophea',
    rating: 5,
    comment: 'Quality is excellent and delivery was fast.',
    date: '2026-05-01',
  },
  {
    id: 'r2',
    productId: 'p1',
    user: 'Malis',
    rating: 4,
    comment: 'Great design. Looks exactly like photos.',
    date: '2026-05-20',
  },
  {
    id: 'r3',
    productId: 'p2',
    user: 'David',
    rating: 5,
    comment: 'Battery life is amazing for this price.',
    date: '2026-06-10',
  },
]

export const topSellers = sellers.map((seller) => ({
  ...seller,
  monthlyRevenue: seller.id === 's1' ? 12750 : 19420,
  products: products.filter((product) => product.sellerId === seller.id).length,
}))

export const orders = [
  {
    id: 'ORD-1001',
    status: 'Shipped',
    total: 98,
    customer: 'Sokha Chann',
    date: '2026-06-12',
  },
  {
    id: 'ORD-1002',
    status: 'Processing',
    total: 39,
    customer: 'Lina Kim',
    date: '2026-06-13',
  },
  {
    id: 'ORD-1003',
    status: 'Delivered',
    total: 142,
    customer: 'Chen Wei',
    date: '2026-06-14',
  },
]
