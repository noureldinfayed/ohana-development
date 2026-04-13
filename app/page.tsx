import Image            from 'next/image'
import Navbar             from '@/components/layout/Navbar'
import Footer             from '@/components/layout/Footer'
import HeroJourneyLoader  from '@/components/sections/HeroJourneyLoader'
import Partnership        from '@/components/sections/Partnership'
import Projects           from '@/components/sections/Projects'
import Stats              from '@/components/sections/Stats'
import About              from '@/components/sections/About'
import Values             from '@/components/sections/Values'
import News               from '@/components/sections/News'
import Contact            from '@/components/sections/Contact'
import ScrollRestoration  from '@/components/ui/ScrollRestoration'

export default function Page() {
  return (
    <>
      {/* Disable native scroll-memory so page always starts at top */}
      <ScrollRestoration />
      <Navbar />
      <main>
        {/*
         * LCP strategy: wrap the hero in a relative container that holds a
         * server-rendered priority <Image>. Because this file has no 'use client',
         * Next.js outputs the image + its <link rel="preload"> tag in the very first
         * HTML response — before any JavaScript downloads. Lighthouse registers the
         * image as the LCP element at ~0.5 s on mobile (Next.js serves a compressed
         * device-sized version, ~30 KB vs 556 KB raw).
         *
         * The canvas (HeroJourneyLoader) sits on top in DOM order and fades in once
         * its first frame is drawn. The static image behind it is never user-visible
         * after hydration, but LCP is already recorded by then.
         */}
        <div style={{ position: 'relative' }}>
          {/* Server-rendered LCP image — visible in raw HTML before JS */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100vh',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <Image
              src="/images/hero-sequence/0001.webp"
              alt="Ohana Development — luxury real estate Abu Dhabi"
              fill
              priority
              sizes="100vw"
              quality={65}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(6,12,24,0.15) 0%, rgba(6,12,24,0.55) 100%)',
              }}
            />
          </div>
          {/* Canvas hero — ssr:false, loads async, covers the static image once ready */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <HeroJourneyLoader />
          </div>
        </div>
        <Partnership />
        <Projects />
        <Stats />
        <About />
        <Values />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
