'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard',  icon: '📊', label: 'Dashboard' },
  { href: '/students',   icon: '👥', label: 'Students' },
  { href: '/timetable',  icon: '📅', label: 'Timetable' },
  { href: '/billing',    icon: '💳', label: 'Invoicing' },
  { href: '/attendance', icon: '✅', label: 'Attendance' },
  { href: '/tutors',     icon: '👨‍🏫', label: 'Tutors' },
  { href: '/analytics',  icon: '📈', label: 'Analytics' },
  { href: '/settings',   icon: '⚙️',  label: 'Settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 200ms ease',
      flexShrink: 0,
      boxShadow: '1px 0 0 0 var(--border)',
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '20px 16px' : '20px 20px', borderBottom: '1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 14, fontFamily: 'var(--font-display)', flexShrink: 0
        }}>T</div>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.2 }}>Pusat Tusyen</div>
            <div style={{ fontSize: 10, color: 'var(--foreground-muted)', fontWeight: 500 }}>Management Console</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 8px', display:'flex', flexDirection:'column', gap:2 }}>
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: collapsed ? '10px 0' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 8,
              background: isActive ? 'rgba(29,78,216,0.08)' : 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--foreground-muted)',
              fontWeight: isActive ? 600 : 500,
              fontSize: 13,
              textDecoration: 'none',
              transition: 'all 150ms',
              position: 'relative',
            }}>
              {isActive && (
                <div style={{ position:'absolute', left:0, top:'20%', bottom:'20%', width:3, borderRadius: '0 3px 3px 0', background: 'var(--primary)' }} />
              )}
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button onClick={() => setCollapsed(!collapsed)} style={{
        margin: '8px 8px 16px',
        padding: '8px',
        borderRadius: 8,
        border: '1px solid var(--border)',
        background: 'transparent',
        cursor: 'pointer',
        color: 'var(--foreground-muted)',
        fontSize: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        {collapsed ? '→' : '← Collapse'}
      </button>
    </aside>
  )
}
