import useSWR from 'swr';
import { Product, PaginatedResponse, FilterParams } from '@/types/domain';
import { useFilterStore } from '@/lib/application/stores/filterStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const fetcher = async (url: string) => {
  console.log('Fetching products from:', url);
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fetch failed:', response.status, errorText);
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  const data = await response.json();
  console.log('Products fetched:', data);
  return data.data;
};

// Get all products with filtering and pagination
export const useProducts = () => {
  const filters = useFilterStore();

  const params = new URLSearchParams();
  if (filters.search && filters.search.trim()) params.append('search', filters.search);
  if (filters.brand && filters.brand.trim()) params.append('brand', filters.brand);
  if (filters.minPrice !== undefined && filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined && filters.maxPrice > 0) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.category && filters.category.trim()) params.append('category', filters.category);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
  params.append('page', filters.page.toString());
  params.append('limit', filters.limit.toString());

  const { data, error, isLoading } = useSWR<PaginatedResponse<Product>>(
    `${API_BASE_URL}/api/products?${params.toString()}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    data,
    error,
    isLoading,
  };
};

// Get single product by ID
export const useProduct = (id: string | null) => {
  const { data, error, isLoading } = useSWR<Product>(
    id ? `${API_BASE_URL}/api/products/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    data,
    error,
    isLoading,
  };
};
