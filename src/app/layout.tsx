import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', weight: ['400', '500', '700', '800'], display: 'swap' });

const siteUrl = "https://sonajit.in";
const title = "sOn4jit | Portfolio";
const description = "Hi, I'm Sonajit. I’m deeply interested in how networks operate and how security strengthens overall system design. Explore Sonajit Rabha's portfolio site to learn more about my work.";
const ogImage = `${siteUrl}/img/og-image.png`;

export const metadata: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: title,
    description: description,
    siteName: 'Sonajit Rabha Portfolio',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [ogImage],
    creator: '@sOn4jit',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sonajit Rabha",
    "url": siteUrl,
    "jobTitle": "Network Security, Cybersecurity",
    "sameAs": [
      "https://x.com/sOn4jit",
      "https://www.linkedin.com/in/sonajitrabha/",
      "https://github.com/son4jit",
      "https://blog.sonajit.in"
    ],
    "description": description
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/favicons/site.webmanifest" crossOrigin="use-credentials" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-mono bg-[#050505] text-slate-200 overflow-x-hidden`}>
        {children}
        <Analytics debug={process.env.NODE_ENV === 'development'} />
        <SpeedInsights />
      </body>
    </html>
  );
}
