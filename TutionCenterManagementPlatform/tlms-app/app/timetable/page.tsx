'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const SLOTS = [
  { time: '09:00–10:30', rooms: [
    { name: 'SPM Physics (F5)', tutor: 'Dr. Tan Hock Seng', enrolled: 12, cap: 12, curriculum: 'SPM' },
    { name: 'IGCSE Chemistry (Y11)', tutor: 'Sir Robert Harrison', enrolled: 9, cap: 12, curriculum: 'IGCSE' },
    { name: 'Primary Maths (Std 6)', tutor: 'Miss Lim Mei Ling', enrolled: 8, cap: 10, curriculum: 'Primary' },
    { name: 'SPM Add Maths (Online)', tutor: 'Dr. Tan (Zoom)', enrolled: 45, cap: 50, curriculum: 'SPM', virtual: true },
  ]},
  { time: '10:45–12:15', rooms: [
    { name: 'SPM Add Maths (F5)', tutor: 'Dr. Tan Hock Seng', enrolled: 12, cap: 12, curriculum: 'SPM' },
    { name: 'SPM B. Melayu (F5)', tutor: 'Cikgu Nurul Ain', enrolled: 11, cap: 12, curriculum: 'SPM' },
    { name: 'Form 2 Science', tutor: 'Miss Lim Mei Ling', enrolled: 7, cap: 10, curriculum: 'Primary' },
    { name: 'IGCSE Physics (Y10)', tutor: 'Sir Robert Harrison', enrolled: 22, cap: 30, curriculum: 'IGCSE', virtual: true },
  ]},
  { time: '02:00–03:30', rooms: [
    { name: 'IGCSE Maths (Y10)', tutor: 'Dr. Tan Hock Seng', enrolled: 10, cap: 12, curriculum: 'IGCSE' },
    { name: 'SPM Sejarah (F5)', tutor: 'Cikgu Nurul Ain', enrolled: 8, cap: 12, curriculum: 'SPM' },
    { name: 'Primary BM (Std 5)', tutor: 'Miss Lim Mei Ling', enrolled: 6, cap: 10, curriculum: 'Primary' },
    { name: '', tutor: '', enrolled: 0, cap: 30, curriculum: '', virtual: true },
  ]},
  { time: '04:00–05:30', rooms: [
    { name: 'SPM Chemistry (F5)', tutor: 'Sir Robert Harrison', enrolled: 11, cap: 12, curriculum: 'SPM' },
    { name: '', tutor: '', enrolled: 0, cap: 12, curriculum: '' },
    { name: 'Form 1 Maths', tutor: 'Miss Lim Mei Ling', enrolled: 9, cap: 10, curriculum: 'Primary' },
    { name: 'IGCSE Bio (Y11)', tutor: 'Dr. Tan (Zoom)', enrolled: 18, cap: 30, curriculum: 'IGCSE', virtual: true },
  ]},
]

const ROOMS = ['Room 1 (Max 12)', 'Room 2 (Max 12)', 'Room 3 (Max 10)', 'Virtual / Zoom']

const currStyle: Record<string, { bg: string, border: string, text: string }> = {
  SPM:     { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' },
  IGCSE:   { bg: '#F5F3FF', border: '#DDD6FE', text: '#7C3AED' },
  Primary: { bg: '#F0FDF4', border: '#BBF7D0', text: '#059669' },
}

function CapPill({ enrolled, cap }: { enrolled: number, cap: number }) {
  const pct = enrolled / cap
  const color = pct >= 1 ? 'var(--destructive)' : pct >= 0.8 ? 'var(--warning)' : 'var(--success)'
  const bgColor = pct >= 1 ? '#FEE2E2' : pct >= 0.8 ? '#FEF3C7' : '#DCFCE7'
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color, marginBottom: 3 }}>
        {enrolled}/{cap} {pct >= 1 ? '🔒 Full' : pct >= 0.8 ? '⚠ Nearly Full' : 'Available'}
      </div>
      <div style={{ height: 4, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct * 100}%`, background: color, borderRadius: 4, transition: 'width 300ms' }} />
      </div>
    </div>
  )
}

export default function TimetablePage() {
  const [view, setView] = useState('Room View')
  const [showModal, setShowModal] = useState(false)

  return (
    <AppShell title="Timetable">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Timetable Scheduler</h1>
          <p style={{ fontSize: 13, color: 'var(--foreground-muted)', marginTop: 2 }}>Subang Jaya SS15 · Week of 8–12 September 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'var(--surface-muted)', borderRadius: 8, padding: 2, border: '1px solid var(--border)' }}>
            {['Room View','Tutor View','Grade View'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '5px 14px', borderRadius: 6, border: 'none',
                background: view === v ? 'var(--surface)' : 'transparent',
                boxShadow: view === v ? 'var(--shadow-card)' : 'none',
                color: view === v ? 'var(--primary)' : 'var(--foreground-muted)',
                fontWeight: view === v ? 600 : 500, fontSize: 12, cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}>{v}</button>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
            + New Class Slot
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--foreground-muted)', fontWeight: 500 }}>Curriculum:</span>
        {Object.entries(currStyle).map(([k, v]) => (
          <span key={k} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: v.bg, color: v.text, border: `1px solid ${v.border}` }}>{k}</span>
        ))}
      </div>

      {/* Grid */}
      <div style={{ background: 'var(--surface)', borderRadius: 12, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead>
            <tr style={{ background: 'var(--surface-muted)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', width: 130, borderRight: '2px solid var(--border)' }}>Time Slot</th>
              {ROOMS.map(r => (
                <th key={r} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', borderRight: '1px solid var(--border)' }}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, si) => (
              <tr key={si} style={{ borderTop: '1px solid var(--border)', verticalAlign: 'top' }}>
                <td style={{ padding: '14px 16px', borderRight: '2px solid var(--border)', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--foreground)', whiteSpace: 'nowrap' }}>{slot.time}</div>
                </td>
                {slot.rooms.map((room, ri) => (
                  <td key={ri} style={{ padding: 10, borderRight: '1px solid var(--border)', minWidth: 180 }}>
                    {room.name ? (
                      <div style={{
                        background: currStyle[room.curriculum]?.bg || 'var(--surface-muted)',
                        border: `1px solid ${currStyle[room.curriculum]?.border || 'var(--border)'}`,
                        borderRadius: 8, padding: '10px 12px', cursor: 'pointer',
                      }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: currStyle[room.curriculum]?.text || 'var(--foreground)', marginBottom: 2 }}>{room.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--foreground-muted)' }}>{room.tutor}</div>
                        <CapPill enrolled={room.enrolled} cap={room.cap} />
                        {room.virtual && (
                          <div style={{ fontSize: 10, marginTop: 4, color: '#7C3AED', fontWeight: 600 }}>🎥 Zoom Session</div>
                        )}
                      </div>
                    ) : (
                      <div style={{ border: '2px dashed var(--border)', borderRadius: 8, padding: '20px 12px', textAlign: 'center', cursor: 'pointer', color: 'var(--foreground-muted)', fontSize: 11 }}
                        onClick={() => setShowModal(true)}>
                        + Add Class
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Slot Modal */}
      {showModal && (
        <>
          <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(9,13,22,0.5)', zIndex: 100, backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 480, background: 'var(--surface)', borderRadius: 16, boxShadow: 'var(--shadow-modal)', zIndex: 101, padding: 28, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>New Class Slot</h2>
              <button onClick={() => setShowModal(false)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-muted)', cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>
            {[['Subject', 'Select subject…'], ['Tutor', 'Select tutor…'], ['Room', 'Select room…'], ['Day', 'Monday'], ['Time', '09:00 – 10:30'], ['Max Capacity', '12']].map(([label, ph]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--foreground-muted)', display: 'block', marginBottom: 5 }}>{label}</label>
                <input placeholder={ph} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--foreground)', background: 'var(--surface-muted)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Cancel</button>
              <button style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Create Slot</button>
            </div>
          </div>
        </>
      )}
    </AppShell>
  )
}
