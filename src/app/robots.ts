import { MetadataRoute } from 'next';

/**
 * Generates the robots.txt file dynamically using the Next.js Metadata API.
 * This is the production-ready implementation that prevents conflict with 
 * static public files.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sonajit.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/api/',
        '/_next/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
