import { MetadataRoute } from 'next';
import { mockProducts } from '@/infrastructure/mockDatabase';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aroma-fragrance.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/auth/register`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.6,
    },
  ];

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = mockProducts.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
