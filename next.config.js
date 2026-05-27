/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/img/**',
      },
      {
        pathname: '/api/projects/asset',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.sonajit.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        pathname: '/**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.cloudworkstations.dev; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://blog.sonajit.in https://api.github.com https://raw.githubusercontent.com https://cdn.hashnode.com https://img.shields.io https://custom-icon-badges.demolab.com https://github-readme-stats.vercel.app https://github-profile-trophy.vercel.app https://skillicons.dev https://tryhackme-badges.s3.amazonaws.com https://avatars.githubusercontent.com https://github.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.github.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.cloudworkstations.dev; media-src 'self' blob:; manifest-src 'self' https://*.cloudworkstations.dev;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
