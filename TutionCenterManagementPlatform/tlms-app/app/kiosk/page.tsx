'use client'
import { useState, useEffect } from 'react'

export default function Kiosk() {
  const [ic, setIc] = useState('')
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    if (scanned) {
      const t = setTimeout(() => { setScanned(false); setIc(''); }, 4000)
      return () => clearTimeout(t)
    }
  }, [scanned])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sidebar-bg)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      
      {!scanned ? (
        <div style={{ textAlign: 'center', maxWidth: 400, width: '100%' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <h1 style={{ fontFamily: 'DM Sans', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Academix Pro Kiosk</h1>
          <p style={{ color: 'var(--sidebar-muted)', marginBottom: 40 }}>Please scan your Student ID or enter IC number below.</p>
          
          <div style={{ background: '#0F172A', border: '1px solid var(--primary)', borderRadius: 16, height: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 24, position: 'relative', boxShadow: '0 0 20px rgba(13,148,136,0.2)' }}>
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
             <p style={{ color: 'var(--sidebar-text)', fontSize: 14 }}>Hold QR Code steady within frame</p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <input value={ic} onChange={e => setIc(e.target.value)} onKeyDown={e => e.key === 'Enter' && setScanned(true)} placeholder="Enter IC Number..." style={{ flex: 1, padding: '14px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 16, outline: 'none', fontFamily: 'DM Mono' }} />
            <button onClick={() => setScanned(true)} style={{ padding: '14px 24px', borderRadius: 12, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Enter</button>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', padding: 40, borderRadius: 24, textAlign: 'center', maxWidth: 400, width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '2px solid var(--success)' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontFamily: 'DM Sans', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Welcome, Ahmad Zikri!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24 }}>Successfully checked in for <strong>SPM Physics</strong> at Room 2A.</p>
          <div style={{ background: 'var(--bg-surface-alt)', padding: 16, borderRadius: 12, textAlign: 'left', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>WhatsApp Notification</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Sent to Parent (012-***-4567)
            </div>
          </div>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
             <div style={{ height: '100%', background: 'var(--success)', animation: 'shrink 4s linear forwards' }} />
          </div>
          <style>{`@keyframes shrink { from { width: 100% } to { width: 0% } }`}</style>
        </div>
      )}
    </div>
  )
}
