import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CalendarDays, User } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const posts = [
  {
    img: '/images/news1.png',
    date: { day: '01', month: 'Sep 2021' },
    category: 'Online Learning',
    categoryColor: '#2563EB',
    title: 'What Is the Benefit of Our Online Class?',
    excerpt: 'Discover the many advantages of joining our online class programme — flexible schedules, live interaction, and expert guidance.',
    author: 'Administrator',
  },
  {
    img: '/images/news2.png',
    date: { day: '01', month: 'Sep 2021' },
    category: 'Announcement',
    categoryColor: '#1B3A6B',
    title: 'New Intake: Online Class Now Open',
    excerpt: 'We are pleased to announce that our new intake for online classes is now officially open. Register today to secure your place.',
    author: 'Administrator',
  },
  {
    img: '/images/news3.jpg',
    date: { day: '01', month: 'Sep 2021' },
    category: 'Academic',
    categoryColor: '#16A34A',
    title: 'Our Special Module for Students',
    excerpt: 'Learn about our unique modular learning system designed to help students master each topic progressively and with confidence.',
    author: 'Administrator',
  },
]

export default function News() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="news" style={{ padding: '88px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 4, height: 32, background: '#2563EB', borderRadius: 2 }} />
              <span style={{ fontFamily: 'Merriweather, sans-serif', fontWeight: 600, fontSize: 12, color: '#2563EB', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {t.news.tag}
              </span>
            </div>
            <h2 style={{ fontFamily: 'Merriweather, sans-serif', fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', color: '#0F172A', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {t.news.title}
            </h2>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15.5, color: '#64748B', marginTop: 10, maxWidth: 560, lineHeight: 1.7 }}>
              {t.news.sub}
            </p>
          </div>
          <a
            href="#news"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 7,
              border: '1.5px solid #1B3A6B', color: '#1B3A6B',
              fontFamily: 'Merriweather, sans-serif', fontWeight: 600, fontSize: 13.5,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1B3A6B'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1B3A6B' }}
          >
            View All News <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column',
                transition: 'box-shadow 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.10)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                <img
                  src={post.img}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Category chip */}
                <span style={{
                  position: 'absolute', bottom: 12, left: 12,
                  background: post.categoryColor, color: '#fff',
                  padding: '4px 10px', borderRadius: 4,
                  fontSize: 11, fontWeight: 700, fontFamily: 'Merriweather, sans-serif',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#94A3B8' }}>
                    <CalendarDays size={12} /> {post.date.day} {post.date.month}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#94A3B8' }}>
                    <User size={12} /> {post.author}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Merriweather, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#0F172A', lineHeight: 1.35 }}>
                  {post.title}
                </h3>

                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13.5, color: '#64748B', lineHeight: 1.65, flex: 1 }}>
                  {post.excerpt}
                </p>

                <a
                  href="#news"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    color: post.categoryColor, fontFamily: 'Merriweather, sans-serif',
                    fontWeight: 600, fontSize: 13.5, marginTop: 4,
                    transition: 'gap 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '9px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '5px'}
                >
                  Read more <ArrowRight size={13} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #news {
            padding: 56px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
