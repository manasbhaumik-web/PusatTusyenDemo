'use client'
import AppShell from '@/components/AppShell'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 98000 }, { month: 'Feb', revenue: 104000 },
  { month: 'Mar', revenue: 112000 }, { month: 'Apr', revenue: 108000 },
  { month: 'May', revenue: 118000 }, { month: 'Jun', revenue: 125000 },
  { month: 'Jul', revenue: 131000 }, { month: 'Aug', revenue: 138000 },
  { month: 'Sep', revenue: 142000 },
]

const classes = [
  { time: '10:00 AM', name: 'SPM Add Maths', room: 'Room A', tutor: 'Dr. Tan', cap: 12, enrolled: 12 },
  { time: '11:30 AM', name: 'IGCSE Chemistry', room: 'Room B', tutor: 'Sir Robert', cap: 12, enrolled: 10 },
  { time: '02:00 PM', name: 'Primary Maths (Std 6)', room: 'Room C', tutor: 'Miss Lim', cap: 10, enrolled: 7 },
  { time: '04:00 PM', name: 'SPM Physics', room: 'Room A', tutor: 'Dr. Tan', cap: 12, enrolled: 9 },
]

const transactions = [
  { name: 'Lucas Tan (Form 5)', amount: 'RM 350', method: 'FPX Maybank', time: '09:14 AM' },
  { name: 'Isaac Lim (Year 10)', amount: 'RM 420', method: 'DuitNow QR', time: '08:52 AM' },
  { name: 'Nur Aisha Binti Hassan', amount: 'RM 280', method: 'FPX CIMB', time: 'Yesterday' },
]

const unpaid = [
  { name: 'Sarah Lee (Form 4)', amount: 'RM 280', days: 9 },
  { name: 'Amirul Bin Azman (Form 5)', amount: 'RM 350', days: 7 },
  { name: 'Tan Xin Yi (Year 8)', amount: 'RM 420', days: 12 },
]

function KpiCard({ label, value, delta, deltaType, sub }: any) {
  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 12, padding: 20,
      boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--foreground)', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--foreground-muted)', marginTop: 4 }}>{sub}</div>}
      {delta && (
        <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, color: deltaType === 'up' ? 'var(--success)' : 'var(--destructive)' }}>
          {deltaType === 'up' ? '▲' : '▼'} {delta}
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--foreground)' }}>
            Monthly Overview
          </h1>
          <p style={{ fontSize: 13, color: 'var(--foreground-muted)', marginTop: 2 }}>September 2026 — Subang Jaya SS15</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)',
            background: 'var(--surface)', cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-sans)',
          }}>📤 Export</button>
          <button style={{
            padding: '8px 16px', borderRadius: 8, border: 'none',
            background: 'var(--primary)', color: '#fff', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans)',
          }}>+ Enroll Student</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <KpiCard label="Total Active Students" value="482" delta="+14 this month" deltaType="up" sub="Across all branches" />
        <KpiCard label="Collection Rate" value="94.2%" delta="+3.1% vs August" deltaType="up" sub="RM 142,340 collected" />
        <KpiCard label="Outstanding Fees" value="RM 8,740" delta="-42% vs August" deltaType="up" sub="18 unpaid invoices" />
        <KpiCard label="Attendance Today" value="96.8%" sub="214 / 221 students present" delta="🟢 12 active classes now" deltaType="up" />
      </div>

      {/* Charts + Today's Classes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginBottom: 16 }}>
        {/* Revenue chart */}
        <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--foreground)' }}>Revenue Trajectory 2026</h2>
            <span style={{ fontSize: 11, color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>MYR</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => `RM${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`RM ${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontFamily: 'var(--font-sans)' }} />
              <Area type="monotone" dataKey="revenue" stroke="#1D4ED8" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Today's classes */}
        <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 14, color: 'var(--foreground)' }}>Today's Classes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {classes.map((c, i) => (
              <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--surface-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--foreground-muted)', fontWeight: 500 }}>{c.time}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginTop: 1 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--foreground-muted)' }}>{c.room} · {c.tutor}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                  background: c.enrolled === c.cap ? '#FEF3C7' : '#DCFCE7',
                  color: c.enrolled === c.cap ? 'var(--warning)' : 'var(--success)',
                  fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap',
                }}>{c.enrolled}/{c.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions + Unpaid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Recent Transactions */}
        <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 14, color: 'var(--foreground)' }}>Recent Transactions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {transactions.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: i < transactions.length - 1 ? '1px solid var(--border)' : 'none', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💳</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--foreground-muted)' }}>{t.method} · {t.time}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--success)' }}>{t.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Unpaid Invoices */}
        <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--foreground)' }}>Unpaid Invoices</h2>
            <span style={{ fontSize: 11, background: '#FEE2E2', color: 'var(--destructive)', fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>{unpaid.length} overdue</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {unpaid.map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: i < unpaid.length - 1 ? '1px solid var(--border)' : 'none', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--destructive)' }}>{u.days} days overdue</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--destructive)', marginRight: 8 }}>{u.amount}</div>
                <button style={{
                  padding: '5px 12px', borderRadius: 7, border: 'none',
                  background: '#25D366', color: '#fff', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 4,
                }}>💬 WhatsApp</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
