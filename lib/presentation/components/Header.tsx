'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/application/stores/authStore';
import { useLogout } from '@/lib/presentation/hooks/useAuth';
import { useCartStore } from '@/lib/application/stores/cartStore';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const itemCount = useCartStore((state) => state.getItemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure component only renders client data after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <header className="bg-dark-900 border-b border-gold-600/20 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold text-gold-500 hover:text-gold-400 transition-colors tracking-wide"
            >
              ✨ AROMA
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.div variants={navVariants} initial="hidden" animate="visible">
              <Link
                href="/"
                className="text-gray-300 hover:text-gold-400 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Products
              </Link>
            </motion.div>
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/about"
                className="text-gray-300 hover:text-gold-400 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                About
              </Link>
            </motion.div>
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="text-gray-300 hover:text-gold-400 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/cart" className="relative p-2 text-gray-300 hover:text-gold-400 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {isHydrated && itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-gold-500 text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Auth Links */}
            {isHydrated && (
              <>
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300 hidden sm:inline">
                      Welcome, <span className="text-gold-400 font-semibold">{user.firstName}</span>
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => logout()}
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-gold-500 hover:bg-gold-400 transition-colors rounded-lg"
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/auth/login"
                        className="px-4 py-2 text-sm font-medium text-gold-400 border border-gold-500/50 hover:border-gold-400 hover:text-gold-300 transition-colors rounded-lg"
                      >
                        Login
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/auth/register"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-gold-500 hover:bg-gold-400 transition-colors rounded-lg"
                      >
                        Register
                      </Link>
                    </motion.div>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-gold-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 },
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-3 border-t border-gold-600/20">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-300 hover:text-gold-400 hover:bg-dark-800 rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-300 hover:text-gold-400 hover:bg-dark-800 rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-300 hover:text-gold-400 hover:bg-dark-800 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
