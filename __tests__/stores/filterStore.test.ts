import { renderHook, act } from '@testing-library/react';
import { useFilterStore } from '@/application/stores/filterStore';

describe('Filter Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useFilterStore.getState();
    store.resetFilters();
  });

  it('initializes with default filters', () => {
    const { result } = renderHook(() => useFilterStore());
    
    expect(result.current.search).toBe('');
    expect(result.current.category).toBe('');
    expect(result.current.brand).toBe('');
    expect(result.current.minPrice).toBe(0);
    expect(result.current.maxPrice).toBe(0);
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('updates search filter', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setSearch('lavender');
    });

    expect(result.current.search).toBe('lavender');
  });

  it('updates category filter', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setCategory('floral');
    });

    expect(result.current.category).toBe('floral');
  });

  it('updates brand filter', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setBrand('Luxe Parfum');
    });

    expect(result.current.brand).toBe('Luxe Parfum');
  });

  it('updates price range filter', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setPriceRange(50, 150);
    });

    expect(result.current.minPrice).toBe(50);
    expect(result.current.maxPrice).toBe(150);
  });

  it('updates sorting', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setSorting('price', 'desc');
    });

    expect(result.current.sortBy).toBe('price');
    expect(result.current.sortOrder).toBe('desc');
  });

  it('resets all filters to defaults', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setSearch('test');
      result.current.setCategory('floral');
      result.current.setBrand('Test Brand');
      result.current.setPriceRange(50, 150);
      result.current.setSorting('price', 'desc');
    });

    expect(result.current.search).toBe('test');
    expect(result.current.category).toBe('floral');

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.search).toBe('');
    expect(result.current.category).toBe('');
    expect(result.current.brand).toBe('');
    expect(result.current.minPrice).toBe(0);
    expect(result.current.maxPrice).toBe(0);
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('supports multiple filter combinations', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setSearch('rose');
      result.current.setCategory('floral');
      result.current.setBrand('Heritage Scents');
      result.current.setPriceRange(80, 200);
      result.current.setSorting('rating', 'desc');
    });

    expect(result.current.search).toBe('rose');
    expect(result.current.category).toBe('floral');
    expect(result.current.brand).toBe('Heritage Scents');
    expect(result.current.minPrice).toBe(80);
    expect(result.current.maxPrice).toBe(200);
    expect(result.current.sortBy).toBe('rating');
    expect(result.current.sortOrder).toBe('desc');
  });

  it('clears individual filters', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setSearch('test');
      result.current.setCategory('floral');
    });

    expect(result.current.search).toBe('test');
    expect(result.current.category).toBe('floral');

    act(() => {
      result.current.setSearch('');
    });

    expect(result.current.search).toBe('');
    expect(result.current.category).toBe('floral'); // Other filters remain
  });
});
