'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export default function About() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Parallax: direct DOM mutation — no setState, no React re-render per frame
  useEffect(() => {
    const onScroll = () => {
      const el = imageRef.current
      if (!el) return
      const rect   = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      const offset = center * 0.05
      // Apply directly to the <img> element so React never re-renders
      const img = el.querySelector('img') as HTMLElement | null
      if (img) img.style.transform = `translateY(${offset}px) translateZ(0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#0B1221',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left: text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.5em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            About Ohana
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 68px)',
              lineHeight: 1.1,
              color: '#F0E8D8',
              marginBottom: '28px',
            }}
          >
            Building Legacies.
            <br />
            <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Creating Families.</em>
          </h2>

          {/* Gold divider */}
          <div
            style={{
              width: '180px',
              height: '1px',
              backgroundColor: '#C9A96E',
              marginBottom: '28px',
              opacity: 0.6,
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(240,232,216,0.65)',
              marginBottom: '36px',
              maxWidth: '480px',
            }}
          >
            Ohana Development is a leading private Real Estate developer in the
            Middle East. We are renowned for crafting timeless residences that
            embody attainable luxury, exceptional quality, and lasting value.
            With over 35 years of expertise, our vision goes beyond building
            homes — it&apos;s about creating lasting legacies for families,
            clients, and communities.
          </p>

          <a
            href="#contact"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9.5px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textDecoration: 'none',
              paddingBottom: '4px',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = '#C9A96E' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = 'transparent' }}
          >
            Learn Our Story →
          </a>
        </div>

        {/* Right: image */}
        <div
          ref={imageRef}
          style={{
            position: 'relative',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.9s ease 0.2s',
          }}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              overflow: 'hidden',
              borderBottom: '2px solid #C9A96E',
            }}
          >
            <Image
              src="/images/hero/hero-03.jpg"
              alt="Ohana Development luxury building exterior"
              fill
              style={{
                objectFit: 'cover',
                // translateZ(0) forces a GPU compositing layer so parallax
                // never triggers a CPU repaint — set by the scroll handler above
                willChange: 'transform',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
