'use client'
import { useState } from 'react'

export default function Header({ title }: { title?: string }) {
  const [branch, setBranch] = useState('Subang Jaya SS15')
  const [showCmd, setShowCmd] = useState(false)

  return (
    <>
      <header style={{
        height: 56, background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 16, flexShrink: 0,
      }}>
        {/* Branch switcher */}
        <select
          value={branch}
          onChange={e => setBranch(e.target.value)}
          style={{
            padding: '5px 10px', borderRadius: 7, border: '1px solid var(--border)',
            background: 'var(--surface-muted)', color: 'var(--foreground)',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}
        >
          <option>Subang Jaya SS15</option>
          <option>Petaling Jaya SS2</option>
          <option>Cheras Taman Mulia</option>
          <option>All Branches (Aggregate)</option>
        </select>

        <div style={{ flex: 1 }} />

        {/* Search bar */}
        <button
          onClick={() => setShowCmd(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--surface-muted)',
            color: 'var(--foreground-muted)', fontSize: 13,
            cursor: 'pointer', minWidth: 220,
          }}
        >
          <span>🔍</span>
          <span style={{ flex: 1, textAlign: 'left' }}>Search students, invoices…</span>
          <kbd style={{
            fontSize: 10, fontFamily: 'var(--font-mono)',
            background: 'var(--border)', borderRadius: 4,
            padding: '2px 6px', color: 'var(--foreground-muted)',
          }}>⌘K</kbd>
        </button>

        {/* Notifications */}
        <button style={{
          position: 'relative', width: 36, height: 36, borderRadius: 8,
          border: '1px solid var(--border)', background: 'var(--surface-muted)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>
          🔔
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, borderRadius: 4,
            background: 'var(--destructive)',
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          fontFamily: 'var(--font-display)',
        }}>A</div>
      </header>

      {/* Command palette overlay */}
      {showCmd && (
        <div
          onClick={() => setShowCmd(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(9,13,22,0.6)',
            zIndex: 1000, display: 'flex', alignItems: 'flex-start',
            justifyContent: 'center', paddingTop: 120,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 560, background: 'var(--surface)', borderRadius: 14,
              boxShadow: 'var(--shadow-modal)', overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border)', gap: 10 }}>
              <span>🔍</span>
              <input
                autoFocus
                placeholder="Search students, invoices, classes…"
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  background: 'transparent', fontFamily: 'var(--font-sans)',
                  fontSize: 15, color: 'var(--foreground)',
                }}
              />
              <kbd style={{ fontSize: 11, fontFamily: 'var(--font-mono)', background: 'var(--surface-muted)', borderRadius: 5, padding: '3px 7px', color: 'var(--foreground-muted)' }}>ESC</kbd>
            </div>
            {[
              { icon: '👥', label: 'Ahmad Zikri bin Razali', sub: 'Student · Form 5 · Active' },
              { icon: '💳', label: 'INV-2026-0902 — RM350.00 Unpaid', sub: 'Invoice · Sarah Lee · Due 15 Sep' },
              { icon: '📅', label: 'SPM Additional Mathematics — Room 1', sub: 'Schedule · Mon/Wed/Fri 09:00–10:30' },
              { icon: '👥', label: 'Danial Hakim bin Yusof', sub: 'Student · Form 4 · Trial' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 18px',
                borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', transition: 'background 100ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-muted)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--foreground-muted)', marginTop: 1 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
