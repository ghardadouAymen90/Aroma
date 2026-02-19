import { Product } from '@/types/domain';

// Mock Database
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Black Opium',
    description: 'A luxurious fragrance by Yves Saint Laurent with intoxicating notes of coffee, vanilla, and orange blossom. Perfect for confident women who want to make a statement.',
    price: 129.99,
    discountedPrice: 99.99,
    image: 'https://images.pexels.com/photos/28471438/pexels-photo-28471438.jpeg?w=500&h=500&fit=crop',
    brand: 'Yves Saint Laurent',
    fragrance: 'Oriental',
    size: '90ml',
    quantity: 50,
    rating: 4.8,
    reviews: 245,
    category: 'women',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sauvage',
    description: 'A timeless masculine fragrance by Christian Dior featuring spicy ambroxan and fresh citrus notes. The ultimate sophisticated choice for the modern man.',
    price: 119.99,
    image: 'https://images.pexels.com/photos/14402573/pexels-photo-14402573.jpeg?w=500&h=500&fit=crop',
    brand: 'Christian Dior',
    fragrance: 'Aromatic Spicy',
    size: '100ml',
    quantity: 45,
    rating: 4.9,
    reviews: 189,
    category: 'men',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Boss Bottled',
    description: 'An iconic fragrance by Hugo Boss blending warm amber with aromatic notes and a hint of spice. A classic choice for the discerning gentleman.',
    price: 95.99,
    image: 'https://images.pexels.com/photos/20753035/pexels-photo-20753035.jpeg?w=500&h=500&fit=crop',
    brand: 'Hugo Boss',
    fragrance: 'Woody Amber',
    size: '100ml',
    quantity: 30,
    rating: 4.7,
    reviews: 312,
    category: 'men',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '4',
    name: 'Coco Noir',
    description: 'An elegant oriental fragrance by Chanel with black amber, patchouli, and vanilla. A mysterious and sensual choice for sophisticated women.',
    price: 135.99,
    discountedPrice: 109.99,
    image: 'https://images.pexels.com/photos/21067590/pexels-photo-21067590.jpeg?w=500&h=500&fit=crop',
    brand: 'Chanel',
    fragrance: 'Oriental',
    size: '100ml',
    quantity: 60,
    rating: 4.8,
    reviews: 156,
    category: 'women',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: '5',
    name: 'Bleu de Chanel',
    description: 'A refined aromatic fragrance by Chanel featuring ambroxan, sandalwood, and citrus notes. Timeless elegance for the modern man who appreciates luxury.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/9202894/pexels-photo-9202894.jpeg?w=500&h=500&fit=crop',
    brand: 'Chanel',
    fragrance: 'Aromatic',
    size: '100ml',
    quantity: 40,
    rating: 4.9,
    reviews: 201,
    category: 'men',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '6',
    name: 'La Vie Est Belle',
    description: 'A sweet and luminous fragrance by Lancôme with notes of patchouli, praline, and iris. Celebrating the beauty of life with every spray.',
    price: 119.99,
    image: 'https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg?w=500&h=500&fit=crop',
    brand: 'Lancôme',
    fragrance: 'Oriental Floral',
    size: '75ml',
    quantity: 55,
    rating: 4.6,
    reviews: 128,
    category: 'women',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-21'),
  },
];

// Mock Users Store
const mockUsers: Map<string, { email: string; password: string; firstName: string; lastName: string }> = new Map([
  ['user-1', { email: 'demo@example.com', password: 'Demo@12345', firstName: 'John', lastName: 'Doe' }],
]);

export const mockDatabase = {
  products: mockProducts,
  users: mockUsers,
  carts: new Map<string, { items: Array<{ productId: string; quantity: number }> }>(),
  orders: new Map<string, any>(),
};

export function getProductById(id: string): Product | undefined {
  return mockDatabase.products.find((p) => p.id === id);
}

export function getAllProducts(): Product[] {
  return mockDatabase.products;
}

export function getUserByEmail(email: string) {
  for (const [, user] of mockDatabase.users) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}
