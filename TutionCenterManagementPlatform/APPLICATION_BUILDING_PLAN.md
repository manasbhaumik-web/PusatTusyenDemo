# Application Building Plan (ABP)
## Multi-Tenant Tuition Center Management Platform (TLMS)
### Derived from: PRD · UI/UX DRD · Database DRD · Security Doc · Frontend FRD · Backend BRD

---

| **Document Version** | 1.0.0 |
| **Status** | Execution Ready |
| **Estimated Total Duration** | **18 Months** (3 Phases × ~6 Months Each) |
| **Team Composition** | Full-Stack Lead (×1), Frontend Engineers (×2), Backend Engineers (×2), DevOps/Infra (×1), QA (×1), UI/UX Designer (×1) |
| **Tech Stack Locked** | Next.js 14+ / NestJS · PostgreSQL 16 (RLS) · Redis 7+ · BullMQ · shadcn/ui · TanStack Query v5 · Prisma ORM · Cloudflare |

---

## 1. Executive Build Overview

This Application Building Plan translates all 6 generated requirement documents into a concrete, milestone-driven engineering roadmap. It is organized into **3 strategic phases**:

```mermaid
gantt
    title TLMS Platform – 18-Month Build Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1 (Months 1-6): Infrastructure & Core
    Sprint 1: Project Setup & Monorepo Scaffold          :2026-10-01, 14d
    Sprint 2: Multi-Tenant Auth & RBAC Engine            :2026-10-15, 14d
    Sprint 3: Tenant Onboarding & White-Label Engine     :2026-11-01, 14d
    Sprint 4: Student CRM, QR Badge & Enrollment Funnel  :2026-11-15, 14d
    Sprint 5: Visual Timetable Scheduler & Conflict Check:2026-12-01, 14d
    Sprint 6: QR Kiosk Attendance & WhatsApp Alerts      :2026-12-15, 14d
    Sprint 7: Automated Invoicing & FPX Gateway          :2027-01-01, 14d
    Sprint 8: Branch Management & Admin Cockpit Dashboard:2027-01-15, 14d
    Sprint 9: Phase 1 QA, Security Audit & Penetration   :2027-02-01, 14d
    Sprint 10: Phase 1 Beta Release & Pilot Tenants      :2027-02-15, 14d
    section Phase 2 (Months 7-12): Operations & Intelligence
    Sprint 11-12: Parent & Student PWA Portal            :2027-03-01, 28d
    Sprint 13-14: Tutor Payroll & Commission Calculator  :2027-04-01, 28d
    Sprint 15-16: LMS Module & Video Replay Vault        :2027-05-01, 28d
    Sprint 17-18: Academic Performance & Diagnostic      :2027-06-01, 28d
    section Phase 3 (Months 13-18): Scale & SaaS
    Sprint 19-20: Multi-Branch Analytics & BI Dashboard  :2027-07-01, 28d
    Sprint 21-22: Stripe Global Payments & SaaS Billing  :2027-08-01, 28d
    Sprint 23-24: Enterprise Franchise Tier & White-Label:2027-09-01, 28d
    Sprint 25-26: Performance Hardening & ISO Compliance :2027-10-01, 28d
```

---

## 2. Sprint-by-Sprint Breakdown & Deliverables

---

### PHASE 1 — MONTHS 1–6: FOUNDATIONAL CORE & REVENUE ENGINE

> **Goal**: Deliver a working, secure multi-tenant admin console with student enrollment, attendance, and fee collection capability sufficient for a paying pilot tenant.

---

#### Sprint 1 (Days 1–14): Repository Architecture & Environment Setup

**Source Documents**: PRD §6 (Technical Architecture), FRD §2 (Directory Structure), BRD §1 (Architecture Layers)

| Task | Description | Owner |
| :--- | :--- | :--- |
| 1.1 | Initialize **pnpm monorepo** with Turborepo: packages `apps/web`, `apps/api`, `packages/db`, `packages/ui`, `packages/shared-types` | Full-Stack Lead |
| 1.2 | Configure **Next.js 14** with App Router, TypeScript strict mode, and Tailwind CSS with shadcn/ui | Frontend Engineer |
| 1.3 | Scaffold **NestJS** API project with modular architecture (Auth, Students, Schedules, Billing, Attendance) | Backend Engineer |
| 1.4 | Provision **PostgreSQL 16** instance with pgBouncer pool and **Redis 7** cluster via Docker Compose locally | DevOps |
| 1.5 | Set up **CI/CD pipeline** (GitHub Actions): lint → type-check → test → build → deploy to Vercel (web) / Railway or Fly.io (API) | DevOps |
| 1.6 | Implement **Sentry error tracking**, **Datadog/Axiom logging**, and **Uptime Kuma** monitoring | DevOps |

**Deliverable**: Empty but fully working local dev environment with passing CI pipeline.

---

#### Sprint 2 (Days 15–28): Multi-Tenant Authentication & RBAC Engine

**Source Documents**: Security Doc §2 (JWT Architecture), FRD §1 (Middleware Strategy), BRD §2.1 (Auth API)

| Task | Description | Owner |
| :--- | :--- | :--- |
| 2.1 | Implement **Next.js Edge Middleware** (`middleware.ts`) for subdomain & CNAME tenant resolution and internal path rewriting | Frontend Engineer |
| 2.2 | Build NestJS `AuthModule`: **Argon2id** password hashing, **RS256 JWT** signing (`jsonwebtoken`), 15-minute access token + HttpOnly refresh cookie rotation | Backend Engineer |
| 2.3 | Implement **Redis-backed brute-force rate limiter** on login endpoint (5 attempts → CAPTCHA → exponential backoff) | Backend Engineer |
| 2.4 | Build **NestJS RBAC Guard** reading `role` and `permissions` from JWT payload, enforcing at controller level | Backend Engineer |
| 2.5 | Create `users`, `user_sessions`, `token_blacklist` Prisma schemas with RLS policy scaffold | Backend Engineer |
| 2.6 | Build **Login, Forgot Password, and OTP Verification** screens in Next.js with tenant-aware branding | Frontend Engineer |

**Deliverable**: Secure login, JWT refresh, RBAC, multi-tenant session management, tested with >95% coverage.

---

#### Sprint 3 (Days 29–42): Tenant Onboarding & White-Label Branding Engine

**Source Documents**: PRD §2 (Multi-Tenancy), UI/UX DRD §3.2 (Tenant Theme Engine), BRD §2.2

| Task | Description | Owner |
| :--- | :--- | :--- |
| 3.1 | Build **self-service tenant registration flow**: Organization name, contact person, phone verification, subscription plan selection | Frontend + Backend |
| 3.2 | Implement **tenant slug** auto-generation and CNAME custom domain configuration with SSL provisioning (via Cloudflare API) | DevOps + Backend |
| 3.3 | Build **Branding Settings Screen**: Logo upload to Cloudflare R2, primary/accent color pickers, font selection | Frontend Engineer |
| 3.4 | Implement **TenantThemeProvider**: Injects CSS custom properties per tenant (`--tenant-primary`, `--tenant-accent`, `--tenant-radius`) on every page | Frontend Engineer |
| 3.5 | Build **Branch Creation & Management** screens (add, edit branches with address, phone, WhatsApp number) | Frontend + Backend |
| 3.6 | Enforce **PostgreSQL RLS policies** for all tenant-scoped tables from PRD Phase 1 schema | Backend Engineer |

**Deliverable**: Working self-serve tenant signup, per-tenant branded portals, multi-branch setup.

---

#### Sprint 4 (Days 43–56): Student CRM, QR Badge & Enrollment Funnel

**Source Documents**: PRD §4 Module 3, Database DRD §3.2 (students, parent_student_relations), FRD §3.1

| Task | Description | Owner |
| :--- | :--- | :--- |
| 4.1 | Build `students` Prisma schema + all related Prisma migrations: IC field-level encryption using KMS | Backend Engineer |
| 4.2 | Build **Student Registration Wizard** (3-step): Personal Details → Academic Level & Subjects → Parent Linking & Emergency Contacts | Frontend Engineer |
| 4.3 | Implement **Student Directory Table**: TanStack Table v8 with virtual scrolling, faceted filter panel, and column customization | Frontend Engineer |
| 4.4 | Build **Student Profile Slide-Over Drawer**: Academic info, balance summary, attendance streak, and direct WhatsApp link | Frontend Engineer |
| 4.5 | Generate printable **QR Badge PDFs** via Puppeteer: Student name, photo, branch, class list, QR token | Backend Worker |
| 4.6 | Build **Public Trial Class Booking Form** widget (embeddable iframe) for center landing pages | Frontend Engineer |

**Deliverable**: Full student CRM with search, enrollment, parent linking, and QR badge generation.

---

#### Sprint 5 (Days 57–70): Visual Drag-and-Drop Timetable Scheduler

**Source Documents**: PRD §4 Module 5, FRD §3.2 (Timetable Component), BRD §2.3

| Task | Description | Owner |
| :--- | :--- | :--- |
| 5.1 | Build `class_schedules`, `classrooms`, `subjects` Prisma schemas and seed KSSM/IGCSE subject catalogs | Backend Engineer |
| 5.2 | Implement **Visual Timetable Grid** with `@dnd-kit/core`: Room-by-Room, Tutor, and Grade views | Frontend Engineer |
| 5.3 | Build **Conflict Detection Engine** (API): validates room + tutor availability before slot creation | Backend Engineer |
| 5.4 | Implement **Class Slot Creation Modal**: Subject, tutor, room, time range, max capacity, Zoom link | Frontend Engineer |
| 5.5 | Build **Capacity Progress Indicator** component (`8/12 Students • 67% Available`) with color-coded states | Frontend Engineer |
| 5.6 | Integrate **Zoom / Google Meet OAuth link generator** via respective APIs (or manual URL entry fallback) | Backend Engineer |

**Deliverable**: Fully functional drag-and-drop timetable with conflict prevention and capacity tracking.

---

#### Sprint 6 (Days 71–84): QR Kiosk Attendance & WhatsApp Real-Time Alerts

**Source Documents**: PRD §4 Module 6, Database DRD §3.3 (attendance_logs), BRD §3 (BullMQ Workers)

| Task | Description | Owner |
| :--- | :--- | :--- |
| 6.1 | Build **Kiosk Camera QR Scanner Screen** (full-screen tablet mode, `html5-qrcode`, WebRTC 30FPS) | Frontend Engineer |
| 6.2 | Implement `POST /api/v1/attendance/kiosk-scan` endpoint: QR token lookup → attendance write → push to WhatsApp BullMQ queue | Backend Engineer |
| 6.3 | Build **WhatsApp BullMQ Worker** with Meta Cloud API integration, rate-limiter (20/sec), retry logic | Backend Engineer |
| 6.4 | Implement **WhatsApp message templates** for: check-in alert, class reminder, and absent warning | Backend Engineer |
| 6.5 | Build **Tutor Roster Attendance View**: Grid of enrolled students with Present / Late / Excused / Absent chips | Frontend Engineer |
| 6.6 | Build **Admin Attendance Reports**: Daily calendar heatmap, per-student attendance rate trend charts | Frontend Engineer |

**Deliverable**: Real-time kiosk attendance with instant WhatsApp parent alerts.

---

#### Sprint 7 (Days 85–98): Automated Invoicing & FPX Payment Gateway

**Source Documents**: PRD §4 Module 7, Database DRD §3.4 (invoices, payments), BRD §2.5

| Task | Description | Owner |
| :--- | :--- | :--- |
| 7.1 | Build `invoices`, `invoice_items`, `payments` Prisma schemas with audit trail triggers | Backend Engineer |
| 7.2 | Implement **Monthly Auto-Billing Cron Worker** (BullMQ Scheduler): Calculates prorated fees, creates invoice records at month start | Backend Engineer |
| 7.3 | Integrate **Billplz FPX + DuitNow QR API**: Generates 1-click payment links, implements HMAC-SHA256 webhook handler | Backend Engineer |
| 7.4 | Build **PDF Receipt Generator Worker**: Puppeteer renders branded receipt template, uploads to Cloudflare R2, returns 15-min signed URL | Backend Engineer |
| 7.5 | Build **Invoice Manager Screen**: Filterable table by status (Paid/Unpaid/Overdue), bulk WhatsApp reminder dispatcher | Frontend Engineer |
| 7.6 | Implement **Parent 1-Tap Payment Modal**: Invoice summary → Redirect to FPX banking → Auto-receipt WhatsApp on success | Frontend Engineer |

**Deliverable**: End-to-end automated monthly billing, FPX gateway, and PDF receipt system.

---

#### Sprint 8 (Days 99–112): Admin Cockpit Executive Dashboard

**Source Documents**: UI/UX DRD §6 Screen Surface 1, PRD §4 Module 13

| Task | Description | Owner |
| :--- | :--- | :--- |
| 8.1 | Build **Monthly Revenue Metric Tiles**: MRR, Collection Rate (%), Outstanding Fees, Active Students | Frontend Engineer |
| 8.2 | Build **Revenue Area Chart**: Monthly income trend using `recharts` or `tremor` | Frontend Engineer |
| 8.3 | Build **Live Today's Classes Widget**: Room utilization table with capacity and next class alerts | Frontend Engineer |
| 8.4 | Build **Unpaid Overdue Invoice Panel**: Quick one-click WhatsApp dispatch for overdue parents | Frontend Engineer |
| 8.5 | Implement **Global Command Palette** (`⌘K`): cmdk-powered search across students, invoices, schedules | Frontend Engineer |
| 8.6 | Implement **Branch Switcher Dropdown**: Allows multi-branch operators to toggle between branches or view aggregate | Frontend Engineer |

**Deliverable**: Complete executive admin dashboard with live telemetry and command search.

---

#### Sprint 9 (Days 113–126): Phase 1 Security Audit, QA & Load Testing

**Source Documents**: Security Doc §4 (OWASP Mitigations), Security Doc §7 (Audit Logging)

| Task | Description | Owner |
| :--- | :--- | :--- |
| 9.1 | Execute **OWASP Top 10 penetration testing checklist** (automated: OWASP ZAP + manual red-team spot checks) | QA + Full-Stack Lead |
| 9.2 | Validate **PostgreSQL RLS cross-tenant isolation**: Automated test suite attempting cross-tenant data reads | Backend Engineer |
| 9.3 | Run **k6 load tests**: Simulate 500 concurrent admin users + 1,000 parent portal sessions | DevOps |
| 9.4 | Validate **HMAC-SHA256 webhook signature verification** for all Billplz and Stripe endpoints | Backend Engineer |
| 9.5 | Implement **WCAG 2.2 AA accessibility audit** using axe-core on all admin screens | Frontend Engineer |
| 9.6 | Stress test **WhatsApp BullMQ queue** under 1,000 simultaneous attendance check-ins | Backend Engineer |

**Deliverable**: Signed security audit report. All critical OWASP issues resolved. Load test benchmarks met.

---

#### Sprint 10 (Days 127–140): Phase 1 Beta Release & Pilot Tenant Onboarding

| Task | Description | Owner |
| :--- | :--- | :--- |
| 10.1 | Provision **production environment** on Fly.io (API), Vercel (Web), Neon/Supabase (PostgreSQL), Upstash (Redis) | DevOps |
| 10.2 | Configure **Cloudflare WAF rules**, rate-limit IP firewall, and Bot Fight mode | DevOps |
| 10.3 | Onboard **2–3 pilot tuition centers** as Beta tenants with dedicated onboarding sessions | Full-Stack Lead |
| 10.4 | Implement **feedback collection**: in-app Intercom widget and weekly user interview pipeline | Product Lead |
| 10.5 | Set up **Stripe Billing SaaS subscriptions** for tenant monthly plans (Starter/Pro) | Backend Engineer |

**Deliverable**: Phase 1 live production release with paying pilot clients.

---

### PHASE 2 — MONTHS 7–12: OPERATIONS, ACADEMICS & MOBILE

> **Goal**: Deliver the Parent/Student PWA, tutor payroll, academic tracking, and LMS content module for full daily operational use.

| Sprint | Core Feature | Key Deliverables |
| :--- | :--- | :--- |
| **Sprint 11–12** | Parent & Student Mobile PWA Portal | Sibling switcher, live attendance timeline, 1-tap FPX/DuitNow checkout, offline caching via Service Workers |
| **Sprint 13–14** | Tutor Profile, Payroll & Commission Calculator | Tutor contracts, hourly/revenue-share payroll engine, monthly payslip PDF generator |
| **Sprint 15–16** | LMS Module & Cloudflare Stream Video Vault | Study material repository, watermarked video replay player, file category tree |
| **Sprint 17–18** | Academic Performance Tracking & PDF Report Cards | Quiz builder, grade ledger, diagnostic blind-spot matrix, Puppeteer-rendered branded term report cards |

---

### PHASE 3 — MONTHS 13–18: SCALE, FRANCHISE & SAAS GROWTH

> **Goal**: Multi-branch business intelligence, global payment (Stripe), enterprise franchise tier, performance engineering, and ISO compliance certification.

| Sprint | Core Feature | Key Deliverables |
| :--- | :--- | :--- |
| **Sprint 19–20** | Multi-Branch Analytics & Business Intelligence Dashboard | Cross-branch revenue comparison, student retention funnel, tutor utilization heatmaps |
| **Sprint 21–22** | Stripe Global Payments & Multi-Currency Support | SGD/USD support, Stripe Checkout, Apple Pay / Google Pay, SaaS platform Stripe Billing |
| **Sprint 23–24** | Enterprise Franchise Tier & Advanced White-Label | Custom CNAME auto-provisioning pipeline, feature flag management per tier, Franchise HQ hierarchy view |
| **Sprint 25–26** | Performance Hardening, ISO 27001 & SOC 2 Prep | Database query profiling, CDN edge caching, WCAG AAA, ISO 27001 gap assessment documentation |

---

## 3. Technology Stack Manifest

### Frontend
```
Next.js 14+          App Router SSR, Edge Middleware, Multi-Tenant Routing
React 19             Concurrent Mode, useOptimistic, Server Actions
TypeScript 5.5+      Strict Type Safety across Monorepo
Tailwind CSS 4       Utility-first with CSS Variables for Tenant Theming
shadcn/ui            Radix UI Primitives (Dialogs, Dropdowns, Drawers)
TanStack Query v5    Server State Cache, Optimistic Mutations
TanStack Table v8    Virtualized Data Tables with Faceted Filters
Zustand 5            Lightweight Client UI State
Framer Motion        Page Transitions, Micro-Interaction Animations
html5-qrcode         WebRTC Camera-based QR Scanner for Kiosk
Recharts / Tremor    Revenue & Attendance Charts
cmdk                 ⌘K Command Palette
next-pwa             PWA Manifest, Service Workers, Web Push
```

### Backend
```
NestJS 10+           Modular Architecture (Controllers, Services, Guards)
Node.js 20+ LTS      Runtime
PostgreSQL 16        Multi-Tenant Database with Row-Level Security
Prisma ORM 5         Type-safe DB Client, Migrations
Redis 7+             Session Store, Rate Limiting, Job Queue Backing
BullMQ 5             WhatsApp Queue, PDF Generator, Invoice Cron
Puppeteer            Server-side PDF Rendering (Receipts, Report Cards)
Billplz API          Malaysian FPX Online Banking Gateway
ToyyibPay / Curlec   DuitNow QR Gateway
Stripe               International Card Payments, SaaS Billing
Meta WhatsApp Cloud  Official WhatsApp Business Message API
```

### Infrastructure & DevOps
```
Cloudflare           WAF, DDoS Shield, R2 Object Storage, CDN, CNAME Proxy
Vercel               Next.js Frontend Deployment (Global Edge Network)
Fly.io / Railway     NestJS API Deployment (Docker Containers)
Neon / Supabase      Managed PostgreSQL 16 with Branching & Backups
Upstash Redis        Serverless Redis for Queue & Sessions
GitHub Actions       CI/CD: Lint → Test → Build → Deploy
Sentry               Error Monitoring & Performance Profiling
Datadog / Axiom      Centralized Logging & Infrastructure Metrics
```

---

## 4. Sprint Execution Standards & Engineering Practices

### 4.1 Definition of Done (DoD) — Per Sprint
Every sprint task is considered DONE only when ALL of the following are met:
- [ ] Unit tests written with **>85% code coverage** (Vitest / Jest).
- [ ] API endpoint documented in **Swagger / OpenAPI 3.1** specification.
- [ ] Code reviewed and approved by at least **1 peer engineer**.
- [ ] No HIGH or CRITICAL Snyk / Dependabot security vulnerability alerts.
- [ ] Feature verified manually on Desktop (1440px), Tablet (768px), and Mobile (375px).
- [ ] Immutable **audit_log** entry generated for all data-mutating operations.
- [ ] Merged to `main` branch through a **GitHub Pull Request** with passing CI.

### 4.2 Branch & Commit Strategy (Git Flow)
```
main          → Production-ready, protected, requires 2 approvals
staging       → Pre-release staging environment
develop       → Integration branch for completed sprints
feature/*     → Individual feature branches (e.g. feature/student-qr-kiosk)
fix/*         → Bug fix branches
hotfix/*      → Emergency production fixes
```

### 4.3 API Versioning Policy
All backend REST endpoints are prefixed with `/api/v1/...` and maintain backwards compatibility across minor versions. Breaking changes require a new major version `/api/v2/`.

---

## 5. Risk Register & Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| FPX / Billplz API Integration Delays | Medium | High | Parallel integration with ToyyibPay fallback. Mock payment in development. |
| Meta WhatsApp API Account Verification | Medium | High | Apply for Official WhatsApp Business Account early in Sprint 1. |
| Cross-Tenant RLS Data Leakage Bug | Low | Critical | Automated integration test suite runs cross-tenant isolation checks on every CI build. |
| PostgreSQL RLS Performance Overhead | Low | Medium | Benchmark RLS queries at 100k rows, add composite indexes, use pgBouncer. |
| Pilot Tenant Low Adoption Rate | Medium | Medium | Offer free 3-month pilot, dedicated onboarding session, weekly check-in support. |

---

## 6. Final Document Inventory & Cross-Reference Map

| Requirement Doc | Key Sections Referenced in This Plan |
| :--- | :--- |
| [PRD.md](./PRD.md) | §2 Multi-Tenancy, §3 RBAC, §4 All 13 Modules, §7 Roadmap |
| [UI_UX_DESIGN_REQUIREMENT.md](./UI_UX_DESIGN_REQUIREMENT.md) | §3 Design Tokens, §4 Typography, §6 All 6 Screen Surfaces |
| [DATABASE_REQUIREMENT.md](./DATABASE_REQUIREMENT.md) | §2 ERD, §3 All Table Schemas, §4 Indexes, §5 RLS Policies |
| [APPLICATION_SECURITY.md](./APPLICATION_SECURITY.md) | §2 JWT Auth, §3 Encryption, §4 OWASP Matrix, §6 PDPA, §7 Audit Logs |
| [FRONTEND_REQUIREMENT.md](./FRONTEND_REQUIREMENT.md) | §2 Directory, §3 Screen Modules, §4 State Management, §5 Performance |
| [BACKEND_REQUIREMENT.md](./BACKEND_REQUIREMENT.md) | §2 All REST APIs, §3 BullMQ Workers, §4 Response Envelope, §5 Error Handling |

---

*Application Building Plan — Owned by Product Engineering Leadership. Reviewed Sprint-by-Sprint.*
