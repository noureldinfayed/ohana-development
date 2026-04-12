'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion'

// ─── CONFIGURABLE CONSTANT ────────────────────────────────────────────────
const TOTAL_FRAMES = 120
const FRAME_PATH   = (n: number) => `/images/hero-sequence/${String(n).padStart(4, '0')}.webp`

// ─── LOADING SCREEN ───────────────────────────────────────────────────────
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        backgroundColor: '#060C18',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      {/* Logo mark */}
      <svg width="48" height="42" viewBox="0 0 48 42" fill="none" aria-hidden="true">
        <rect x="0"  y="21" width="6" height="21" fill="#C9A96E" opacity="0.6" />
        <rect x="9"  y="9"  width="6" height="33" fill="#C9A96E" opacity="0.8" />
        <rect x="18" y="0"  width="6" height="42" fill="#C9A96E" />
        <rect x="27" y="12" width="6" height="30" fill="#C9A96E" opacity="0.8" />
        <rect x="36" y="24" width="6" height="18" fill="#C9A96E" opacity="0.6" />
      </svg>

      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '22px',
            letterSpacing: '0.25em',
            color: '#C9A96E',
            marginBottom: '4px',
          }}
        >
          OHANA
        </div>
        <div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '8px',
            letterSpacing: '0.5em',
            color: 'rgba(240,232,216,0.4)',
          }}
        >
          DEVELOPMENT
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '160px',
          height: '1px',
          backgroundColor: 'rgba(201,169,110,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#C9A96E',
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>
    </div>
  )
}

// ─── SCROLL PROGRESS DOTS ─────────────────────────────────────────────────
function ScrollDots({ progress }: { progress: number }) {
  const dots = [0, 0.2, 0.4, 0.6, 0.8]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      {dots.map((threshold, i) => {
        const active = progress >= threshold && progress < (dots[i + 1] ?? 1.01)
        return (
          <div
            key={i}
            style={{
              width: active ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: active ? '#C9A96E' : 'rgba(201,169,110,0.3)',
              transition: 'all 0.3s ease',
            }}
          />
        )
      })}
    </div>
  )
}

// ─── SCROLL HINT ──────────────────────────────────────────────────────────
function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '8px',
          letterSpacing: '0.45em',
          color: '#C9A96E',
          textTransform: 'uppercase',
        }}
      >
        Scroll
      </span>
      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, #C9A96E, transparent)',
          animation: 'scrollHintPulse 1.8s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes scrollHintPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </div>
  )
}

// ─── HERO TEXT OVERLAY ────────────────────────────────────────────────────
function HeroTextOverlay({ scrollProgress }: { scrollProgress: number }) {
  const textOpacity  = scrollProgress > 0.1 && scrollProgress < 0.78 ? 1 : 0
  const textY        = scrollProgress < 0.25 ? (0.25 - scrollProgress) / 0.15 * 30 : 0
  const ctaOpacity   = scrollProgress > 0.65 ? Math.min((scrollProgress - 0.65) / 0.1, 1) : 0
  const eyebrowOpacity = scrollProgress > 0.08 ? Math.min((scrollProgress - 0.08) / 0.1, 1) : 0

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(6,12,24,0) 30%, rgba(6,12,24,0.72) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '280px',
          background: 'linear-gradient(to top, #060C18, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Main text block */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          padding: '0 24px',
          maxWidth: '900px',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9.5px',
            letterSpacing: '0.55em',
            color: '#C9A96E',
            textTransform: 'uppercase',
            marginBottom: '28px',
            opacity: eyebrowOpacity,
            transition: 'opacity 0.4s ease',
          }}
        >
          Where Art Meets Architecture
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(72px, 11vw, 148px)',
            lineHeight: 0.87,
            color: '#F0E8D8',
            margin: 0,
          }}
        >
          Exquisite
          <br />
          <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Living</em>
        </h1>

        {/* Divider */}
        <div
          style={{
            width: '160px',
            height: '1px',
            backgroundColor: '#C9A96E',
            margin: '32px auto',
            opacity: 0.7,
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '22px',
            fontStyle: 'italic',
            color: 'rgba(240,232,216,0.55)',
            lineHeight: 1.4,
          }}
        >
          Redefining luxury real estate across the Middle East
        </p>
      </div>

      {/* CTA block */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          opacity: ctaOpacity,
          transition: 'opacity 0.5s ease',
          pointerEvents: ctaOpacity > 0 ? 'auto' : 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <a
          href="#projects"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#F0E8D8',
            border: '1px solid #C9A96E',
            padding: '16px 40px',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C9A96E'
            e.currentTarget.style.color = '#060C18'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#F0E8D8'
          }}
        >
          Discover Our Projects
        </a>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function HeroJourney() {
  const containerRef   = useRef<HTMLDivElement>(null)
  const canvasRef      = useRef<HTMLCanvasElement>(null)
  const imagesRef      = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)

  const [imagesLoaded,  setImagesLoaded]  = useState(false)
  const [loadProgress,  setLoadProgress]  = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { scrollYProgress } = useScroll({ target: containerRef })

  // ── Draw a frame ────────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    const img    = imagesRef.current[index]
    if (!ctx || !canvas || !img || !img.complete) return

    requestAnimationFrame(() => {
      const scale = Math.max(
        canvas.width  / img.naturalWidth,
        canvas.height / img.naturalHeight
      )
      const x = (canvas.width  - img.naturalWidth  * scale) / 2
      const y = (canvas.height - img.naturalHeight * scale) / 2
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
    })
  }, [])

  // ── Resize canvas ───────────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width  = window.innerWidth
      canvasRef.current.height = window.innerHeight
      drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // ── Preload frames ──────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loaded = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loaded++
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true)
      }
      img.onerror = () => {
        // Count errored frames as loaded to avoid hanging
        loaded++
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true)
      }
      images.push(img)
    }
    imagesRef.current = images

    return () => {
      images.forEach((img) => { img.src = '' })
    }
  }, [])

  // ── Drive canvas from scroll ─────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest)
    const frameIndex = Math.min(
      Math.floor(latest * TOTAL_FRAMES),
      TOTAL_FRAMES - 1
    )
    currentFrameRef.current = frameIndex
    drawFrame(frameIndex)
  })

  // ── Draw frame 0 once loaded ─────────────────────────────────────────────
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(0)
    }
  }, [imagesLoaded, drawFrame])

  return (
    <>
      {!imagesLoaded && <LoadingScreen progress={loadProgress} />}

      <ScrollDots progress={scrollProgress} />
      <ScrollHint visible={scrollProgress < 0.1} />

      {/* Scroll track — 400vh creates the scroll space */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: '400vh' }}
      >
        {/* Sticky viewport */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh' }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />
          <HeroTextOverlay scrollProgress={scrollProgress} />
        </div>
      </div>
    </>
  )
}
