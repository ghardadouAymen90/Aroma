'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/presentation/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/validations/auth';
import { motion } from 'framer-motion';

// SSG: Static Site Generation
// Register page template is static with client-side form handling
// Build time: Prerendered at build time
// Revalidation: Never (static form)

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    register(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push('/');
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
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-3 text-sm">Join us to start your fragrance journey</p>
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
              {error instanceof Error ? error.message : 'Registration failed'}
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  placeholder="John"
                  className={`input-field ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...formRegister('firstName')}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-2">{errors.firstName.message}</p>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  placeholder="Doe"
                  className={`input-field ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...formRegister('lastName')}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-2">{errors.lastName.message}</p>
                )}
              </motion.div>
            </div>

            {/* Email */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.27 }}>
              <label htmlFor="email" className="block text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...formRegister('email')}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
              <label htmlFor="password" className="block text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...formRegister('password')}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-2">{errors.password.message}</p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.29 }}>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...formRegister('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-2">{errors.confirmPassword.message}</p>
              )}
            </motion.div>
          </div>

          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full mt-8 disabled:opacity-50"
          >
            {isPending ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </motion.form>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
