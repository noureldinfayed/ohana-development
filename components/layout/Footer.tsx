'use client'

import Image from 'next/image'

const QUICK_LINKS = [
  'About Us',
  'Projects',
  'Build Your Villa',
  'News and Media',
  'Contact Us',
]

const PROJECTS_LIST = [
  'Manchester City Yas Residences',
  'Jacob & Co. Beachfront Living',
  'Elie Saab Waterfront',
  'Ohana by the Sea',
  'Ohana Villas',
  'Ohana Hills',
]

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: '#060C18',
        borderTop: '1px solid rgba(201,169,110,0.1)',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle architectural background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/ui/background4.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top', opacity: 0.12 }}
          sizes="100vw"
          loading="lazy"
          aria-hidden="true"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #060C18 0%, rgba(6,12,24,0.6) 40%, rgba(6,12,24,0.6) 60%, #060C18 100%)',
          }}
        />
      </div>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '72px 24px 48px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '48px',
          position: 'relative',
          zIndex: 1,
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Column 1: Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
            <Image
              src="/images/ui/ohana-logo-gold.png"
              alt="Ohana Development"
              width={120}
              height={40}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '13px',
              lineHeight: 1.65,
              color: 'rgba(240,232,216,0.5)',
              maxWidth: '280px',
            }}
          >
            Ohana Development specializes in conceptualizing, designing and
            building state-of-the-art luxury projects at the heart of key
            locations.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            {[
              { icon: <InstagramIcon />, href: 'https://instagram.com/ohana_development', label: 'Instagram' },
              { icon: <FacebookIcon />,  href: 'https://facebook.com/ohanadvpt',          label: 'Facebook'  },
              { icon: <TwitterIcon />,   href: '#',                                        label: 'Twitter'   },
              { icon: <LinkedInIcon />,  href: '#',                                        label: 'LinkedIn'  },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,169,110,0.2)',
                  color: 'rgba(240,232,216,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#C9A96E'
                  e.currentTarget.style.borderColor = 'rgba(201,169,110,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(240,232,216,0.5)'
                  e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Quick Links
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {QUICK_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(240,232,216,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F0E8D8' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,232,216,0.55)' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Projects */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Our Projects
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PROJECTS_LIST.map((project) => (
              <a
                key={project}
                href="#"
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(240,232,216,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F0E8D8' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,232,216,0.55)' }}
              >
                {project}
              </a>
            ))}
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Subscribe
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(240,232,216,0.5)',
              marginBottom: '20px',
            }}
          >
            Stay updated with the latest from Ohana Development
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                backgroundColor: 'rgba(11,18,33,0.8)',
                border: '1px solid rgba(201,169,110,0.2)',
                padding: '12px 16px',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '13px',
                color: '#F0E8D8',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(201,169,110,0.4)',
                padding: '12px',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.3em',
                color: '#C9A96E',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C9A96E'
                e.currentTarget.style.color = '#060C18'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#C9A96E'
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(201,169,110,0.08)',
          padding: '20px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9px',
            color: 'rgba(240,232,216,0.3)',
            letterSpacing: '0.06em',
          }}
        >
          &copy;{year} Ohana Development. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9px',
            color: 'rgba(240,232,216,0.3)',
            letterSpacing: '0.06em',
          }}
        >
          Architected &amp; Engineered by Fayed Intelligence
        </span>
      </div>
    </footer>
  )
}
