'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SessionProvider refetchOnWindowFocus refetchInterval={5 * 60}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
