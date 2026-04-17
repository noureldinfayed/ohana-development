'use client'

import { useRef, useEffect, useState } from 'react'

interface StatItem {
  target: number
  prefix: string
  suffix: string
  label: string[]
}

const STATS: StatItem[] = [
  { target: 35,   prefix: '',     suffix: '+',    label: ['YEARS OF',   'LEGACY']       },
  { target: 9000, prefix: '',     suffix: '+',    label: ['UNITS',      'DELIVERED']    },
  { target: 6,    prefix: 'AED ', suffix: 'Bn',   label: ['SOLD IN',    '72 HOURS']     },
  { target: 20,   prefix: 'AED ', suffix: 'Bn+',  label: ['ACTIVE',     'PORTFOLIO']    },
]

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedCounter({ target, prefix, suffix, delay }: {
  target: number
  prefix: string
  suffix: string
  delay: number
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const rafRef = useRef<number>(0)

  const start = () => {
    if (started) return
    setStarted(true)

    const duration = 2000
    const startTime = performance.now() + delay * 1000

    const animate = (now: number) => {
      if (now < startTime) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedVal = easeOut(progress)
      setCount(Math.round(easedVal * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#060C18',
        padding: '80px 0',
      }}
    >
      {/* Top rule */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          marginBottom: '64px',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          gap: '0',
        }}
        className="grid grid-cols-2 md:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label[0]}
            style={{
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            {i > 0 && (
              <div
                className="hidden md:block"
                style={{
                  width: '1px',
                  backgroundColor: 'rgba(201,169,110,0.2)',
                  alignSelf: 'center',
                  height: '40%',
                }}
              />
            )}
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0 24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(40px, 6vw, 80px)',
                  lineHeight: 1,
                  color: '#C9A96E',
                  marginBottom: '16px',
                }}
              >
                {visible ? (
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={i * 0.1}
                  />
                ) : (
                  <span>{stat.prefix}0{stat.suffix}</span>
                )}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.4em',
                  color: 'rgba(240,232,216,0.4)',
                  textTransform: 'uppercase',
                  lineHeight: 1.8,
                }}
              >
                {stat.label.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          marginTop: '64px',
        }}
      />
    </section>
  )
}
