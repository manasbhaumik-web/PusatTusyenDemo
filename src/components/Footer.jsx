import { GraduationCap, Mail, Phone, MapPin, ArrowRight, Award, ShieldCheck, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const TwitterXIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="#0F2547" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

export default function Footer() {
  const { t } = useLanguage()

  const footerNavStructure = [
    {
      title: t.nav.aboutUs,
      links: [
        { label: t.nav.aboutBestari, href: '#about' },
        { label: t.nav.ourValues, href: '#about' },
        { label: t.nav.principalMessage, href: '#about' },
        { label: t.nav.ourStaff, href: '#about' },
      ],
    },
    {
      title: t.footer.classes,
      links: [
        { label: t.nav.physicalClass, href: '#classes' },
        { label: t.nav.onlineClass, href: '#classes' },
        { label: t.nav.privateClass, href: '#classes' },
        { label: 'SPM Form 4 & 5', href: '#syllabus' },
        { label: 'Lower Sec Form 1 - 3', href: '#syllabus' },
      ],
    },
    {
      title: t.footer.gallery,
      links: [
        { label: t.nav.testimonial, href: '#testimonials' },
        { label: t.nav.events, href: '#news' },
        { label: t.nav.academicActivities, href: '#news' },
      ],
    },
    {
      title: t.footer.contact,
      links: [
        { label: t.nav.faq, href: '#faq' },
        { label: t.nav.paymentMethod, href: '#contact' },
        { label: t.nav.ourLocation, href: '#contact' },
      ],
    },
  ]

  return (
    <footer style={{ background: '#060D17', color: '#FFFFFF', borderTop: '4px solid #D97706' }}>
      
      {/* Modern Top Pre-Footer Callout */}
      <div style={{ background: '#0A192F', padding: '48px 0', borderBottom: '1px solid rgba(217,119,6,0.2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#FEF3C7', border: '1px solid #FDE68A', color: '#B45309', borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 10 }}>
              <ShieldCheck size={14} color="#D97706" /> {t.footer.awardBadge}
            </div>
            <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontWeight: 900, fontSize: 'clamp(1.4rem, 2.8vw, 1.95rem)', color: '#FFFFFF', lineHeight: 1.25 }}>
              {t.footer.prefooterTitle}
            </h3>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14.5, color: '#CBD5E1', marginTop: 6, maxWidth: 580 }}>
              {t.footer.prefooterSub}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 26px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #D97706, #B45309)',
                color: '#FFFFFF',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 700,
                fontSize: 14.5,
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
              {t.footer.enrollBtn} <ArrowRight size={15} />
            </a>
            <a
              href="https://wa.me/60125125792"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 22px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600,
                fontSize: 14.5,
                transition: 'all 0.2s',
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
              {t.footer.whatsappBtn}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 24px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.2fr 1fr 1.2fr', gap: 32, marginBottom: 52 }} className="footer-columns-grid">
          
          {/* Brand Column */}
          <div>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, textDecoration: 'none' }}>
              <img
                src="/images/emblem-logo.png"
                alt="Pusat Tuisyen Bestari Didik Emblem Logo"
                style={{ height: 52, width: 52, objectFit: 'contain', display: 'block', flexShrink: 0 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontWeight: 800, fontSize: 16, color: '#FFFFFF', lineHeight: 1.2, display: 'block' }}>
                  Pusat Tuisyen Bestari Didik
                </div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11.5, color: '#F59E0B', fontWeight: 600, marginTop: 3, display: 'block', lineHeight: 1.2 }}>
                  {t.nav.slogan || '"We Guide You to Lead Your Future"'}
                </div>
              </div>
            </a>
            <div style={{
              background: 'rgba(217,119,6,0.1)',
              border: '1px solid rgba(217,119,6,0.25)',
              borderRadius: 6,
              padding: '6px 10px',
              fontSize: '11px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              color: '#FDE68A',
              letterSpacing: '0.04em',
              marginBottom: 16,
              lineHeight: 1.4,
            }}>
              ACADEMIC • DILIGENCE • DISCIPLINE • DEDICATION • DETERMINATION
            </div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 18 }}>
              Registered with Ministry of Education Malaysia. Over 13 years of tuition excellence, structured modular coaching, and maximum 12 students per class.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
                <Phone size={14} color="#F59E0B" /> <span>012-512 5792</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
                <Clock size={14} color="#F59E0B" /> <span>7:30 AM – 7:00 PM (Mon–Fri)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
                <MapPin size={14} color="#F59E0B" /> <span>Selangor, Malaysia</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
                <Mail size={14} color="#F59E0B" /> <span>info@bestarididik.edu.my</span>
              </div>
            </div>
          </div>

          {/* Submenu Columns */}
          {footerNavStructure.map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: 'Merriweather, Georgia, serif',
                fontWeight: 700,
                fontSize: 13.5,
                color: '#FFFFFF',
                marginBottom: 16,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                borderBottom: '2px solid #D97706',
                paddingBottom: 6,
                display: 'inline-block',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.65)',
                        transition: 'color 0.2s, transform 0.15s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#FDE68A'
                        e.currentTarget.style.transform = 'translateX(2px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Copyright & Social Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 26,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12.5, color: 'rgba(255,255,255,0.45)' }}>
              © {new Date().getFullYear()} Pusat Tuisyen Bestari Didik. All rights reserved. Registered with MOE Malaysia.
            </p>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11.5, color: '#FDE68A', marginTop: 5, fontWeight: 500, letterSpacing: '0.01em' }}>
              {t.footer.proposalTag}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { Icon: FacebookIcon, href: '#', label: 'Facebook' },
              { Icon: InstagramIcon, href: '#', label: 'Instagram' },
              { Icon: TwitterXIcon, href: '#', label: 'X' },
              { Icon: YoutubeIcon, href: '#', label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 34, height: 34,
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#D97706'
                  e.currentTarget.style.borderColor = '#D97706'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
          }
          footer {
            padding-bottom: 24px !important;
          }
        }
      `}</style>
    </footer>
  )
}
