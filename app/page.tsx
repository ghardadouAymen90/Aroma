'use client';

// ISR: Incremental Static Regeneration
// Homepage displays dynamic product catalog with filtering
// Build time: Prerendered at build time with default products
// Revalidation: 60 seconds (refresh product list every minute)
// This allows static performance benefits while keeping product data fresh

import { Metadata } from 'next';
import { useProducts } from '@/lib/presentation/hooks/useProducts';
import { ProductCard } from '@/lib/presentation/components/ProductCard';
import { ProductFilters } from '@/lib/presentation/components/ProductFilters';
import { ProductsGridSkeleton } from '@/lib/presentation/components/Skeletons';
import { useFilterStore } from '@/lib/application/stores/filterStore';
import { motion } from 'framer-motion';

export default function Home() {
  const { data: productsData, isLoading, error } = useProducts();
  const { setPage } = useFilterStore();

  if (error) {
    console.error('Products error:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-900/30 border border-red-700/50 text-red-400 px-6 py-4 rounded-lg"
        >
          Error loading products: {error instanceof Error ? error.message : 'Unknown error'}. Please try again later.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Discover Your{' '}
          <span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
            Signature Scent
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Premium fragrances from the world's finest perfume houses. Find the perfect scent that matches your personality.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mt-8"
        >
          <div className="w-12 h-12 bg-gold-500/20 rounded-full" />
          <div className="w-12 h-12 bg-gold-500/10 rounded-full" />
          <div className="w-12 h-12 bg-gold-500/5 rounded-full" />
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <ProductFilters />

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <ProductsGridSkeleton />
            ) : productsData?.items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-400 text-lg">No products found. Try adjusting your filters.</p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                >
                  {productsData?.items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>

                {/* Pagination */}
                {productsData && productsData.total > productsData.limit && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center gap-2 mt-12"
                  >
                    {[...Array(Math.ceil(productsData.total / productsData.limit))].map((_, i) => (
                      <motion.button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          productsData.page === i + 1
                            ? 'bg-gold-500 text-dark-900'
                            : 'bg-dark-800 text-gray-300 border border-gold-600/30 hover:border-gold-500/60'
                        }`}
                      >
                        {i + 1}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
