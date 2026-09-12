import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Award, Users, GraduationCap, ClipboardList,
  BookOpen, BarChart2, DollarSign, Presentation,
  BookMarked, Clock, CheckCircle2, ShieldCheck, ArrowRight,
  MessageCircle
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function WhyChooseUs() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeCategory, setActiveCategory] = useState('all')

  const featureIcons = [
    { icon: Award, accent: '#0EA5E9', bg: '#FFFBEB', border: '#E0F2FE' },
    { icon: Users, accent: '#1E3A8A', bg: '#F1F5F9', border: '#CBD5E1' },
    { icon: GraduationCap, accent: '#1E3A8A', bg: '#F0F9FF', border: '#BFDBFE' },
    { icon: ClipboardList, accent: '#0EA5E9', bg: '#FFFBEB', border: '#E0F2FE' },
    { icon: BookOpen, accent: '#1E3A8A', bg: '#F1F5F9', border: '#CBD5E1' },
    { icon: BarChart2, accent: '#1E3A8A', bg: '#F0F9FF', border: '#BFDBFE' },
    { icon: DollarSign, accent: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
    { icon: Presentation, accent: '#1E3A8A', bg: '#F1F5F9', border: '#CBD5E1' },
    { icon: BookMarked, accent: '#1E3A8A', bg: '#F0F9FF', border: '#BFDBFE' },
    { icon: Clock, accent: '#0EA5E9', bg: '#FFFBEB', border: '#E0F2FE' },
  ]

  const features = t.why.features.map((item, idx) => ({
    ...item,
    icon: featureIcons[idx]?.icon || Award,
    accent: featureIcons[idx]?.accent || '#1E3A8A',
    bg: featureIcons[idx]?.bg || '#F8FAFC',
    border: featureIcons[idx]?.border || '#E2E8F0',
  }))

  const filteredFeatures = activeCategory === 'all'
    ? features
    : features.filter(f => f.category === activeCategory)

  const categories = [
    { key: 'all', label: t.why.categories?.all || 'All 10 Pillars', count: 10 },
    { key: 'faculty', label: t.why.categories?.faculty || 'Accreditation & Faculty', count: 2 },
    { key: 'pedagogy', label: t.why.categories?.pedagogy || 'Modular Pedagogy', count: 4 },
    { key: 'environment', label: t.why.categories?.environment || 'Student Care & Value', count: 4 },
  ]

  return (
    <section id="about" style={{ padding: '96px 0 108px', background: '#FAFAF9', borderTop: '1px solid #E7E5E4', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 40 }}
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
              {t.why.tag}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ maxWidth: 680 }}>
              <h2 style={{
                fontFamily: 'Raleway, Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
                color: '#1E3A8A',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}>
                {t.why.title}
              </h2>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15.5, color: '#4B5563', lineHeight: 1.7 }}>
                {t.why.sub}
              </p>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              background: '#FFFFFF',
              border: '1px solid #E7E5E4',
              borderRadius: 10,
              boxShadow: '0 2px 10px rgba(10,25,47,0.04)',
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} color="#0EA5E9" />
              </div>
              <div>
                <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12.5, fontWeight: 700, color: '#1E3A8A', lineHeight: 1.2 }}>
                  {t.why.trustBadge || '13+ Years Trusted in Education'}
                </div>
                <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, color: '#6B7280', lineHeight: 1.2, marginTop: 2 }}>
                  Registered with MOE Malaysia
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div
          className="no-scrollbar why-category-pills"
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
            marginBottom: 28,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 18px',
                  borderRadius: 8,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  border: isActive ? '1px solid #0EA5E9' : '1px solid #E7E5E4',
                  background: isActive ? '#1E3A8A' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  boxShadow: isActive ? '0 4px 14px rgba(10,25,47,0.2)' : '0 1px 2px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 12,
                  background: isActive ? '#0EA5E9' : '#F3F4F6',
                  color: isActive ? '#FFFFFF' : '#6B7280',
                }}>
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Bento Grid Architecture */}
        <AnimatePresence mode="wait">
          {activeCategory === 'all' ? (
            <motion.div
              key="all-bento"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* Row 1: 2 Hero Spotlight Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: 20,
              }}>
                {features.slice(0, 2).map((f) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={f.title}
                      whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(10,25,47,0.08)' }}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 14,
                        padding: '30px 28px',
                        border: '1px solid #E7E5E4',
                        boxShadow: '0 2px 10px rgba(10,25,47,0.03)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 20,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Top gold accent line */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)',
                      }} />

                      {/* Header Row */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{
                              width: 52,
                              height: 52,
                              borderRadius: 12,
                              background: f.bg,
                              border: `1.5px solid ${f.border}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                            }}>
                              <Icon size={26} color={f.accent} />
                            </div>
                            <div>
                              <span style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 11,
                                fontWeight: 800,
                                color: '#0EA5E9',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                display: 'block',
                              }}>
                                PILLAR {f.num}
                              </span>
                              <span style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 11.5,
                                fontWeight: 600,
                                color: '#15803D',
                                background: '#DCFCE7',
                                padding: '2px 8px',
                                borderRadius: 4,
                                display: 'inline-block',
                                marginTop: 3,
                              }}>
                                ✓ {f.highlight}
                              </span>
                            </div>
                          </div>

                          <span style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#FFFFFF',
                            background: '#1E3A8A',
                            border: '1px solid rgba(14, 165, 233,0.3)',
                            padding: '4px 10px',
                            borderRadius: 6,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}>
                            {f.tag}
                          </span>
                        </div>

                        <h3 style={{
                          fontFamily: 'Raleway, Georgia, serif',
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          color: '#1E3A8A',
                          marginBottom: 10,
                          lineHeight: 1.35,
                        }}>
                          {f.title}
                        </h3>

                        <p style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 14.5,
                          color: '#4B5563',
                          lineHeight: 1.7,
                        }}>
                          {f.desc}
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 14,
                        borderTop: '1px solid #F3F4F6',
                        fontSize: 12.5,
                        fontFamily: 'Roboto, sans-serif',
                        color: '#6B7280',
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#0EA5E9' }}>
                          <CheckCircle2 size={15} color="#0EA5E9" /> Institutional Standard
                        </span>
                        <span style={{ fontWeight: 700, color: '#1E3A8A' }}>
                          Verified Quality
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Row 2: 8 Balanced Grid Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 18,
              }}>
                {features.slice(2).map((f) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={f.title}
                      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(10,25,47,0.06)' }}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 12,
                        padding: '24px 20px',
                        border: '1px solid #E7E5E4',
                        boxShadow: '0 1px 3px rgba(10,25,47,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 16,
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#0EA5E9'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#E7E5E4'}
                    >
                      <div>
                        {/* Top Metadata Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                          <div style={{
                            width: 42,
                            height: 42,
                            borderRadius: 10,
                            background: f.bg,
                            border: `1px solid ${f.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <Icon size={21} color={f.accent} />
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 11,
                              fontWeight: 800,
                              color: '#9CA3AF',
                              letterSpacing: '0.04em',
                            }}>
                              #{f.num}
                            </span>
                            <span style={{
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: f.accent === '#1E3A8A' ? '#1E3A8A' : f.accent,
                              background: f.bg,
                              padding: '3px 7px',
                              borderRadius: 4,
                            }}>
                              {f.tag}
                            </span>
                          </div>
                        </div>

                        <h3 style={{
                          fontFamily: 'Raleway, Georgia, serif',
                          fontWeight: 700,
                          fontSize: 15,
                          color: '#1E3A8A',
                          marginBottom: 8,
                          lineHeight: 1.35,
                        }}>
                          {f.title}
                        </h3>

                        <p style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 13,
                          color: '#4B5563',
                          lineHeight: 1.65,
                        }}>
                          {f.desc}
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 10,
                        borderTop: '1px solid #F9FAFB',
                        fontSize: 11.5,
                        fontFamily: 'Roboto, sans-serif',
                      }}>
                        <span style={{ color: '#1E3A8A', fontWeight: 600 }}>
                          {f.highlight}
                        </span>
                        <CheckCircle2 size={13} color="#0EA5E9" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="filtered-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20,
              }}
            >
              {filteredFeatures.map((f) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    whileHover={{ y: -4, boxShadow: '0 14px 34px rgba(10,25,47,0.08)' }}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 14,
                      padding: '26px 22px',
                      border: '1px solid #E7E5E4',
                      boxShadow: '0 2px 6px rgba(10,25,47,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 16,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#0EA5E9'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#E7E5E4'}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{
                          width: 46,
                          height: 46,
                          borderRadius: 10,
                          background: f.bg,
                          border: `1.5px solid ${f.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Icon size={23} color={f.accent} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 800, color: '#9CA3AF' }}>
                            PILLAR {f.num}
                          </span>
                          <span style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 11,
                            fontWeight: 700,
                            color: f.accent === '#1E3A8A' ? '#1E3A8A' : f.accent,
                            background: f.bg,
                            padding: '3px 8px',
                            borderRadius: 4,
                          }}>
                            {f.tag}
                          </span>
                        </div>
                      </div>

                      <h3 style={{
                        fontFamily: 'Raleway, Georgia, serif',
                        fontWeight: 700,
                        fontSize: 16,
                        color: '#1E3A8A',
                        marginBottom: 8,
                        lineHeight: 1.35,
                      }}>
                        {f.title}
                      </h3>

                      <p style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 13.5,
                        color: '#4B5563',
                        lineHeight: 1.65,
                      }}>
                        {f.desc}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 12,
                      borderTop: '1px solid #F3F4F6',
                      fontSize: 12,
                      fontFamily: 'Roboto, sans-serif',
                    }}>
                      <span style={{ color: '#1E3A8A', fontWeight: 600 }}>
                        {f.highlight}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#0EA5E9', fontWeight: 700 }}>
                        <CheckCircle2 size={14} color="#0EA5E9" /> Verified
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Interactive Advantage Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginTop: 44,
            background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
            borderRadius: 14,
            padding: '28px 32px',
            border: '1px solid rgba(14, 165, 233,0.35)',
            boxShadow: '0 12px 36px rgba(10,25,47,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#38BDF8', fontSize: 11.5, fontWeight: 700, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              <ShieldCheck size={14} color="#38BDF8" /> {t.why.tag}
            </div>
            <h4 style={{
              fontFamily: 'Raleway, Georgia, serif',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: '#FFFFFF',
              lineHeight: 1.3,
              marginBottom: 4,
            }}>
              {t.why.calloutTitle || 'Experience the Bestari Didik Advantage Today'}
            </h4>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 13.5,
              color: '#CBD5E1',
              lineHeight: 1.5,
              margin: 0,
            }}>
              {t.why.calloutSub || 'Give your child the confidence and mastery needed to excel in their upcoming examinations.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                color: '#FFFFFF',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: 13.5,
                boxShadow: '0 4px 14px rgba(14, 165, 233,0.3)',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233,0.5)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(14, 165, 233,0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {t.why.calloutBtn || 'Book Free Consultation'} <ArrowRight size={15} />
            </a>

            <a
              href="https://wa.me/60125125792"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: 13.5,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.16)'
                e.currentTarget.style.borderColor = '#FFFFFF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              <MessageCircle size={15} color="#4ADE80" /> {t.why.calloutWhatsapp || 'Chat on WhatsApp'}
            </a>
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #about {
            padding: 56px 0 68px !important;
          }
          .why-callout-box {
            padding: 20px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </section>
  )
}
