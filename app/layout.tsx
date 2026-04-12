import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import LenisProvider from '@/components/ui/LenisProvider'
import './globals.css'

// ─── FONTS ─────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// ─── METADATA ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Ohana Development — Exquisite Living Across the Middle East',
  description:
    'Ohana Development is a leading private real estate developer in the Middle East. 35+ years of expertise, 9,000+ units delivered, $5Bn+ in assets. Discover Manchester City Yas Residences, Jacob & Co. Beachfront Living, and Elie Saab Waterfront.',
  keywords:
    'luxury real estate UAE, Abu Dhabi property, Manchester City Yas Residences, Jacob Co Beachfront, Elie Saab Waterfront, Ohana Development',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ohana Development',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} antialiased`}
      style={{ overflowX: 'hidden' }}
    >
      {/*
       * CRITICAL: body must NOT have overflow-x:hidden — that creates a BFC
       * scroll container, breaking position:sticky on all children.
       * overflow-x:clip achieves the same visual clipping without a BFC.
       * Also no flex/min-h on body — keep it a plain block so the window
       * remains the sole scroll container that sticky elements reference.
       */}
      <body
        style={{
          backgroundColor: '#060C18',
          color: '#F0E8D8',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          overflowX: 'clip',
        }}
      >
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
