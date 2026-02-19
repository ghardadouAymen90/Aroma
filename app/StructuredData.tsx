// Structured Data / JSON-LD components for SEO
import { Product } from '@/types/domain';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AROMA',
    url: 'https://aroma-fragrance.com',
    logo: 'https://aroma-fragrance.com/logo.png',
    description: 'Premium fragrance retailer offering luxury perfumes and colognes from world-renowned perfume houses',
    sameAs: [
      'https://www.facebook.com/aroma',
      'https://www.instagram.com/aroma',
      'https://www.twitter.com/aroma',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@aroma-fragrance.com',
      url: 'https://aroma-fragrance.com/contact',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AROMA',
    url: 'https://aroma-fragrance.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aroma-fragrance.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

export function BreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

export function ProductSchema(product: Product) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://aroma-fragrance.com${product.image}`,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://aroma-fragrance.com/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.discountedPrice ? product.discountedPrice.toString() : product.price.toString(),
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews.toString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AROMA Fragrance',
    description: 'Premium online fragrance retailer',
    url: 'https://aroma-fragrance.com',
    telephone: '+1-800-AROMA-00',
    email: 'info@aroma-fragrance.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fragrance Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
