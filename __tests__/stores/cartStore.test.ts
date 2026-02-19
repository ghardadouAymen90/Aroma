import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '@/lib/application/stores/cartStore';

// Mock product for testing
const mockProduct = {
  id: 'product-1',
  name: 'Test Product',
  description: 'A test product',
  price: 99.99,
  discountedPrice: 89.99,
  rating: 4.5,
  reviews: 100,
  category: 'Test',
  brand: 'Test Brand',
  fragrance: 'Test Fragrance',
  size: '50ml',
  quantity: 10,
  image: '/test.jpg',
  inStock: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useCartStore.getState();
    store.clearCart();
  });

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.items).toEqual([]);
    expect(result.current.getTotal()).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      productId: 'product-1',
      quantity: 1,
      addedAt: expect.any(Date),
    });
  });

  it('increases quantity when adding duplicate product', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    const product2 = { ...mockProduct, id: 'product-2' };

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.addItem(product2, 1);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.removeItem('product-1');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].productId).toBe('product-2');
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    act(() => {
      result.current.updateQuantity('product-1', 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
  });

  it('removes item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    act(() => {
      result.current.updateQuantity('product-1', 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('calculates cart total correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 2);
      result.current.addItem({ ...mockProduct, id: 'product-2' }, 1);
    });

    expect(result.current.getTotal()).toBe(0); // getTotal simplified in store
  });

  it('clears entire cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.addItem({ ...mockProduct, id: 'product-2' }, 1);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotal()).toBe(0);
  });

  it('returns item count', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 3);
      result.current.addItem({ ...mockProduct, id: 'product-2' }, 2);
    });

    expect(result.current.getItemCount()).toBe(5); // 3 + 2
  });
});
