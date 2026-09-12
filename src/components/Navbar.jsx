import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, MapPin, Award, BookOpen, Users, Calendar, HelpCircle, CreditCard, GraduationCap, CheckCircle2, ArrowRight, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(null)
  const leaveTimerRef = useRef(null)

  const navMenu = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.news, href: '#news', badge: t.nav.latest },
    {
      label: t.nav.aboutUs,
      href: '#about',
      children: [
        { label: t.nav.aboutBestari, href: '#about', icon: Award, desc: t.nav.aboutBestariDesc },
        { label: t.nav.ourValues, href: '#about', icon: CheckCircle2, desc: t.nav.ourValuesDesc },
        { label: t.nav.principalMessage, href: '#about', icon: BookOpen, desc: t.nav.principalMessageDesc },
        { label: t.nav.ourStaff, href: '#about', icon: Users, desc: t.nav.ourStaffDesc },
      ],
    },
    {
      label: t.nav.classes,
      href: '#classes',
      children: [
        { label: t.nav.physicalClass, href: '#classes', icon: Users, desc: t.nav.physicalClassDesc },
        { label: t.nav.onlineClass, href: '#classes', icon: BookOpen, desc: t.nav.onlineClassDesc },
        { label: t.nav.privateClass, href: '#classes', icon: GraduationCap, desc: t.nav.privateClassDesc },
      ],
    },
    {
      label: t.nav.gallery,
      href: '#testimonials',
      children: [
        { label: t.nav.testimonial, href: '#testimonials', icon: Award, desc: t.nav.testimonialDesc },
        { label: t.nav.events, href: '#news', icon: Calendar, desc: t.nav.eventsDesc },
        { label: t.nav.academicActivities, href: '#news', icon: BookOpen, desc: t.nav.academicActivitiesDesc },
      ],
    },
    {
      label: t.nav.contactUs,
      href: '#contact',
      children: [
        { label: t.nav.faq, href: '#faq', icon: HelpCircle, desc: t.nav.faqDesc },
        { label: t.nav.paymentMethod, href: '#contact', icon: CreditCard, desc: t.nav.paymentMethodDesc },
        { label: t.nav.ourLocation, href: '#contact', icon: MapPin, desc: t.nav.ourLocationDesc },
      ],
    },
  ]

  const handleMouseEnter = (label) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [])

  return (
    <>
      {/* Top Announcement & Utility Bar */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1002,
        background: '#1E3A8A',
        height: 38,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        fontSize: '12px',
        color: '#93C5FD',
        fontFamily: 'Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#38BDF8', fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38BDF8', display: 'inline-block', boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)' }} />
              {t.topbar.intake || '2026 Intake Now Open'}
            </span>
            <span className="hidden-mobile-text" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <span className="hidden-mobile-text" style={{ color: '#E2E8F0', fontStyle: 'italic', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
              {t.nav.slogan}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="hidden-mobile-text" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#93C5FD', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
              <Award size={13} color="#38BDF8" /> {t.topbar.moe}
            </span>
            <span className="hidden-mobile-text" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="https://wa.me/60125125792" className="hidden-mobile-text" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#FFFFFF', fontWeight: 600, fontSize: '12px', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              <Phone size={13} color="#38BDF8" /> 012-512 5792
            </a>
            <span className="hidden-mobile-text" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            
            {/* Bilingual Switcher Toggle Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.14)',
              borderRadius: 20,
              padding: '2px',
              border: '1px solid rgba(255,255,255,0.22)',
            }}>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '2px 8px',
                  borderRadius: 14,
                  background: lang === 'en' ? '#1E3A8A' : 'transparent',
                  color: lang === 'en' ? '#FFFFFF' : '#93C5FD',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '11px',
                  transition: 'all 0.15s',
                }}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLang('bm')}
                style={{
                  padding: '2px 8px',
                  borderRadius: 14,
                  background: lang === 'bm' ? '#1E3A8A' : 'transparent',
                  color: lang === 'bm' ? '#FFFFFF' : '#93C5FD',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '11px',
                  transition: 'all 0.15s',
                }}
              >
                🇲🇾 BM
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 38, left: 0, right: 0,
        zIndex: 1000,
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: scrolled ? '0 4px 20px rgba(15,23,42,0.08)' : '0 1px 3px rgba(15,23,42,0.04)',
        transition: 'all 0.25s ease',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 79 }}>
          
          {/* Brand Logo & Slogan Header */}
          <a href="#home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0, textDecoration: 'none', height: '100%' }}>
            <img
              src="/images/emblem-logo.png"
              alt="Pusat Tuisyen Bestari Didik Emblem Logo"
              className="navbar-brand-logo"
              style={{ height: 46, width: 46, objectFit: 'contain', display: 'block', flexShrink: 0, alignSelf: 'center', margin: 0 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
              <span className="navbar-brand-title" style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 800,
                fontSize: '16.5px',
                color: '#1E3A8A',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                display: 'block',
                margin: 0,
                padding: 0,
              }}>
                Pusat Tuisyen Bestari Didik
              </span>
              <span className="navbar-brand-slogan" style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '11px',
                color: '#0EA5E9',
                fontWeight: 700,
                letterSpacing: '0.04em',
                display: 'block',
                lineHeight: 1.2,
                margin: 0,
                padding: 0,
              }}>
                {t.nav.slogan || 'We Guide You to Lead Your Future'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0, height: '100%' }} className="desktop-nav-menu">
            {navMenu.map((item) => (
              <li
                key={item.label}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    padding: '8px 13px',
                    height: 40,
                    boxSizing: 'border-box',
                    borderRadius: 6,
                    color: activeDropdown === item.label ? '#1E3A8A' : '#1E293B',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'Raleway, sans-serif',
                    background: activeDropdown === item.label ? '#F0F9FF' : 'transparent',
                    transition: 'all 0.18s',
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                    verticalAlign: 'middle',
                  }}
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', background: '#DC2626', color: '#fff', borderRadius: 4, textTransform: 'uppercase', lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}>
                      {item.badge}
                    </span>
                  )}
                  {item.children && (
                    <ChevronDown size={13} style={{ transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, display: 'inline-flex' }} />
                  )}
                </a>

                {/* Modern Rich Dropdown Menu */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% - 6px)',
                        left: 0,
                        paddingTop: 6,
                        zIndex: 200,
                      }}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        style={{
                          background: '#FFFFFF',
                          borderRadius: 12,
                          padding: 10,
                          minWidth: 320,
                          boxShadow: '0 16px 40px rgba(15,23,42,0.12)',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        {item.children.map((subItem) => {
                          const IconComponent = subItem.icon || BookOpen
                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setActiveDropdown(null)}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 12,
                                padding: '10px 12px',
                                borderRadius: 8,
                                color: '#1E293B',
                                transition: 'all 0.15s',
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#F8FAFC'
                                e.currentTarget.style.transform = 'translateX(3px)'
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.transform = 'translateX(0)'
                              }}
                            >
                            <div style={{ width: 34, height: 34, borderRadius: 6, background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                              <IconComponent size={17} color="#1E3A8A" />
                            </div>
                            <div>
                              <div style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#0F172A', marginBottom: 2 }}>
                                {subItem.label}
                              </div>
                              <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>
                                {subItem.desc}
                              </div>
                            </div>
                          </a>
                        )
                      })}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%' }}>
            <a
              href="#contact"
              className="desktop-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '0 20px',
                height: 42,
                boxSizing: 'border-box',
                borderRadius: 7,
                background: '#1E3A8A',
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'Raleway, sans-serif',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                boxShadow: '0 2px 8px rgba(10, 25, 47, 0.2)',
                transition: 'background 0.2s, transform 0.15s, border-color 0.2s',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                verticalAlign: 'middle',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1E40AF'
                e.currentTarget.style.borderColor = '#0EA5E9'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#1E3A8A'
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.4)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>{t.nav.enrollBtn}</span> <ArrowRight size={14} style={{ flexShrink: 0, display: 'inline-flex' }} />
            </a>

            {/* Mobile Fast WhatsApp Shortcut */}
            <a
              href="https://wa.me/60125125792"
              className="mobile-quick-wa-btn"
              aria-label="Direct WhatsApp Contact"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 8,
                background: '#DCFCE7',
                color: '#16A34A',
                border: '1px solid #BBF7D0',
                boxSizing: 'border-box',
              }}
            >
              <Phone size={18} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-nav-toggle"
              style={{
                color: '#1B3A6B',
                width: 42,
                height: 42,
                borderRadius: 8,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                boxSizing: 'border-box',
                background: mobileOpen ? '#F0F9FF' : '#F8FAFC',
              }}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileOpen ? <X size={22} color="#1E3A8A" /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Responsive Accordion Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              style={{ overflow: 'hidden', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
            >
              <div style={{ padding: '16px 20px 24px' }}>
                
                {/* Mobile Language Switcher */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid #E2E8F0', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B', fontFamily: 'Roboto, sans-serif' }}>
                    Language / Bahasa:
                  </span>
                  <div style={{ display: 'inline-flex', background: '#F1F5F9', borderRadius: 8, padding: 3, border: '1px solid #E2E8F0' }}>
                    <button
                      onClick={() => setLang('en')}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 6,
                        background: lang === 'en' ? '#1E3A8A' : 'transparent',
                        color: lang === 'en' ? '#FFFFFF' : '#475569',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: 12.5,
                        cursor: 'pointer',
                      }}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => setLang('bm')}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 6,
                        background: lang === 'bm' ? '#1E3A8A' : 'transparent',
                        color: lang === 'bm' ? '#FFFFFF' : '#475569',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: 12.5,
                        cursor: 'pointer',
                      }}
                    >
                      🇲🇾 B. Melayu
                    </button>
                  </div>
                </div>

                {navMenu.map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '13px 4px',
                        borderBottom: '1px solid #F1F5F9',
                        cursor: 'pointer',
                        minHeight: 48,
                      }}
                      onClick={() => item.children && setOpenMobileMenu(openMobileMenu === item.label ? null : item.label)}
                    >
                      <a
                        href={!item.children ? item.href : '#'}
                        onClick={!item.children ? () => setMobileOpen(false) : e => e.preventDefault()}
                        style={{ color: '#0F172A', fontSize: 15.5, fontWeight: 700, fontFamily: 'Raleway, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}
                      >
                        {item.label}
                        {item.badge && (
                          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', background: '#DC2626', color: '#fff', borderRadius: 4, textTransform: 'uppercase' }}>
                            {item.badge}
                          </span>
                        )}
                      </a>
                      {item.children && (
                        <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: openMobileMenu === item.label ? '#F0F9FF' : 'transparent', borderRadius: 6 }}>
                          <ChevronDown size={17} color={openMobileMenu === item.label ? '#1E3A8A' : '#64748B'} style={{ transform: openMobileMenu === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {item.children && openMobileMenu === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden', padding: '6px 8px', background: '#F8FAFC', borderRadius: 8, margin: '6px 0 10px', border: '1px solid #E2E8F0' }}
                        >
                          {item.children.map((child) => {
                            const ChildIcon = child.icon || BookOpen
                            return (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 10,
                                  padding: '11px 10px',
                                  color: '#334155',
                                  fontSize: 14,
                                  fontFamily: 'Roboto, sans-serif',
                                  borderBottom: '1px solid #F1F5F9',
                                  fontWeight: 600,
                                }}
                              >
                                <div style={{ width: 26, height: 26, borderRadius: 6, background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <ChildIcon size={14} color="#1E3A8A" />
                                </div>
                                <span>{child.label}</span>
                              </a>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Direct Action Buttons in Mobile Drawer */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
                  <a
                    href="tel:0125125792"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '12px',
                      borderRadius: 8,
                      background: '#F0F9FF',
                      color: '#1E3A8A',
                      border: '1px solid #BFDBFE',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 700,
                      fontSize: 13.5,
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={15} /> 012-512 5792
                  </a>

                  <a
                    href="https://wa.me/60125125792"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '12px',
                      borderRadius: 8,
                      background: '#DCFCE7',
                      color: '#16A34A',
                      border: '1px solid #BBF7D0',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 700,
                      fontSize: 13.5,
                      textDecoration: 'none',
                    }}
                  >
                    💬 WhatsApp
                  </a>
                </div>

                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    marginTop: 12,
                    padding: '14px',
                    textAlign: 'center',
                    background: '#1B3A6B',
                    color: '#fff',
                    borderRadius: 8,
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 700,
                    fontSize: 15,
                    boxShadow: '0 4px 12px rgba(27,58,107,0.2)',
                  }}
                >
                  {t.nav.enrollBtn}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Pixel-Perfect Topbar + Nav Header Spacer */}
      <div style={{ height: 117 }} />

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav-menu { display: flex !important; }
          .desktop-cta-btn { display: inline-flex !important; }
          .mobile-nav-toggle { display: none !important; }
          .mobile-quick-wa-btn { display: none !important; }
        }
        @media (max-width: 991px) {
          .desktop-nav-menu { display: none !important; }
          .desktop-cta-btn { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
          .mobile-quick-wa-btn { display: inline-flex !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile-text { display: none !important; }
        }
        @media (max-width: 480px) {
          .navbar-brand-logo {
            height: 38px !important;
            width: 38px !important;
          }
          .navbar-brand-title {
            font-size: 14.5px !important;
          }
          .navbar-brand-slogan {
            font-size: 9.5px !important;
          }
        }
      `}</style>
    </>
  )
}
