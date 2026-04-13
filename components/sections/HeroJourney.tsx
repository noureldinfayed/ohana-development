'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  type MotionValue,
} from 'framer-motion'

// ─── CONFIGURABLE CONSTANT ────────────────────────────────────────────────
const TOTAL_FRAMES = 120
const FRAME_PATH = (n: number) =>
  `/images/hero-sequence/${String(n).padStart(4, '0')}.webp`

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
  // useTransform with a function — returns MotionValue, no setState, no re-render
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
// Fades out at 10% scroll — driven by MotionValue, no state
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
  // Text fades in 0→20%, holds, fades out 88→96% (much later than before)
  const textOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.18, 0.88, 0.96],
    [0,    1,    1,    0]
  )
  const textY = useTransform(scrollYProgress, [0.06, 0.2], ['32px', '0px'])

  // Eyebrow a beat ahead of the headline
  const eyebrowOpacity = useTransform(scrollYProgress, [0.04, 0.14], [0, 1])

  // CTA fades in at 65%, stays fully visible right through to the end
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

      {/* Main text — motion.div driven by MotionValues */}
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
            // brighter than before — was 0.55 opacity
            color: 'rgba(240,232,216,0.78)',
            lineHeight: 1.45,
          }}
        >
          Redefining luxury real estate across the Middle East
        </p>
      </motion.div>

      {/* CTA block — appears at ~65% and stays until section end */}
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
        {/* Subtle scroll-down nudge below CTA */}
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
  // ── Refs (never cause re-renders) ───────────────────────────────────────
  const containerRef    = useRef<HTMLDivElement>(null)
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const imagesRef       = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef          = useRef<number>(0)

  // ── State — only for the loading phase, never touched during scroll ─────
  const [imagesLoaded, setImagesLoaded] = useState(false)
  // loadProgress removed — we no longer track all-frame loading (lazy load)

  // ── Framer Motion scroll tracking ───────────────────────────────────────
  // offset: ["start start", "end end"] means:
  //   0 → element top  aligns with viewport top  (sticky begins, frame 0)
  //   1 → element bottom aligns with viewport bottom (sticky ends, last frame)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Direct RAF draw — one requestAnimationFrame per scroll event ─────────
  // Frame index is strictly bounded [0, TOTAL_FRAMES-1] so it can never
  // reference an out-of-bounds slot, and cover-scaling fills the canvas
  // regardless of aspect ratio.
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    const img    = imagesRef.current[index]
    if (!ctx || !canvas || !img?.complete || !img.naturalWidth) return

    rafRef.current = requestAnimationFrame(() => {
      // Re-read canvas/ctx inside the RAF in case the component unmounted
      const c2 = canvasRef.current
      const c2ctx = c2?.getContext('2d')
      const i2 = imagesRef.current[index]
      if (!c2ctx || !c2 || !i2?.complete || !i2.naturalWidth) return

      const scale = Math.max(c2.width / i2.naturalWidth, c2.height / i2.naturalHeight)
      const x = (c2.width  - i2.naturalWidth  * scale) / 2
      const y = (c2.height - i2.naturalHeight * scale) / 2
      c2ctx.clearRect(0, 0, c2.width, c2.height)
      c2ctx.drawImage(i2, x, y, i2.naturalWidth * scale, i2.naturalHeight * scale)
    })
  }, [])

  // ── Canvas resize — must re-draw after resize ────────────────────────────
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // ── Lazy frame loading — LCP & bandwidth optimisation ──────────────────────
  // Strategy: only load frame 0 eagerly (it was preloaded in <head> via
  // rel="preload" so it's already in browser cache → near-instant).
  // All other frames are loaded on-demand as the user scrolls, 20 frames
  // ahead of the current position. This reduces the initial page weight from
  // 30 MB to ~250 KB, letting the page reach LCP in ~1.5 s on slow 4G.
  useEffect(() => {
    // Allocate slots without setting .src — no network requests yet
    const images: HTMLImageElement[] = Array.from(
      { length: TOTAL_FRAMES },
      () => new Image()
    )
    imagesRef.current = images

    // Frame 0: already preloaded by <head> hint; set src to pull from cache
    const first = images[0]
    first.onload  = () => { setImagesLoaded(true); drawFrame(0) }
    first.onerror = () => { setImagesLoaded(true) }
    first.src = FRAME_PATH(1)   // browser cache hit — instant

    return () => { cancelAnimationFrame(rafRef.current) }
  }, [drawFrame])

  // ── Load frames on demand as user scrolls (20-frame lookahead) ───────────
  const loadedSetRef = useRef<Set<number>>(new Set([0]))

  // ── Scroll → canvas + lazy frame loader ──────────────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!canvasRef.current || !imagesRef.current.length) return

    const frameIndex = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.floor(latest * TOTAL_FRAMES))
    )
    currentFrameRef.current = frameIndex
    drawFrame(frameIndex)

    // Lazy-load the next 20 frames so they're ready before the user reaches them
    const LOOKAHEAD = 20
    const loaded = loadedSetRef.current
    for (let i = frameIndex; i <= Math.min(frameIndex + LOOKAHEAD, TOTAL_FRAMES - 1); i++) {
      if (!loaded.has(i)) {
        loaded.add(i)
        imagesRef.current[i].src = FRAME_PATH(i + 1)
      }
    }
  })

  return (
    <>
      {/* Loading overlay — only visible before frames are ready */}
      {!imagesLoaded && <LoadingScreen progress={0} />}

      {/* Fixed UI — driven by MotionValues, zero re-renders */}
      <ScrollDots  scrollYProgress={scrollYProgress} />
      <ScrollHint  scrollYProgress={scrollYProgress} />

      {/* ── OUTER TRACK: creates the scroll distance (400vh) ── */}
      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%', height: '400vh' }}
      >
        {/* ── INNER STICKY: stays pinned to viewport while track scrolls ── */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
        >
          {/* Canvas — drawn directly via RAF, never via React */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          />

          {/* Text overlays — all driven by MotionValues */}
          <HeroTextOverlay scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </>
  )
}
