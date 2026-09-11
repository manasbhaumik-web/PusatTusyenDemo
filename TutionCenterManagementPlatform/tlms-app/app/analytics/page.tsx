import AppShell from '@/components/AppShell'
export default function Page() {
  return (
    <AppShell>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 700 }}>Analytics & Reports</h1>
        <p style={{ color:'var(--foreground-muted)', marginTop: 8 }}>This module is coming in Sprint 7–8.</p>
      </div>
    </AppShell>
  )
}
