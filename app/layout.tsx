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
       * Two-tier hero preload strategy:
       *
       * 1. 0001-preview.webp (48 KB, 720×405) — HIGH priority.
       *    The canvas uses this for its first draw so it's visible ~1.5 s on
       *    slow 4G (48 KB ÷ 187.5 KB/s ≈ 0.3 s download, cache-hit on JS load).
       *    This becomes the LCP element.
       *
       * 2. 0001.webp (556 KB, 1920×1080) — LOW priority.
       *    The canvas swaps to full-res once the preview is painted; starts
       *    downloading in parallel but doesn't compete for LCP bandwidth.
       */}
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-sequence/0001-preview.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero-sequence/0001.webp"
          type="image/webp"
          fetchPriority="low"
        />
      </head>
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
