import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account | AROMA',
  description: 'Manage your AROMA account profile, view order history, and update preferences.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
