'use client'

import { useEffect } from 'react'

/**
 * Forces the browser to start at the top on every page load/refresh.
 * Without this, browsers with scroll-restoration try to jump to the
 * user's previous scroll position, which lands in the middle of the
 * 400vh hero track and breaks the canvas frame sequence.
 */
export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return null
}
