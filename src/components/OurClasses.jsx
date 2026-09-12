import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Wifi, UserCheck, ArrowRight, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function OurClasses() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const classes = [
    {
      icon: Monitor,
      title: t.classes.physical.title,
      badge: t.classes.physical.badge,
      desc: t.classes.physical.desc,
      points: [t.classes.physical.f1, t.classes.physical.f2, t.classes.physical.f3, t.classes.physical.f4],
      color: '#1E3A8A',
      accentColor: '#0EA5E9',
      bgLight: '#FFFBEB',
      borderLight: '#E0F2FE',
      href: '#contact',
      cta: t.classes.physical.cta,
    },
    {
      icon: Wifi,
      title: t.classes.online.title,
      badge: t.classes.online.badge,
      desc: t.classes.online.desc,
      points: [t.classes.online.f1, t.classes.online.f2, t.classes.online.f3, t.classes.online.f4],
      color: '#0EA5E9',
      accentColor: '#0EA5E9',
      bgLight: '#FFFBEB',
      borderLight: '#E0F2FE',
      href: '#contact',
      cta: t.classes.online.cta,
    },
    {
      icon: UserCheck,
      title: t.classes.private.title,
      badge: t.classes.private.badge,
      desc: t.classes.private.desc,
      points: [t.classes.private.f1, t.classes.private.f2, t.classes.private.f3, t.classes.private.f4],
      color: '#1E3A8A',
      accentColor: '#1E3A8A',
      bgLight: '#F0F9FF',
      borderLight: '#BFDBFE',
      href: '#contact',
      cta: t.classes.private.cta,
    },
  ]

  return (
    <section id="classes" style={{ padding: '96px 0', background: '#FFFFFF', borderTop: '1px solid #E7E5E4' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 4, height: 28, background: '#0EA5E9', borderRadius: 2 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 12,
              color: '#0284C7',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: '#FEF3C7',
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid #E0F2FE',
            }}>
              {t.classes.tag}
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Raleway, Georgia, serif',
            fontWeight: 900,
            fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
            color: '#1E3A8A',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            {t.classes.title}
          </h2>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15.5, color: '#4B5563', marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
            {t.classes.sub}
          </p>
        </motion.div>

        {/* Class cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {classes.map((cls, i) => {
            const Icon = cls.icon
            return (
              <motion.div
                key={cls.title}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.13, duration: 0.52, ease: 'easeOut' }}
                whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(10,25,47,0.08)' }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: '1px solid #E7E5E4',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(10,25,47,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.28s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0EA5E9'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E7E5E4'}
              >
                {/* Top accent bar */}
                <div style={{ height: 4, background: cls.color === '#1E3A8A' ? 'linear-gradient(90deg, #1E3A8A, #0EA5E9)' : cls.color }} />

                {/* Card header */}
                <div style={{ padding: '28px 26px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 12,
                      background: cls.bgLight,
                      border: `1.5px solid ${cls.borderLight}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={26} color={cls.color === '#1E3A8A' ? '#0EA5E9' : cls.color} />
                    </div>
                    <span style={{
                      padding: '4px 10px', borderRadius: 6,
                      background: cls.bgLight,
                      color: cls.color === '#1E3A8A' ? '#0284C7' : cls.color,
                      border: `1px solid ${cls.borderLight}`,
                      fontSize: 11, fontWeight: 700,
                      fontFamily: 'Roboto, sans-serif',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      {cls.badge}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: '1.3rem', color: '#1E3A8A', marginBottom: 10 }}>
                    {cls.title}
                  </h3>
                  <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>
                    {cls.desc}
                  </p>
                </div>

                {/* Points */}
                <div style={{ padding: '0 26px 26px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 22 }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {cls.points.map(pt => (
                      <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <CheckCircle size={16} color="#0EA5E9" style={{ flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13.5, color: '#374151' }}>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={cls.href}
                    className="classes-card-cta"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '12px 22px', borderRadius: 8,
                      background: cls.color === '#1E3A8A' ? '#1E3A8A' : cls.color,
                      color: '#fff',
                      border: '1px solid rgba(14, 165, 233,0.3)',
                      fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 13.5,
                      transition: 'all 0.2s', alignSelf: 'flex-start',
                      boxShadow: '0 2px 8px rgba(10,25,47,0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(10,25,47,0.2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(10,25,47,0.12)'
                    }}
                  >
                    {cls.cta || t.nav.enrollBtn} <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #classes {
            padding: 56px 0 !important;
          }
          .classes-card-cta {
            align-self: stretch !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
