'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const STUDENTS = [
  { id: 'S001', name: 'Ahmad Zikri bin Razali', grade: 'Form 5', curriculum: 'SPM', subject: 'Add Maths, Physics', status: 'Active', balance: 0, lastAttend: 'Today 09:58' },
  { id: 'S002', name: 'Sarah Lee Xin Yi', grade: 'Form 4', curriculum: 'SPM', subject: 'Chemistry, Bio', status: 'Overdue', balance: 280, lastAttend: 'Yesterday' },
  { id: 'S003', name: 'Daniel Wong Jun Kiat', grade: 'Form 5', curriculum: 'SPM', subject: 'Add Maths', status: 'Active', balance: 0, lastAttend: 'Today 10:02' },
  { id: 'S004', name: 'Amirul Hakim bin Yusof', grade: 'Form 5', curriculum: 'SPM', subject: 'Physics, Chem', status: 'Overdue', balance: 350, lastAttend: '3 days ago' },
  { id: 'S005', name: 'Priya Nair d/o Rajan', grade: 'Year 10', curriculum: 'IGCSE', subject: 'Maths, English', status: 'Active', balance: 0, lastAttend: 'Today 09:45' },
  { id: 'S006', name: 'Tan Wei Liang', grade: 'Year 11', curriculum: 'IGCSE', subject: 'Chemistry', status: 'Trial', balance: 0, lastAttend: 'Today' },
  { id: 'S007', name: 'Nurul Ain binti Hamzah', grade: 'Form 4', curriculum: 'SPM', subject: 'Bio, Chemistry', status: 'Active', balance: 0, lastAttend: 'Yesterday' },
  { id: 'S008', name: 'Kevin Chong', grade: 'Year 8', curriculum: 'IGCSE', subject: 'Maths', status: 'Active', balance: 0, lastAttend: 'Today' },
  { id: 'S009', name: 'Siti Aisyah binti Razak', grade: 'Form 3', curriculum: 'SPM', subject: 'Maths, Science', status: 'Lead', balance: 0, lastAttend: '—' },
  { id: 'S010', name: 'Marcus Lim Chee Keong', grade: 'Form 5', curriculum: 'SPM', subject: 'Add Maths, Physics', status: 'Active', balance: 0, lastAttend: 'Today 10:05' },
]

const statusColor: Record<string, { bg: string, text: string }> = {
  Active:  { bg: '#DCFCE7', text: '#059669' },
  Overdue: { bg: '#FEE2E2', text: '#DC2626' },
  Trial:   { bg: '#EDE9FE', text: '#7C3AED' },
  Lead:    { bg: '#FEF3C7', text: '#D97706' },
}

const curriculumColor: Record<string, { bg: string, text: string }> = {
  SPM:   { bg: '#DBEAFE', text: '#1D4ED8' },
  IGCSE: { bg: '#F3E8FF', text: '#7C3AED' },
  Primary: { bg: '#D1FAE5', text: '#059669' },
}

export default function StudentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [curriculumFilter, setCurriculumFilter] = useState('All')
  const [selected, setSelected] = useState<string[]>([])
  const [drawer, setDrawer] = useState<typeof STUDENTS[0] | null>(null)

  const filtered = STUDENTS.filter(s =>
    (statusFilter === 'All' || s.status === statusFilter) &&
    (curriculumFilter === 'All' || s.curriculum === curriculumFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search))
  )

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <AppShell title="Students">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Student Directory</h1>
          <p style={{ fontSize: 13, color: 'var(--foreground-muted)', marginTop: 2 }}>{STUDENTS.length} students enrolled · {STUDENTS.filter(s => s.status === 'Active').length} active</p>
        </div>
        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
          + New Student
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search name or ID…"
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: 13, flex: 1, minWidth: 200, background: 'var(--surface-muted)', color: 'var(--foreground)', outline: 'none' }}
        />
        {['All','Active','Overdue','Trial','Lead'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{
            padding: '6px 14px', borderRadius: 20, border: '1px solid',
            borderColor: statusFilter === s ? 'var(--primary)' : 'var(--border)',
            background: statusFilter === s ? 'rgba(29,78,216,0.08)' : 'transparent',
            color: statusFilter === s ? 'var(--primary)' : 'var(--foreground-muted)',
            fontWeight: statusFilter === s ? 600 : 500, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)',
          }}>{s}</button>
        ))}
        <div style={{ width: 1, height: 24, background: 'var(--border)' }} />
        {['All','SPM','IGCSE'].map(c => (
          <button key={c} onClick={() => setCurriculumFilter(c)} style={{
            padding: '6px 14px', borderRadius: 20, border: '1px solid',
            borderColor: curriculumFilter === c ? 'var(--primary)' : 'var(--border)',
            background: curriculumFilter === c ? 'rgba(29,78,216,0.08)' : 'transparent',
            color: curriculumFilter === c ? 'var(--primary)' : 'var(--foreground-muted)',
            fontWeight: curriculumFilter === c ? 600 : 500, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)',
          }}>{c}</button>
        ))}
      </div>

      {/* Batch actions */}
      {selected.length > 0 && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{selected.length} students selected</span>
          <button style={{ padding: '5px 12px', borderRadius: 7, border: 'none', background: '#25D366', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>💬 Send WhatsApp Invoice</button>
          <button style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>📄 Export PDF</button>
          <button onClick={() => setSelected([])} style={{ marginLeft: 'auto', padding: '5px 12px', borderRadius: 7, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: 12 }}>Clear</button>
        </div>
      )}

      {/* Table */}
      <div style={{ background: 'var(--surface)', borderRadius: 12, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-muted)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', width: 40 }}>
                <input type="checkbox" onChange={e => setSelected(e.target.checked ? filtered.map(s => s.id) : [])} checked={selected.length === filtered.length && filtered.length > 0} />
              </th>
              {['ID','Name','Grade','Curriculum','Subjects','Status','Balance','Last Attend','Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} style={{ borderTop: '1px solid var(--border)', cursor: 'pointer', transition: 'background 100ms' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-muted)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '12px 16px' }}><input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} onClick={e => e.stopPropagation()} /></td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--foreground-muted)', fontWeight: 600 }}>{s.id}</td>
                <td style={{ padding: '12px 16px' }} onClick={() => setDrawer(s)}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--foreground)' }}>{s.name}</div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--foreground-muted)' }}>{s.grade}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: curriculumColor[s.curriculum]?.bg, color: curriculumColor[s.curriculum]?.text }}>{s.curriculum}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--foreground-muted)', maxWidth: 150 }}>{s.subject}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: statusColor[s.status]?.bg, color: statusColor[s.status]?.text }}>{s.status}</span>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: s.balance > 0 ? 'var(--destructive)' : 'var(--foreground-muted)' }}>
                  {s.balance > 0 ? `RM ${s.balance}` : '—'}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--foreground-muted)' }}>{s.lastAttend}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={e => { e.stopPropagation(); setDrawer(s); }} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: 11 }}>View</button>
                    <button style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#25D366', color: '#fff', cursor: 'pointer', fontSize: 11 }}>💬</button>
                    <button style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: 11 }}>🪪</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide-over Drawer */}
      {drawer && (
        <>
          <div onClick={() => setDrawer(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(9,13,22,0.4)', zIndex: 100, backdropFilter: 'blur(2px)' }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: 400,
            background: 'var(--surface)', zIndex: 101,
            boxShadow: 'var(--shadow-modal)', padding: 24,
            display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Student Profile</h2>
              <button onClick={() => setDrawer(null)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-muted)', cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--surface-muted)', borderRadius: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-display)' }}>
                {drawer.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--foreground)' }}>{drawer.name}</div>
                <div style={{ fontSize: 12, color: 'var(--foreground-muted)', marginTop: 2 }}>{drawer.grade} · {drawer.curriculum}</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: statusColor[drawer.status]?.bg, color: statusColor[drawer.status]?.text, marginTop: 4, display: 'inline-block' }}>{drawer.status}</span>
              </div>
            </div>
            {[
              ['Student ID', drawer.id],
              ['Subjects', drawer.subject],
              ['Last Attendance', drawer.lastAttend],
              ['Outstanding Balance', drawer.balance > 0 ? `RM ${drawer.balance}` : 'Fully Paid ✓'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, color: 'var(--foreground-muted)', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Edit Profile</button>
              <button style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#25D366', color: '#fff', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>💬 WhatsApp Parent</button>
            </div>
          </div>
        </>
      )}
    </AppShell>
  )
}
