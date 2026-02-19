'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/application/stores/cartStore';
import { useProducts } from '@/lib/presentation/hooks/useProducts';
import { useAuthStore } from '@/lib/application/stores/authStore';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const { data: productsData } = useProducts();

  const products = useMemo(() => {
    if (!productsData) return [];
    return productsData.items;
  }, [productsData]);

  const cartWithProducts = useMemo(() => {
    return cartItems
      .map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }))
      .filter((item) => item.product);
  }, [cartItems, products]);

  const subtotal = cartWithProducts.reduce((sum, item) => {
    const price = item.product?.discountedPrice || item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-md"
        >
          <div className="mb-6 text-7xl">🛍️</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gold-200/80 text-lg mb-8">
            Explore our collection and find your signature scent.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-gold-600/50 transition-all hover:scale-105"
          >
            ✦ Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent mb-2">
              ✦ Your Premium Cart
            </h1>
            <p className="text-gold-300/80 text-lg">
              {cartWithProducts.length} {cartWithProducts.length === 1 ? 'item' : 'items'} selected
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-gradient-to-b from-dark-800/80 to-dark-900/50 backdrop-blur-sm border border-gold-600/20 rounded-2xl p-6 shadow-xl shadow-dark-900/50">
              {cartWithProducts.map((item, index) => (
                <motion.div
                  key={item.productId}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 pb-6 last:pb-0 last:border-b-0 border-b border-gold-600/20 group"
                >
                  {/* Premium Product Image */}
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-dark-700 border border-gold-600/30 shadow-lg shadow-dark-900/50">
                    <Image
                      src={item.product?.image || ''}
                      alt={item.product?.name || ''}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="120px"
                    />
                  </div>

                  {/* Premium Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${item.productId}`}
                        className="text-xl font-bold text-gold-300 hover:text-gold-200 transition-colors mb-2 block"
                      >
                        {item.product?.name}
                      </Link>
                      <p className="text-gold-400/80 text-sm font-medium mb-3">{item.product?.brand}</p>
                    </div>

                    {/* Premium Price Display */}
                    <div className="flex items-baseline gap-3">
                      <p className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                        ${((item.product?.discountedPrice || item.product?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gold-400/60">
                        ${(item.product?.discountedPrice || item.product?.price || 0).toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Premium Quantity & Actions */}
                  <div className="flex flex-col items-end justify-between gap-4">
                    {/* Premium Quantity Selector */}
                    <div className="flex items-center border-2 border-gold-600/50 rounded-lg overflow-hidden bg-dark-700/50">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-2 text-gold-400 hover:bg-gold-600/20 transition-colors font-bold"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-bold text-gold-200">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-2 text-gold-400 hover:bg-gold-600/20 transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <motion.button
              onClick={() => clearCart()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-red-600/20 border-2 border-red-600/50 hover:border-red-500 text-red-400 font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              🗑️ Clear Entire Cart
            </motion.button>
          </motion.div>

          {/* Premium Order Summary */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-b from-dark-800/80 to-dark-900/50 backdrop-blur-sm border border-gold-600/20 rounded-2xl p-8 shadow-xl shadow-dark-900/50 sticky top-20 space-y-6">
              {/* Header */}
              <div className="text-center pb-6 border-b border-gold-600/30">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent uppercase tracking-widest">
                  ✦ Order Summary
                </h2>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gold-600/20">
                  <span className="text-gold-400/80 font-medium">Subtotal</span>
                  <span className="text-gold-200 font-bold text-lg">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gold-600/20">
                  <span className="text-gold-400/80 font-medium">Tax (10%)</span>
                  <span className="text-gold-200 font-bold text-lg">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gold-600/20">
                  <span className="text-gold-400/80 font-medium">Shipping</span>
                  <span className={`font-bold text-lg ${shipping === 0 ? 'text-emerald-400' : 'text-gold-200'}`}>
                    {shipping === 0 ? '🎁 FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-lg p-4">
                  <p className="text-sm text-emerald-400 font-medium">
                    🎁 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="bg-gradient-to-r from-gold-600/10 to-dark-800 border border-gold-600/30 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gold-400/80 uppercase tracking-widest font-bold text-sm">Total</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <motion.button
                  onClick={() => {
                    // Always go to checkout - let the checkout page handle auth redirect
                    router.push('/checkout');
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-gold-600/50 transition-all"
                >
                  ✦ Proceed to Checkout
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/"
                    className="block w-full px-6 py-4 bg-gold-600/10 border-2 border-gold-500/50 hover:border-gold-400 text-gold-300 font-bold uppercase tracking-widest rounded-xl text-center transition-all"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gold-600/20">
                <div className="text-center">
                  <p className="text-lg">🔒</p>
                  <p className="text-xs text-gold-400/80 font-medium">Secure</p>
                </div>
                <div className="text-center">
                  <p className="text-lg">✓</p>
                  <p className="text-xs text-gold-400/80 font-medium">Verified</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
