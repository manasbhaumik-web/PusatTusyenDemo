import AppShell from '@/components/AppShell'
export default function Page() {
  return (
    <AppShell title="Staff & Tutors">
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: '60vh', color: 'var(--text-muted)' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <h1 style={{ fontFamily:'DM Sans', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Staff & Tutors</h1>
        <p>This module is currently in development (Sprint 7).</p>
      </div>
    </AppShell>
  )
}
