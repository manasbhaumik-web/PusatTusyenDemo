import Sidebar from './Sidebar'
import Header from './Header'

export default function AppShell({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header title={title} />
        <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
