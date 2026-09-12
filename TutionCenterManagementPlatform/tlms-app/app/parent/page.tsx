'use client'
export default function ParentPortal() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)' }}>
      {/* Mobile Header */}
      <div style={{ background: 'var(--primary)', color: '#fff', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16 }}>Academix Parent</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
        {/* Child Selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ background: 'var(--primary)', color: '#fff', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, border: '2px solid var(--primary)' }}>Ahmad Zikri (F5)</div>
          <div style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 500, border: '2px solid var(--border)' }}>Sarah Tan (Y10)</div>
        </div>

        {/* Live Attendance */}
        <div className="card" style={{ padding: 20, marginBottom: 16, borderTop: '4px solid var(--success)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Today's Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Present & Checked In</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>09:58 AM • SPM Physics (Room 2A)</div>
            </div>
          </div>
        </div>

        {/* Invoice */}
        <div className="card" style={{ padding: 20, marginBottom: 16, borderTop: '4px solid var(--danger)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Outstanding Fee</div>
            <div className="badge badge-danger">Due in 3 days</div>
          </div>
          <div style={{ fontSize: 28, fontFamily: 'DM Sans', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>RM 350.00</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>September 2026 Tuition Fees (INV-2026-0902)</div>
          
          <button style={{ width: '100%', padding: 14, background: 'var(--primary)', color: '#fff', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Pay Now via FPX
          </button>
        </div>

        {/* Results */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Latest Academic Results</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>Chapter 4 Calculus Quiz</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Additional Mathematics • 10 Sep</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'DM Mono', fontWeight: 600, fontSize: 14 }}>92%</span>
                <span className="badge badge-success" style={{ fontSize: 13, width: 30, justifyContent: 'center' }}>A+</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>SPM Mid-Year Mock</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Physics • 3 Sep</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'DM Mono', fontWeight: 600, fontSize: 14 }}>81%</span>
                <span className="badge badge-info" style={{ fontSize: 13, width: 30, justifyContent: 'center' }}>A-</span>
              </div>
            </div>
          </div>
          
          <button style={{ width: '100%', padding: 12, background: 'var(--bg-surface-alt)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 8, marginTop: 16, fontWeight: 600, fontSize: 13 }}>
            Download Full Report Card
          </button>
        </div>
      </div>
    </div>
  )
}
