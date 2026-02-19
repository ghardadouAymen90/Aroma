'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-dark-900 border-t border-gold-600/20 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gold-400 mb-4">✨ AROMA</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover the finest collection of premium fragrances. Luxury scents curated for the discerning connoisseur.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-gold-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-6">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gold-600/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {currentYear} AROMA. All rights reserved.</p>
            <div className="flex gap-6 mt-6 md:mt-0">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-gold-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Facebook
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-gold-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Twitter
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-gold-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Instagram
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
