'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

const PROJECTS = [
  {
    image:    '/images/projects/mancity-crest.jpg',
    collab:   'MANCHESTER CITY F.C. ×',
    title:    'Yas Residences by Ohana',
    location: 'Yas Canal · Abu Dhabi',
    badge:    '$4.1 BILLION',
  },
  {
    image:    '/images/projects/elie-saab.jpg',
    collab:   'ELIE SAAB ×',
    title:    'Elie Saab Waterfront by Ohana',
    location: 'Al Reem Island · Abu Dhabi',
    badge:    'SOLD OUT',
  },
  {
    image:    '/images/projects/jacob-co.jpg',
    collab:   'JACOB & CO. ×',
    title:    'Beachfront Living by Ohana',
    location: 'UAE Coastline',
    badge:    'AED 4.7 BILLION',
  },
]

export default function Projects() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current
      const track   = trackRef.current
      if (!wrapper || !track) return

      const rect       = wrapper.getBoundingClientRect()
      const viewH      = window.innerHeight
      const wrapperH   = wrapper.offsetHeight
      const scrollDist = wrapperH - viewH

      if (rect.top > 0 || rect.bottom < viewH) return

      const scrolled   = Math.abs(rect.top)
      const progress   = Math.max(0, Math.min(1, scrolled / scrollDist))
      const cardW      = window.innerWidth * 0.62
      const gap        = 32
      const totalTrack = (cardW + gap) * PROJECTS.length - gap - window.innerWidth
      const offset     = progress * totalTrack

      track.style.transform = `translateX(-${offset}px)`

      // active dot
      const idx = Math.round(progress * (PROJECTS.length - 1))
      setActiveIdx(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cardW = 62   // vw
  const cardH = 52   // vh

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#060C18',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Scroll track wrapper */}
      <div
        ref={wrapperRef}
        style={{ height: `calc(100vh + ${PROJECTS.length * 50}vw)`, position: 'relative' }}
      >
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          {/* Section header */}
          <div
            ref={headerRef}
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
              width: '100%',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.5em',
                color: '#C9A96E',
                textTransform: 'uppercase',
                marginBottom: '12px',
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              Flagship Developments
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(36px, 5.5vw, 56px)',
                color: '#F0E8D8',
                lineHeight: 1,
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              Signature{' '}
              <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Projects</em>
            </h2>
          </div>

          {/* Horizontal track */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                gap: '32px',
                paddingLeft: '24px',
                paddingRight: '24px',
                willChange: 'transform',
                transition: 'none',
              }}
            >
              {PROJECTS.map((project, i) => (
                <div
                  key={project.title}
                  style={{
                    flexShrink: 0,
                    width: `${cardW}vw`,
                    height: `${cardH}vh`,
                    borderRadius: '3px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img')
                    if (img) img.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img')
                    if (img) img.style.transform = 'scale(1)'
                  }}
                >
                  {/* Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.9s ease',
                    }}
                    sizes="62vw"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(135deg, rgba(6,12,24,0.2) 0%, rgba(6,12,24,0.75) 100%)',
                    }}
                  />

                  {/* Card content */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '32px 36px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-inter), system-ui, sans-serif',
                        fontSize: '9px',
                        letterSpacing: '0.38em',
                        color: '#C9A96E',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}
                    >
                      {project.collab}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        fontSize: 'clamp(22px, 3vw, 34px)',
                        color: '#F0E8D8',
                        lineHeight: 1.15,
                        marginBottom: '16px',
                      }}
                    >
                      {project.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-inter), system-ui, sans-serif',
                          fontSize: '10px',
                          letterSpacing: '0.18em',
                          color: 'rgba(240,232,216,0.5)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {project.location}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-inter), system-ui, sans-serif',
                          fontSize: '8.5px',
                          letterSpacing: '0.22em',
                          color: '#C9A96E',
                          border: '1px solid rgba(201,169,110,0.5)',
                          padding: '5px 14px',
                          borderRadius: '100px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {project.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-start',
              padding: '24px 24px 0',
              maxWidth: '1280px',
              margin: '16px auto 0',
              width: '100%',
            }}
          >
            {PROJECTS.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '3px',
                  borderRadius: '2px',
                  width: i === activeIdx ? '32px' : '12px',
                  backgroundColor: i === activeIdx ? '#C9A96E' : 'rgba(201,169,110,0.25)',
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
