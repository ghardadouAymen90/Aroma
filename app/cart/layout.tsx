import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | AROMA Luxury Fragrances',
  description: 'Review and manage your fragrance selections in your shopping cart. Fast checkout and secure payment processing.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
