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
import InvestmentAdvisor  from '@/components/sections/InvestmentAdvisor'
import ScrollRestoration  from '@/components/ui/ScrollRestoration'

export default function Page() {
  return (
    <>
      {/* Disable native scroll-memory so page always starts at top */}
      <ScrollRestoration />
      <Navbar />
      <main style={{ position: 'relative' }}>
        {/* SSR priority LCP image — in HTML before any JS runs.
            The canvas layers on top once loaded (translateZ(0) stacking context + later DOM order). */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100vh',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <img
            src="/images/hero-sequence/0001-preview.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
            }}
          />
        </div>
        <HeroJourneyLoader />
        <Partnership />
        <Projects />
        <InvestmentAdvisor />
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
