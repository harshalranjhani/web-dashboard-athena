import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/utils/redux-provider/provider';
import Logo from '../public/logo.svg';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Athena | Yug Foundation',
  description: "Yug Foundation's Athena"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} overflow-hidden`}>
        <NextTopLoader />
        <Providers>
          <ReduxProvider>
            <Toaster />
            {children}
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
