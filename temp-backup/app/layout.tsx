import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ProtectedHeader } from '@/components/header/protected-header';
import Footer from '@/components/ui/footer';
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/json-ld';
import { ErrorBoundaryWrapper } from '@/components/error-boundary/client-error-boundary';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { CriticalScripts } from '@/components/performance/critical-scripts';

// Optimize font loading with display swap and preload
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700']
});

// Secondary font for headings
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://steelmade.com'),
  title: {
    default: 'SteelMade | Premium Steel Products & Solutions',
    template: '%s | SteelMade'
  },
  description: 'SteelMade delivers high-quality steel products, custom fabrication solutions, and expert consultation for industries worldwide.',
  generator: 'Next.js',
  applicationName: 'SteelMade',
  referrer: 'origin-when-cross-origin',
  keywords: ['steel manufacturing', 'custom steel solutions', 'industrial steel', 'steel fabrication'],
  authors: [{ name: 'SteelMade Inc.' }],
  creator: 'SteelMade Inc.',
  publisher: 'SteelMade Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'SteelMade | Premium Steel Products & Solutions',
    description: 'High-quality steel products, custom fabrication solutions, and expert consultation for industries worldwide.',
    url: 'https://steelmade.com',
    siteName: 'SteelMade',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SteelMade - Premium Steel Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SteelMade | Premium Steel Products & Solutions',
    description: 'High-quality steel products, custom fabrication solutions, and expert consultation for industries worldwide.',
    images: ['/images/twitter-image.jpg'],
    creator: '@steelmade',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://steelmade.com',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <CriticalScripts />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* Google Analytics - Update with your actual GA ID */}
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
        )}
        {/* Structured Data for the website and organization */}
        <OrganizationSchema 
          name="SteelMade"
          url="https://steelmade.com"
          logo="https://steelmade.com/logo.png"
          description="Premium office furniture manufacturer specializing in high-quality steel products and custom solutions."
          contactPoint={{
            telephone: "+1-800-STEEL-MADE",
            contactType: "customer service",
            email: "info@steelmade.com",
            contactOption: ["TollFree"],
          }}
        />
        <WebsiteSchema />
        
        <ThemeProvider>
          <ProtectedHeader />
          <ErrorBoundaryWrapper>
            <main>{children}</main>
          </ErrorBoundaryWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
