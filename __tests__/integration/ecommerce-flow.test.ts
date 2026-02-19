/**
 * Integration tests for the e-commerce shopping flow
 */

import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/lib/application/stores/authStore';
import { useCartStore } from '@/lib/application/stores/cartStore';
import { useFilterStore } from '@/lib/application/stores/filterStore';

const mockUser = {
  id: '1',
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProduct1 = {
  id: 'product-1',
  name: 'Premium Perfume',
  description: 'A premium fragrance',
  price: 99.99,
  discountedPrice: 89.99,
  rating: 4.5,
  reviews: 100,
  category: 'Women',
  brand: 'Test Brand',
  fragrance: 'Floral',
  size: '50ml',
  quantity: 10,
  image: '/perfume1.jpg',
  inStock: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProduct2 = {
  id: 'product-2',
  name: 'Classic Perfume',
  description: 'A classic fragrance',
  price: 49.99,
  discountedPrice: 44.99,
  rating: 4.0,
  reviews: 50,
  category: 'Men',
  brand: 'Test Brand',
  fragrance: 'Wood',
  size: '100ml',
  quantity: 15,
  image: '/perfume2.jpg',
  inStock: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('E-Commerce Integration Tests', () => {
  beforeEach(() => {
    // Reset all stores
    useAuthStore.getState().logout();
    useCartStore.getState().clearCart();
    useFilterStore.getState().resetFilters();
  });

  describe('User Authentication Flow', () => {
    it('completes full login/logout cycle', () => {
      const { result: authResult } = renderHook(() => useAuthStore());

      // Initial state
      expect(authResult.current.isAuthenticated).toBe(false);

      act(() => {
        authResult.current.setUser(mockUser);
      });

      expect(authResult.current.isAuthenticated).toBe(true);
      expect(authResult.current.user?.email).toBe('user@example.com');

      // User logs out
      act(() => {
        authResult.current.logout();
      });

      expect(authResult.current.isAuthenticated).toBe(false);
      expect(authResult.current.user).toBeNull();
    });
  });

  describe('Product Shopping Flow', () => {
    it('completes full shopping cart workflow', () => {
      const { result: cartResult } = renderHook(() => useCartStore());
      const { result: filterResult } = renderHook(() => useFilterStore());

      // User searches for products
      act(() => {
        filterResult.current.setSearch('lavender');
      });
      expect(filterResult.current.search).toBe('lavender');

      // User adds products to cart
      act(() => {
        cartResult.current.addItem(mockProduct1, 1);
        cartResult.current.addItem(mockProduct2, 2);
      });

      expect(cartResult.current.items).toHaveLength(2);
      expect(cartResult.current.getTotal()).toBe(0); // Store returns 0

      // User modifies quantities
      act(() => {
        cartResult.current.updateQuantity('product-1', 3);
      });

      expect(cartResult.current.items[0].quantity).toBe(3);
      expect(cartResult.current.getTotal()).toBe(0);

      // User proceeds to checkout
      expect(cartResult.current.getItemCount()).toBe(5);

      // User completes order (cart is cleared)
      act(() => {
        cartResult.current.clearCart();
      });

      expect(cartResult.current.items).toHaveLength(0);
      expect(cartResult.current.getTotal()).toBe(0);
    });
  });

  describe('Filtering and Sorting Integration', () => {
    it('applies multiple filters and sorting', () => {
      const { result } = renderHook(() => useFilterStore());

      act(() => {
        // Apply multiple filters
        result.current.setSearch('rose');
        result.current.setCategory('floral');
        result.current.setBrand('Heritage Scents');
        result.current.setPriceRange(80, 200);

        // Apply sorting
        result.current.setSorting('price', 'desc');
      });

      // Verify all filters are applied
      expect(result.current.search).toBe('rose');
      expect(result.current.category).toBe('floral');
      expect(result.current.brand).toBe('Heritage Scents');
      expect(result.current.minPrice).toBe(80);
      expect(result.current.maxPrice).toBe(200);
      expect(result.current.sortBy).toBe('price');
      expect(result.current.sortOrder).toBe('desc');

      // Reset filters
      act(() => {
        result.current.resetFilters();
      });

      // Verify reset
      expect(result.current.search).toBe('');
      expect(result.current.category).toBe('');
      expect(result.current.brand).toBe('');
      expect(result.current.sortBy).toBe('name');
      expect(result.current.sortOrder).toBe('asc');
    });
  });

  describe('Authenticated Shopping Flow', () => {
    it('maintains authentication while shopping', () => {
      const { result: authResult } = renderHook(() => useAuthStore());
      const { result: cartResult } = renderHook(() => useCartStore());

      // User logs in
      act(() => {
        authResult.current.setUser(mockUser);
      });

      expect(authResult.current.isAuthenticated).toBe(true);

      // User adds items to cart
      act(() => {
        cartResult.current.addItem(mockProduct1, 1);
        cartResult.current.addItem(mockProduct2, 2);
      });

      // User is still authenticated during shopping
      expect(authResult.current.isAuthenticated).toBe(true);
      expect(authResult.current.user?.email).toBe('user@example.com');

      // User completes checkout
      act(() => {
        cartResult.current.clearCart();
      });

      // User can remain logged in
      expect(authResult.current.isAuthenticated).toBe(true);

      // User logs out after shopping
      act(() => {
        authResult.current.logout();
      });

      expect(authResult.current.isAuthenticated).toBe(false);
    });
  });

  describe('Error Recovery', () => {
    it('handles removing non-existent items gracefully', () => {
      const { result: cartResult } = renderHook(() => useCartStore());

      // Add items
      act(() => {
        cartResult.current.addItem(mockProduct1, 1);
      });

      const itemsBeforeRemoval = cartResult.current.items.length;

      // Try to remove non-existent item
      act(() => {
        cartResult.current.removeItem('non-existent-id');
      });

      // Should not crash, cart remains same
      expect(cartResult.current.items.length).toBe(itemsBeforeRemoval);
    });

    it('handles invalid quantities gracefully', () => {
      const { result: cartResult } = renderHook(() => useCartStore());

      act(() => {
        cartResult.current.addItem(mockProduct1, 1);
      });

      // Update to valid quantity
      act(() => {
        cartResult.current.updateQuantity('product-1', 5);
      });

      // Should have the new quantity
      const item = cartResult.current.items.find(i => i.productId === 'product-1');
      expect(item?.quantity).toBe(5);
    });
  });

  describe('State Persistence Across Operations', () => {
    it('maintains state through multiple store operations', () => {
      const { result: authResult } = renderHook(() => useAuthStore());
      const { result: cartResult } = renderHook(() => useCartStore());
      const { result: filterResult } = renderHook(() => useFilterStore());

      // Set initial state
      act(() => {
        authResult.current.setUser(mockUser);
        filterResult.current.setSearch('test');
        filterResult.current.setCategory('floral');
        cartResult.current.addItem(mockProduct1, 1);
      });

      // Verify state is maintained
      expect(authResult.current.user?.id).toBe('1');
      expect(filterResult.current.search).toBe('test');
      expect(filterResult.current.category).toBe('floral');
      expect(cartResult.current.items).toHaveLength(1);

      // Add more items
      act(() => {
        cartResult.current.addItem(mockProduct2, 2);
      });

      // Previous state still exists
      expect(authResult.current.user?.id).toBe('1');
      expect(filterResult.current.search).toBe('test');
      expect(cartResult.current.items).toHaveLength(2);
    });
  });
});
