'use client'

import dynamic from 'next/dynamic'

const HeroJourney = dynamic(
  () => import('@/components/sections/HeroJourney'),
  { ssr: false }
)

export default function HeroJourneyLoader() {
  return <HeroJourney />
}
