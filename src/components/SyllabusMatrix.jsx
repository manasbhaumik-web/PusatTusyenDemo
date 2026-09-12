import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, Clock, Users, ArrowRight, Download, Award } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function SyllabusMatrix() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('spm')
  const [filterMode, setFilterMode] = useState('all')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const academicLevels = [
    {
      id: 'spm',
      tabName: t.syllabus.spmTab,
      heading: t.syllabus.spmHeading,
      sub: t.syllabus.spmSub,
      badge: 'High Demand',
      badgeColor: '#0EA5E9',
      subjects: [
        { name: 'Additional Mathematics (Matematik Tambahan)', code: 'SPM-3472', hours: `2.0 ${t.syllabus.hoursPerWeek}`, teacher: 'Specialist Tutors (15+ yrs)', mode: 'Physical & Online' },
        { name: 'Mathematics (Matematik)', code: 'SPM-1449', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Senior MOE Trained', mode: 'Physical & Online' },
        { name: 'Physics (Fizik)', code: 'SPM-4531', hours: `2.0 ${t.syllabus.hoursPerWeek}`, teacher: 'Physics Specialist', mode: 'Physical & Online' },
        { name: 'Chemistry (Kimia)', code: 'SPM-4541', hours: `2.0 ${t.syllabus.hoursPerWeek}`, teacher: 'Chemistry Specialist', mode: 'Physical & Online' },
        { name: 'Biology (Biologi)', code: 'SPM-4551', hours: `2.0 ${t.syllabus.hoursPerWeek}`, teacher: 'Biology Specialist', mode: 'Physical & Online' },
        { name: 'Bahasa Melayu (Kertas 1, 2, 3 & 4)', code: 'SPM-1103', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'BM Chief Examiner Panel', mode: 'Physical & Online' },
        { name: 'English (CEFR Aligned 1119)', code: 'SPM-1119', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'English Master Tutor', mode: 'Physical & Online' },
        { name: 'Prinsip Perakaunan (Accounts)', code: 'SPM-3756', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Chartered Accountant Tutor', mode: 'Physical & Online' },
        { name: 'Sejarah (KBAT Focused)', code: 'SPM-1249', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Sejarah Master Tutor', mode: 'Physical & Online' },
      ],
      features: [
        'Comprehensive coverage of Form 4 & Form 5 KSSM syllabus',
        'Step-by-step scoring strategies for Paper 1, Paper 2 & Paper 3',
        'Exclusive Pusat Tuisyen Bestari Didik Modular Revision Booklets',
        'Regular 3-Month Assessment Tests with detailed diagnostic reports',
        'Past SPM Trial papers from SBP, MRSM and Top State schools',
      ],
    },
    {
      id: 'pt3',
      tabName: t.syllabus.pt3Tab,
      heading: t.syllabus.pt3Heading,
      sub: t.syllabus.pt3Sub,
      badge: 'Core Foundation',
      badgeColor: '#1E3A8A',
      subjects: [
        { name: 'Mathematics (Matematik)', code: 'KSSM-M01', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Math Specialist', mode: 'Physical & Online' },
        { name: 'Science (Sains)', code: 'KSSM-S01', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Science Specialist', mode: 'Physical & Online' },
        { name: 'Bahasa Melayu (Tatabahasa & Karangan)', code: 'KSSM-BM01', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'BM Master Tutor', mode: 'Physical & Online' },
        { name: 'English (Grammar, Writing & Speaking)', code: 'KSSM-EN01', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'English Specialist', mode: 'Physical & Online' },
        { name: 'Sejarah & Geografi', code: 'KSSM-SG01', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Humanities Specialist', mode: 'Physical & Online' },
      ],
      features: [
        'Focus on strong foundation building and conceptual clarity',
        'Ujian Akhir Sesi Akademik (UASA) format mastery',
        'Active learning techniques to stimulate intellectual interest',
        'Strictly capped at max 12 students for focused tutoring',
      ],
    },
    {
      id: 'primary',
      tabName: t.syllabus.primaryTab,
      heading: t.syllabus.primaryHeading,
      sub: t.syllabus.primarySub,
      badge: 'Early Years',
      badgeColor: '#16A34A',
      subjects: [
        { name: 'Bahasa Melayu (Pemahaman & Penulisan)', code: 'KSSR-BM', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Primary Specialist', mode: 'Physical & Online' },
        { name: 'English Language (CEFR Primary)', code: 'KSSR-ENG', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Primary Specialist', mode: 'Physical & Online' },
        { name: 'Mathematics (Matematik)', code: 'KSSR-MATH', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Primary Specialist', mode: 'Physical & Online' },
        { name: 'Science (Sains)', code: 'KSSR-SCI', hours: `1.5 ${t.syllabus.hoursPerWeek}`, teacher: 'Primary Specialist', mode: 'Physical & Online' },
      ],
      features: [
        'Fun, engaging and interactive 21st-century learning environment',
        'Simplified modular learning method tailored for young minds',
        'Continuous homework coaching and quarterly progress tracking',
        'Builds high confidence in classroom participation and exams',
      ],
    },
    {
      id: 'private',
      tabName: t.syllabus.privateTab,
      heading: t.syllabus.privateHeading,
      sub: t.syllabus.privateSub,
      badge: 'Tailored',
      badgeColor: '#0EA5E9',
      subjects: [
        { name: 'IGCSE Cambridge Mathematics / Add Maths', code: '0580 / 0606', hours: 'Customized', teacher: 'International Syllabus Expert', mode: 'Physical / Online' },
        { name: 'IGCSE Physics / Chemistry / Biology', code: '0625 / 0620 / 0610', hours: 'Customized', teacher: 'International Syllabus Expert', mode: 'Physical / Online' },
        { name: 'Private 1-on-1 Remedial & Intensive Coaching', code: 'PRIV-CUSTOM', hours: 'Flexible', teacher: 'Dedicated Senior Tutor', mode: 'Physical / Online' },
      ],
      features: [
        '100% customized syllabus timeline and focus areas',
        'Choose your preferred schedule (Weekdays or Weekends)',
        'Direct one-to-one tutor attention and immediate doubt clearing',
      ],
    },
  ]

  const currentLevel = academicLevels.find(l => l.id === activeTab) || academicLevels[0]

  const filteredSubjects = currentLevel.subjects.filter(sub => {
    if (filterMode === 'all') return true
    if (filterMode === 'physical') return sub.mode.toLowerCase().includes('physical')
    if (filterMode === 'online') return sub.mode.toLowerCase().includes('online')
    return true
  })

  return (
    <section id="syllabus" style={{ padding: '96px 0', background: '#FFFFFF', borderTop: '1px solid #E7E5E4' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 44 }}
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
              {t.syllabus.tag}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ maxWidth: 680 }}>
              <h2 style={{
                fontFamily: 'Raleway, Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
                color: '#1E3A8A',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                {t.syllabus.title}
              </h2>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15.5, color: '#4B5563', marginTop: 10, lineHeight: 1.7 }}>
                {t.syllabus.sub}
              </p>
            </div>
            {/* MOE Compliance Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              background: '#FAFAF9',
              border: '1px solid #E7E5E4',
              borderRadius: 10,
              boxShadow: '0 2px 8px rgba(10,25,47,0.03)',
            }}>
              <Award size={20} color="#0EA5E9" />
              <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, fontWeight: 700, color: '#1E3A8A' }}>
                {t.syllabus.moeCompliance}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Academic Level Tabs */}
        <div
          className="no-scrollbar syllabus-tabs-container"
          style={{
            display: 'flex',
            gap: 8,
            borderBottom: '2px solid #E7E5E4',
            marginBottom: 28,
            overflowX: 'auto',
            paddingBottom: 2,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {academicLevels.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 20px',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: activeTab === tab.id ? 700 : 600,
                fontSize: 14,
                color: activeTab === tab.id ? '#1E3A8A' : '#6B7280',
                borderBottom: activeTab === tab.id ? '3px solid #0EA5E9' : '3px solid transparent',
                marginBottom: -2,
                cursor: 'pointer',
                background: activeTab === tab.id ? '#FEF3C7' : 'transparent',
                borderRadius: '8px 8px 0 0',
                transition: 'all 0.18s',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0,
                minHeight: 48,
              }}
            >
              {tab.tabName}
              <span style={{
                padding: '2px 8px',
                borderRadius: 10,
                fontSize: 11,
                fontWeight: 700,
                background: activeTab === tab.id ? '#1E3A8A' : '#F3F4F6',
                color: activeTab === tab.id ? '#FFFFFF' : '#6B7280',
              }}>
                {tab.subjects.length} Subjects
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* Level Overview Banner */}
            <div style={{
              background: '#FAFAF9',
              borderRadius: 14,
              border: '1px solid #E7E5E4',
              padding: '30px',
              marginBottom: 30,
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: 26,
            }} className="matrix-banner-grid">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: '1.4rem', color: '#1E3A8A' }}>
                    {currentLevel.heading}
                  </h3>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 4,
                    background: '#FEF3C7',
                    color: '#0284C7',
                    border: '1px solid #E0F2FE',
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: 'Roboto, sans-serif',
                    textTransform: 'uppercase',
                  }}>
                    {currentLevel.badge}
                  </span>
                </div>
                <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 14.5, color: '#4B5563', lineHeight: 1.7, marginBottom: 18 }}>
                  {currentLevel.sub}
                </p>

                {/* Key Features List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                  {currentLevel.features.map(feat => (
                    <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <CheckCircle size={16} color="#0EA5E9" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, color: '#374151' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quarterly Diagnostic Report Card Preview */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: '1px solid #E7E5E4',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(10,25,47,0.05)',
                gap: 14,
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 800, color: '#0EA5E9', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Diagnostic Progress Report
                    </span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: '#15803D', background: '#DCFCE7', padding: '2px 6px', borderRadius: 4 }}>
                      Quarterly Active
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={18} color="#0EA5E9" />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 13, color: '#1E3A8A' }}>Class Size: Max 12</div>
                      <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11.5, color: '#6B7280' }}>Individual Tutor Attention</div>
                    </div>
                  </div>

                  {/* Progress Bar Simulation */}
                  <div style={{ background: '#F9FAFB', padding: '10px', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>
                      <span>Average Score Jump</span>
                      <span style={{ color: '#0EA5E9', fontWeight: 800 }}>+2.4 Grades in 90 Days</span>
                    </div>
                    <div style={{ height: 6, background: '#E5E7EB', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>

                <a
                  href="#contact"
                  style={{
                    padding: '11px',
                    borderRadius: 8,
                    background: '#1E3A8A',
                    color: '#FFFFFF',
                    border: '1px solid rgba(14, 165, 233,0.3)',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 700,
                    fontSize: 13,
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(10,25,47,0.15)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#1E40AF'
                    e.currentTarget.style.borderColor = '#0EA5E9'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#1E3A8A'
                    e.currentTarget.style.borderColor = 'rgba(14, 165, 233,0.3)'
                  }}
                >
                  Enroll in {currentLevel.tabName}
                </a>
              </div>
            </div>

            {/* Filter Mode Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 700, fontSize: 16, color: '#1E3A8A' }}>
                {t.syllabus.subjectsOffered} ({filteredSubjects.length})
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { label: t.syllabus.allModes, val: 'all' },
                  { label: t.syllabus.physicalClasses, val: 'physical' },
                  { label: t.syllabus.liveOnline, val: 'online' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setFilterMode(opt.val)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 12.5,
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 600,
                      background: filterMode === opt.val ? '#1E3A8A' : '#F3F4F6',
                      color: filterMode === opt.val ? '#FFFFFF' : '#4B5563',
                      border: filterMode === opt.val ? '1px solid #0EA5E9' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subjects Table / Grid */}
            <div
              className="syllabus-subjects-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 16,
              }}
            >
              {filteredSubjects.map(subject => (
                <div
                  key={subject.name}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 12,
                    border: '1px solid #E7E5E4',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 14,
                    boxShadow: '0 1px 3px rgba(10,25,47,0.02)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#0EA5E9'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,25,47,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#E7E5E4'
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(10,25,47,0.02)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 700, color: '#0284C7', background: '#FEF3C7', padding: '2px 8px', borderRadius: 4, border: '1px solid #E0F2FE' }}>
                        {subject.code}
                      </span>
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} color="#0EA5E9" /> {subject.hours}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 700, fontSize: 15, color: '#1E3A8A', marginBottom: 6 }}>
                      {subject.name}
                    </h4>

                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, color: '#6B7280' }}>
                      🎓 {subject.teacher}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: 12 }}>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, fontWeight: 600, color: '#15803D', background: '#DCFCE7', padding: '2px 8px', borderRadius: 4 }}>
                      ✓ {subject.mode}
                    </span>
                    <a
                      href="#contact"
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 700,
                        fontSize: 13,
                        color: '#0EA5E9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        transition: 'gap 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.gap = '8px'}
                      onMouseLeave={e => e.currentTarget.style.gap = '4px'}
                    >
                      {t.syllabus.inquireFee} <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #syllabus {
            padding: 56px 0 !important;
          }
          .matrix-banner-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .syllabus-subjects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
