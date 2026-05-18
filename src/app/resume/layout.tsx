import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | sOn4jit',
  description: 'Download and view the professional resume of Sonajit Rabha, Security Architect and Network Engineer.',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}