'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/application/stores/authStore';
import { useCartStore } from '@/lib/application/stores/cartStore';
import { useProducts } from '@/lib/presentation/hooks/useProducts';

// CSR: Client-Side Rendering
// Checkout page handles user-specific order processing and payment
// Build time: Not prerendered (requires authentication and user cart data)
// Revalidation: N/A (protected, highly user-specific content)
// Must be CSR because it requires authentication, real-time cart validation, and payment handling

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  // Store the return URL immediately if not authenticated
  if (!user && typeof window !== 'undefined') {
    sessionStorage.setItem('returnUrl', '/checkout');
  }
  
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const { data: productsData } = useProducts();

  // Check authentication and redirect to login with return URL if not authenticated
  useEffect(() => {
    if (!user) {
      // Use window.location for a full page reload to ensure auth state is checked
      window.location.href = '/auth/login';
    }
  }, [user]);

  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-gradient-to-b from-dark-800/80 to-dark-900 border-2 border-gold-600/30 rounded-2xl p-12">
          <div className="text-6xl mb-6 animate-bounce">✨</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent mb-4">Order Placed!</h1>
          <p className="text-gold-400/80 mb-4 leading-relaxed">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <p className="text-sm text-gold-600/60 mb-8">Redirecting you to home page...</p>
          <Link href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-gold-600/50">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent mb-2">Checkout</h1>
        <p className="text-gold-400/70 text-sm uppercase tracking-widest mb-8">Complete your order</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-gradient-to-b from-dark-800/80 to-dark-900 border-2 border-gold-600/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent mb-8">✈️ Shipping Address</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={shippingData.street}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingData.zipCode}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gradient-to-b from-dark-800/80 to-dark-900 border-2 border-gold-600/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent mb-8">💳 Payment Information</h2>
              
              <div className="bg-gold-600/20 border-2 border-gold-600/40 rounded-xl p-4 mb-6">
                <p className="text-sm text-gold-400/90 font-medium">
                  ✨ Demo Mode: No actual payment will be processed. Use any card details to continue.
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4111 1111 1111 1111"
                  maxLength={19}
                  className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-5 py-3.5 text-sm bg-dark-800/80 border-2 border-gold-600/40 rounded-xl text-gold-100 placeholder-gold-600/50 transition-all focus:border-gold-400 focus:outline-none focus:shadow-lg focus:shadow-gold-500/30 hover:border-gold-500/60"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-gold-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '⏳ Processing Order...' : '🛒 Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gradient-to-b from-dark-800/80 to-dark-900 border-2 border-gold-600/30 rounded-xl p-8 sticky top-20">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent mb-8">📦 Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-gold-600/20 max-h-64 overflow-y-auto">
              {cartWithProducts.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-gold-400/80">
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-gold-300">
                    ${(
                      (item.product?.discountedPrice || item.product?.price || 0) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pb-6 border-b border-gold-600/20">
              <div className="flex justify-between text-gold-400/80">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gold-400/80">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gold-400/80">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-gold-400 font-semibold' : ''}>
                  {shipping === 0 ? '✨ FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold text-gold-300 mt-6">
              <span>Total</span>
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
