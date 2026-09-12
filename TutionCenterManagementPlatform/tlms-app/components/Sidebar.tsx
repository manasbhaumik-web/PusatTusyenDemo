'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/dashboard',  label: 'Dashboard',      icon: DashIcon },
  { href: '/students',   label: 'Student Mgmt',   icon: StudentsIcon },
  { href: '/timetable',  label: 'Classes & Schedule', icon: CalIcon },
  { href: '/billing',    label: 'Fee Management', icon: FeeIcon },
  { href: '/attendance', label: 'Attendance',     icon: AttendIcon },
  { href: '/tutors',     label: 'Staff & Tutors', icon: StaffIcon },
  { href: '/analytics',  label: 'Academic Reports', icon: ReportIcon },
  { href: '/settings',   label: 'Settings',       icon: SettingsIcon },
]

// SVG icon components — professional outline style
function DashIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
}
function StudentsIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function CalIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5"/><line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5"/><line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5"/></svg>
}
function FeeIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
}
function AttendIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
}
function StaffIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function ReportIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
}
function SettingsIcon({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#94A3B8'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside style={{
      width: 'var(--sidebar-width)', minHeight: '100vh', flexShrink: 0,
      background: 'var(--sidebar-bg)',
      display: 'flex', flexDirection: 'column',
      borderRight: 'none',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 13, color: '#F1F5F9', lineHeight: 1.2 }}>Academix Pro</div>
            <div style={{ fontSize: 10, color: 'var(--sidebar-muted)', fontWeight: 500 }}>Centre Management</div>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding: '16px 20px 6px' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sidebar-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Main Menu</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {nav.map(item => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 8,
              background: isActive ? 'var(--sidebar-active)' : 'transparent',
              color: isActive ? '#fff' : 'var(--sidebar-text)',
              fontWeight: isActive ? 600 : 400,
              fontSize: 13, textDecoration: 'none',
              transition: 'background 150ms, color 150ms',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--sidebar-hover)' }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon active={isActive} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--sidebar-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #0D9488, #0891B2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>SA</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#F1F5F9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Sarah Admin</div>
            <div style={{ fontSize: 10, color: 'var(--sidebar-muted)' }}>Centre Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
