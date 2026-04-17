'use client'

import { useRef, useEffect, useCallback } from 'react'
import {
  useMotionValue,
  useTransform,
  motion,
  type MotionValue,
} from 'framer-motion'

// ─── CONFIGURABLE CONSTANTS ───────────────────────────────────────────────
const TOTAL_FRAMES = 120
const FRAME_PATH = (n: number) =>
  `/images/hero-sequence/${String(n).padStart(4, '0')}.webp`

// ─── LOADING SCREEN ───────────────────────────────────────────────────────
// Shows the preview image as background so there is NO dark flash between
// the SSR <img> (LCP candidate) and the canvas being ready — LCP stays painted.
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      {/* Same preview image as the SSR LCP image — no visible flash */}
      <img
        src="/images/hero-sequence/0001-preview.webp"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
        }}
      />
      {/* Dark overlay keeps the loading UI readable */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,12,24,0.72)' }} />
      {/* Content sits above both the image and the overlay */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
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
      </div>{/* end z-index:1 content wrapper */}
    </div>
  )
}

// ─── SCROLL PROGRESS DOTS ─────────────────────────────────────────────────
// Driven entirely by MotionValue — zero React re-renders during scroll
function ScrollDots({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const thresholds = [
    { low: 0,   high: 0.2 },
    { low: 0.2, high: 0.4 },
    { low: 0.4, high: 0.6 },
    { low: 0.6, high: 0.8 },
    { low: 0.8, high: 1.01 },
  ]

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
        pointerEvents: 'none',
      }}
    >
      {thresholds.map(({ low, high }, i) => (
        <ScrollDot key={i} scrollYProgress={scrollYProgress} low={low} high={high} />
      ))}
    </div>
  )
}

function ScrollDot({
  scrollYProgress,
  low,
  high,
}: {
  scrollYProgress: MotionValue<number>
  low: number
  high: number
}) {
  const width = useTransform(scrollYProgress, (v) =>
    v >= low && v < high ? '24px' : '6px'
  )
  const opacity = useTransform(scrollYProgress, (v) =>
    v >= low && v < high ? 1 : 0.3
  )

  return (
    <motion.div
      style={{
        width,
        opacity,
        height: '6px',
        borderRadius: '3px',
        backgroundColor: '#C9A96E',
        transition: 'width 0.3s ease',
      }}
    />
  )
}

// ─── SCROLL HINT ──────────────────────────────────────────────────────────
function ScrollHint({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.12], [1, 1, 0])

  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        opacity,
        pointerEvents: 'none',
      }}
      className="hidden md:flex"
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
    </motion.div>
  )
}

// ─── HERO TEXT OVERLAY ────────────────────────────────────────────────────
function HeroTextOverlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const textOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.18, 0.88, 0.96],
    [0,    1,    1,    0]
  )
  const textY = useTransform(scrollYProgress, [0.06, 0.2], ['32px', '0px'])

  const eyebrowOpacity = useTransform(scrollYProgress, [0.04, 0.14], [0, 1])

  const ctaOpacity = useTransform(scrollYProgress, [0.62, 0.74], [0, 1])

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
      {/* Edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(6,12,24,0) 20%, rgba(6,12,24,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom fade into next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '320px',
          background: 'linear-gradient(to top, #060C18 15%, transparent)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          opacity: textOpacity,
          y: textY,
          padding: '0 24px',
          maxWidth: '820px',
          width: '100%',
        }}
      >
        <motion.div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9.5px',
            letterSpacing: '0.55em',
            color: '#C9A96E',
            textTransform: 'uppercase',
            marginBottom: '28px',
            opacity: eyebrowOpacity,
          }}
        >
          Where Art Meets Architecture
        </motion.div>

        <h1
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(44px, 10vw, 140px)',
            lineHeight: 0.9,
            color: '#F0E8D8',
            margin: 0,
            textShadow: '0 2px 40px rgba(6,12,24,0.6)',
          }}
        >
          Exquisite
          <br />
          <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Living</em>
        </h1>

        <div
          style={{
            width: '160px',
            height: '1px',
            backgroundColor: '#C9A96E',
            margin: '32px auto',
            opacity: 0.7,
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '22px',
            fontStyle: 'italic',
            color: 'rgba(240,232,216,0.78)',
            lineHeight: 1.45,
          }}
        >
          Redefining luxury real estate across the Middle East
        </p>
      </motion.div>

      {/* CTA — appears at ~65%, stays until section end */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 'clamp(72px, 12vh, 120px)',
          left: '50%',
          x: '-50%',
          zIndex: 2,
          opacity: ctaOpacity,
          pointerEvents: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <a
          href="#projects"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#060C18',
            backgroundColor: '#C9A96E',
            border: '1px solid #C9A96E',
            padding: '16px 48px',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#C9A96E'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#C9A96E'
            e.currentTarget.style.color = '#060C18'
          }}
        >
          Discover Our Projects
        </a>
        <div
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)',
          }}
        />
      </motion.div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function HeroJourney() {
  const containerRef    = useRef<HTMLDivElement>(null)
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const imagesRef       = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef          = useRef<number>(0)
  const pendingFrameRef = useRef<number>(-1)
  const rafScheduledRef = useRef(false)
  const loadedSetRef    = useRef<Set<number>>(new Set<number>())
  // Cached scroll distance — updated by ResizeObserver, never read inside scroll handler
  const scrollDistRef   = useRef(0)

  // Manual MotionValue — driven directly from window scroll, not framer's useScroll
  const scrollProgress = useMotionValue(0)

  // Synchronous cover-scaled draw — called only from within rAF callbacks
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    const img    = imagesRef.current[index]
    if (!ctx || !canvas || !img?.complete || !img.naturalWidth) return
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const x = (canvas.width  - img.naturalWidth  * scale) / 2
    const y = (canvas.height - img.naturalHeight * scale) / 2
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
  }, [])

  // Canvas resize + cache scrollDist — ResizeObserver handles both so scroll handler
  // never needs to read offsetHeight (forced reflow)
  useEffect(() => {
    const update = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight
        drawFrame(currentFrameRef.current)
      }
      if (containerRef.current) {
        scrollDistRef.current = containerRef.current.offsetHeight - window.innerHeight
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [drawFrame])

  // Non-blocking frame load: draw preview from cache immediately, upgrade silently,
  // remaining frames loaded on-demand by scroll lookahead — no loading screen needed.
  useEffect(() => {
    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, () => new Image())
    imagesRef.current = images
    const loaded = loadedSetRef.current

    // Tier 1: preview is already in cache (preloaded in <head>) — draw immediately
    const preview = new Image()
    preview.onload = () => {
      images[0] = preview
      imagesRef.current = images
      loaded.add(0)
      drawFrame(0)
    }
    preview.src = '/images/hero-sequence/0001-preview.webp'

    // Tier 2: full-res frame 1 — delay 2s so LCP preview has clear bandwidth first
    const fullTimer = setTimeout(() => {
      const full = new Image()
      full.onload = () => {
        images[0] = full
        imagesRef.current = images
        drawFrame(0)
      }
      full.src = FRAME_PATH(1)
    }, 2000)
    loaded.add(0)

    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(fullTimer) }
  }, [drawFrame])

  // Direct window scroll listener → rAF flag pattern for buttery canvas draws
  useEffect(() => {
    const rafDraw = () => {
      rafScheduledRef.current = false
      const index = pendingFrameRef.current
      if (index < 0) return
      drawFrame(index)
      currentFrameRef.current = index

      // Lazy-load 5-frame lookahead so frames are ready before user reaches them
      const loaded = loadedSetRef.current
      const end    = Math.min(index + 5, TOTAL_FRAMES - 1)
      for (let i = index; i <= end; i++) {
        if (!loaded.has(i)) {
          loaded.add(i)
          imagesRef.current[i].src = FRAME_PATH(i + 1)
        }
      }
    }

    const onScroll = () => {
      const scrollDist = scrollDistRef.current
      if (scrollDist <= 0) return

      // Compute progress directly from window.scrollY — starts at 0 immediately
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollDist))
      scrollProgress.set(progress)

      pendingFrameRef.current = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      )

      // Schedule one rAF per scroll event — never draw inside the scroll handler
      if (!rafScheduledRef.current) {
        rafScheduledRef.current = true
        rafRef.current = requestAnimationFrame(rafDraw)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // set initial state at scrollY=0
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [drawFrame, scrollProgress])

  return (
    <>
      {/* Fixed UI — driven by MotionValues, zero re-renders */}
      <ScrollDots  scrollYProgress={scrollProgress} />
      <ScrollHint  scrollYProgress={scrollProgress} />

      {/* ── OUTER TRACK: creates 400vh scroll distance ── */}
      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%', height: '400vh' }}
      >
        {/* ── INNER STICKY: pins to viewport, animation starts at scrollY=0 ── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'block',
              width: '100%',
              height: '100%',
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />
          <HeroTextOverlay scrollYProgress={scrollProgress} />
        </div>
      </div>
    </>
  )
}
