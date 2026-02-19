'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <motion.div
          initial="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent mb-6">
            ✦ About AROMA
          </h1>
          <p className="text-xl text-gold-200/80 max-w-2xl mx-auto">
            Your destination for premium, authentic fragrances from the world's finest perfume houses
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial="visible"
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-lg text-gold-200/90 leading-relaxed">
                Welcome to AROMA, your destination for premium, authentic fragrances from the world's finest perfume houses.
              </p>
              <p className="text-lg text-gold-200/90 leading-relaxed">
                Since our founding, we've been committed to providing our customers with an exceptional shopping experience and access to the most coveted fragrances.
              </p>
              <p className="text-lg text-gold-200/90 leading-relaxed">
                Our curated collection features fragrances for every occasion and preference, from classic timeless scents to the latest releases from renowned perfume designers.
              </p>
            </div>
          </motion.div>

          {/* Premium Quality Card */}
          <motion.div
            initial="visible"
            variants={itemVariants}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-dark-800/80 to-dark-900/50 border border-gold-600/30 rounded-2xl p-12 text-center shadow-xl shadow-dark-900/50 backdrop-blur-sm"
          >
            <div className="text-7xl mb-6">💎</div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent mb-4">
              Premium Quality
            </h3>
            <p className="text-gold-200/80 text-lg leading-relaxed">
              All our fragrances are 100% authentic and sourced directly from authorized distributors worldwide.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: '✓',
              title: 'Authentic Products',
              desc: '100% genuine fragrances guaranteed',
            },
            {
              icon: '🚚',
              title: 'Fast Shipping',
              desc: 'Free shipping on orders over $100',
            },
            {
              icon: '🛡️',
              title: 'Secure Shopping',
              desc: 'Your data is protected with encryption',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-dark-800/80 to-dark-900/50 border border-gold-600/20 rounded-2xl p-8 text-center shadow-xl shadow-dark-900/50 backdrop-blur-sm hover:border-gold-500/40 transition-all"
            >
              <div className="text-6xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gold-300 mb-3">{feature.title}</h3>
              <p className="text-gold-200/80">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial="visible"
          variants={itemVariants}
          className="bg-gradient-to-r from-gold-600/10 to-dark-800 border-2 border-gold-600/30 rounded-2xl p-12 text-center shadow-xl shadow-dark-900/50"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gold-200/90 max-w-2xl mx-auto leading-relaxed">
            We believe that everyone deserves access to premium fragrances that make them feel confident, elegant, and unforgettable. Our mission is to bring the world's finest perfumes to your doorstep with exceptional service and authentic quality.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
