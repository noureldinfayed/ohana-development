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

  // The dark backdrop behind the text fades in with the text
  const backdropOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1])

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
      {/* Permanent edge vignette — heavier than before so text always pops */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(6,12,24,0) 20%, rgba(6,12,24,0.82) 100%)',
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

      {/* Blur + dark card backing the text — fades in with text */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          width: 'min(820px, 90vw)',
          borderRadius: '4px',
          background: 'rgba(6,12,24,0.45)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,169,110,0.1)',
          opacity: backdropOpacity,
          pointerEvents: 'none',
          padding: '64px 56px 72px',
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
            fontSize: 'clamp(64px, 10vw, 140px)',
            lineHeight: 0.9,
            color: '#F0E8D8',
            margin: 0,
            // text-shadow for legibility over any frame
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
          bottom: '108px',
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
  const [loadProgress, setLoadProgress] = useState(0)

  // ── Framer Motion scroll tracking ───────────────────────────────────────
  // offset: ["start start", "end end"] means:
  //   0 → element top  aligns with viewport top  (sticky begins, frame 0)
  //   1 → element bottom aligns with viewport bottom (sticky ends, last frame)
  // Default offset ["start end","end start"] would start at 0.2 on page load,
  // skipping the first ~24 frames and never completing the sequence.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Coalesced RAF draw — smoother than cancel/reschedule ────────────────
  // Multiple scroll events between two screen paints collapse into ONE draw
  // that always uses the latest requested frame index.
  // Cancelling a RAF before it executes means we paint LESS than 60fps;
  // coalescing means we paint exactly once per screen frame at the latest index.
  const pendingFrameRef = useRef(-1)
  const rafPendingRef   = useRef(false)

  const drawFrame = useCallback((index: number) => {
    pendingFrameRef.current = index           // record latest requested frame

    if (rafPendingRef.current) return         // RAF already queued — let it pick up the new index

    rafPendingRef.current = true
    rafRef.current = requestAnimationFrame(() => {
      rafPendingRef.current = false

      const canvas = canvasRef.current
      const ctx    = canvas?.getContext('2d')
      const img    = imagesRef.current[pendingFrameRef.current]
      if (!ctx || !canvas || !img?.complete || !img.naturalWidth) return

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

  // ── Preload all frames into refs (never into state) ──────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES)
    let loaded = 0

    const onSettle = () => {
      loaded++
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
      if (loaded === TOTAL_FRAMES) setImagesLoaded(true)
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.onload  = onSettle
      img.onerror = onSettle
      img.src = FRAME_PATH(i + 1)
      images[i] = img
    }
    imagesRef.current = images

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── Draw frame 0 as soon as images are ready ─────────────────────────────
  useEffect(() => {
    if (imagesLoaded) drawFrame(0)
  }, [imagesLoaded, drawFrame])

  // ── Scroll → canvas: pure DOM mutation, ZERO React state updates ─────────
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * TOTAL_FRAMES),
      TOTAL_FRAMES - 1
    )
    currentFrameRef.current = frameIndex
    drawFrame(frameIndex)
    // NOTE: no setState here — overlays are driven by MotionValues via useTransform
  })

  return (
    <>
      {/* Loading overlay — only visible before frames are ready */}
      {!imagesLoaded && <LoadingScreen progress={loadProgress} />}

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
