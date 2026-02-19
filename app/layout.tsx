import type { Metadata } from 'next';
import { Providers } from '@/lib/presentation/components/Providers';
import { Header } from '@/lib/presentation/components/Header';
import { Footer } from '@/lib/presentation/components/Footer';
import {
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
} from './StructuredData';
import '@/styles/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aroma-fragrance.com';

export const metadata: Metadata = {
  title: 'AROMA - Luxury Fragrance Collection | Premium Perfumes Online',
  description: 'Shop exclusive luxury fragrances from premium perfume houses. Discover authentic designer perfumes, colognes, and eau de toilettes with fast worldwide shipping.',
  keywords: ['perfumes', 'fragrances', 'luxury perfumes', 'designer colognes', 'eau de toilette', 'luxury scents'],
  authors: [{ name: 'AROMA', url: siteUrl }],
  creator: 'AROMA',
  publisher: 'AROMA',
  icons: {
    icon: '✨',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'AROMA - Luxury Fragrance Collection',
    description: 'Shop exclusive luxury fragrances from premium perfume houses worldwide.',
    siteName: 'AROMA',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AROMA - Luxury Fragrance Collection',
    description: 'Shop exclusive luxury fragrances from premium perfume houses worldwide.',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  applicationName: 'AROMA',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text y='17' font-size='17' font-weight='bold' fill='gold'>✨</text></svg>" />
        
        {/* JSON-LD Structured Data */}
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
