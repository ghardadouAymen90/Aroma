import { create } from 'zustand';
import { FilterParams } from '@/types/domain';

interface FilterStore {
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  page: number;
  limit: number;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
  sortOrder: 'asc' | 'desc';
  setSearch: (search: string) => void;
  setBrand: (brand: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
  setSorting: (sortBy: 'name' | 'price' | 'rating' | 'newest', sortOrder: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const initialState: Omit<FilterStore, 'setSearch' | 'setBrand' | 'setCategory' | 'setPriceRange' | 'setSorting' | 'setPage' | 'resetFilters'> = {
  page: 1,
  limit: 12,
  sortBy: 'name',
  sortOrder: 'asc',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  search: '',
  brand: '',
  minPrice: 0,
  maxPrice: 0,
  category: '',
  setSearch: (search) => set({ search, page: 1 }),
  setBrand: (brand) => set({ brand, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setPriceRange: (minPrice, maxPrice) =>
    set({ minPrice, maxPrice, page: 1 }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({
      search: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      category: '',
      page: 1,
      limit: 12,
      sortBy: 'name',
      sortOrder: 'asc',
    }),
}));
