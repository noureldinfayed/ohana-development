'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BUDGET_OPTIONS = ['AED 1M–3M', 'AED 3M–8M', 'AED 8M–15M', 'AED 15M+']
const PURPOSE_OPTIONS = ['Primary Residence', 'Investment / ROI', 'Holiday Home', 'Golden Visa']
const LOCATION_OPTIONS = ['Yas Island', 'Beachfront', 'City Views', 'Flexible']

export default function InvestmentAdvisor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const [form, setForm] = useState({
    name: '', nationality: '', budget: '',
    purpose: '', location: '', timeline: '',
  })
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.budget || !form.purpose) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/match', {
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
        background: '#060E1C',
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
        borderTop: '1px solid rgba(201,165,90,0.12)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(48px,6vw,100px)',
        alignItems: 'start',
      }}>

        {/* LEFT — Intro text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#C9A55A',
              marginBottom: '24px',
            }}
          >
            AI Investment Advisor
          </motion.p>

          <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
            <motion.h2
              initial={{ y: '108%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(34px,5vw,64px)',
                fontWeight: 300,
                color: '#F5F0E8',
                lineHeight: 1.05,
              }}
            >
              Find your perfect{' '}
              <em style={{ color: '#C9A55A', fontStyle: 'italic' }}>
                investment.
              </em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(13px,1.4vw,15px)',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.4)',
              lineHeight: 1.75,
              marginBottom: '40px',
            }}
          >
            Tell us your profile. Our AI advisor matches you with
            the Ohana project that best fits your goals, budget,
            and lifestyle — instantly.
          </motion.p>

          {/* Feature list */}
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
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <div style={{
                width: '4px', height: '4px',
                background: '#C9A55A',
                borderRadius: '50%',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.45)',
              }}>{item}</span>
            </motion.div>
          ))}
        </div>

        {/* RIGHT — Form or Result */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,165,90,0.15)',
            padding: 'clamp(28px,4vw,48px)',
          }}
        >
          {result ? (
            /* SUCCESS STATE */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '52px', height: '52px',
                borderRadius: '50%',
                border: '1.5px solid #C9A55A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: '#C9A55A',
                fontSize: '20px',
              }}>✓</div>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: '#C9A55A',
                marginBottom: '20px',
              }}>
                Your Recommendation
              </p>

              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(17px,2.2vw,24px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F5F0E8',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}>
                {result}
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://www.ohana.ae/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#0A1628',
                    background: '#C9A55A',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    transition: 'background 0.3s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = '#E8C97A')}
                  onMouseOut={e => (e.currentTarget.style.background = '#C9A55A')}
                >
                  Register Interest →
                </a>
                <button
                  onClick={() => { setResult(null); setForm({ name:'',nationality:'',budget:'',purpose:'',location:'',timeline:'' }) }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.3)',
                    background: 'transparent',
                    border: '1px solid rgba(245,240,232,0.12)',
                    padding: '12px 24px',
                    cursor: 'pointer',
                  }}
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(18px,2.2vw,26px)',
                fontWeight: 300,
                color: '#F5F0E8',
                marginBottom: '32px',
              }}>
                Investment Profile
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>

                {/* Text inputs */}
                {[
                  { key: 'name', label: 'Your Name *', placeholder: 'Full name' },
                  { key: 'nationality', label: 'Nationality / Residence', placeholder: 'Country' },
                  { key: 'timeline', label: 'Timeline', placeholder: 'e.g. 6 months, immediate' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '9px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.28)',
                      display: 'block',
                      marginBottom: '8px',
                    }}>{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={(form as Record<string, string>)[f.key]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(245,240,232,0.1)',
                        padding: '10px 0',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#F5F0E8',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={e => (e.target.style.borderBottomColor = '#C9A55A')}
                      onBlur={e => (e.target.style.borderBottomColor = 'rgba(245,240,232,0.1)')}
                    />
                  </div>
                ))}

                {/* Pill selectors */}
                {[
                  { key: 'budget', label: 'Budget Range *', options: BUDGET_OPTIONS },
                  { key: 'purpose', label: 'Investment Goal *', options: PURPOSE_OPTIONS },
                  { key: 'location', label: 'Preferred Location', options: LOCATION_OPTIONS },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '9px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.28)',
                      display: 'block',
                      marginBottom: '10px',
                    }}>{f.label}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {f.options.map(opt => {
                        const active = (form as Record<string, string>)[f.key] === opt
                        return (
                          <button
                            key={opt}
                            onClick={() => setForm(prev => ({ ...prev, [f.key]: opt }))}
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '10px',
                              fontWeight: 300,
                              letterSpacing: '0.08em',
                              color: active ? '#0A1628' : 'rgba(245,240,232,0.4)',
                              background: active ? '#C9A55A' : 'transparent',
                              border: `1px solid ${active ? '#C9A55A' : 'rgba(245,240,232,0.1)'}`,
                              padding: '8px 16px',
                              cursor: 'pointer',
                              transition: 'all 0.25s',
                            }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* Error */}
                {error && (
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: 'rgba(245,240,232,0.4)',
                  }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '8px',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    color: 'rgba(245,240,232,0.2)',
                    letterSpacing: '0.05em',
                  }}>
                    * Required fields
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.budget || !form.purpose}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: loading || !form.name || !form.budget || !form.purpose
                        ? 'rgba(201,165,90,0.25)'
                        : '#C9A55A',
                      border: 'none',
                      cursor: loading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: loading ? '18px' : '22px',
                      color: '#0A1628',
                      transition: 'all 0.3s',
                    }}
                    onMouseOver={e => {
                      if (!loading && form.name && form.budget && form.purpose)
                        e.currentTarget.style.background = '#E8C97A'
                    }}
                    onMouseOut={e => {
                      if (!loading && form.name && form.budget && form.purpose)
                        e.currentTarget.style.background = '#C9A55A'
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
