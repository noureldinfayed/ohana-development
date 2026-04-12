'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const VALUES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5">
        <path d="M16 27S4 20 4 11a6 6 0 0 1 12 0 6 6 0 0 1 12 0c0 9-12 16-12 16z" />
      </svg>
    ),
    title:  'Creating Homes with Legacy at Heart',
    eyebrow: 'Family Spirit',
    body:   'Ohana Development integrates family values and forward-thinking design to create properties that stand the test of time. Our focus extends beyond construction, prioritising the development of spaces that foster meaningful connections.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5">
        <circle cx="12" cy="10" r="4" />
        <circle cx="22" cy="10" r="4" />
        <path d="M4 26c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8" />
      </svg>
    ),
    title:  'A Journey Tailored to Each Client',
    eyebrow: 'Customer-Centricity',
    body:   'At Ohana Development, we place our clients at the center of every project. By delivering a structured and transparent ownership process, we ensure that each stage aligns with their needs and exceeds expectations.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5">
        <path d="M16 4 L20 12 L29 13 L22 20 L24 29 L16 25 L8 29 L10 20 L3 13 L12 12 Z" />
      </svg>
    ),
    title:  'Redefining Luxury for All',
    eyebrow: 'Attainable Luxury',
    body:   'Ohana Development redefines luxury by delivering exceptional quality and sophisticated design at accessible price points. Our projects blend premium materials, innovative craftsmanship, and practical amenities.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5">
        <path d="M20 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10l-6-6z" />
        <polyline points="20 4 20 10 26 10" />
        <line x1="12" y1="16" x2="20" y2="16" />
        <line x1="12" y1="21" x2="20" y2="21" />
      </svg>
    ),
    title:  'Homes as Unique as You Are',
    eyebrow: 'Personalisation',
    body:   'By providing customisable design solutions and tailored finishes, we deliver properties that meet the unique requirements and aspirations of our clients. Each home embodies distinctive character.',
  },
]

export default function Values() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="values"
      ref={sectionRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#060C18',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.5em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '16px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            What Drives Us
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              color: '#F0E8D8',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            Our Core <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Values</em>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {VALUES.map((value, i) => (
            <ValueCard key={value.eyebrow} value={value} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  value,
  index,
  visible,
}: {
  value: (typeof VALUES)[0]
  index: number
  visible: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onEnter = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.borderColor = 'rgba(201,169,110,0.4)'
    el.style.boxShadow   = '0 0 32px rgba(201,169,110,0.08)'
  }, [])

  const onLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.borderColor = 'rgba(201,169,110,0.12)'
    el.style.boxShadow   = 'none'
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        backgroundColor: 'rgba(11,18,33,0.6)',
        border: '1px solid rgba(201,169,110,0.12)',
        padding: '40px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) translateZ(0)' : 'translateY(28px) translateZ(0)',
        willChange: 'opacity, transform',
        transitionProperty: 'opacity, transform, border-color, box-shadow',
        transitionDuration: `0.7s, 0.7s, 0.3s, 0.3s`,
        transitionDelay: `${0.1 * index}s, ${0.1 * index}s, 0s, 0s`,
        transitionTimingFunction: 'ease',
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: '24px' }}>{value.icon}</div>

      {/* Eyebrow */}
      <div
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.4em',
          color: '#C9A96E',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        {value.eyebrow}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '22px',
          color: '#F0E8D8',
          lineHeight: 1.3,
          marginBottom: '16px',
        }}
      >
        {value.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(240,232,216,0.55)',
        }}
      >
        {value.body}
      </p>
    </div>
  )
}
