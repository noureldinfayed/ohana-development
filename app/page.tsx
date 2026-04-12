import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import HeroJourneyLoader from '@/components/sections/HeroJourneyLoader'
import Partnership      from '@/components/sections/Partnership'
import Projects         from '@/components/sections/Projects'
import Stats            from '@/components/sections/Stats'
import About            from '@/components/sections/About'
import Values           from '@/components/sections/Values'
import News             from '@/components/sections/News'
import Contact          from '@/components/sections/Contact'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroJourneyLoader />
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
