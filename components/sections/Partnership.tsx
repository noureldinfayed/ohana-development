'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

const STATS = [
  { value: '$4.1 Billion', label: 'TOTAL VALUE' },
  { value: '1.67M sqm',    label: 'MASTERPLAN AREA' },
  { value: 'Yas Canal',    label: 'ABU DHABI, UAE' },
]

export default function Partnership() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const clipRef    = useRef<HTMLDivElement>(null)   // direct DOM target — no setState
  const [statsVisible, setStatsVisible] = useState(false)
  const [leftIn,  setLeftIn]  = useState(false)
  const [rightIn, setRightIn] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          setLeftIn(true)
          setRightIn(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el  = sectionRef.current
      const clip = clipRef.current
      if (!el || !clip) return
      const rect     = el.getBoundingClientRect()
      const viewH    = window.innerHeight
      // Start iris when hero is ~70% scrolled (section is ~1.8 viewports below fold)
      const earlyStart = viewH * 1.8
      const progress = Math.max(0, Math.min(1, (earlyStart - rect.top) / (earlyStart + rect.height)))
      const radius   = Math.min(progress * 180, 130)
      // Direct DOM mutation — zero React re-renders on scroll
      clip.style.clipPath = `circle(${radius}% at 50% 50%)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="partnership"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        backgroundColor: '#060C18',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image with clip reveal — driven by direct DOM mutation, no setState */}
      <div
        ref={clipRef}
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'circle(0% at 50% 50%)',
          willChange: 'clip-path',
        }}
      >
        <Image
          src="/images/projects/mancity-crest.jpg"
          alt="Manchester City Yas Residences aerial view"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        {/* Dark radial vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(6,12,24,0.3) 0%, rgba(6,12,24,0.85) 100%)',
          }}
        />
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to top, #060C18, transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '80px 24px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.5em',
            color: '#C9A96E',
            textTransform: 'uppercase',
            marginBottom: '32px',
            opacity: leftIn ? 1 : 0,
            transform: leftIn ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          A Landmark Partnership
        </div>

        {/* Partner names row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              letterSpacing: '0.32em',
              color: 'rgba(240,232,216,0.8)',
              textTransform: 'uppercase',
              opacity: leftIn ? 1 : 0,
              transform: leftIn ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            Manchester City F.C.
          </div>

          <div
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(20px, 3vw, 28px)',
              color: '#C9A96E',
              opacity: leftIn ? 1 : 0,
              transform: leftIn ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            ×
          </div>

          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              letterSpacing: '0.32em',
              color: 'rgba(240,232,216,0.8)',
              textTransform: 'uppercase',
              opacity: rightIn ? 1 : 0,
              transform: rightIn ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            Ohana Development
          </div>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(40px, 9vw, 110px)',
            lineHeight: 0.95,
            color: '#F0E8D8',
            margin: '0 0 48px',
            opacity: leftIn ? 1 : 0,
            transform: leftIn ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          Yas <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Residences</em>
        </h2>

        {/* Divider */}
        <div
          style={{
            width: '120px',
            height: '1px',
            backgroundColor: 'rgba(201,169,110,0.4)',
            margin: '0 auto 48px',
          }}
        />

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0',
            flexWrap: 'wrap',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: '1px',
                    backgroundColor: 'rgba(201,169,110,0.25)',
                    margin: '0 40px',
                    alignSelf: 'stretch',
                  }}
                />
              )}
              <div
                style={{
                  textAlign: 'center',
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${0.15 * i + 0.4}s, transform 0.6s ease ${0.15 * i + 0.4}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 'clamp(22px, 3.5vw, 36px)',
                    color: '#C9A96E',
                    marginBottom: '8px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '0.35em',
                    color: 'rgba(240,232,216,0.4)',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
