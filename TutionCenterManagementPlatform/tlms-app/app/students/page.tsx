'use client'
import AppShell from '@/components/AppShell'

const STUDENTS = [
  { id: 'S001', name: 'Ahmad Zikri bin Razali', ic: '090123-14-XXXX', grade: 'Form 5', subjects: 'Add Maths, Physics', fee: 350, status: 'Active' },
  { id: 'S002', name: 'Sarah Lee Xin Yi', ic: '100415-10-XXXX', grade: 'Form 4', subjects: 'Chemistry, Biology', fee: 350, status: 'Overdue' },
  { id: 'S003', name: 'Daniel Wong Jun Kiat', ic: '080512-10-XXXX', grade: 'Form 5', subjects: 'Add Maths', fee: 180, status: 'Active' },
  { id: 'S004', name: 'Priya Nair d/o Rajan', ic: '110909-14-XXXX', grade: 'Year 10', subjects: 'Maths, English', fee: 420, status: 'Active' },
  { id: 'S005', name: 'Tan Wei Liang', ic: '100228-10-XXXX', grade: 'Year 11', subjects: 'Chemistry', fee: 220, status: 'Trial' },
]

export default function Students() {
  return (
    <AppShell title="Student Management">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 22 }}>Student Directory</h1>
        <button className="btn-primary">+ Add Student</button>
      </div>
      
      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Filters */}
        <div style={{ padding: 16, borderBottom: '1px solid var(--border)', display: 'flex', gap: 12 }}>
          <input type="text" placeholder="Search by name, ID or IC..." style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, width: 300 }} />
          <select style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6 }}><option>All Grades</option><option>Form 5</option><option>Form 4</option></select>
          <select style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6 }}><option>All Statuses</option><option>Active</option><option>Overdue</option></select>
        </div>
        
        {/* Table */}
        <table>
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" /></th>
              <th>Photo</th>
              <th>Full Name</th>
              <th>IC / Passport</th>
              <th>Grade</th>
              <th>Enrolled Subjects</th>
              <th>Monthly Fee</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map(s => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
                    {s.name.charAt(0)}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{s.id}</div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{s.ic}</td>
                <td>{s.grade}</td>
                <td style={{ fontSize: 12 }}>{s.subjects}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>RM {s.fee.toFixed(2)}</td>
                <td>
                  <span className={`badge ${s.status === 'Active' ? 'badge-success' : s.status === 'Overdue' ? 'badge-danger' : 'badge-info'}`}>{s.status}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>View</button>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Edit</button>
                    {s.status === 'Overdue' && (
                      <button className="btn-whatsapp" style={{ padding: '6px 12px', fontSize: 12 }}>WhatsApp</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing 1 to 5 of 482 entries</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn-secondary" style={{ padding: '6px 12px' }}>Previous</button>
            <button className="btn-secondary" style={{ padding: '6px 12px' }}>Next</button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
