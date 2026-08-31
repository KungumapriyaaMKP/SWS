import type { Metadata } from 'next';
import { Inter, Syne, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/footer/Footer';
import { PageLoader } from '@/components/animations/PageLoader';
import { ScrollProgressBar } from '@/components/animations/ScrollProgressBar';
import { CustomCursor } from '@/components/animations/CustomCursor';
import { PixelCursorTrail } from '@/components/ui/pixel-trail';
import { BotanicalParticles } from '@/components/botanical/BotanicalParticles';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sumya Web Studio | Digital Products Built to Move Businesses Forward',
  description:
    'Sumya Web Studio designs and engineers high-performance websites, AI solutions, web applications, custom software, and executive portfolios for ambitious businesses.',
  keywords: [
    'Web Development',
    'Executive Portfolios',
    'AI Solutions',
    'Custom Software',
    'UI/UX Design',
    'Business Automation',
    'SaaS Development',
    'Next.js Studio',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${cormorant.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.message && (e.message.indexOf('Loading chunk') !== -1 || e.message.indexOf('ChunkLoadError') !== -1)) {
                  window.location.reload();
                }
              });
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && (e.reason.name === 'ChunkLoadError' || (e.reason.message && e.reason.message.indexOf('Loading chunk') !== -1))) {
                  window.location.reload();
                }
              });
            `,
          }}
        />
      </head>
      <body className="bg-silk text-ebony antialiased selection:bg-dustyrose/30 selection:text-ebony transition-colors duration-500">
        <PageLoader />
        <ScrollProgressBar />
        <CustomCursor />
        <PixelCursorTrail />
        <BotanicalParticles />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
