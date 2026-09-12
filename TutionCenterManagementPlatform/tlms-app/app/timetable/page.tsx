'use client'
import AppShell from '@/components/AppShell'

const ROOMS = ['Room 1', 'Room 2', 'Room 3', 'Online (Zoom)']
const SLOTS = [
  { time: '09:00 AM - 10:30 AM', classes: [
    { room: 0, title: 'SPM Physics', tutor: 'Dr. Tan', enrolled: 12, cap: 15, tag: 'SPM' },
    { room: 1, title: 'IGCSE Chem', tutor: 'Sir Robert', enrolled: 20, cap: 20, tag: 'IGCSE' },
    { room: 3, title: 'Primary Maths', tutor: 'Ms. Lim', enrolled: 45, cap: 50, tag: 'Primary' }
  ]},
  { time: '11:00 AM - 12:30 PM', classes: [
    { room: 0, title: 'SPM Add Maths', tutor: 'Dr. Tan', enrolled: 15, cap: 15, tag: 'SPM' },
    { room: 2, title: 'Form 2 Science', tutor: 'Ms. Lim', enrolled: 8, cap: 10, tag: 'PT3' },
  ]},
  { time: '02:00 PM - 03:30 PM', classes: [
    { room: 1, title: 'IGCSE Maths', tutor: 'Sir Robert', enrolled: 18, cap: 20, tag: 'IGCSE' },
  ]},
]

const tagColors: Record<string, string> = {
  SPM: 'badge-info',
  IGCSE: 'badge-purple',
  Primary: 'badge-success',
  PT3: 'badge-warning',
}

export default function Timetable() {
  return (
    <AppShell title="Classes & Schedule">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22 }}>Master Schedule</h1>
          <p style={{ color: 'var(--text-muted)' }}>Week of 7-13 September 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary">Export PDF</button>
          <button className="btn-primary">+ Add Class Slot</button>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 1000 }}>
          <thead>
            <tr>
              <th style={{ width: 160, borderRight: '1px solid var(--border)' }}>Time Slot</th>
              {ROOMS.map(r => <th key={r} style={{ borderRight: '1px solid var(--border)' }}>{r}</th>)}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, i) => (
              <tr key={i}>
                <td style={{ borderRight: '1px solid var(--border)', verticalAlign: 'top', padding: '16px 14px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>{slot.time}</div>
                </td>
                {ROOMS.map((_, roomIdx) => {
                  const cls = slot.classes.find(c => c.room === roomIdx);
                  return (
                    <td key={roomIdx} style={{ borderRight: '1px solid var(--border)', padding: 12, verticalAlign: 'top' }}>
                      {cls ? (
                        <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span className={`badge ${tagColors[cls.tag] || 'badge-teal'}`}>{cls.tag}</span>
                            <span className={`badge ${cls.enrolled >= cls.cap ? 'badge-danger' : 'badge-success'}`}>{cls.enrolled}/{cls.cap}</span>
                          </div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 2 }}>{cls.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{cls.tutor}</div>
                        </div>
                      ) : (
                        <div style={{ border: '2px dashed var(--border)', borderRadius: 8, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-faint)' }}>
                          + Add
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  )
}
