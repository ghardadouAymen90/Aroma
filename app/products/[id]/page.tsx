// ISR: Incremental Static Regeneration
// Product detail pages are dynamic routes that benefit from static prerendering
// Build time: All product pages prerendered at build time via generateStaticParams
// Revalidation: 3600 seconds (1 hour) for stale-while-revalidate updates
// Benefits: Fast page loads with static cache, fresh product data via background revalidation

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '@/lib/infrastructure/mockDatabase';
import ProductDetailClient from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate dynamic metadata for product detail pages
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found | AROMA',
      description: 'The product you are looking for could not be found.',
    };
  }

  const imageUrl = `https://aroma-fragrance.com${product.image}`;

  return {
    title: `${product.name} | ${product.brand} Perfume | AROMA`,
    description: `Buy ${product.name} by ${product.brand} - ${product.description} ${product.discountedPrice ? `Now on sale for $${product.discountedPrice}` : `$${product.price}`}. Fast shipping worldwide.`,
    keywords: [
      product.brand,
      product.name,
      'perfume',
      'fragrance',
      product.category,
      product.fragrance,
    ],
    openGraph: {
      title: `${product.name} | ${product.brand}`,
      description: `${product.description} - Buy online at AROMA.`,
      type: 'website',
      url: `https://aroma-fragrance.com/products/${product.id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `https://aroma-fragrance.com/products/${product.id}`,
    },
  };
}

// Generate static params for all products at build time
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

// Revalidate product pages every 1 hour
export const revalidate = 3600;

// Server Component for ISR and static params
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  // Find product from mock database
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductDetailClient product={product} />
    </>
  );
}
