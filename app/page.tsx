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
      <main>
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
