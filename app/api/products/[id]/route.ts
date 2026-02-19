import { NextRequest, NextResponse } from 'next/server';
import { setSecurityHeaders } from '@/lib/utils/security';
import { getProductById } from '@/lib/infrastructure/mockDatabase';
import { ApiResponse, Product } from '@/types/domain';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID format
    if (!id || typeof id !== 'string' || id.length === 0) {
      return setSecurityHeaders(
        NextResponse.json(
          { success: false, error: 'Invalid product ID' },
          { status: 400 }
        )
      );
    }

    const product = getProductById(id);

    if (!product) {
      return setSecurityHeaders(
        NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        )
      );
    }

    return setSecurityHeaders(
      NextResponse.json({
        success: true,
        data: product,
      })
    );
  } catch (error) {
    console.error('Get product error:', error);
    return setSecurityHeaders(
      NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      )
    );
  }
}
