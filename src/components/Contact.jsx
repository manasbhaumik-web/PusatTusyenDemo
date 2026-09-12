import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, User, Mail, Phone, MessageSquare, Briefcase, GraduationCap, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const allSubjectsList = [
  'Mathematics',
  'Additional Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Bahasa Melayu',
  'English Language',
  'Prinsip Perakaunan',
  'Sejarah',
]

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [formType, setFormType] = useState('student') // 'student' | 'business'
  const [studentSubmitted, setStudentSubmitted] = useState(false)
  const [businessSubmitted, setBusinessSubmitted] = useState(false)

  // Student Form State
  const [studentName, setStudentName] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [academicLevel, setAcademicLevel] = useState('SPM (Form 4 - 5)')
  const [learningMode, setLearningMode] = useState('Physical Classroom')
  const [selectedSubjects, setSelectedSubjects] = useState(['Mathematics'])
  const [studentMessage, setStudentMessage] = useState('')

  const handleSubjectToggle = (subj) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== subj))
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj])
    }
  }

  const handleStudentSubmit = (e) => {
    e.preventDefault()
    setStudentSubmitted(true)
  }

  const handleBusinessSubmit = (e) => {
    e.preventDefault()
    setBusinessSubmitted(true)
  }

  const generateWhatsAppMessage = () => {
    const text = `Hello Pusat Tuisyen Bestari Didik!%0A%0AI would like to enroll / inquire:%0A- *Student/Parent*: ${studentName || 'Parent'}%0A- *Level*: ${academicLevel}%0A- *Learning Mode*: ${learningMode}%0A- *Subjects*: ${selectedSubjects.join(', ')}%0A- *Phone*: ${parentPhone}%0A%0APlease assist with class schedule & fee details.`
    window.open(`https://wa.me/60125125792?text=${text}`, '_blank')
  }

  return (
    <section id="contact" style={{ padding: '96px 0', background: '#FFFFFF', borderTop: '1px solid #E7E5E4' }}>
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
              {t.contact.tag}
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
            {t.contact.title}
          </h2>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15.5, color: '#4B5563', marginTop: 10, maxWidth: 600, lineHeight: 1.7 }}>
            {t.contact.sub}
          </p>
        </motion.div>

        {/* Form Type Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          <button
            onClick={() => setFormType('student')}
            style={{
              padding: '11px 22px',
              borderRadius: 8,
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 13.5,
              cursor: 'pointer',
              border: formType === 'student' ? '1px solid #0EA5E9' : '1px solid #E7E5E4',
              background: formType === 'student' ? '#1E3A8A' : '#FAFAF9',
              color: formType === 'student' ? '#FFFFFF' : '#4B5563',
              boxShadow: formType === 'student' ? '0 4px 14px rgba(10,25,47,0.2)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
          >
            <GraduationCap size={18} color={formType === 'student' ? '#38BDF8' : '#6B7280'} /> Student & Parent Enrollment
          </button>
          <button
            onClick={() => setFormType('business')}
            style={{
              padding: '11px 22px',
              borderRadius: 8,
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 13.5,
              cursor: 'pointer',
              border: formType === 'business' ? '1px solid #0EA5E9' : '1px solid #E7E5E4',
              background: formType === 'business' ? '#1E3A8A' : '#FAFAF9',
              color: formType === 'business' ? '#FFFFFF' : '#4B5563',
              boxShadow: formType === 'business' ? '0 4px 14px rgba(10,25,47,0.2)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
          >
            <Briefcase size={18} color={formType === 'business' ? '#38BDF8' : '#6B7280'} /> Careers & Business Inquiries
          </button>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32 }} className="contact-main-grid">

          {/* Left Form Area */}
          <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E7E5E4', padding: '34px', boxShadow: '0 4px 20px rgba(10,25,47,0.04)' }}>
            
            <AnimatePresence mode="wait">
              {formType === 'student' ? (
                <motion.div
                  key="student"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: 19, color: '#1E3A8A', marginBottom: 20 }}>
                    Student Enrollment & Diagnostic Assessment
                  </h3>

                  {studentSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <CheckCircle size={52} color="#15803D" style={{ margin: '0 auto 16px' }} />
                      <h4 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: 20, color: '#1E3A8A', marginBottom: 8 }}>
                        Inquiry Received!
                      </h4>
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 14.5, color: '#4B5563', maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.7 }}>
                        Thank you for reaching out! Our academic coordinator will contact you via WhatsApp or phone within 24 hours to confirm class availability and schedules.
                      </p>
                      <button
                        onClick={() => setStudentSubmitted(false)}
                        style={{
                          padding: '12px 24px',
                          borderRadius: 8,
                          background: '#1E3A8A',
                          color: '#fff',
                          border: '1px solid rgba(14, 165, 233,0.3)',
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: 'pointer',
                        }}
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleStudentSubmit}>
                      
                      {/* Name & Contact */}
                      <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                            {t.contact.parentName}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <User size={16} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                              type="text"
                              required
                              placeholder={t.contact.parentNamePh}
                              value={studentName}
                              onChange={e => setStudentName(e.target.value)}
                              style={{ width: '100%', height: 44, padding: '0 12px 0 38px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                            {t.contact.phoneLabel}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Phone size={16} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                              type="tel"
                              inputMode="tel"
                              required
                              placeholder={t.contact.phonePh}
                              value={parentPhone}
                              onChange={e => setParentPhone(e.target.value)}
                              style={{ width: '100%', height: 44, padding: '0 12px 0 38px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Level & Mode Selectors */}
                      <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                            {t.contact.levelLabel}
                          </label>
                          <select
                            value={academicLevel}
                            onChange={e => setAcademicLevel(e.target.value)}
                            style={{ width: '100%', height: 44, padding: '0 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
                          >
                            <option value="Primary (Standard 1 - 3)">Primary (Standard 1 - 3)</option>
                            <option value="Primary (Standard 4 - 6 / UPSR)">Primary (Standard 4 - 6 / UPSR)</option>
                            <option value="Lower Sec (Form 1 - 3 / PT3)">Lower Sec (Form 1 - 3 / PT3)</option>
                            <option value="SPM (Form 4 - 5)">SPM (Form 4 - 5)</option>
                            <option value="IGCSE / Cambridge">IGCSE / Cambridge</option>
                            <option value="Private 1-on-1 Customized">Private 1-on-1 Customized</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                            {t.contact.modeLabel}
                          </label>
                          <select
                            value={learningMode}
                            onChange={e => setLearningMode(e.target.value)}
                            style={{ width: '100%', height: 44, padding: '0 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
                          >
                            <option value="Physical Classroom">{t.contact.physicalMode}</option>
                            <option value="Live Interactive Online">{t.contact.onlineMode}</option>
                            <option value="1-on-1 Private Tutoring">{t.contact.privateMode}</option>
                          </select>
                        </div>
                      </div>

                      {/* Subject Checkboxes Multi-select */}
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                          {t.contact.subjectsLabel}
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {allSubjectsList.map(subj => {
                            const isSelected = selectedSubjects.includes(subj)
                            return (
                              <button
                                key={subj}
                                type="button"
                                onClick={() => handleSubjectToggle(subj)}
                                style={{
                                  padding: '7px 14px',
                                  borderRadius: 6,
                                  fontSize: 12.5,
                                  fontFamily: 'Roboto, sans-serif',
                                  fontWeight: isSelected ? 700 : 500,
                                  background: isSelected ? '#FEF3C7' : '#F3F4F6',
                                  color: isSelected ? '#0284C7' : '#4B5563',
                                  border: isSelected ? '1px solid #0EA5E9' : '1px solid #E5E7EB',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s',
                                }}
                              >
                                {isSelected ? '✓ ' : '+ '}{subj}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div style={{ marginBottom: 22 }}>
                        <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                          {t.contact.notesLabel}
                        </label>
                        <textarea
                          placeholder={t.contact.notesPh}
                          value={studentMessage}
                          onChange={e => setStudentMessage(e.target.value)}
                          rows={3}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 13.5, fontFamily: 'Roboto, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* Submit Actions */}
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <button
                          type="submit"
                          style={{
                            flex: 1,
                            padding: '13px 22px',
                            borderRadius: 8,
                            background: '#1E3A8A',
                            color: '#FFFFFF',
                            border: '1px solid rgba(14, 165, 233,0.3)',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 700,
                            fontSize: 14.5,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 14px rgba(10,25,47,0.15)',
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
                          <Send size={16} /> {t.contact.submitBtn}
                        </button>

                        <button
                          type="button"
                          onClick={generateWhatsAppMessage}
                          style={{
                            padding: '13px 22px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                            color: '#FFFFFF',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 700,
                            fontSize: 14.5,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            boxShadow: '0 4px 14px rgba(14, 165, 233,0.3)',
                            transition: 'all 0.2s',
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
                          <MessageCircle size={18} /> {t.contact.whatsappBtn}
                        </button>
                      </div>

                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: 19, color: '#1E3A8A', marginBottom: 20 }}>
                    Careers & Business Opportunities Appointment
                  </h3>

                  {businessSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <CheckCircle size={52} color="#15803D" style={{ margin: '0 auto 16px' }} />
                      <h4 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: 20, color: '#1E3A8A', marginBottom: 8 }}>
                        Message Received!
                      </h4>
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 14.5, color: '#4B5563', maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.7 }}>
                        Thank you for your interest. Our management team will review your message and get back to you shortly.
                      </p>
                      <button
                        onClick={() => setBusinessSubmitted(false)}
                        style={{ padding: '12px 24px', borderRadius: 8, background: '#1E3A8A', color: '#fff', fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBusinessSubmit}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Name *</label>
                          <input type="text" required placeholder="Your name" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address *</label>
                          <input type="email" required placeholder="name@domain.com" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Contact Phone *</label>
                          <input type="tel" required placeholder="012-345 6789" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Subject *</label>
                          <input type="text" required placeholder="e.g. Tutor Application / Partnership" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, fontFamily: 'Roboto, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 22 }}>
                        <label style={{ display: 'block', fontSize: 12.5, fontFamily: 'Roboto, sans-serif', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Message / Proposal *</label>
                        <textarea required rows={5} placeholder="Please describe your background, subject expertise, or business proposal..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 13.5, fontFamily: 'Roboto, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '13px',
                          borderRadius: 8,
                          background: '#1E3A8A',
                          color: '#FFFFFF',
                          border: '1px solid rgba(14, 165, 233,0.3)',
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 700,
                          fontSize: 14.5,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          transition: 'all 0.2s',
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
                        <Send size={16} /> Submit Business Inquiry
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Info Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* Center Info Card */}
            <div style={{ background: '#FAFAF9', borderRadius: 14, border: '1px solid #E7E5E4', padding: '28px' }}>
              <h3 style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 800, fontSize: 17, color: '#1E3A8A', marginBottom: 18 }}>
                Pusat Tuisyen Bestari Didik
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={17} color="#0EA5E9" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Direct Hotline / WhatsApp</div>
                    <a href="https://wa.me/60125125792" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15, fontWeight: 800, color: '#1E3A8A' }}>012-512 5792</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={17} color="#0EA5E9" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Operating Hours</div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13.5, color: '#374151', fontWeight: 600 }}>07:30 AM – 07:00 PM (Mon – Fri)</div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#6B7280' }}>Weekend classes according to schedule</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={17} color="#0EA5E9" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Location</div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13.5, color: '#374151', fontWeight: 600 }}>Selangor, Malaysia</div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#6B7280' }}>Official Registered Center with MOE</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={17} color="#0EA5E9" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Email Address</div>
                    <a href="mailto:info@bestarididik.edu.my" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13.5, color: '#0EA5E9', fontWeight: 600 }}>info@bestarididik.edu.my</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
              border: '1px solid rgba(14, 165, 233,0.35)',
              borderRadius: 14,
              padding: '26px',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(10,25,47,0.15)',
            }}>
              <div style={{ fontFamily: 'Raleway, Georgia, serif', fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#FFFFFF' }}>
                Our Enrollment Guarantees
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  'Strict maximum 12 students in every class',
                  'Registered & compliant with MOE guidelines',
                  'Free initial academic diagnostic assessment',
                  'Transparent and affordable monthly fees',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, fontFamily: 'Roboto, sans-serif', color: '#E2E8F0' }}>
                    <CheckCircle size={15} color="#38BDF8" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          #contact {
            padding: 56px 0 !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
