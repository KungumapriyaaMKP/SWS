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
import { ChatbotWidget } from '@/components/chat/ChatbotWidget';

import { JsonLd } from '@/components/seo/JsonLd';

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

const baseUrl = 'https://sumyawebstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Sumya Web Studio | Digital Products Built to Move Businesses Forward',
    template: '%s | Sumya Web Studio',
  },
  description:
    'Sumya Web Studio designs and engineers high-performance Next.js websites, 3D WebGL experiences, AI solutions, web applications, custom software, and executive portfolios in 7-day engineering sprints.',
  keywords: [
    'Sumya Web Studio',
    'Web Development Studio India',
    '3D WebGL Website Design',
    'Executive Brand Portfolios',
    'AI Agents & Solutions',
    'Custom SaaS Software',
    'Next.js Engineering Agency',
    'UI/UX System Design',
    'Business Automation',
    '7 Day Website Sprint',
  ],
  authors: [{ name: 'Sumya Web Studio', url: baseUrl }],
  creator: 'Sumya Web Studio',
  publisher: 'Sumya Web Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Sumya Web Studio | Digital Products Built to Move Businesses Forward',
    description:
      'High-performance Next.js websites, 3D WebGL experiences, AI solutions, custom software, and executive portfolios engineered for ambitious companies.',
    url: baseUrl,
    siteName: 'Sumya Web Studio',
    images: [
      {
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Sumya Web Studio Logo Mark',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumya Web Studio | Digital Products Built to Move Businesses Forward',
    description:
      'High-performance Next.js websites, 3D WebGL experiences, AI solutions, custom software, and executive portfolios.',
    images: [`${baseUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'w_5KZZqlknyxHR5PImL0SMXseBvnh8Q3BcLyV_OzGno',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${cormorant.variable}`}>
      <head>
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.remove('dark');
              localStorage.removeItem('theme');
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
      <body className="bg-white text-ebony antialiased selection:bg-dustyrose/30 selection:text-ebony transition-colors duration-500">
        <PageLoader />
        <ScrollProgressBar />
        <CustomCursor />
        <PixelCursorTrail />
        <BotanicalParticles />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
