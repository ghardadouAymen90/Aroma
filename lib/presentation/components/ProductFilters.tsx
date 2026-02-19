'use client';

import { useFilterStore } from '@/lib/application/stores/filterStore';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function ProductFilters() {
  const filters = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const brands = ['Luxe Parfum', 'Marine Scents', 'Dark Essence', "Nature's Garden", 'Heritage Scents', 'Vacation Vibes'];
  const categories = ['men', 'women', 'unisex'];

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <aside className="w-full lg:w-72">
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-gold-500/30 transition-all"
        >
          {isOpen ? '✕ Close Filters' : '✦ Premium Filters'}
        </motion.button>
      </div>

      {/* Desktop Filters - Always visible */}
      <div className="hidden lg:block">
        <motion.div
          className="space-y-6 bg-gradient-to-b from-dark-800/80 to-dark-900/50 backdrop-blur-sm border border-gold-600/20 rounded-2xl p-6 shadow-xl shadow-dark-900/50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="text-center pb-4 border-b border-gold-600/30">
            <h3 className="text-lg font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent uppercase tracking-widest">
              ✦ Refine Selection
            </h3>
          </div>

          {/* Search */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-4">
              🔍 Search Fragrances
            </label>
            <input
              type="text"
              placeholder="Enter fragrance name..."
              value={filters.search || ''}
              onChange={(e) => filters.setSearch(e.target.value)}
              className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
            />
          </motion.div>

          {/* Category */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-4">
              👥 Category
            </label>
            <div className="space-y-2.5 bg-dark-700/30 border border-gold-600/20 rounded-xl p-4">
              <motion.button
                onClick={() => filters.setCategory('')}
                whileHover={{ x: 4, backgroundColor: 'rgba(217, 119, 6, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                  !filters.category
                    ? 'bg-gradient-to-r from-gold-500/40 to-gold-600/30 border-2 border-gold-400 text-gold-200 shadow-lg shadow-gold-500/25'
                    : 'border-2 border-gold-600/30 text-gold-400/80 hover:border-gold-500/60'
                }`}
              >
                <input type="radio" name="category" value="" checked={!filters.category} onChange={() => {}} className="w-4 h-4 accent-gold-500" />
                <span>All Categories</span>
              </motion.button>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => filters.setCategory(cat)}
                  whileHover={{ x: 4, backgroundColor: 'rgba(217, 119, 6, 0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium capitalize text-sm ${
                    filters.category === cat
                      ? 'bg-gradient-to-r from-gold-500/40 to-gold-600/30 border-2 border-gold-400 text-gold-200 shadow-lg shadow-gold-500/25'
                      : 'border-2 border-gold-600/30 text-gold-400/80 hover:border-gold-500/60'
                  }`}
                >
                  <input type="radio" name="category" value={cat} checked={filters.category === cat} onChange={() => {}} className="w-4 h-4 accent-gold-500" />
                  <span>{cat}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Brand */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-4">
              ✨ Premium Brands
            </label>
            <select
              value={filters.brand || ''}
              onChange={(e) => filters.setBrand(e.target.value)}
              className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60 appearance-none cursor-pointer font-medium"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Price Range */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-4">
              💎 Price Range
            </label>
            <div className="space-y-3 bg-dark-700/30 border border-gold-600/20 rounded-xl p-4">
              <div>
                <span className="text-xs text-gold-400/70 font-medium">Minimum</span>
                <input
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    filters.setPriceRange(e.target.value ? Number(e.target.value) : 0, filters.maxPrice || 0)
                  }
                  className="w-full px-4 py-2.5 text-sm bg-dark-700/70 border-2 border-gold-600/40 rounded-lg text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/25 hover:border-gold-500/60 mt-1.5"
                />
              </div>
              <div>
                <span className="text-xs text-gold-400/70 font-medium">Maximum</span>
                <input
                  type="number"
                  placeholder="$1000"
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    filters.setPriceRange(filters.minPrice || 0, e.target.value ? Number(e.target.value) : 0)
                  }
                  className="w-full px-4 py-2.5 text-sm bg-dark-700/70 border-2 border-gold-600/40 rounded-lg text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/25 hover:border-gold-500/60 mt-1.5"
                />
              </div>
            </div>
          </motion.div>

          {/* Sorting */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-4">
              📊 Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => filters.setSorting(e.target.value as any, filters.sortOrder)}
              className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60 appearance-none cursor-pointer font-medium"
            >
              <option value="name">Alphabetical</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </motion.div>

          {/* Sort Order */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-4">
              ↕️ Direction
            </label>
            <select
              value={filters.sortOrder}
              onChange={(e) => filters.setSorting(filters.sortBy as any, e.target.value as any)}
              className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60 appearance-none cursor-pointer font-medium"
            >
              <option value="asc">↑ Ascending</option>
              <option value="desc">↓ Descending</option>
            </select>
          </motion.div>

          {/* Reset Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => filters.resetFilters()}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 bg-gradient-to-r from-gold-600/20 to-gold-500/20 border-2 border-gold-500/50 hover:border-gold-400 text-gold-300 font-bold uppercase tracking-wider rounded-lg transition-all"
          >
            ✨ Reset All Filters
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Filters - Animated collapse/expand */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 },
        }}
        className="lg:hidden overflow-hidden"
      >
        <motion.div
          className="space-y-4 mt-4 bg-dark-800/90 backdrop-blur-sm border border-gold-600/20 rounded-xl p-4"
          variants={containerVariants}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          {/* Mobile Search */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-2">
              🔍 Search
            </label>
            <input
              type="text"
              placeholder="Search fragrances..."
              value={filters.search || ''}
              onChange={(e) => filters.setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-dark-700/50 border border-gold-500/40 rounded-lg text-gray-200 placeholder-gray-500 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/20"
            />
          </motion.div>

          {/* Mobile Category */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-2">
              👥 Category
            </label>
            <div className="space-y-1">
              <button
                onClick={() => filters.setCategory('')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-xs ${
                  !filters.category
                    ? 'bg-gold-500/20 border border-gold-400 text-gold-300'
                    : 'border border-gold-600/30 text-gray-400 hover:text-gold-400 hover:border-gold-500/50'
                }`}
              >
                <input type="radio" name="category" value="" checked={!filters.category} onChange={() => {}} className="w-3 h-3 accent-gold-500" />
                <span>All</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => filters.setCategory(cat)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all capitalize text-xs ${
                    filters.category === cat
                      ? 'bg-gold-500/20 border border-gold-400 text-gold-300'
                      : 'border border-gold-600/30 text-gray-400 hover:text-gold-400 hover:border-gold-500/50'
                  }`}
                >
                  <input type="radio" name="category" value={cat} checked={filters.category === cat} onChange={() => {}} className="w-3 h-3 accent-gold-500" />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Mobile Brand */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-2">
              ✨ Brand
            </label>
            <select
              value={filters.brand || ''}
              onChange={(e) => filters.setBrand(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-dark-700/50 border border-gold-500/40 rounded-lg text-gray-200 transition-all focus:border-gold-400 focus:outline-none"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Mobile Price */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-2">
              💎 Price
            </label>
            <div className="space-y-1">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  filters.setPriceRange(e.target.value ? Number(e.target.value) : 0, filters.maxPrice || 0)
                }
                className="w-full px-3 py-2 text-xs bg-dark-700/50 border border-gold-500/40 rounded-lg text-gray-200 placeholder-gray-500 transition-all focus:border-gold-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  filters.setPriceRange(filters.minPrice || 0, e.target.value ? Number(e.target.value) : 0)
                }
                className="w-full px-3 py-2 text-xs bg-dark-700/50 border border-gold-500/40 rounded-lg text-gray-200 placeholder-gray-500 transition-all focus:border-gold-400 focus:outline-none"
              />
            </div>
          </motion.div>

          {/* Mobile Sort */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-2">
              📊 Sort
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => filters.setSorting(e.target.value as any, filters.sortOrder)}
              className="w-full px-3 py-2 text-xs bg-dark-700/50 border border-gold-500/40 rounded-lg text-gray-200 transition-all focus:border-gold-400 focus:outline-none"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </motion.div>

          {/* Mobile Direction */}
          <motion.div variants={itemVariants}>
            <select
              value={filters.sortOrder}
              onChange={(e) => filters.setSorting(filters.sortBy as any, e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-dark-700/50 border border-gold-500/40 rounded-lg text-gray-200 transition-all focus:border-gold-400 focus:outline-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </motion.div>

          {/* Mobile Reset */}
          <motion.button
            variants={itemVariants}
            onClick={() => filters.resetFilters()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-3 py-2 bg-gold-600/20 border border-gold-500/50 text-gold-300 font-bold uppercase tracking-wider rounded-lg text-xs transition-all"
          >
            ✨ Reset
          </motion.button>
        </motion.div>
      </motion.div>
    </aside>
  );
}
