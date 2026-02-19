'use client';

import { Product } from '@/types/domain';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/application/stores/cartStore';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card p-6 h-full flex flex-col bg-dark-800 border border-gold-600/30 hover:border-gold-500/60 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
        {/* Image Container */}
        <motion.div
          className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg bg-dark-900 group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 bg-gold-500 text-dark-900 px-3 py-1 rounded-full text-sm font-bold"
            >
              -{discount}%
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        <Link href={`/products/${product.id}`} className="flex-1 group">
          <h3 className="text-lg font-semibold text-gray-100 group-hover:text-gold-400 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-400 mb-3">{product.brand}</p>

        {/* Fragrance Type */}
        <p className="text-xs text-gold-400 uppercase tracking-wide mb-3 font-medium">{product.fragrance}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-gold-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm">
                {i < Math.round(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-6">
          {product.discountedPrice ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gold-400">${product.discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-gold-400">${product.price.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 uppercase tracking-wide text-sm ${
            isAdded
              ? 'bg-green-600 text-white'
              : 'bg-gold-500 text-dark-900 hover:bg-gold-400'
          }`}
        >
          {isAdded ? '✓ Added' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}
