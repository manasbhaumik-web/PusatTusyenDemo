import { Phone, MessageCircle, BookOpen, MapPin, GraduationCap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function MobileBottomBar() {
  const { t } = useLanguage()

  return (
    <aside aria-label="Mobile Quick Actions" className="mobile-bottom-bar">
      <div className="mobile-bottom-bar-inner">
        {/* Call Hotline */}
        <a
          href="tel:0125125792"
          className="mobile-action-item"
          aria-label="Call Direct Hotline"
        >
          <div className="mobile-action-icon-box call-icon">
            <Phone size={18} />
          </div>
          <span className="mobile-action-label">{t.contact?.callDirect || 'Call'}</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/60125125792?text=Hello%20Pusat%20Tuisyen%20Bestari%20Didik%2C%20I%20would%20like%20to%20inquire%20about%202026%20classes."
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-action-item"
          aria-label="Chat on WhatsApp"
        >
          <div className="mobile-action-icon-box wa-icon">
            <MessageCircle size={18} />
          </div>
          <span className="mobile-action-label">WhatsApp</span>
        </a>

        {/* Subjects & Timetable */}
        <a
          href="#syllabus"
          className="mobile-action-item"
          aria-label="View Subjects and Timetable"
        >
          <div className="mobile-action-icon-box class-icon">
            <BookOpen size={18} />
          </div>
          <span className="mobile-action-label">{t.nav?.classes || 'Classes'}</span>
        </a>

        {/* Location & Map */}
        <a
          href="#contact"
          className="mobile-action-item"
          aria-label="View Center Location"
        >
          <div className="mobile-action-icon-box map-icon">
            <MapPin size={18} />
          </div>
          <span className="mobile-action-label">{t.nav?.ourLocation || 'Location'}</span>
        </a>

        {/* Highlighted Enroll CTA */}
        <a
          href="#contact"
          className="mobile-action-item mobile-enroll-btn"
          aria-label="Enroll in Classes"
        >
          <GraduationCap size={16} />
          <span>{t.nav?.enrollBtn || 'Enroll'}</span>
        </a>
      </div>

      <style>{`
        .mobile-bottom-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid #E2E8F0;
          box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.08);
          padding-bottom: max(6px, env(safe-area-inset-bottom, 0px));
        }

        .mobile-bottom-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 6px 12px;
          max-width: 500px;
          margin: 0 auto;
          gap: 6px;
        }

        .mobile-action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          color: #475569;
          text-decoration: none;
          padding: 4px 6px;
          border-radius: 8px;
          min-width: 56px;
          transition: all 0.15s ease;
          touch-action: manipulation;
        }

        .mobile-action-item:active {
          transform: scale(0.94);
          background: #F1F5F9;
        }

        .mobile-action-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F1F5F9;
          color: #1E293B;
          transition: all 0.15s;
        }

        .mobile-action-icon-box.call-icon {
          background: #F0F9FF;
          color: #1E3A8A;
        }

        .mobile-action-icon-box.wa-icon {
          background: #DCFCE7;
          color: #16A34A;
        }

        .mobile-action-icon-box.class-icon {
          background: #FEF3C7;
          color: #0EA5E9;
        }

        .mobile-action-icon-box.map-icon {
          background: #F1F5F9;
          color: #64748B;
        }

        .mobile-action-label {
          font-family: 'Roboto', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .mobile-enroll-btn {
          flex-direction: row;
          gap: 6px;
          background: #1B3A6B;
          color: #FFFFFF !important;
          padding: 8px 14px;
          border-radius: 20px;
          font-family: 'Raleway', serif;
          font-weight: 700;
          font-size: 12.5px;
          box-shadow: 0 2px 8px rgba(27, 58, 107, 0.25);
        }

        .mobile-enroll-btn:active {
          background: #1E3A8A !important;
          transform: scale(0.96);
        }

        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: block;
          }
        }
      `}</style>
    </aside>
  )
}
