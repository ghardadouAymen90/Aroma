import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | AROMA Luxury Fragrances',
  description: 'Secure checkout for your fragrance order. Fast, safe payment processing with multiple options.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
