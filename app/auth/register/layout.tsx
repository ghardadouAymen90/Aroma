import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | AROMA Fragrances',
  description: 'Join AROMA to enjoy exclusive fragrance collections, early access to new scents, and personalized recommendations.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
