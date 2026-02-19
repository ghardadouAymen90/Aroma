'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/presentation/hooks/useAuth';
import { motion } from 'framer-motion';
import { z } from 'zod';

// SSG: Static Site Generation
// Login page template is static with client-side form handling
// Build time: Prerendered at build time
// Revalidation: Never (static form)

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [returnUrl, setReturnUrl] = useState('/');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get returnUrl from cookie
      const cookies = document.cookie.split(';');
      let cookieReturnUrl = null;
      
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'returnUrl') {
          cookieReturnUrl = decodeURIComponent(value);
          break;
        }
      }
      
      if (cookieReturnUrl) {
        setReturnUrl(cookieReturnUrl);
        // Clear the cookie by setting maxAge to 0
        document.cookie = 'returnUrl=; maxAge=0; path=/;';
      }
    }
  }, []);
  
  const { mutate: login, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@example.com',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      data,
      {
        onSuccess: () => {
          // Get returnUrl from multiple sources in order of preference
          let finalReturnUrl = '/';
          
          // 1. Try to get from state
          if (returnUrl && returnUrl !== '/') {
            finalReturnUrl = returnUrl;
          }
          // 2. Try to get from sessionStorage
          else if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('returnUrl');
            if (stored) {
              finalReturnUrl = stored;
              sessionStorage.removeItem('returnUrl');
            }
          }
          
          router.push(finalReturnUrl);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gold-400 mb-2">✨ AROMA</h1>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-3 text-sm">Sign in to your account to continue shopping</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-8"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-900/30 border border-red-700/50 text-red-400 rounded-lg text-sm"
            >
              {error instanceof Error ? error.message : 'Login failed'}
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <label htmlFor="email" className="block text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">Demo: demo@example.com</p>
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <label htmlFor="password" className="block text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-2">{errors.password.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">Demo: Demo@12345</p>
            </motion.div>
          </div>

          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full mt-8 disabled:opacity-50"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </motion.form>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center space-y-2"
        >
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
              Register here
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="text-gold-400 hover:text-gold-300 transition-colors">
              Forgot your password?
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
