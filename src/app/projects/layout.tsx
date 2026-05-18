import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Archive | sOn4jit',
  description: 'A full archive of cybersecurity projects, research, and deployments by Sonajit Rabha.',
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
