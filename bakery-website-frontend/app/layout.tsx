import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'The Rits Baker | Handcrafted Eggless Bakery in Bangkok',
  description: 'Premium handcrafted eggless desserts, signature fudge brownies, and fresh daily loaves baked with love in Bangkok. Delivery only — pre-order 24 hrs in advance.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${cormorant.variable} overflow-x-hidden scroll-smooth`} style={{ backgroundColor: '#F9F9F9' }}>
      <body className="min-h-screen overflow-x-hidden bg-[#F9F9F9] font-sans text-[#111111] antialiased">
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
