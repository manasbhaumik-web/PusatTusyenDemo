'use client'
import { useState } from 'react'

export default function Header({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [showCmd, setShowCmd] = useState(false)

  return (
    <>
      <header style={{
        height: 'var(--header-height)', background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 12, flexShrink: 0,
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        {/* Branch Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px 5px 8px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-canvas)', cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
          <select style={{ border: 'none', background: 'transparent', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', outline: 'none', fontFamily: 'Inter' }}>
            <option>Subang Jaya SS15</option>
            <option>Petaling Jaya SS2</option>
            <option>Cheras Taman Mulia</option>
            <option>— All Branches —</option>
          </select>
        </div>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <button onClick={() => setShowCmd(true)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 12px', borderRadius: 7,
          border: '1px solid var(--border)',
          background: 'var(--bg-canvas)',
          color: 'var(--text-muted)', fontSize: 13,
          cursor: 'pointer', minWidth: 230, fontFamily: 'Inter',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span style={{ flex: 1, textAlign: 'left', fontSize: 12 }}>Search students, invoices…</span>
          <span style={{ fontSize: 10, background: 'var(--border)', borderRadius: 4, padding: '2px 6px', fontFamily: 'DM Mono', color: 'var(--text-muted)' }}>Ctrl+K</span>
        </button>

        {/* Help */}
        <button style={{ width: 32, height: 32, borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-canvas)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/></svg>
        </button>

        {/* Notifications */}
        <button style={{ width: 32, height: 32, borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-canvas)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, borderRadius: '50%', background: 'var(--danger)', border: '1.5px solid var(--bg-surface)' }} />
        </button>

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-canvas)', cursor: 'pointer' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #0D9488, #0891B2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, color: '#fff', fontFamily: 'DM Sans' }}>SA</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Sarah Admin</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </header>

      {/* Command Palette */}
      {showCmd && (
        <div onClick={() => setShowCmd(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 100, backdropFilter: 'blur(3px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 580, background: 'var(--bg-surface)', borderRadius: 12, boxShadow: 'var(--shadow-modal)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--border)', gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input autoFocus placeholder="Search students, invoices, classes, tutors…" style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Inter', fontSize: 14, color: 'var(--text-primary)', background: 'transparent' }} />
              <span style={{ fontSize: 11, background: 'var(--bg-canvas)', border: '1px solid var(--border)', borderRadius: 5, padding: '2px 8px', fontFamily: 'DM Mono', color: 'var(--text-muted)' }}>ESC</span>
            </div>
            <div style={{ padding: '6px 0' }}>
              {[
                { icon: '👤', label: 'Ahmad Zikri bin Razali', sub: 'Student · Form 5 · SPM · Active', tag: 'Student', tagClass: 'badge-info' },
                { icon: '🧾', label: 'INV-2026-0902 — RM 350.00 Unpaid', sub: 'Invoice · Sarah Lee · Due 15 Sep 2026', tag: 'Invoice', tagClass: 'badge-danger' },
                { icon: '📅', label: 'SPM Additional Mathematics — Room 1', sub: 'Mon/Wed/Fri · 09:00–10:30 · Dr. Tan', tag: 'Schedule', tagClass: 'badge-teal' },
                { icon: '👨‍🏫', label: 'Dr. Tan Hock Seng', sub: 'Senior Tutor · Mathematics · Add Maths', tag: 'Tutor', tagClass: 'badge-purple' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 18px', cursor: 'pointer', transition: 'background 100ms' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-canvas)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{item.sub}</div>
                  </div>
                  <span className={`badge ${item.tagClass}`}>{item.tag}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '8px 18px 10px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12 }}>
              {[['Enter', 'Open'], ['↑↓', 'Navigate'], ['ESC', 'Close']].map(([k, v]) => (
                <span key={k} style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 4, alignItems: 'center' }}>
                  <kbd style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', fontFamily: 'DM Mono', fontSize: 10 }}>{k}</kbd> {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
