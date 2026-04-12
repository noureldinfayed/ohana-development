'use client'

import { useState } from 'react'
import Image from 'next/image'

const OFFICES = [
  {
    city:    'Abu Dhabi — UAE',
    address: 'Landmark Tower, 64th Floor\nAl Hisn Street, Abu Dhabi, UAE',
    phone:   '+971 800 600 600',
    email:   'info@ohana.ae',
    tel:     '+97180060060',
  },
  {
    city:    'Beirut — Lebanon',
    address: 'Minet El-Hosn, St. Charles City Center\n6th Floor, Beirut, Lebanon',
    phone:   '+961 3 030 505',
    email:   'info@ohana.com.lb',
    tel:     '+9613030505',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName:  '',
    email:     '',
    phone:     '',
    message:   '',
  })
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', form)
  }

  const inputStyle = (name: string) => ({
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === name ? '#C9A96E' : 'rgba(201,169,110,0.2)'}`,
    padding: '12px 0',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    fontSize: '14px',
    color: '#F0E8D8',
    outline: 'none',
    transition: 'border-color 0.2s',
  } as React.CSSProperties)

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    fontSize: '9px',
    letterSpacing: '0.32em',
    color: '#C9A96E',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '4px',
  }

  return (
    <section
      id="contact"
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#060C18',
        padding: '120px 0 80px',
        position: 'relative',
      }}
    >
      {/* Atmospheric background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/ui/background1.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.18 }}
          sizes="100vw"
          loading="lazy"
          aria-hidden="true"
        />
        {/* Gradient mask: fade in from top, fade out at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #060C18 0%, transparent 20%, transparent 80%, #060C18 100%)',
          }}
        />
      </div>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.5em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            We&apos;re Just a Message Away
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              color: '#F0E8D8',
            }}
          >
            Get In <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Touch</em>
          </h2>
        </div>

        {/* Two-column layout */}
        <div
          style={{ gap: '56px', alignItems: 'start' }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* Left: offices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {OFFICES.map((office) => (
              <div key={office.city}>
                {/* Gold dot + city */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#C9A96E',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '11px',
                      letterSpacing: '0.22em',
                      color: '#C9A96E',
                      textTransform: 'uppercase',
                    }}
                  >
                    {office.city}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(240,232,216,0.6)',
                    marginBottom: '12px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {office.address}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <a
                    href={`tel:${office.tel}`}
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '14px',
                      color: 'rgba(240,232,216,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A96E' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,232,216,0.6)' }}
                  >
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '14px',
                      color: 'rgba(240,232,216,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A96E' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,232,216,0.6)' }}
                  >
                    {office.email}
                  </a>
                  <a
                    href="#"
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '9.5px',
                      letterSpacing: '0.22em',
                      color: '#C9A96E',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      marginTop: '4px',
                    }}
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Name row */}
            <div style={{ gap: '24px' }} className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-first-name" style={labelStyle}>First Name</label>
                <input
                  id="contact-first-name"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  onFocus={() => setFocused('firstName')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('firstName')}
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-last-name" style={labelStyle}>Last Name</label>
                <input
                  id="contact-last-name"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  onFocus={() => setFocused('lastName')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('lastName')}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-email" style={labelStyle}>Email Address</label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={inputStyle('email')}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-phone" style={labelStyle}>Phone Number</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(240,232,216,0.4)',
                    paddingBottom: '12px',
                    paddingRight: '8px',
                    borderBottom: `1px solid ${focused === 'phone' ? '#C9A96E' : 'rgba(201,169,110,0.2)'}`,
                    transition: 'border-color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  +971
                </span>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('phone'), flex: 1 }}
                  autoComplete="tel"
                  aria-label="Phone number (UAE)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" style={labelStyle}>Message</label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                rows={4}
                style={{
                  ...inputStyle('message'),
                  resize: 'none',
                  paddingTop: '12px',
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#C9A96E',
                color: '#060C18',
                border: 'none',
                padding: '18px',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '9.5px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8C896' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C9A96E' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/971542222000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 300,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Tooltip */}
        <span
          style={{
            position: 'absolute',
            right: '68px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(6,12,24,0.9)',
            color: '#F0E8D8',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '11px',
            padding: '6px 12px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: 0,
          }}
          className="wa-tooltip"
        >
          Chat with us
        </span>
      </a>

      <style>{`
        a[href="https://wa.me/971542222000"]:hover .wa-tooltip {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
