import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Archive | sOn4jit',
  description: 'A full collection of technical publications, research, and insights by Sonajit Rabha.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}