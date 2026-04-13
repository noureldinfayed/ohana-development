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
         * LCP strategy:
         *
         * 1. A server-rendered <Image priority fetchPriority="high"> lives inside
         *    a div that has EXPLICIT height (100vh). This is critical — Chrome's LCP
         *    algorithm must see a non-zero rendered area to register the image as a
         *    valid LCP candidate. A position:absolute img inside a 0px-height container
         *    is computed as 0px² and never wins the LCP race.
         *
         * 2. marginBottom:'-100vh' pulls the HeroJourneyLoader up so it starts at
         *    the same y as the image div. The canvas (400vh) then covers the image.
         *    Net document height = 100vh - 100vh + 400vh = 400vh → no CLS.
         *
         * 3. HeroJourneyLoader (ssr:false) renders on top in DOM order, so its
         *    opaque #060C18 placeholder naturally covers the LCP image after JS.
         *    LCP has already been recorded by then (image painted at ~0.5 s).
         */}

        {/* LCP poster — 100vh explicit height so Chrome can measure rendered area */}
        <div
          aria-hidden="true"
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            marginBottom: '-100vh',   // pulls hero canvas up to y=0
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          <Image
            src="/images/hero-sequence/0001.webp"
            alt="Ohana Development — luxury real estate Abu Dhabi"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={65}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Consistent dark vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(6,12,24,0.15) 0%, rgba(6,12,24,0.55) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Canvas hero — ssr:false, overlaps the poster, provides 400vh of scroll */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HeroJourneyLoader />
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
