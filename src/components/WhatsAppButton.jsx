import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const WhatsAppSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.555 4.1 1.524 5.823L.057 23.882a.5.5 0 0 0 .612.612l6.059-1.467A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.005-1.374l-.358-.214-3.718.9.916-3.718-.234-.371A9.8 9.8 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
)

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="whatsapp-floating-container">

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              background: '#FFFFFF', borderRadius: 14,
              boxShadow: '0 16px 50px rgba(0,0,0,0.16)',
              border: '1px solid #E2E8F0', width: 300, overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ background: '#25D366', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <WhatsAppSvg />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Merriweather, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff' }}>Bestari Didik</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11.5, color: 'rgba(255,255,255,0.82)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#90EE90', display: 'inline-block' }} />
                  Online — typically replies in minutes
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 2, display: 'flex' }} aria-label="Close">
                <X size={17} />
              </button>
            </div>

            {/* Chat bubble */}
            <div style={{ padding: '16px 16px 18px' }}>
              <div style={{ background: '#F0F9FF', borderRadius: '0 10px 10px 10px', padding: '12px 14px', marginBottom: 14, border: '1px solid #BAE6FD' }}>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13.5, color: '#0F172A', lineHeight: 1.6 }}>
                  👋 Hi! Welcome to <strong>Pusat Tuisyen Bestari Didik</strong>.<br />
                  How can we help you? Ask about our classes, fees, or enrollment!
                </p>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10.5, color: '#94A3B8', textAlign: 'right', marginTop: 6 }}>
                  Bestari Didik Team
                </div>
              </div>
              <a
                href="https://wa.me/60125125792?text=Hello%2C%20I%20am%20interested%20in%20your%20tuition%20classes."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '11px',
                  background: '#25D366', color: '#fff', borderRadius: 8,
                  fontFamily: 'Merriweather, sans-serif', fontWeight: 600, fontSize: 14,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1EBE59'}
                onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
              >
                <WhatsAppSvg /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? 'Close chat' : 'Open WhatsApp chat'}
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: '#25D366',
          boxShadow: '0 6px 22px rgba(37,211,102,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer',
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                <X size={22} color="#fff" />
              </motion.div>
            : <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
                <WhatsAppSvg />
              </motion.div>
          }
        </AnimatePresence>
      </motion.button>

      <style>{`
        .whatsapp-floating-container {
          position: fixed;
          bottom: 28px;
          right: 24px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .whatsapp-floating-container {
            bottom: calc(72px + var(--safe-bottom, 0px));
            right: 16px;
          }
        }
      `}</style>
    </div>
  )
}
