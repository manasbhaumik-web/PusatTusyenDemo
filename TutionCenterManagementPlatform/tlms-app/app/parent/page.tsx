'use client'
import { useState } from 'react'

const CHILDREN = [
  {
    name: 'Daniel', fullName: 'Daniel Wong Jun Kiat', form: 'Form 5',
    attendance: { status: 'Present', time: '09:58 AM', class: 'SPM Additional Mathematics', room: 'Room 1' },
    invoice: { id: 'INV-2026-0902', period: 'September 2026', amount: 350, due: '15 Sep 2026', daysLeft: 3 },
    results: [
      { subject: 'Chapter 4 Calculus Quiz', score: 92, grade: 'A+', date: '10 Sep' },
      { subject: 'SPM Mid-Year Add Maths', score: 88, grade: 'A', date: '3 Sep' },
      { subject: 'SPM Physics Mock Test', score: 81, grade: 'A-', date: '28 Aug' },
    ],
    tutor: { name: 'Dr. Tan Hock Seng', subject: 'Mathematics', whatsapp: '+60123456789' },
  },
  {
    name: 'Chloe', fullName: 'Chloe Wong Xin Yee', form: 'Year 8 (IGCSE)',
    attendance: { status: 'Present', time: '10:15 AM', class: 'IGCSE Mathematics', room: 'Room 2' },
    invoice: { id: 'INV-2026-0903', period: 'September 2026', amount: 420, due: '15 Sep 2026', daysLeft: 3 },
    results: [
      { subject: 'IGCSE Maths Chapter 6', score: 95, grade: 'A*', date: '9 Sep' },
      { subject: 'English Comprehension', score: 78, grade: 'B+', date: '2 Sep' },
    ],
    tutor: { name: 'Sir Robert Harrison', subject: 'IGCSE Mathematics', whatsapp: '+60129876543' },
  },
]

export default function ParentPage() {
  const [selected, setSelected] = useState(0)
  const child = CHILDREN[selected]

  const gradeColor = (g: string) => {
    if (g.startsWith('A')) return { bg: '#DCFCE7', text: '#059669' }
    if (g.startsWith('B')) return { bg: '#DBEAFE', text: '#1D4ED8' }
    return { bg: '#FEF3C7', text: '#D97706' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'var(--font-sans)' }}>
      {/* Mobile header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 16px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, maxWidth: 430, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 12, fontFamily: 'var(--font-display)' }}>T</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--foreground)' }}>Inspirasi Parent Portal</span>
          </div>
          <button style={{ position: 'relative', width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-muted)', cursor: 'pointer', fontSize: 16 }}>
            🔔
            <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: 'var(--destructive)' }} />
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 430, margin: '0 auto', padding: '16px' }}>
        {/* Child switcher */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Select Child</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {CHILDREN.map((c, i) => (
              <button key={c.name} onClick={() => setSelected(i)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 24, border: '2px solid',
                borderColor: selected === i ? 'var(--primary)' : 'var(--border)',
                background: selected === i ? 'rgba(29,78,216,0.06)' : 'var(--surface)',
                color: selected === i ? 'var(--primary)' : 'var(--foreground-muted)',
                fontWeight: selected === i ? 700 : 500, fontSize: 13, cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}>
                <span>{i === 0 ? '👦' : '👧'}</span> {c.name} <span style={{ fontSize: 11, opacity: 0.7 }}>({c.form})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Attendance card */}
        <div style={{ background: 'var(--surface)', borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{child.name}'s Attendance Today</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🟢</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--foreground)' }}>Checked In · {child.attendance.time}</div>
              <div style={{ fontSize: 12, color: 'var(--foreground-muted)', marginTop: 1 }}>{child.attendance.class}</div>
              <div style={{ fontSize: 11, color: 'var(--foreground-muted)' }}>{child.attendance.room}</div>
            </div>
          </div>
        </div>

        {/* Invoice card */}
        <div style={{ background: 'var(--surface)', borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-card)', border: `1px solid ${child.invoice.daysLeft <= 3 ? '#FCA5A5' : 'var(--border)'}` }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>💳 Outstanding Invoice</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--foreground-muted)' }}>{child.invoice.id}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginTop: 2 }}>{child.invoice.period}</div>
              <div style={{ fontSize: 12, color: 'var(--destructive)', marginTop: 2 }}>Due {child.invoice.due} · In {child.invoice.daysLeft} days</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--foreground)' }}>
              RM {child.invoice.amount}
            </div>
          </div>
          <button style={{
            width: '100%', padding: '12px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 14,
            fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 14px rgba(29,78,216,0.3)',
          }}>
            💳 Pay Now with FPX / DuitNow (1-Tap)
          </button>
          <p style={{ textAlign: 'center', fontSize: 10, color: 'var(--foreground-muted)', marginTop: 6 }}>Supports Maybank2u · CIMB Clicks · RHB Bank · DuitNow QR</p>
        </div>

        {/* Results */}
        <div style={{ background: 'var(--surface)', borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📊 Exam & Quiz Results</p>
            <button style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer' }}>View All →</button>
          </div>
          {child.results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < child.results.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: gradeColor(r.grade).bg, color: gradeColor(r.grade).text, minWidth: 30, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{r.grade}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--foreground)' }}>{r.subject}</div>
                <div style={{ fontSize: 11, color: 'var(--foreground-muted)' }}>{r.date}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--foreground)' }}>{r.score}%</span>
            </div>
          ))}
          <button style={{ width: '100%', marginTop: 12, padding: '9px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-muted)', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--foreground)' }}>
            📄 Download Full Report Card (PDF)
          </button>
        </div>

        {/* WhatsApp tutor */}
        <div style={{ background: 'var(--surface)', borderRadius: 14, padding: 16, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>💬 Direct Tutor Line</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--primary)' }}>
              {child.tutor.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--foreground)' }}>{child.tutor.name}</div>
              <div style={{ fontSize: 11, color: 'var(--foreground-muted)' }}>{child.tutor.subject}</div>
            </div>
          </div>
          <button style={{
            width: '100%', padding: '11px', borderRadius: 10, border: 'none',
            background: '#25D366', color: '#fff', cursor: 'pointer', fontWeight: 700,
            fontSize: 14, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            💬 Chat with {child.tutor.name.split(' ')[1]} →
          </button>
        </div>
      </div>
    </div>
  )
}
