'use client'
import AppShell from '@/components/AppShell'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 98000 }, { month: 'Feb', revenue: 104000 },
  { month: 'Mar', revenue: 112000 }, { month: 'Apr', revenue: 108000 },
  { month: 'May', revenue: 118000 }, { month: 'Jun', revenue: 125000 },
  { month: 'Jul', revenue: 131000 }, { month: 'Aug', revenue: 138000 },
  { month: 'Sep', revenue: 142340 },
]

export default function Dashboard() {
  return (
    <AppShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, marginBottom: 4 }}>September 2026 — Executive Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Subang Jaya SS15 Branch</p>
        </div>
        <button className="btn-primary">Generate Report</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Students', value: '482', sub: '+2.1% from Aug', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', color: 'var(--info)', bg: 'var(--info-bg)' },
          { label: 'MYR Revenue Collected', value: 'RM 142,340', sub: '92% of target', icon: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', color: 'var(--success)', bg: 'var(--success-bg)' },
          { label: 'Outstanding Fees', value: 'RM 8,740', sub: '-5.3% reduction', icon: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01', color: 'var(--danger)', bg: 'var(--danger-bg)' },
          { label: 'Attendance Rate', value: '96.8%', sub: '+0.5% from Aug', icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3', color: 'var(--primary)', bg: 'var(--primary-light)' }
        ].map((kpi, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={kpi.icon}/></svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{kpi.label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'DM Sans', color: 'var(--text-primary)', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Chart */}
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 16, marginBottom: 20 }}>Monthly Revenue Performance — 2026</h2>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => 'RM ' + (v/1000) + 'k'} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }} />
                <ReferenceLine y={145000} stroke="var(--primary)" strokeDasharray="3 3" label={{ position: 'top', value: 'Target', fill: 'var(--primary)', fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Classes */}
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>Today's Classes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'SPM Physics (Form 5)', time: '8:00 AM - 10:00 AM', room: 'Room 2A', tutor: 'Mr. Lee K. W.', enrolled: 18, cap: 20 },
              { title: 'A-Level Maths', time: '10:30 AM - 12:30 PM', room: 'Room 1C', tutor: 'Ms. Priya S.', enrolled: 12, cap: 15 },
              { title: 'IGCSE English', time: '1:00 PM - 3:00 PM', room: 'Room 3B', tutor: 'Mr. David C.', enrolled: 20, cap: 20 },
              { title: 'PT3 Science', time: '3:30 PM - 5:30 PM', room: 'Room 2C', tutor: 'Madam Fauziah', enrolled: 22, cap: 20 },
            ].map((cls, i) => {
              const pct = cls.enrolled / cls.cap;
              const isFull = pct >= 1;
              const isOver = pct > 1;
              return (
                <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 12, background: isOver ? 'var(--danger-bg)' : isFull ? 'var(--success-bg)' : 'transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{cls.title}</div>
                    <div className={`badge ${isOver ? 'badge-danger' : isFull ? 'badge-success' : 'badge-teal'}`}>
                      {cls.enrolled}/{cls.cap} Students {isFull && '- Full'}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{cls.room} | Tutor: {cls.tutor}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{cls.time}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Transactions */}
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>Recent FPX/DuitNow Transactions</h2>
          <table>
            <thead>
              <tr><th>Date</th><th>Transaction ID</th><th>Payer Name</th><th>Amount (RM)</th><th>Status</th></tr>
            </thead>
            <tbody>
              {[
                ['2026/09/12', '201001678', 'Ahmad Zikri', '350.00'],
                ['2026/09/12', '201001625', 'Sarah Tan', '420.00'],
                ['2026/09/11', '201003583', 'Lim Wei', '280.00'],
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{row[0]}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{row[1]}</td>
                  <td style={{ fontWeight: 500 }}>{row[2]}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>RM {row[3]}</td>
                  <td><span className="badge badge-success">Success</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Overdue */}
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>Overdue Student List</h2>
          <table>
            <thead>
              <tr><th>Student Name</th><th>Parent Contact</th><th>Amount Overdue</th><th>Action</th></tr>
            </thead>
            <tbody>
              {[
                ['Isaac Lim', '012-345-6789', '420.00'],
                ['Nur Aisha', '017-654-3210', '280.00'],
                ['Daniel Wong', '019-876-5432', '700.00'],
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{row[0]}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{row[1]}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--danger)' }}>RM {row[2]}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-whatsapp">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
