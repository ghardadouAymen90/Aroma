import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aroma-fragrance.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/checkout', '/cart', '/account'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
