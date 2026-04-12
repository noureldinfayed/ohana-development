'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const NEWS_ITEMS = [
  {
    category: 'NEWS',
    date:      '16th MAR, 2026',
    headline:  'AED 6 BILLION IN 72 HOURS: Manchester City Yas Residences Sets New Sales Record in Abu Dhabi',
    description:
      'Ohana Development\'s landmark project sold AED 6 billion worth of units within 72 hours of launch, setting a new record for Abu Dhabi real estate.',
    featured: true,
  },
  {
    category: 'NEWS',
    date:      '16th FEB, 2026',
    headline:  'Ohana Development Launches AED 15 Billion \'Manchester City Yas Residences by Ohana\' in Abu Dhabi',
    description: '',
    featured: false,
  },
  {
    category: 'NEWS',
    date:      '25th JAN, 2026',
    headline:  'Ohana Development and Manchester City F.C Sign Agreement to Launch Multi-Billion-Dirham Project in Abu Dhabi',
    description: '',
    featured: false,
  },
]

function NewsCard({
  item,
  index,
  visible,
}: {
  item: (typeof NEWS_ITEMS)[0]
  index: number
  visible: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Direct DOM hover — no useState, no React re-render
  const onEnter = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.borderColor = 'rgba(201,169,110,0.4)'
    el.style.transform    = 'scale(1.02) translateZ(0)'
    const link = el.querySelector<HTMLElement>('.news-read-more')
    if (link) link.style.color = '#C9A96E'
  }, [])

  const onLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.borderColor = 'rgba(201,169,110,0.1)'
    el.style.transform    = 'scale(1) translateZ(0)'
    const link = el.querySelector<HTMLElement>('.news-read-more')
    if (link) link.style.color = 'rgba(240,232,216,0.4)'
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        backgroundColor: 'rgba(6,12,24,0.8)',
        border: '1px solid rgba(201,169,110,0.1)',
        padding: item.featured ? '40px' : '32px',
        transform: 'scale(1) translateZ(0)',
        willChange: 'transform',
        transition: 'border-color 0.25s ease, transform 0.3s ease, opacity 0.7s ease',
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.12}s`,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '8.5px',
            letterSpacing: '0.28em',
            color: '#C9A96E',
            border: '1px solid rgba(201,169,110,0.4)',
            padding: '4px 12px',
            borderRadius: '100px',
            textTransform: 'uppercase',
          }}
        >
          {item.category}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '10px',
            color: 'rgba(240,232,216,0.4)',
            letterSpacing: '0.08em',
          }}
        >
          {item.date}
        </span>
      </div>

      {/* Headline */}
      <h3
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: item.featured ? 'clamp(18px, 2.2vw, 24px)' : 'clamp(16px, 1.8vw, 20px)',
          lineHeight: 1.35,
          color: '#F0E8D8',
          flex: 1,
        }}
      >
        {item.headline}
      </h3>

      {/* Description (featured only) */}
      {item.description && (
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'rgba(240,232,216,0.5)',
          }}
        >
          {item.description}
        </p>
      )}

      {/* Read more — color toggled by direct DOM mutation above */}
      <div
        className="news-read-more"
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.28em',
          color: 'rgba(240,232,216,0.4)',
          textTransform: 'uppercase',
          transition: 'color 0.2s',
          marginTop: 'auto',
        }}
      >
        Read More →
      </div>
    </div>
  )
}

export default function News() {
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
      id="news"
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
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '56px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.5em',
                color: '#C9A96E',
                textTransform: 'uppercase',
                marginBottom: '12px',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              News and Media
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: '#F0E8D8',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              Latest <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Happenings</em>
            </h2>
          </div>

          <a
            href="#news"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9.5px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textDecoration: 'none',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.2s',
              whiteSpace: 'nowrap',
              alignSelf: 'flex-end',
              paddingBottom: '8px',
            }}
          >
            View All News →
          </a>
        </div>

        {/* Cards grid: featured takes 2 cols on desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '24px',
          }}
          className="grid grid-cols-1 md:grid-cols-news"
        >
          {/* Featured */}
          <div style={{ gridRow: '1 / 3' }}>
            <NewsCard item={NEWS_ITEMS[0]} index={0} visible={visible} />
          </div>
          {/* Secondary cards */}
          <NewsCard item={NEWS_ITEMS[1]} index={1} visible={visible} />
          <NewsCard item={NEWS_ITEMS[2]} index={2} visible={visible} />
        </div>
      </div>
    </section>
  )
}
