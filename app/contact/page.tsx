'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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
            ✦ Get In Touch
          </h1>
          <p className="text-xl text-gold-200/80 max-w-2xl mx-auto">
            Have a question? We'd love to hear from you. Reach out to our premium support team today.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          initial="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: '📧',
              title: 'Email',
              value: 'support@aroma-fragrance.com',
              href: 'mailto:support@aroma-fragrance.com',
            },
            {
              icon: '📞',
              title: 'Phone',
              value: '+1 (234) 567-890',
              href: 'tel:+1234567890',
            },
            {
              icon: '🏢',
              title: 'Address',
              value: '123 Fragrance Street, NY 10001',
              href: '#',
            },
          ].map((contact, idx) => (
            <motion.a
              key={idx}
              variants={itemVariants}
              transition={{ delay: idx * 0.1 }}
              href={contact.href}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-dark-800/80 to-dark-900/50 border border-gold-600/30 rounded-2xl p-8 text-center shadow-xl shadow-dark-900/50 backdrop-blur-sm hover:border-gold-500/40 transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{contact.icon}</div>
              <h3 className="text-xl font-bold text-gold-300 mb-2">{contact.title}</h3>
              <p className="text-gold-200/80 font-medium hover:text-gold-200 transition-colors">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial="visible"
          variants={itemVariants}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-b from-dark-800/80 to-dark-900/50 border border-gold-600/20 rounded-2xl p-8 sm:p-12 shadow-xl shadow-dark-900/50 backdrop-blur-sm">
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 rounded-lg font-medium text-center"
              >
                ✓ Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-bold text-gold-400 uppercase tracking-widest mb-3">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants} transition={{ delay: 0.1 }}>
                <label htmlFor="email" className="block text-sm font-bold text-gold-400 uppercase tracking-widest mb-3">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                />
              </motion.div>

              {/* Subject Field */}
              <motion.div variants={itemVariants} transition={{ delay: 0.2 }}>
                <label htmlFor="subject" className="block text-sm font-bold text-gold-400 uppercase tracking-widest mb-3">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                  className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants} transition={{ delay: 0.3 }}>
                <label htmlFor="message" className="block text-sm font-bold text-gold-400 uppercase tracking-widest mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us what you're thinking..."
                  className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60 resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                transition={{ delay: 0.4 }}
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-gold-600/50 transition-all"
              >
                ✦ Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
