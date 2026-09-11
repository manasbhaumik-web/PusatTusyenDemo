import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function FAQ() {
  const { lang, t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(0)

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  const faqsEN = [
    {
      q: 'What is the maximum number of students per class?',
      a: 'We strictly limit our physical classes to a maximum of 12 students at a time. This ensures every student receives individualized guidance, attention from the tutor, and ample opportunity to ask questions without feeling overwhelmed.',
      tag: 'Class Size',
    },
    {
      q: 'Which syllabus does Pusat Tuisyen Bestari Didik follow?',
      a: 'Our curriculum is 100% aligned with the latest Ministry of Education Malaysia (MOE / KPM) standards — covering KSSR Semakan for Primary School and KSSM for Secondary School (Form 1 to Form 5 SPM). We also offer customized tutoring for Cambridge IGCSE syllabuses.',
      tag: 'Syllabus',
    },
    {
      q: 'How do parents receive feedback on student academic progress?',
      a: 'We conduct diagnostic Assessment Tests every 3 months. A detailed performance report analyzing your child’s mastery in each modular topic is provided to parents, highlighting strengths and targeted areas for improvement.',
      tag: 'Reports',
    },
    {
      q: 'Can students switch between Physical and Online classes?',
      a: 'Yes! Our modular curriculum is harmonized across both Physical and Live Online classes. If a student is unwell or unable to travel to the center, they can attend the live interactive online session or access recorded materials.',
      tag: 'Flexibility',
    },
    {
      q: 'Are trial classes or diagnostic consultations available?',
      a: 'Yes, we welcome parents and prospective students to schedule an academic consultation and diagnostic assessment test before enrollment. This helps us place your child in the most suitable level.',
      tag: 'Enrollment',
    },
    {
      q: 'How are the tuition fees structured?',
      a: 'We believe in "Everyone Can Tuition" — providing high quality education at accessible and competitive fees. We offer modular subject packages as well as multi-subject bundle discounts. Contact our team via WhatsApp for the latest fee schedule.',
      tag: 'Fees',
    },
  ]

  const faqsBM = [
    {
      q: 'Berapakah bilangan maksimum pelajar bagi setiap kelas?',
      a: 'Kami mengehadkan kelas bersemuka kepada maksimum 12 pelajar sahaja pada satu-satu masa. Ini memastikan setiap pelajar menerima bimbingan individu, perhatian tutor, dan peluang mencukupi untuk bertanya soalan.',
      tag: 'Saiz Kelas',
    },
    {
      q: 'Sukatan pelajaran manakah yang diguna pakai oleh Pusat Tuisyen Bestari Didik?',
      a: 'Kurikulum kami 100% selaras dengan piawaian terkini Kementerian Pendidikan Malaysia (KPM) — merangkumi KSSR Semakan (Sekolah Rendah) dan KSSM (Tingkatan 1 hingga Tingkatan 5 SPM). Kami juga menawarkan bimbingan IGCSE Cambridge.',
      tag: 'Sukatan',
    },
    {
      q: 'Bagaimanakah ibu bapa menerima maklum balas perkembangan akademik pelajar?',
      a: 'Kami menjalankan Ujian Penilaian Diagnostik setiap 3 bulan. Laporan prestasi terperinci yang menganalisis penguasaan topik modular anak anda diserahkan kepada ibu bapa secara berkala.',
      tag: 'Laporan',
    },
    {
      q: 'Bolehkah pelajar bertukar antara kelas Fizikal dan Dalam Talian?',
      a: 'Boleh! Kurikulum modular kami diselaraskan antara kelas Fizikal dan Online Live. Sekiranya pelajar tidak sihat, mereka boleh menyertai sesi Zoom langsung atau menonton rakaman video kelas.',
      tag: 'Fleksibiliti',
    },
    {
      q: 'Adakah sesi konsultasi atau ujian diagnostik disediakan?',
      a: 'Ya, kami mengalu-alukan ibu bapa dan pelajar untuk menjadualkan konsultasi akademik dan ujian penilaian diagnostik percuma sebelum pendaftaran rasmi.',
      tag: 'Pendaftaran',
    },
    {
      q: 'Bagaimanakah struktur yuran tuisyen ditetapkan?',
      a: 'Kami berpegang kepada prinsip "Semua Mampu Tuisyen" — pendidikan berkualiti tinggi pada kadar yuran berpatutan. Kami menawarkan yuran modular serta diskaun pakej pelbagai subjek.',
      tag: 'Yuran',
    },
  ]

  const faqs = lang === 'bm' ? faqsBM : faqsEN

  return (
    <section id="faq" style={{ padding: '96px 0', background: '#FAFAF9', borderTop: '1px solid #E7E5E4' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 100, color: '#B45309', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <HelpCircle size={14} color="#D97706" /> {t.faq.tag}
          </div>
          <h2 style={{
            fontFamily: 'Merriweather, Georgia, serif',
            fontWeight: 900,
            fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
            color: '#0A192F',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            {t.faq.title}
          </h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15.5, color: '#4B5563', marginTop: 10, maxWidth: 540, margin: '10px auto 0', lineHeight: 1.7 }}>
            {t.faq.sub}
          </p>
        </motion.div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                style={{
                  borderRadius: 12,
                  border: `1.5px solid ${isOpen ? '#D97706' : '#E7E5E4'}`,
                  background: isOpen ? '#FFFFFF' : '#FFFFFF',
                  boxShadow: isOpen ? '0 8px 24px rgba(10,25,47,0.06)' : '0 2px 6px rgba(10,25,47,0.02)',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    gap: 16,
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontFamily: 'Merriweather, Georgia, serif', fontWeight: 700, fontSize: 16, color: isOpen ? '#0A192F' : '#1F2937' }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: isOpen ? '#0A192F' : '#F3F4F6',
                    color: isOpen ? '#F59E0B' : '#6B7280',
                    border: isOpen ? '1px solid #D97706' : '1px solid transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.2s',
                  }}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 24px 22px', borderTop: '1px solid #F3F4F6' }}>
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14.5, color: '#4B5563', lineHeight: 1.75, paddingTop: 12 }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Help CTA Box */}
        <div style={{
          marginTop: 48,
          background: 'linear-gradient(135deg, #0A192F 0%, #112240 100%)',
          borderRadius: 14,
          border: '1px solid rgba(217,119,6,0.35)',
          padding: '28px 32px',
          boxShadow: '0 12px 36px rgba(10,25,47,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <h4 style={{ fontFamily: 'Merriweather, Georgia, serif', fontWeight: 800, fontSize: 16, color: '#FFFFFF', marginBottom: 4 }}>
              Have a specific question not answered here?
            </h4>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13.5, color: '#CBD5E1', margin: 0 }}>
              Our administration team is available Monday – Friday (7:30 AM – 7:00 PM) to assist you.
            </p>
          </div>
          <a
            href="https://wa.me/60125125792?text=Hello%2C%20I%20have%20an%20inquiry%20regarding%20Pusat%20Tuisyen%20Bestari%20Didik%20classes."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #D97706, #B45309)',
              color: '#FFFFFF',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: 13.5,
              boxShadow: '0 4px 14px rgba(217,119,6,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(217,119,6,0.5)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(217,119,6,0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <MessageCircle size={17} /> WhatsApp Us Directly
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #faq {
            padding: 56px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
