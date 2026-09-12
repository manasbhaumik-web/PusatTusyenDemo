import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Award, TrendingUp, Quote, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const achievers = [
  {
    name: 'Muhammad Farhan',
    level: 'SPM Candidate',
    school: 'SMK Bandar Utama',
    result: '9A+ (Straight A+)',
    highlight: 'Scored A+ in Add Maths, Physics & Chemistry',
    quote: 'The modular method at Bestari Didik made Add Maths concepts crystal clear. The 3-month assessment tests kept me on track!',
  },
  {
    name: 'Tan Jia Wei',
    level: 'SPM Candidate',
    school: 'SMK Seri Kembangan',
    result: 'From Grade D ➔ Grade A in SPM Physics',
    highlight: 'Huge improvement within 6 months of coaching',
    quote: 'With only 12 students in the physical class, the teacher gave direct attention to my weaknesses in Paper 2 calculation questions.',
  },
  {
    name: 'Divya Nair',
    level: 'Form 3 (UASA)',
    school: 'SMK Subang Jaya',
    result: 'Top Scorer in Science & Maths',
    highlight: 'Consistent Band 6 achiever',
    quote: 'The teachers are friendly, highly encouraging and explain difficult science concepts using simple real-world examples.',
  },
]

const parentReviews = [
  {
    parentName: 'Puan Siti Norhaliza',
    relationship: 'Mother of 2 Students (Form 2 & Form 5)',
    rating: 5,
    date: 'Verified Parent Review',
    comment: 'Pusat Tuisyen Bestari Didik has been our family’s choice for 4 years. The regular quarterly diagnostic report gives us complete transparency on our children’s progress.',
  },
  {
    parentName: 'Mr. David Wong',
    relationship: 'Father of SPM Student',
    rating: 5,
    date: 'Verified Parent Review',
    comment: 'Affordable fees without any compromise on teaching quality. The online classes during exam season were very well organised with full recording access.',
  },
  {
    parentName: 'Mrs. K. Sarojini',
    relationship: 'Mother of Primary 5 Student',
    rating: 5,
    date: 'Verified Parent Review',
    comment: 'My daughter used to struggle with Bahasa Melayu karangan. After 6 months in Bestari Didik, her vocabulary and essay structure have improved tremendously!',
  },
]

export default function Testimonials() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [activeReviewIdx, setActiveReviewIdx] = useState(0)

  const nextReview = () => setActiveReviewIdx(i => (i + 1) % parentReviews.length)
  const prevReview = () => setActiveReviewIdx(i => (i - 1 + parentReviews.length) % parentReviews.length)

  return (
    <section id="testimonials" style={{ padding: '96px 0', background: '#FAFAF9', borderTop: '1px solid #E7E5E4' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
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
              {t.testimonials.tag}
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
            {t.testimonials.title}
          </h2>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15.5, color: '#4B5563', marginTop: 10, maxWidth: 600, lineHeight: 1.7 }}>
            {t.testimonials.sub}
          </p>
        </motion.div>

        {/* Student Achievers Grid */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: 19, color: '#1E3A8A', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Award size={22} color="#0EA5E9" /> Top Student Success Stories
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {achievers.map((achiever, i) => (
              <motion.div
                key={achiever.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(10,25,47,0.08)' }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: '1px solid #E7E5E4',
                  padding: '26px',
                  boxShadow: '0 2px 8px rgba(10,25,47,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0EA5E9'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E7E5E4'}
              >
                <div>
                  {/* Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 4,
                      background: '#FEF3C7',
                      color: '#0284C7',
                      border: '1px solid #E0F2FE',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 700,
                      fontSize: 11.5,
                    }}>
                      {achiever.level}
                    </span>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#6B7280', fontWeight: 500 }}>
                      {achiever.school}
                    </span>
                  </div>

                  {/* Result Banner */}
                  <div style={{
                    background: '#1E3A8A',
                    border: '1px solid rgba(14, 165, 233,0.3)',
                    borderRadius: 8,
                    padding: '12px 14px',
                    color: '#FFFFFF',
                    marginBottom: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                    <TrendingUp size={20} color="#38BDF8" style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: 14, color: '#FFFFFF' }}>{achiever.result}</div>
                      <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11.5, color: '#CBD5E1' }}>{achiever.highlight}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13.5, color: '#4B5563', lineHeight: 1.65, fontStyle: 'italic' }}>
                    "{achiever.quote}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1E3A8A', border: '1.5px solid #0EA5E9', color: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, fontFamily: 'Raleway, Georgia, serif' }}>
                    {achiever.name[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 700, fontSize: 14, color: '#1E3A8A' }}>{achiever.name}</div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11.5, color: '#6B7280' }}>Verified Bestari Didik Achiever</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Parent Testimonial Spotlight */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
          border: '1px solid rgba(14, 165, 233,0.35)',
          borderRadius: 16,
          padding: '40px 36px',
          color: '#FFFFFF',
          boxShadow: '0 12px 36px rgba(10,25,47,0.2)',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 32,
          alignItems: 'center',
        }} className="parent-review-grid">
          
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(14, 165, 233,0.2)', border: '1px solid #0EA5E9', color: '#E0F2FE', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, fontFamily: 'Roboto, sans-serif', marginBottom: 12, letterSpacing: '0.04em' }}>
              <CheckCircle size={13} color="#38BDF8" /> 100% VERIFIED REVIEWS
            </div>
            <h3 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: '1.55rem', lineHeight: 1.25, marginBottom: 8, color: '#FFFFFF' }}>
              What Parents Say About Us
            </h3>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13.5, color: '#CBD5E1', lineHeight: 1.6 }}>
              Over 13 years of partnering with Malaysian families to cultivate lifelong confidence and academic excellence.
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button
                onClick={prevReview}
                aria-label="Previous review"
                style={{
                  width: 38, height: 38, borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(14, 165, 233,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next review"
                style={{
                  width: 38, height: 38, borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(14, 165, 233,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Current Review Card */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: '28px',
          }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#38BDF8" color="#38BDF8" />
              ))}
            </div>

            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15.5, lineHeight: 1.7, color: '#F8FAFC', marginBottom: 20, fontStyle: 'italic' }}>
              "{parentReviews[activeReviewIdx].comment}"
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
              <div>
                <div style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>
                  {parentReviews[activeReviewIdx].parentName}
                </div>
                <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12.5, color: '#E0F2FE' }}>
                  {parentReviews[activeReviewIdx].relationship}
                </div>
              </div>
              <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11.5, color: 'rgba(255,255,255,0.5)' }}>
                {parentReviews[activeReviewIdx].date}
              </span>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .parent-review-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          #testimonials {
            padding: 56px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
