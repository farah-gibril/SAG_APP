import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import { cn, constructMetadata } from '@/lib/utils';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

// Construct metadata for the root layout
export const metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='light'>
      {/* Wrap the application with the Providers component */}
      <Providers>
        <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
          {/* Render the Toaster component */}
          <Toaster />
          {/* Render the Navbar component */}
          {/* @ts-ignore */}
          <Navbar />
          {/* Render the children components */}
          {children}
        </body>
      </Providers>
    </html>
  );
}
// x