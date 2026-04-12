'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About',    href: '#about' },
  { label: 'Values',   href: '#values' },
  { label: 'News',     href: '#news' },
  { label: 'Contact',  href: '#contact' },
]

function OhanaLogo({ className = '' }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center flex-shrink-0 ${className}`} aria-label="Ohana Development home">
      <Image
        src="/images/ui/ohana-logo.png"
        alt="Ohana Development"
        width={140}
        height={48}
        style={{ objectFit: 'contain', objectPosition: 'left' }}
      />
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [scrollY, setScrollY]       = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setScrolled(y > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.header
        style={{ zIndex: 200 }}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(6,12,24,0.92)] backdrop-blur-md border-b border-[rgba(201,169,110,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <OhanaLogo />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '9.5px',
                    letterSpacing: '0.28em',
                    fontWeight: 500,
                    color: 'rgba(240,232,216,0.6)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,232,216,0.6)')}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  fontWeight: 500,
                  color: '#060C18',
                  backgroundColor: '#C9A96E',
                  padding: '10px 22px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8C896')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A96E')}
              >
                Enquire
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  backgroundColor: '#C9A96E',
                  transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-4 h-px transition-all duration-300"
                style={{
                  backgroundColor: '#C9A96E',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  backgroundColor: '#C9A96E',
                  transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 190,
              backgroundColor: 'rgba(6,12,24,0.98)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OhanaLogo className="absolute top-5 left-4" />
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '28px',
                    color: '#F0E8D8',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
