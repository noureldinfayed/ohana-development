'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BUDGET_OPTIONS  = ['AED 1M–3M', 'AED 3M–8M', 'AED 8M–15M', 'AED 15M+']
const PURPOSE_OPTIONS = ['Primary Residence', 'Investment / ROI', 'Holiday Home', 'Golden Visa']
const LOCATION_OPTIONS = ['Yas Island', 'Beachfront', 'City Views', 'Flexible']

// ── Brand tokens (matches ohana.ae light sections) ──────────────────────────
const C = {
  bg:        '#F5F0E8',          // warm cream — ohana.ae page background
  card:      '#FFFFFF',
  navy:      '#060C18',          // primary text
  navyMid:   'rgba(6,12,24,0.55)',
  navyFaint: 'rgba(6,12,24,0.35)',
  gold:      '#C9A96E',          // site gold — same as every other section
  goldHover: '#B8954E',
  border:    'rgba(6,12,24,0.10)',
  borderGold:'rgba(201,169,110,0.30)',
}

export default function InvestmentAdvisor() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  const [form, setForm] = useState({
    name: '', nationality: '', budget: '',
    purpose: '', location: '', timeline: '',
  })
  const [result,  setResult]  = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.budget || !form.purpose) return
    setLoading(true); setError(false)
    try {
      const res  = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data.recommendation)
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <section
      ref={ref}
      id="advisor"
      style={{
        background: C.bg,
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
        borderTop: `1px solid ${C.borderGold}`,
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(48px,6vw,100px)',
        alignItems: 'start',
      }}>

        {/* LEFT ─ intro */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '9.5px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: C.gold,
              marginBottom: '20px',
            }}
          >
            AI Investment Advisor
          </motion.p>

          <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
            <motion.h2
              initial={{ y: '108%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(34px,5vw,62px)',
                fontWeight: 400,
                color: C.navy,
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Find your perfect{' '}
              <em style={{ color: C.gold, fontStyle: 'italic' }}>investment.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 'clamp(13px,1.4vw,15px)',
              fontWeight: 300,
              color: C.navyMid,
              lineHeight: 1.75,
              marginBottom: '40px',
            }}
          >
            Tell us your profile. Our AI advisor matches you with
            the Ohana project that best fits your goals, budget,
            and lifestyle — instantly.
          </motion.p>

          {[
            'Personalised ROI projections',
            'Golden Visa eligibility check',
            'Payment plan recommendations',
            'Instant response, no waiting',
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}
            >
              <div style={{
                width: '4px', height: '4px',
                background: C.gold, borderRadius: '50%', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize: '13px', fontWeight: 300, color: C.navyMid,
              }}>{item}</span>
            </motion.div>
          ))}
        </div>

        {/* RIGHT ─ form / result */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            boxShadow: '0 4px 32px rgba(6,12,24,0.07)',
            padding: 'clamp(28px,4vw,48px)',
          }}
        >
          {result ? (
            /* SUCCESS */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                border: `1.5px solid ${C.gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', color: C.gold, fontSize: '20px',
              }}>✓</div>

              <p style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase',
                color: C.gold, marginBottom: '20px',
              }}>Your Recommendation</p>

              <p style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(17px,2.2vw,24px)', fontWeight: 400,
                fontStyle: 'italic', color: C.navy, lineHeight: 1.65, marginBottom: '32px',
              }}>{result}</p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://www.ohana.ae/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#FFFFFF', background: C.gold,
                    padding: '13px 28px', textDecoration: 'none', transition: 'background 0.25s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = C.goldHover)}
                  onMouseOut={e  => (e.currentTarget.style.background = C.gold)}
                >
                  Register Interest →
                </a>
                <button
                  onClick={() => {
                    setResult(null)
                    setForm({ name:'', nationality:'', budget:'', purpose:'', location:'', timeline:'' })
                  }}
                  style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: C.navyFaint, background: 'transparent',
                    border: `1px solid ${C.border}`, padding: '13px 28px', cursor: 'pointer',
                    transition: 'border-color 0.25s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = C.gold)}
                  onMouseOut={e  => (e.currentTarget.style.borderColor = C.border)}
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            /* FORM */
            <>
              <p style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 400,
                color: C.navy, marginBottom: '32px',
              }}>
                Investment Profile
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>

                {[
                  { key: 'name',        label: 'Your Name *',              placeholder: 'Full name' },
                  { key: 'nationality', label: 'Nationality / Residence',  placeholder: 'Country'   },
                  { key: 'timeline',    label: 'Timeline',                 placeholder: 'e.g. 6 months, immediate' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
                      color: C.navyFaint, display: 'block', marginBottom: '8px',
                    }}>{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={(form as Record<string, string>)[f.key]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{
                        width: '100%', background: 'transparent', border: 'none',
                        borderBottom: `1px solid ${C.border}`, padding: '10px 0',
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                        fontSize: '14px', fontWeight: 300, color: C.navy, outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={e => (e.target.style.borderBottomColor = C.gold)}
                      onBlur={e  => (e.target.style.borderBottomColor = C.border)}
                    />
                  </div>
                ))}

                {[
                  { key: 'budget',   label: 'Budget Range *',      options: BUDGET_OPTIONS   },
                  { key: 'purpose',  label: 'Investment Goal *',   options: PURPOSE_OPTIONS  },
                  { key: 'location', label: 'Preferred Location',  options: LOCATION_OPTIONS },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
                      color: C.navyFaint, display: 'block', marginBottom: '10px',
                    }}>{f.label}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {f.options.map(opt => {
                        const active = (form as Record<string, string>)[f.key] === opt
                        return (
                          <button
                            key={opt}
                            onClick={() => setForm(prev => ({ ...prev, [f.key]: opt }))}
                            style={{
                              fontFamily: 'var(--font-inter), Inter, sans-serif',
                              fontSize: '10px', fontWeight: 300, letterSpacing: '0.08em',
                              color:      active ? '#FFFFFF'  : C.navyMid,
                              background: active ? C.navy     : 'transparent',
                              border:     `1px solid ${active ? C.navy : C.border}`,
                              padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s',
                            }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {error && (
                  <p style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '12px', color: 'rgba(180,60,60,0.7)',
                  }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', paddingTop: '8px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '10px', color: C.navyFaint, letterSpacing: '0.05em',
                  }}>* Required fields</p>

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.budget || !form.purpose}
                    style={{
                      width: '52px', height: '52px', borderRadius: '50%',
                      background: (loading || !form.name || !form.budget || !form.purpose)
                        ? `rgba(201,169,110,0.3)` : C.gold,
                      border: 'none',
                      cursor: loading ? 'wait' : (form.name && form.budget && form.purpose ? 'pointer' : 'default'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: loading ? '18px' : '22px', color: '#FFFFFF', transition: 'all 0.25s',
                    }}
                    onMouseOver={e => {
                      if (!loading && form.name && form.budget && form.purpose)
                        e.currentTarget.style.background = C.goldHover
                    }}
                    onMouseOut={e => {
                      if (!loading && form.name && form.budget && form.purpose)
                        e.currentTarget.style.background = C.gold
                    }}
                  >
                    {loading ? '⟳' : '→'}
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
