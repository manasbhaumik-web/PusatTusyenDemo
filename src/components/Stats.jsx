import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

function CountUp({ target, suffix, run }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let n = 0
    const step = target / 55
    const id = setInterval(() => {
      n = Math.min(n + step, target)
      setVal(Math.floor(n))
      if (n >= target) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [run, target])
  return <>{val.toLocaleString()}{suffix}</>
}

export default function Stats() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const stats = [
    { value: 13,   suffix: '+',  label: t.stats.years,        sub: t.stats.yearsSub },
    { value: 1500, suffix: '+',  label: t.stats.students,     sub: t.stats.studentsSub },
    { value: 100,  suffix: '%',  label: t.stats.satisfaction, sub: t.stats.satisfactionSub },
  ]

  return (
    <section id="stats" className="stats-section" style={{ background: '#1B3A6B', padding: '80px 0', borderTop: '4px solid #2563EB' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <h2 style={{ fontFamily: 'Merriweather, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            {t.stats.title}
          </h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 10 }}>
            {t.stats.tag}
          </p>
        </motion.div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.14, duration: 0.52 }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}
              style={{
                background: i === 1 ? '#2563EB' : 'rgba(255,255,255,0.06)',
                border: i === 1 ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '36px 20px',
                textAlign: 'center',
                boxShadow: i === 1 ? '0 8px 30px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.25s',
              }}
            >
              <div style={{
                fontFamily: 'Merriweather, sans-serif', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
                color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.03em',
                marginBottom: 12,
              }}>
                <CountUp target={s.value} suffix={s.suffix} run={inView} />
              </div>
              <div style={{ width: 36, height: 3, background: i === 1 ? '#FFFFFF' : '#38BDF8', borderRadius: 2, margin: '0 auto 14px' }} />
              <p style={{ fontFamily: 'Merriweather, sans-serif', fontWeight: 700, fontSize: 16, color: '#FFFFFF', marginBottom: 4 }}>
                {s.label}
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: i === 1 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)' }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-section {
            padding: 56px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
