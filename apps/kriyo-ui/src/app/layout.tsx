import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MSWInitializer from './MSWInitializer';
import { AuthProvider } from '@/lib/auth-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kriyo: Your task master',
  description: 'Manage your tasks efficiently with Kriyo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MSWInitializer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
