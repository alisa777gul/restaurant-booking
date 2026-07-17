import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import { Toaster } from 'sonner';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BookFlow - Smart Booking System',
  description: 'Modern booking platform for every business',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function () {
              const theme = localStorage.getItem('theme');

              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              }
            })();
          `}
        </Script>
      </head>

      <body
        className={`
          ${geist.className}
          min-h-screen
          bg-white
          text-neutral-900
          dark:bg-[#09090b]
          dark:text-white
        `}
      >
        {' '}
        <Toaster position="top-right" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
