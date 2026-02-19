import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | AROMA Fragrance Customer Support',
  description: 'Get in touch with AROMA customer support. We\'re here to help with questions about our luxury fragrances, orders, and shipping. Fast response guaranteed.',
  openGraph: {
    title: 'Contact AROMA',
    description: 'Reach out to our customer support team for fragrance recommendations and order assistance.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aroma-fragrance.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
