'use client';

import { useAuthStore } from '@/application/stores/authStore';
import { useEffect } from 'react';

// CSR: Client-Side Rendering
// Account page displays user-specific profile and account information
// Build time: Not prerendered (requires authentication)
// Revalidation: N/A (protected, user-specific content)
// Must be CSR because it requires authentication and displays personalized data

export default function AccountPage() {
  const { user, isAuthenticated } = useAuthStore();

  // Store the return URL immediately if not authenticated
  if (!isAuthenticated && typeof window !== 'undefined') {
    sessionStorage.setItem('returnUrl', '/account');
  }

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
    }
  }, [isAuthenticated]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="card p-8">
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">First Name</label>
                <p className="text-lg text-gray-900 mt-1">{user.firstName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Last Name</label>
                <p className="text-lg text-gray-900 mt-1">{user.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg text-gray-900 mt-1">{user.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
              <a href="/" className="btn-primary">
                Start Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
