import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/lib/cart-context'
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
  getBakerySchema,
  getOrganizationSchema,
} from '@/lib/seo'
import { WhatsAppFAB } from '@/components/whatsapp-fab'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Rits Baker | Premium Eggless Cakes, Brownies & Desserts in Bangkok',
    template: '%s',
  },
  description:
    'Freshly baked brownies, cakes, cookies, dessert boxes, vegan treats, and healthy bakes crafted with premium ingredients in Bangkok.',
  keywords: [
    'The Rits Baker',
    'eggless bakery Bangkok',
    'premium desserts Bangkok',
    'brownies Bangkok',
    'cakes Bangkok',
    'cookies Bangkok',
    'vegan desserts Bangkok',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'The Rits Baker | Premium Eggless Cakes, Brownies & Desserts in Bangkok',
    description:
      'Freshly baked brownies, cakes, cookies, dessert boxes, vegan treats, and healthy bakes crafted with premium ingredients in Bangkok.',
    url: SITE_URL,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: DEFAULT_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Rits Baker | Premium Eggless Cakes, Brownies & Desserts in Bangkok',
    description:
      'Freshly baked brownies, cakes, cookies, dessert boxes, vegan treats, and healthy bakes crafted with premium ingredients in Bangkok.',
    images: [DEFAULT_OG_IMAGE_URL],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(), getBakerySchema()],
  }

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${cormorant.variable} overflow-x-hidden scroll-smooth`} style={{ backgroundColor: '#F9F9F9' }}>
      <body className="min-h-screen overflow-x-hidden bg-[#F9F9F9] font-sans text-[#111111] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CartProvider>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppFAB />
          <Toaster />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
