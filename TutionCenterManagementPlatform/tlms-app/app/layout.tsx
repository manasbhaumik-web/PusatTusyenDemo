import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TLMS — Tuition Center Management Platform',
  description: 'Multi-Tenant Tuition Center Management System',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
