'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

/**
 * The hero component is ssr:false because it reads window dimensions for canvas.
 * The `loading` placeholder MUST have the same height as the real component (400vh)
 * so that elements below the hero (Partnership, Projects…) don't shift when the
 * client-side component mounts. Without this, every below-fold section shifts by
 * 400vh → CLS = 1.0 → 24-point performance penalty.
 *
 * The placeholder also includes a priority <Image> so that:
 * 1. Next.js image optimisation serves a device-appropriate compressed frame
 *    (~30 KB on mobile vs 556 KB raw) as the LCP element.
 * 2. The sticky wrapper keeps it visible for the full 400vh scroll zone while
 *    the canvas bundle is fetching, giving Lighthouse a fast LCP hit.
 */
const HeroJourney = dynamic(
  () => import('@/components/sections/HeroJourney'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: '400vh',
          backgroundColor: '#060C18',
          position: 'relative',
        }}
      >
        {/* Sticky frame so the poster stays in the viewport while the hero loads */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/hero-sequence/0001.webp"
            alt="Ohana Development — luxury real estate"
            fill
            priority
            sizes="100vw"
            quality={65}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Keep dark overlay consistent with the real hero */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(6,12,24,0.15) 0%, rgba(6,12,24,0.55) 100%)',
            }}
          />
        </div>
      </div>
    ),
  }
)

export default function HeroJourneyLoader() {
  return <HeroJourney />
}
