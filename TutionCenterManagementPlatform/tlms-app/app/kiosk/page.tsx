'use client'
import { useState, useEffect } from 'react'

const MOCK_STUDENTS: Record<string, { name: string, form: string, className: string, room: string, time: string, parent: string }> = {
  '080512-10-1234': { name: 'Daniel Wong Jun Kiat', form: 'Form 5', className: 'SPM Additional Mathematics', room: 'Room 1', time: '09:58 AM', parent: 'Mrs. Sharon Tan (+6012-***5678)' },
}

export default function KioskPage() {
  const [ic, setIc] = useState('')
  const [scanning, setScanning] = useState(true)
  const [student, setStudent] = useState<typeof MOCK_STUDENTS[string] | null>(null)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (student) {
      const t = setTimeout(() => { setStudent(null); setIc(''); setScanning(true); }, 5000)
      return () => clearTimeout(t)
    }
  }, [student])

  function handleCheck() {
    const found = MOCK_STUDENTS[ic] || MOCK_STUDENTS['080512-10-1234']
    if (found) {
      setStudent(found)
      setScanning(false)
    }
  }

  return (
    <div data-theme="dark" style={{
      minHeight: '100vh', background: '#090D16',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-sans)', position: 'relative', overflow: 'hidden', padding: 24,
    }}>
      {/* Background gradient */}
      <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {!student ? (
        <>
          {/* Logo & header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 40px rgba(29,78,216,0.4)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#fff' }}>T</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#F8FAFC', letterSpacing: '-0.02em' }}>Pusat Tusyen Inspirasi</h1>
            <p style={{ color: '#64748B', fontSize: 14, marginTop: 6 }}>📍 Subang Jaya SS15 Campus · Student Check-In</p>
          </div>

          {/* Camera viewport */}
          <div style={{
            width: 320, height: 260, borderRadius: 16,
            border: `2px solid ${pulse ? '#3B82F6' : '#1E293B'}`,
            background: '#0F172A', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
            marginBottom: 28, position: 'relative', overflow: 'hidden',
            transition: 'border-color 500ms',
            boxShadow: pulse ? '0 0 24px rgba(59,130,246,0.2)' : 'none',
          }}>
            {/* Scan corners */}
            {[{top:12,left:12,borderT:true,borderL:true},{top:12,right:12,borderT:true,borderR:true},{bottom:12,left:12,borderB:true,borderL:true},{bottom:12,right:12,borderB:true,borderR:true}].map((s,i) => (
              <div key={i} style={{ position:'absolute', top:s.top, bottom:s.bottom, left:s.left, right:s.right, width:24, height:24, borderColor:'#3B82F6', borderStyle:'solid', borderWidth:0, borderTopWidth: s.borderT ? 3:0, borderLeftWidth: s.borderL ? 3:0, borderRightWidth: s.borderR ? 3:0, borderBottomWidth: s.borderB ? 3:0 }} />
            ))}
            <div style={{ fontSize: 40 }}>📷</div>
            <p style={{ color: '#475569', fontSize: 13, textAlign: 'center', lineHeight: 1.5 }}>Position Student QR Badge<br />Inside The Frame</p>
            <div style={{ fontSize: 11, color: '#3B82F6', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>SCANNING · 30 FPS</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, color: '#475569', fontSize: 13 }}>
            <div style={{ flex: 1, height: 1, background: '#1E293B' }} />
            OR ENTER IC / STUDENT ID
            <div style={{ flex: 1, height: 1, background: '#1E293B' }} />
          </div>

          {/* IC input */}
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              value={ic} onChange={e => setIc(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="080512-10-1234"
              style={{
                width: 240, padding: '12px 16px', borderRadius: 10,
                border: '1px solid #1E293B', background: '#0F172A',
                color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontSize: 15,
                outline: 'none', letterSpacing: '0.05em',
              }}
            />
            <button onClick={handleCheck} style={{
              padding: '12px 20px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', color: '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-sans)',
            }}>Check In →</button>
          </div>

          {/* Try demo */}
          <button onClick={handleCheck} style={{ marginTop: 28, padding: '8px 20px', borderRadius: 8, border: '1px solid #1E293B', background: 'transparent', color: '#64748B', cursor: 'pointer', fontSize: 12 }}>
            Try Demo Scan →
          </button>
        </>
      ) : (
        /* Success overlay */
        <div style={{
          width: '100%', maxWidth: 480, background: '#0F172A',
          borderRadius: 20, padding: 36, textAlign: 'center',
          border: '1px solid rgba(5,150,105,0.4)',
          boxShadow: '0 0 60px rgba(5,150,105,0.2)',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>✅</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#F8FAFC', marginBottom: 4 }}>
            Welcome, {student.name}!
          </h2>
          <p style={{ color: '#34D399', fontWeight: 600, fontSize: 14, marginBottom: 24 }}>{student.form}</p>
          <div style={{ background: '#1E293B', borderRadius: 12, padding: 20, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {[
              { icon: '🕒', label: 'Checked In', value: student.time },
              { icon: '📚', label: 'Class', value: student.className },
              { icon: '🏫', label: 'Room', value: student.room },
              { icon: '📱', label: 'WhatsApp Sent', value: student.parent },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#475569' }}>Resetting in 5 seconds…</div>
          <div style={{ height: 3, background: '#1E293B', borderRadius: 3, marginTop: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#059669', borderRadius: 3, animation: 'shrink 5s linear forwards', width: '100%' }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
      `}</style>
    </div>
  )
}
