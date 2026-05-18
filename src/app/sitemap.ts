import { MetadataRoute } from 'next';

/**
 * Generates the sitemap.xml file dynamically.
 * Maps the primary navigation routes and archive pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sonajit.in';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
