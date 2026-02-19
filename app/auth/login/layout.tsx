import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | AROMA Account',
  description: 'Sign in to your AROMA account to access your orders, wishlist, and personalized fragrance recommendations.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
