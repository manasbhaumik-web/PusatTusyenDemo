import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Search, CheckCircle2, BookOpen } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  // Quick Finder State
  const [selectedLevel, setSelectedLevel] = useState('spm')
  const [selectedMode, setSelectedMode] = useState('physical')
  const [selectedSubject, setSelectedSubject] = useState('all')

  const slides = [
    {
      img: '/images/slide1.jpg',
      headline: t.hero.slide1Title,
      sub: t.hero.slide1Desc,
      label: t.hero.slide1Badge,
    },
    {
      img: '/images/slide2.jpg',
      headline: t.hero.slide2Title,
      sub: t.hero.slide2Desc,
      label: t.hero.slide2Badge,
    },
    {
      img: '/images/slide3.jpg',
      headline: t.hero.slide3Title,
      sub: t.hero.slide3Desc,
      label: t.hero.slide3Badge,
    },
    {
      img: '/images/slide4.jpg',
      headline: t.hero.slide4Title,
      sub: t.hero.slide4Desc,
      label: t.hero.slide4Badge,
    },
    {
      img: '/images/slide5.jpg',
      headline: t.hero.slide5Title,
      sub: t.hero.slide5Desc,
      label: t.hero.slide5Badge,
    },
  ]

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => go((current + 1) % slides.length), [current, go])
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  const variants = {
    enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: d => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  const slide = slides[current]

  const handleFinderSearch = (e) => {
    e.preventDefault()
    const targetElement = document.getElementById('syllabus')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <section id="home" style={{ position: 'relative', height: 'calc(100vh - 117px)', minHeight: 580, overflow: 'hidden', background: '#0F172A' }}>

        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.32, 0, 0.67, 0] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={slide.img}
              alt={slide.headline}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Flat dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.72)' }} />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
            <div style={{ maxWidth: 650 }}>

              {/* Badge */}
              <motion.div
                key={`label-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '6px 14px',
                  background: 'rgba(14, 165, 233, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.45)',
                  borderRadius: 6,
                  color: '#E0F2FE',
                  fontSize: 11.5,
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: 18,
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 12px rgba(14, 165, 233, 0.2)',
                }}>
                  <CheckCircle2 size={13} color="#38BDF8" />
                  {slide.label}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                key={`h-${current}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: 18,
                }}
              >
                {slide.headline}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                key={`s-${current}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.12rem)',
                  lineHeight: 1.75,
                  fontFamily: 'Roboto, sans-serif',
                  marginBottom: 26,
                  maxWidth: 540,
                }}
              >
                {slide.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                key={`cta-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="hero-cta-container"
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}
              >
                <a
                  href="#contact"
                  className="hero-btn-primary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 26px', borderRadius: 8,
                    background: '#1E3A8A', color: '#fff',
                    fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: 14.5,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.35)',
                    transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1E3A8A'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {t.hero.ctaBook} <ArrowRight size={15} />
                </a>
                <a
                  href="#syllabus"
                  className="hero-btn-secondary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 26px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)', color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: 14.5,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = '#38BDF8' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                >
                  <BookOpen size={15} /> {t.hero.ctaTimetable}
                </a>
              </motion.div>

              {/* Prestigious Trust Metrics Strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.12)', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'Raleway, serif', fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8', lineHeight: 1.1 }}>13+ Yrs</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: 2 }}>Established in Selangor</div>
                </div>
                <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)' }} className="hidden-mobile-text" />
                <div>
                  <div style={{ fontFamily: 'Raleway, serif', fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8', lineHeight: 1.1 }}>Max 12</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: 2 }}>Students / Physical Class</div>
                </div>
                <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)' }} className="hidden-mobile-text" />
                <div>
                  <div style={{ fontFamily: 'Raleway, serif', fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8', lineHeight: 1.1 }}>1,500+</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: 2 }}>Achievers Guided</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Arrow buttons */}
        {[{ fn: prev, label: 'Previous', Icon: ChevronLeft, side: 'left' }, { fn: next, label: 'Next', Icon: ChevronRight, side: 'right' }].map(({ fn, label, Icon, side }) => (
          <button
            key={label}
            onClick={fn}
            aria-label={label}
            className="hero-nav-arrow"
            style={{
              position: 'absolute', [side]: 16, top: '50%', transform: 'translateY(-60%)',
              zIndex: 10, width: 42, height: 42,
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <Icon size={20} color="#fff" />
          </button>
        ))}

        {/* Dot indicators */}
        <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', gap: 7, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 24 : 8, height: 8, borderRadius: 4,
                background: i === current ? '#38BDF8' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease', padding: 0,
              }}
            />
          ))}
        </div>
      </section>

      {/* Quick Class & Level Finder Widget */}
      <section style={{ background: '#1E3A8A', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <form onSubmit={handleFinderSearch} className="quick-finder-form" style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
            
            {/* Title & Icon Header */}
            <div className="quick-finder-header" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, minWidth: 175, paddingBottom: 2 }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(14, 165, 233, 0.35)' }}>
                <Search size={18} />
              </div>
              <div>
                <div style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                  {t.hero.quickFinderTitle}
                </div>
                <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11.5, color: '#E0F2FE', whiteSpace: 'nowrap', marginTop: 3, lineHeight: 1.2 }}>
                  {t.hero.quickFinderSub}
                </div>
              </div>
            </div>

            {/* Level Selector */}
            <div className="quick-finder-field" style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'Roboto, sans-serif', color: '#93C5FD', fontWeight: 700, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {t.hero.levelLabel}
              </label>
              <select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 12px',
                  borderRadius: 8,
                  border: '1px solid #3B82F6',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: 14,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 500,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              >
                <option value="primary">Primary (Tahun 1 – 6 / UPSR)</option>
                <option value="pt3">Lower Sec (Tingkatan 1 – 3 / PT3)</option>
                <option value="spm">Upper Sec (Tingkatan 4 – 5 / SPM)</option>
                <option value="igcse">IGCSE / International / Pre-U</option>
              </select>
            </div>

            {/* Subject Selector */}
            <div className="quick-finder-field" style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'Roboto, sans-serif', color: '#93C5FD', fontWeight: 700, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {t.hero.subjectLabel}
              </label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 12px',
                  borderRadius: 8,
                  border: '1px solid #3B82F6',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: 14,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 500,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              >
                <option value="all">{t.hero.allSubjects}</option>
                <option value="math">Mathematics / Add Maths</option>
                <option value="science">Science / Physics / Chem / Bio</option>
                <option value="bm">Bahasa Melayu</option>
                <option value="eng">English Language</option>
                <option value="sejarah">Sejarah / History</option>
                <option value="acc">Prinsip Perakaunan / Accounts</option>
              </select>
            </div>

            {/* Mode Selector */}
            <div className="quick-finder-field" style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'Roboto, sans-serif', color: '#93C5FD', fontWeight: 700, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {t.hero.modeLabel}
              </label>
              <select
                value={selectedMode}
                onChange={e => setSelectedMode(e.target.value)}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 12px',
                  borderRadius: 8,
                  border: '1px solid #3B82F6',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: 14,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 500,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              >
                <option value="physical">Physical Classroom (In-Center)</option>
                <option value="online">Interactive Online (Live Zoom)</option>
                <option value="private">1-on-1 Private Tuition</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="quick-finder-submit" style={{ flex: '0 0 auto' }}>
              <button
                type="submit"
                style={{
                  height: 44,
                  padding: '0 24px',
                  borderRadius: 8,
                  background: '#1E3A8A',
                  color: '#FFFFFF',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                  boxSizing: 'border-box',
                  width: '100%',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1E40AF'}
                onMouseLeave={e => e.currentTarget.style.background = '#1E3A8A'}
              >
                {t.hero.findClassesBtn} <ArrowRight size={14} />
              </button>
            </div>

          </form>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .quick-finder-form {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .quick-finder-field, .quick-finder-submit {
            width: 100% !important;
            flex: 1 1 100% !important;
          }
          .hero-nav-arrow {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .hero-cta-container {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  )
}
