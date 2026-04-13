'use client'

import dynamic from 'next/dynamic'

/**
 * The hero component is ssr:false because it reads window dimensions for canvas.
 * The `loading` placeholder MUST have the same height as the real component (400vh)
 * so that elements below the hero (Partnership, Projects…) don't shift when the
 * client-side component mounts. Without this, every below-fold section shifts by
 * 400vh → CLS = 1.0 → 24-point performance penalty.
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
      />
    ),
  }
)

export default function HeroJourneyLoader() {
  return <HeroJourney />
}
