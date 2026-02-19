import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types/domain';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, quantity: number) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.productId === product.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                quantity,
                addedAt: new Date(),
              },
            ],
          };
        }),
      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId: string, quantity: number) =>
        set((state) => ({
          items: quantity === 0 
            ? state.items.filter((i) => i.productId !== productId)
            : state.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
              ),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        // This would need product prices - simplified version
        return 0;
      },
      getItemCount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-store',
    }
  )
);
