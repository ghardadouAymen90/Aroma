'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/application/stores/cartStore';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/domain';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const discount = product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  // Add JSON-LD structured data
  useEffect(() => {
    // Product schema
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: `https://aroma-fragrance.com${product.image}`,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      offers: {
        '@type': 'Offer',
        url: `https://aroma-fragrance.com/products/${product.id}`,
        priceCurrency: 'USD',
        price: product.discountedPrice ? product.discountedPrice.toString() : product.price.toString(),
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.toString(),
        reviewCount: product.reviews.toString(),
      },
    };

    // Breadcrumb schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://aroma-fragrance.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://aroma-fragrance.com/products',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.name,
          item: `https://aroma-fragrance.com/products/${product.id}`,
        },
      ],
    };

    // Add product schema
    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.textContent = JSON.stringify(productSchema);
    document.head.appendChild(productScript);

    // Add breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.head.removeChild(productScript);
      document.head.removeChild(breadcrumbScript);
    };
  }, [product]);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gold-400 hover:text-gold-300 transition-colors">
            Home
          </Link>
          <span className="text-gold-500/50">/</span>
          <Link href="/" className="text-gold-400 hover:text-gold-300 transition-colors">
            Products
          </Link>
          <span className="text-gold-500/50">/</span>
          <span className="text-gold-300 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Premium Image Section */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-dark-700 to-dark-800 border border-gold-600/30 shadow-2xl shadow-gold-600/20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                priority
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/500?text=' + encodeURIComponent(product.name);
                }}
              />
              {/* Premium Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 px-5 py-3 rounded-full font-bold text-lg shadow-lg shadow-gold-500/40">
                  -{discount}%
                </div>
              )}
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold-500/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Premium Details Section */}
          <div className="space-y-8">
            {/* Title & Brand */}
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-widest text-gold-400">✦ Premium Selection</p>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
                {product.name}
              </h1>
              <p className="text-xl text-gold-300/90 font-light">{product.brand}</p>
            </div>

            {/* Premium Rating */}
            <div className="flex flex-col gap-4 pb-6 border-b border-gold-600/30">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-3xl">
                      {i < Math.round(product.rating) ? (
                        <span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">★</span>
                      ) : (
                        <span className="text-dark-600">☆</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gold-300 font-semibold">{product.rating.toFixed(1)}/5.0</span>
                  <span className="text-sm text-gold-400/80">({product.reviews} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Premium Pricing */}
            <div className="space-y-3 bg-gradient-to-r from-gold-600/10 to-dark-800 border border-gold-600/30 rounded-xl p-6">
              {product.discountedPrice ? (
                <div className="space-y-2">
                  <p className="text-sm text-gold-400/80 uppercase tracking-widest font-semibold">Special Price</p>
                  <div className="flex items-baseline gap-4">
                    <p className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                      ${product.discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-xl text-gold-400/60 line-through">${product.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gold-300">You save ${(product.price - product.discountedPrice).toFixed(2)}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gold-400/80 uppercase tracking-widest font-semibold">Price</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* Premium Product Specs */}
            <div className="space-y-4 bg-dark-700/40 border border-gold-600/20 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">✦ Product Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gold-600/20">
                  <span className="text-gold-400/80 font-medium">Fragrance Type</span>
                  <span className="text-gold-200 font-semibold">{product.fragrance}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gold-600/20">
                  <span className="text-gold-400/80 font-medium">Size</span>
                  <span className="text-gold-200 font-semibold">{product.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gold-400/80 font-medium">Availability</span>
                  <span className={`font-bold ${product.quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gold-400">About This Fragrance</h3>
              <p className="text-gold-200/80 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Premium Quantity & CTA */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-6">
                <label htmlFor="quantity" className="text-gold-400 font-semibold uppercase tracking-widest text-sm">
                  Quantity
                </label>
                <div className="flex items-center border-2 border-gold-600/50 rounded-lg overflow-hidden bg-dark-700/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-gold-400 hover:bg-gold-600/20 transition-colors font-bold text-lg"
                  >
                    −
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center bg-dark-700 text-gold-200 font-bold text-lg border-none outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 text-gold-400 hover:bg-gold-600/20 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Premium CTA Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 opacity-100 ${
                  isAdded
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-dark-900 shadow-lg shadow-emerald-500/50'
                    : product.quantity === 0
                      ? 'bg-dark-600 text-dark-400 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 shadow-lg shadow-gold-600/50 hover:shadow-gold-500/60 hover:scale-105'
                }`}
              >
                {isAdded ? (
                  <>
                    <span>✓</span>
                    <span>Added to Cart</span>
                  </>
                ) : product.quantity === 0 ? (
                  'Out of Stock'
                ) : (
                  <>
                    <span>✦</span>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Premium Info Box */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-gold-600/10 border border-gold-600/30 rounded-lg p-4 text-center space-y-2">
                <p className="text-2xl">🚚</p>
                <p className="text-xs font-bold uppercase text-gold-400">Free Shipping</p>
                <p className="text-xs text-gold-300/80">Orders over $100</p>
              </div>
              <div className="bg-gold-600/10 border border-gold-600/30 rounded-lg p-4 text-center space-y-2">
                <p className="text-2xl">🔄</p>
                <p className="text-xs font-bold uppercase text-gold-400">30-Day Return</p>
                <p className="text-xs text-gold-300/80">Hassle-free returns</p>
              </div>
              <div className="bg-gold-600/10 border border-gold-600/30 rounded-lg p-4 text-center space-y-2">
                <p className="text-2xl">⚡</p>
                <p className="text-xs font-bold uppercase text-gold-400">Fast Delivery</p>
                <p className="text-xs text-gold-300/80">3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Divider */}
        <div className="mt-16 pt-12 border-t border-gold-600/20">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent mb-4">
              ✦ Continue Exploring
            </h2>
            <Link href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-gold-600/20 to-gold-500/20 border-2 border-gold-500/50 hover:border-gold-400 text-gold-300 font-bold uppercase tracking-wider rounded-lg transition-all hover:shadow-lg hover:shadow-gold-500/20">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
