import { NextRequest, NextResponse } from 'next/server';
import { setSecurityHeaders } from '@/lib/utils/security';
import { getAllProducts } from '@/lib/infrastructure/mockDatabase';
import { ApiResponse, PaginatedResponse, Product, FilterParams } from '@/types/domain';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const params: FilterParams = {
      search: searchParams.get('search') || undefined,
      brand: searchParams.get('brand') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      category: searchParams.get('category') || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12,
      sortBy: (searchParams.get('sortBy') as any) || 'name',
      sortOrder: (searchParams.get('sortOrder') as any) || 'asc',
    };

    let products = getAllProducts();

    // Apply filters
    if (params.search) {
      const search = params.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search)
      );
    }

    if (params.brand) {
      products = products.filter((p) => p.brand === params.brand);
    }

    if (params.minPrice !== undefined) {
      products = products.filter((p) => p.price >= params.minPrice!);
    }

    if (params.maxPrice !== undefined) {
      products = products.filter((p) => p.price <= params.maxPrice!);
    }

    if (params.category) {
      products = products.filter((p) => p.category === params.category);
    }

    // Apply sorting
    products.sort((a, b) => {
      let aValue: any = a[params.sortBy as keyof Product];
      let bValue: any = b[params.sortBy as keyof Product];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return params.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return params.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination
    const total = products.length;
    const limit = Math.min(params.limit || 12, 100);
    const page = Math.max(params.page || 1, 1);
    const start = (page - 1) * limit;
    const paginatedProducts = products.slice(start, start + limit);

    const response = NextResponse.json({
      success: true,
      data: {
        items: paginatedProducts,
        total,
        page,
        limit,
      },
    });
    return setSecurityHeaders(response);
  } catch (error) {
    console.error('Get products error:', error);
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
    return setSecurityHeaders(response);
  }
}
