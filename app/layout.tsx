import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Archie A. Menisis — AI Automation Specialist',
  description:
    'Interactive AI portfolio. Ask me anything about automation, AI agents, and how I can help your business.',
  openGraph: {
    title: 'Archie A. Menisis — AI Automation Specialist',
    description: 'Interactive AI-powered portfolio. Ask anything.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit antialiased`}>{children}</body>
    </html>
  );
}
