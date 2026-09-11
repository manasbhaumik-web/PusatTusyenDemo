# System Architecture Document (SAD)
## Multi-Tenant Tuition Center Management Platform (TLMS)

---

| **Version** | 1.0.0 |
|---|---|
| **Status** | Approved — Engineering Reference |
| **Classification** | Internal — Engineering & Architecture Team |
| **Last Updated** | September 2026 |
| **Derived From** | PRD · Database DRD · Security Doc · Frontend FRD · Backend BRD |

---

## Table of Contents

1. [Architecture Philosophy & Guiding Principles](#1-architecture-philosophy--guiding-principles)
2. [System Context Diagram (C4 Level 1)](#2-system-context-diagram-c4-level-1)
3. [Container Diagram (C4 Level 2)](#3-container-diagram-c4-level-2)
4. [Component Diagram (C4 Level 3)](#4-component-diagram-c4-level-3)
5. [Multi-Tenancy Architecture](#5-multi-tenancy-architecture)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Backend API Architecture](#7-backend-api-architecture)
8. [Database Architecture](#8-database-architecture)
9. [Background Jobs & Queue Architecture](#9-background-jobs--queue-architecture)
10. [Authentication & Authorization Architecture](#10-authentication--authorization-architecture)
11. [Payment Processing Architecture](#11-payment-processing-architecture)
12. [File Storage & Media Architecture](#12-file-storage--media-architecture)
13. [Real-Time & Event Architecture](#13-real-time--event-architecture)
14. [Infrastructure & Deployment Architecture](#14-infrastructure--deployment-architecture)
15. [Networking & Security Perimeter](#15-networking--security-perimeter)
16. [Observability Architecture](#16-observability-architecture)
17. [Disaster Recovery & Business Continuity](#17-disaster-recovery--business-continuity)
18. [Architecture Decision Records (ADRs)](#18-architecture-decision-records-adrs)

---

## 1. Architecture Philosophy & Guiding Principles

The TLMS platform is designed around **five core architectural principles** that govern every technical decision:

### 1.1 Principle Matrix

| # | Principle | Statement | Trade-Off Accepted |
|---|---|---|---|
| P-01 | **Tenant Isolation First** | No data from Tenant A must ever be accessible by Tenant B — at the database, cache, API, or CDN layer. | Slight complexity overhead in query construction. |
| P-02 | **Malaysia-Operational by Default** | All defaults — timezone (MYT/UTC+8), currency (MYR), language (Malay/English), payment (FPX/DuitNow) — are Malaysia-first. | Extra configuration required for international tenants. |
| P-03 | **Async Over Sync for Side-Effects** | WhatsApp alerts, PDF generation, invoice creation, and email notifications are always dispatched to a BullMQ job queue, never inline in API request handlers. | Eventual consistency on notifications (seconds delay). |
| P-04 | **Progressive Trust Security** | Every request is treated as untrusted by default. Authentication → Tenant Resolution → RBAC Authorization → RLS Policy — all must pass in sequence. | Adds latency overhead (mitigated by Redis session caching). |
| P-05 | **SaaS-First Multi-Tenant Monetisation** | The platform is built as a software product, not a bespoke service. Every feature must be tenant-scoped, plan-tiered, and metered from day one. | More upfront schema complexity vs. simple single-tenant builds. |

---

## 2. System Context Diagram (C4 Level 1)

> **Who** uses the TLMS system and **what external systems** does it integrate with?

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        TLMS PLATFORM — SYSTEM BOUNDARY                             │
│                                                                                     │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐     ┌────────────┐  │
│   │  Center      │      │  Tutor       │      │  Parent /    │     │  Franchise │  │
│   │  Admin       │      │  (Web)       │      │  Student     │     │  HQ Admin  │  │
│   │              │      │              │      │  (PWA)       │     │            │  │
│   └──────┬───────┘      └──────┬───────┘      └──────┬───────┘     └─────┬──────┘  │
│          │                     │                     │                   │          │
│          └─────────────────────┴─────────────────────┴───────────────────┘          │
│                                            │                                        │
│                                  ┌─────────▼──────────┐                            │
│                                  │   TLMS APPLICATION  │                            │
│                                  │   (Next.js + NestJS)│                            │
│                                  └─────────┬──────────┘                            │
│                                            │                                        │
│          ┌─────────────────────────────────┼──────────────────────────────────┐    │
│          │                                 │                                  │    │
│   ┌──────▼───────┐  ┌──────────────┐ ┌────▼───────────┐  ┌─────────────────┐ │    │
│   │  Meta        │  │  Billplz /   │ │  Cloudflare    │  │  Zoom / Google  │ │    │
│   │  WhatsApp    │  │  Stripe      │ │  R2 / CDN      │  │  Meet OAuth     │ │    │
│   │  Cloud API   │  │  (Payments)  │ │  (Storage/WAF) │  │  (Class Links)  │ │    │
│   └──────────────┘  └──────────────┘ └────────────────┘  └─────────────────┘ │    │
│                                                                                │    │
└────────────────────────────────────────────────────────────────────────────────┘    │
```

### External Systems Integration Summary

| System | Purpose | Protocol | Auth Method |
|---|---|---|---|
| Meta WhatsApp Cloud API | Parent/student real-time notifications | HTTPS REST | Bearer Token (App Secret) |
| Billplz | FPX online banking payment gateway (Malaysia) | HTTPS REST + Webhooks | API Key + HMAC-SHA256 |
| ToyyibPay / Curlec | DuitNow QR payment gateway | HTTPS REST + Webhooks | API Key + HMAC-SHA256 |
| Stripe | International card payments + SaaS billing | HTTPS REST + Webhooks | Secret Key + Webhook Signing Secret |
| Cloudflare R2 | Object storage for receipts, photos, LMS files | S3-compatible API | Access Key + Secret |
| Cloudflare CDN | Asset delivery, WAF, DDoS protection | Transparent Proxy | Zone API Token |
| Zoom API | Generate meeting links for online classes | HTTPS REST + OAuth 2.0 | OAuth Server-to-Server |
| Google Meet | Alternative meeting link generation | Google Workspace API | Service Account JWT |
| Sentry | Error tracking and performance monitoring | HTTPS + SDK | DSN / Auth Token |
| Datadog / Axiom | Log aggregation and infrastructure metrics | HTTPS | API Key |

---

## 3. Container Diagram (C4 Level 2)

> **What** are the deployable units and how do they communicate?

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              TLMS PLATFORM — CONTAINER VIEW                            │
│                                                                                         │
│  ┌──────────────────────────────┐          ┌──────────────────────────────────────────┐ │
│  │     EDGE LAYER (Cloudflare)  │          │         FRONTEND CONTAINERS              │ │
│  │                              │          │                                          │ │
│  │  WAF  →  Rate Limiter        │◄────────►│  ┌────────────────────────────────────┐ │ │
│  │  DDoS Shield → Bot Fight     │          │  │   Admin Web App (Next.js 14+)      │ │ │
│  │  CDN Cache → CNAME Routing   │          │  │   Vercel Edge Network              │ │ │
│  │  SSL/TLS Termination         │          │  │   Port: 443 (HTTPS)                │ │ │
│  └──────────────────────────────┘          │  │   Tenant: subdomain / CNAME        │ │ │
│                                            │  └────────────────────────────────────┘ │ │
│                                            │  ┌────────────────────────────────────┐ │ │
│                                            │  │   Parent & Student PWA (Next.js)   │ │ │
│                                            │  │   Vercel Edge + Service Worker     │ │ │
│                                            │  │   Web Push Notifications (VAPID)   │ │ │
│                                            │  └────────────────────────────────────┘ │ │
│                                            │  ┌────────────────────────────────────┐ │ │
│                                            │  │   Kiosk Attendance App (Next.js)   │ │ │
│                                            │  │   Fullscreen PWA on Tablet         │ │ │
│                                            │  │   QR Camera Scanner (WebRTC)       │ │ │
│                                            │  └────────────────────────────────────┘ │ │
│                                            └──────────────────────────────────────────┘ │
│                                                            │ HTTPS / REST                │
│                                            ┌──────────────▼───────────────────────────┐ │
│                                            │        API GATEWAY CONTAINER             │ │
│                                            │        NestJS 10 on Fly.io              │ │
│                                            │        Port: 443 (HTTPS)                │ │
│                                            │        Prefix: /api/v1/*                │ │
│                                            └──────────────┬───────────────────────────┘ │
│                                                           │                             │
│        ┌─────────────┬───────────────┬───────────────────┤                             │
│        │             │               │                   │                             │
│  ┌─────▼──────┐ ┌────▼─────┐  ┌─────▼──────┐  ┌────────▼───────────────────────────┐ │
│  │ PostgreSQL │ │  Redis   │  │  BullMQ    │  │    Cloudflare R2 Object Store      │ │
│  │ 16 (Neon/  │ │  7+      │  │  Job Queue │  │    (Receipts / Photos / LMS Files) │ │
│  │ Supabase)  │ │ (Upstash)│  │  Workers   │  └────────────────────────────────────┘ │
│  │  RLS Enabled│ │  Sessions│  │  (Fly.io)  │                                         │
│  └────────────┘ └──────────┘  └────────────┘                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Inter-Container Communication

| From | To | Protocol | Auth |
|---|---|---|---|
| Next.js Frontend | NestJS API | HTTPS/REST | JWT Bearer Token |
| NestJS API | PostgreSQL | TCP (TLS) | Connection String + SSL cert |
| NestJS API | Redis | TLS | ACL Password |
| NestJS API | BullMQ Workers | Redis-backed Queue | Shared Redis instance |
| NestJS API | Cloudflare R2 | HTTPS S3 API | Access Key + Secret |
| BullMQ Workers | Meta WhatsApp | HTTPS REST | Bearer Token |
| BullMQ Workers | Billplz / Stripe | HTTPS REST | API Key |
| Kiosk App | NestJS API | HTTPS/REST | Device JWT (Kiosk Role) |

---

## 4. Component Diagram (C4 Level 3)

### 4.1 NestJS API — Internal Module Structure

```
NestJS Application
├── AppModule (Root)
│   ├── CoreModule (Global)
│   │   ├── TenantContextModule       ← Resolves tenant from JWT/subdomain, sets RLS context
│   │   ├── AuthModule                ← Login, Refresh, Logout, OTP, Password Reset
│   │   ├── AuditLogModule            ← Immutable write-only audit trail (all mutations)
│   │   └── HealthModule              ← /health Kubernetes liveness & readiness probes
│   │
│   ├── AdminModule
│   │   ├── TenantsModule             ← Tenant CRUD, plan management, feature flags
│   │   ├── UsersModule               ← Staff accounts, role assignment, deactivation
│   │   └── BranchesModule            ← Branch create/update/switch, CNAME management
│   │
│   ├── AcademicsModule
│   │   ├── StudentsModule            ← Student CRUD, QR token, IC encryption
│   │   ├── ParentsModule             ← Parent link, WhatsApp opt-in, sibling group
│   │   ├── SubjectsModule            ← KSSM/IGCSE catalog, custom subject definitions
│   │   ├── ClassesModule             ← Schedule CRUD, conflict engine, capacity tracking
│   │   └── EnrollmentsModule         ← Student-class assignments, waitlist management
│   │
│   ├── AttendanceModule
│   │   ├── KioskScanModule           ← QR scan endpoint, check-in/out logic
│   │   ├── AttendanceLogsModule      ← CRUD, tutor roster view, bulk mark
│   │   └── AlertsDispatchModule      ← Enqueue WhatsApp alert after successful scan
│   │
│   ├── FinanceModule
│   │   ├── InvoicesModule            ← Auto-generate monthly, prorated fee calculations
│   │   ├── PaymentsModule            ← FPX/DuitNow/Stripe payment intent, webhook handler
│   │   ├── ReceiptsModule            ← PDF generation trigger, signed URL delivery
│   │   └── DiscountsModule           ← Sibling discount, scholarship, one-time adjustments
│   │
│   ├── HRModule
│   │   ├── TutorsModule              ← Tutor profile, subjects, branch assignments
│   │   └── PayrollModule             ← Monthly payslip calculation, PDF export
│   │
│   ├── LMSModule
│   │   ├── MaterialsModule           ← File upload to R2, category management
│   │   └── VideoVaultModule          ← Cloudflare Stream integration, access control
│   │
│   ├── ReportsModule
│   │   ├── AcademicReportsModule     ← Grade entries, report card PDF rendering
│   │   └── AnalyticsModule           ← Revenue trend, retention, utilization aggregates
│   │
│   └── WorkersModule
│       ├── WhatsAppWorker            ← BullMQ consumer, Meta API dispatcher (concurrency: 10)
│       ├── PdfWorker                 ← Puppeteer renderer, R2 uploader (concurrency: 3)
│       ├── InvoiceCronWorker         ← Monthly BullMQ scheduler, auto-invoice generator
│       └── ReminderCronWorker        ← 3-day, 1-day, day-of class reminder dispatcher
```

### 4.2 Next.js Frontend — Internal Module Structure

```
Next.js Application (App Router)
├── app/
│   ├── (auth)/                       ← Public auth routes (no tenant required)
│   │   ├── login/
│   │   ├── forgot-password/
│   │   └── verify-otp/
│   │
│   ├── (admin)/                      ← Protected admin routes (Admin/Manager roles)
│   │   ├── dashboard/                ← Executive metrics + live class widget
│   │   ├── students/                 ← Directory table, profile drawer, enrollment
│   │   ├── timetable/                ← Drag-and-drop visual scheduler grid
│   │   ├── attendance/               ← Roster view, daily heatmap reports
│   │   ├── finance/
│   │   │   ├── invoices/             ← Invoice manager + bulk WhatsApp dispatch
│   │   │   └── payments/             ← Payment history + gateway logs
│   │   ├── staff/                    ← Tutor profiles, payroll
│   │   ├── lms/                      ← Material library, video vault
│   │   ├── reports/                  ← Academic reports, analytics BI
│   │   └── settings/                 ← Branding, branches, integrations
│   │
│   ├── (parent)/                     ← Parent/Student PWA routes
│   │   ├── home/                     ← Sibling switcher + attendance timeline
│   │   ├── schedule/                 ← Class timetable + Zoom links
│   │   ├── fees/                     ← Invoice + 1-tap FPX payment
│   │   └── reports/                  ← Academic progress + report cards
│   │
│   └── kiosk/                        ← Tablet kiosk (no auth, device JWT)
│       └── scan/                     ← Full-screen QR camera scanner
│
├── components/
│   ├── ui/                           ← shadcn/ui base components (Button, Dialog, etc.)
│   ├── charts/                       ← Recharts/Tremor chart wrappers
│   ├── tables/                       ← TanStack Table v8 virtualized tables
│   ├── forms/                        ← React Hook Form + Zod validation composites
│   └── shared/                       ← CommandPalette, BranchSwitcher, TenantThemeProvider
│
├── hooks/                            ← TanStack Query custom hooks (useStudents, useInvoices…)
├── lib/                              ← API client (Axios), formatters, date utils
├── store/                            ← Zustand stores (UI state, kiosk device state)
└── middleware.ts                     ← Edge Middleware: Tenant resolution, RBAC route guard
```

---

## 5. Multi-Tenancy Architecture

### 5.1 Tenant Isolation Model

The platform uses a **Shared Database + Shared Schema** model with **PostgreSQL Row-Level Security (RLS)** as the isolation enforcement mechanism.

```
┌────────────────────────────────────────────────────────────┐
│                TENANT ISOLATION LAYER STACK                │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Layer 1: Edge (Cloudflare)                          │  │
│  │  CNAME / Subdomain → Tenant Slug Resolution          │  │
│  │  WAF rules block cross-tenant session cookie reuse   │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                  │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  Layer 2: Next.js Edge Middleware                    │  │
│  │  Extracts tenant_slug from host header               │  │
│  │  Verifies JWT tenant_id claim matches host           │  │
│  │  Redirects mismatches to login                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                  │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  Layer 3: NestJS TenantContextGuard                  │  │
│  │  Decodes JWT → extracts tenant_id                    │  │
│  │  Sets request-scoped tenant context                  │  │
│  │  Injects into all downstream services               │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                  │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  Layer 4: Prisma Middleware (DB Session Setup)        │  │
│  │  SET LOCAL app.current_tenant_id = '<uuid>';         │  │
│  │  Runs before every transaction                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                  │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  Layer 5: PostgreSQL Row-Level Security (RLS)         │  │
│  │  POLICY: USING (tenant_id = current_setting(         │  │
│  │          'app.current_tenant_id')::uuid)              │  │
│  │  Applied to ALL tenant-scoped tables                 │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

### 5.2 Tenant Routing Model

| Routing Type | Pattern | Example | When Used |
|---|---|---|---|
| **Subdomain** | `{slug}.tlms.app` | `solaris.tlms.app` | Default SaaS tenants |
| **Custom CNAME** | `manage.solaris.edu.my` | Client's own domain | Pro & Enterprise tier |
| **Path-Based (Dev)** | `localhost:3000/t/{slug}` | Development only | Local testing |

### 5.3 Tenant Tier Feature Flags

| Feature | Starter | Pro | Enterprise |
|---|---|---|---|
| Branches | 1 | Up to 5 | Unlimited |
| Custom CNAME | ✗ | ✓ | ✓ |
| LMS Video Vault | ✗ | ✓ | ✓ |
| Franchise HQ View | ✗ | ✗ | ✓ |
| API Access | ✗ | ✗ | ✓ |
| White-Label Branding | ✗ | Partial | Full |

---

## 6. Frontend Architecture

### 6.1 Rendering Strategy

| Route Type | Strategy | Reason |
|---|---|---|
| Admin Dashboard (metrics) | **ISR** (60s revalidation) | Low-latency metrics without full SSR cost |
| Student Directory | **Server Component + Streaming** | Large tables rendered on server with React Suspense |
| Invoice Manager | **Server Component** | Sensitive financial data — no client-side exposure |
| Timetable Grid | **Client Component** | Requires drag-and-drop interactivity (`@dnd-kit`) |
| Kiosk Scanner | **Client Component** | WebRTC camera access requires browser APIs |
| Login / Auth Pages | **Static + Edge** | Fastest delivery for unauthenticated routes |
| Parent PWA | **Client + Service Worker** | Offline capability required for intermittent network |

### 6.2 State Management Architecture

```
┌─────────────────────────────────────────────────────────┐
│               STATE MANAGEMENT LAYERS                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  SERVER STATE — TanStack Query v5               │   │
│  │  useStudents(), useInvoices(), useSchedule()    │   │
│  │  Automatic caching, background refetch,         │   │
│  │  optimistic mutations, query invalidation       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  CLIENT UI STATE — Zustand 5                    │   │
│  │  CommandPalette open/closed                     │   │
│  │  Branch switcher selection                      │   │
│  │  Kiosk device mode, last scanned student        │   │
│  │  Sidebar collapse state, active filters         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  FORM STATE — React Hook Form + Zod             │   │
│  │  Student registration wizard state              │   │
│  │  Invoice creation multi-step form               │   │
│  │  Settings / branding forms                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  URL STATE — Next.js searchParams + nuqs        │   │
│  │  Table filters (status, date range, branch)     │   │
│  │  Pagination cursor                              │   │
│  │  Active tab / view mode                         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Performance Architecture

| Technique | Implementation | Target Metric |
|---|---|---|
| Code Splitting | Next.js automatic + dynamic imports | Initial JS bundle < 200 KB |
| Image Optimization | `next/image` with Cloudflare CDN | LCP < 2.5s |
| Font Loading | `next/font` preloaded, font-display: swap | CLS = 0 |
| Table Virtualization | TanStack Virtual rows in Student Directory | 10,000+ rows at 60fps |
| Prefetching | `<Link prefetch={true}>` on high-traffic routes | Sub-100ms navigation |
| Service Worker Cache | next-pwa: Cache API responses + static assets | Offline fallback for Parent PWA |

---

## 7. Backend API Architecture

### 7.1 Request Lifecycle

```
Incoming HTTPS Request
         │
         ▼
┌─────────────────────┐
│  Cloudflare WAF     │  ← IP reputation, rate limit (1000 req/min/IP), Bot Fight
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  NestJS Global      │  ← CORS (tenant-aware origin whitelist)
│  Middleware         │  ← Helmet.js security headers
│                     │  ← Request ID injection (UUID v4)
│                     │  ← Request/Response logger (Axiom)
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  AuthGuard          │  ← Validates RS256 JWT signature
│                     │  ← Checks token blacklist in Redis
│                     │  ← Extracts user_id, tenant_id, role, permissions
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  TenantContextGuard │  ← Sets request-scoped tenant context
│                     │  ← Validates subscription plan is active
│                     │  ← Checks feature flag for requested module
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  RBACGuard          │  ← Evaluates @Roles(), @Permissions() decorators
│                     │  ← Throws 403 if insufficient privilege
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Zod Validation     │  ← Validates & parses DTO (request body / query params)
│  Pipe              │  ← Strips unknown fields, transforms types
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Controller Handler │  ← Delegates to Service
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Service Layer      │  ← Business logic, transaction orchestration
│                     │  ← Enqueues async jobs to BullMQ if needed
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Prisma ORM         │  ← Issues SET LOCAL for RLS context
│  (with RLS setup    │  ← Executes parameterized SQL query
│   middleware)       │  ← Returns typed Prisma model objects
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  AuditLog Service   │  ← Writes immutable audit entry for mutations
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Response           │  ← Serialized via class-transformer
│  Interceptor        │  ← Wrapped in envelope: {success, data, meta}
└────────┬────────────┘
         │
         ▼
     HTTPS Response
```

### 7.2 Standard API Response Envelope

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 487,
    "requestId": "req_01J..."
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "STUDENT_NOT_FOUND",
    "message": "Student with ID xxx does not exist in this tenant.",
    "statusCode": 404,
    "requestId": "req_01J..."
  }
}
```

---

## 8. Database Architecture

### 8.1 Schema Organization

```
PostgreSQL 16 — Single Database (tlms_production)
│
├── public schema (shared/system tables)
│   ├── tenants                    ← Tenant registry (slug, plan, CNAME, branding)
│   ├── tenant_feature_flags       ← Per-tenant feature toggles
│   └── platform_audit_logs        ← Super-admin platform events
│
└── app schema (all RLS-protected tenant tables)
    ├── Identity & Access
    │   ├── users                  ← Staff accounts (admin, manager, tutor, receptionist)
    │   ├── user_sessions          ← Active refresh token records
    │   └── token_blacklist        ← Revoked JWT jti records
    │
    ├── Academic Core
    │   ├── students               ← Student profiles (IC encrypted, QR token)
    │   ├── parents                ← Parent contacts (WhatsApp opt-in)
    │   ├── parent_student_relations ← Many-to-many with relationship type
    │   ├── subjects               ← Subject catalog (KSSM/IGCSE/custom)
    │   ├── classrooms             ← Physical/virtual room registry
    │   ├── class_schedules        ← Time slots (room, tutor, subject, capacity)
    │   └── enrollments            ← Student-class assignments (active, waitlist, dropped)
    │
    ├── Attendance
    │   ├── attendance_logs        ← Check-in records (QR kiosk or manual)
    │   └── attendance_alerts_log  ← WhatsApp alert delivery audit
    │
    ├── Finance
    │   ├── invoices               ← Monthly invoice headers
    │   ├── invoice_items          ← Line items (class fee, registration, materials)
    │   ├── discounts              ← Sibling, scholarship, promotion discounts
    │   ├── payments               ← Payment transactions (FPX, DuitNow, Stripe)
    │   └── receipts               ← PDF receipt R2 path + signed URL cache
    │
    ├── HR & Staff
    │   ├── tutors                 ← Tutor profiles (linked to users)
    │   ├── tutor_subject_assignments ← Which subjects a tutor is qualified for
    │   └── payroll_records        ← Monthly payslip calculations
    │
    ├── LMS
    │   ├── lms_categories         ← Folder tree for materials
    │   ├── lms_materials          ← File records (R2 path, type, access control)
    │   └── video_sessions         ← Cloudflare Stream video IDs + access control
    │
    ├── Branch Management
    │   └── branches               ← Branch profiles (address, WhatsApp, operational hours)
    │
    └── Audit
        └── audit_logs             ← Immutable per-tenant change history
```

### 8.2 Key Database Patterns

#### RLS Policy Example
```sql
-- Enforced on every tenant-scoped table
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON students
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Prisma middleware sets context before each query:
-- SET LOCAL app.current_tenant_id = '${req.tenantId}';
```

#### Prisma Transaction Pattern
```typescript
async createInvoiceWithItems(dto: CreateInvoiceDto, ctx: TenantContext) {
  return this.prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SET LOCAL app.current_tenant_id = ${ctx.tenantId}`;
    const invoice = await tx.invoice.create({ data: { ...dto } });
    await tx.invoiceItem.createMany({ data: dto.items.map(i => ({ ...i, invoiceId: invoice.id })) });
    await tx.auditLog.create({ data: { action: 'invoice.created', entityId: invoice.id, ...ctx } });
    return invoice;
  });
}
```

### 8.3 Indexing Strategy

| Table | Index | Purpose |
|---|---|---|
| students | `(tenant_id, status)` | Directory filtering |
| students | `qr_code_token` UNIQUE | Kiosk scan O(1) lookup |
| class_schedules | `(tenant_id, branch_id, day_of_week, start_time)` | Conflict detection |
| attendance_logs | `(enrollment_id, checked_in_at DESC)` | Per-student history |
| invoices | `(tenant_id, status, due_date)` | Overdue invoice queries |
| payments | `(gateway_reference) UNIQUE` | Idempotent webhook dedup |
| audit_logs | `(tenant_id, created_at DESC)` | Audit trail pagination |

---

## 9. Background Jobs & Queue Architecture

### 9.1 BullMQ Queue Topology

```
Redis 7 (Upstash)
│
├── Queue: whatsapp-notifications
│   ├── Worker: WhatsAppWorker (concurrency: 10, rate: 20/sec)
│   ├── Jobs: check-in-alert | class-reminder | invoice-reminder | payment-receipt
│   ├── Retry: 3 attempts with exponential backoff (1s → 4s → 16s)
│   └── DLQ: whatsapp-notifications-failed (alert on > 10 failures/hour)
│
├── Queue: pdf-generation
│   ├── Worker: PdfWorker (concurrency: 3)
│   ├── Jobs: generate-receipt | generate-report-card | generate-payslip | generate-qr-badge
│   ├── Retry: 2 attempts
│   └── Timeout: 30 seconds per job
│
├── Queue: invoice-scheduler (Cron)
│   ├── Schedule: 0 0 1 * * (1st of every month, midnight MYT)
│   ├── Job: generate-monthly-invoices (bulk, per tenant)
│   └── Fan-out: Spawns N individual invoice-generation jobs per active student
│
└── Queue: reminder-scheduler (Cron)
    ├── Schedule: 0 8 * * * (daily 8 AM MYT)
    ├── Jobs: upcoming-class-reminders | overdue-invoice-reminders
    └── Dedup: Uses BullMQ jobId = `reminder-${studentId}-${scheduleId}-${date}`
```

### 9.2 WhatsApp Worker Detail

```typescript
// Rate-limited, retry-safe WhatsApp dispatcher
@Processor('whatsapp-notifications', { concurrency: 10 })
export class WhatsAppWorker {
  async process(job: Job<WhatsAppJobDto>) {
    const { to, templateName, components, tenantId } = job.data;
    const credentials = await this.tenantCredentialService.getWhatsAppCreds(tenantId);

    await this.rateLimiter.consume(tenantId, 1); // 20/sec per tenant

    const response = await this.metaApiClient.sendTemplate({
      to, template: { name: templateName, components }
    }, credentials.whatsappToken);

    await this.alertsLogService.record({ jobId: job.id, to, status: 'sent', tenantId });
    return response;
  }
}
```

---

## 10. Authentication & Authorization Architecture

### 10.1 JWT Token Architecture

```
Access Token (RS256, 15 minutes)
Payload:
{
  "sub": "user_01J...",
  "tenant_id": "tenant_01J...",
  "role": "admin",
  "permissions": ["students:write", "invoices:read", "reports:read"],
  "branch_ids": ["branch_01J...", "branch_01J..."],
  "jti": "tok_01J...",        ← Token ID for blacklist lookup
  "iat": 1720000000,
  "exp": 1720000900           ← 15 minutes
}

Refresh Token (Opaque, 30 days)
- Stored as HttpOnly, SameSite=Strict, Secure cookie
- Hashed SHA-256 stored in user_sessions table
- Rotated on each use (sliding expiry)
- Invalidated on: logout, password change, role change, suspicious IP
```

### 10.2 RBAC Permission Matrix

| Permission Scope | Super Admin | Center Admin | Manager | Tutor | Receptionist | Parent |
|---|---|---|---|---|---|---|
| tenants:manage | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| users:write | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| students:write | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| students:read | ✓ | ✓ | ✓ | ✓ (own class) | ✓ | own child |
| schedules:write | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| attendance:write | ✓ | ✓ | ✓ | ✓ (own class) | ✓ | ✗ |
| invoices:write | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| payments:refund | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| reports:read | ✓ | ✓ | ✓ | partial | ✗ | own child |
| payroll:read | ✓ | ✓ | ✗ | own | ✗ | ✗ |
| lms:write | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| settings:write | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## 11. Payment Processing Architecture

### 11.1 FPX / DuitNow Payment Flow (Malaysia Primary)

```
Parent clicks "Pay Now"
        │
        ▼
┌───────────────────┐
│  POST /payments/  │  ← Creates pending payment record
│  initiate         │  ← Generates Billplz bill URL
└────────┬──────────┘
         │ Redirect URL returned
         ▼
┌───────────────────┐
│  Parent's FPX     │  ← Parent selects bank, authenticates
│  Banking Portal   │  ← (e.g., Maybank2u, CIMB Clicks)
└────────┬──────────┘
         │ Callback to Billplz → Billplz webhook to TLMS
         ▼
┌───────────────────┐
│  POST /webhooks/  │  ← HMAC-SHA256 signature verification
│  billplz          │  ← Idempotency check (payment.gateway_reference UNIQUE)
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  PaymentService   │  ← Marks invoice as PAID
│                   │  ← Enqueues: PDF receipt generation
│                   │  ← Enqueues: WhatsApp payment confirmation
└───────────────────┘
```

### 11.2 Webhook Security

```typescript
// HMAC-SHA256 constant-time verification for all payment webhooks
verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}
```

---

## 12. File Storage & Media Architecture

### 12.1 Cloudflare R2 Bucket Structure

```
tlms-production (R2 Bucket)
├── tenants/
│   └── {tenant_id}/
│       ├── branding/
│       │   └── logo.png                    ← Tenant logo (public CDN)
│       ├── students/
│       │   └── {student_id}/
│       │       └── photo.jpg               ← Student photo (private, signed URL)
│       ├── receipts/
│       │   └── {invoice_id}/receipt.pdf    ← Payment receipts (private, 15-min signed URL)
│       ├── payslips/
│       │   └── {payroll_id}/payslip.pdf    ← Tutor payslips (private)
│       ├── report-cards/
│       │   └── {student_id}/{term}.pdf     ← Academic reports (private)
│       ├── lms/
│       │   ├── materials/
│       │   │   └── {category_id}/{file}    ← Study materials (role-gated)
│       │   └── thumbnails/                 ← Video thumbnails
│       └── qr-badges/
│           └── {student_id}/badge.pdf      ← QR badge PDF (private)
```

### 12.2 Access Control Model

| Asset Type | Access Model | URL Lifetime |
|---|---|---|
| Tenant logo / branding | Public CDN URL | Permanent |
| Student photo | Private — Admin/Tutor only | 1 hour signed URL |
| Payment receipt | Private — Parent (own) / Admin | 15 min signed URL |
| LMS materials | Private — Enrolled student or Admin | 1 hour signed URL |
| Report cards | Private — Parent (own child) / Admin | 1 hour signed URL |
| QR badge PDF | Private — Admin print only | 30 min signed URL |

---

## 13. Real-Time & Event Architecture

### 13.1 Real-Time Features

| Feature | Technology | Push Mechanism |
|---|---|---|
| Kiosk attendance confirmation | Server-Sent Events (SSE) | Kiosk polls SSE stream for scan results |
| Admin dashboard live metrics | SWR / TanStack Query polling (30s) | Background refetch |
| Parent WhatsApp notification | BullMQ → Meta WhatsApp Cloud API | Push via WhatsApp |
| Parent PWA Web Push | Web Push API (VAPID) | Service Worker push event |
| Invoice payment status update | Webhook → TanStack Query invalidation | Optimistic UI update |

### 13.2 Kiosk Real-Time Scan Flow

```
Kiosk Camera scans QR code
         │
         ▼ HTTP POST (< 500ms)
POST /api/v1/attendance/kiosk-scan
{ qrToken: "qr_abc123", branchId: "..." }
         │
         ▼ Parallel execution
┌────────┴────────────┐
│  Write DB record    │  (attendance_logs INSERT)
│  Enqueue WhatsApp   │  (BullMQ job → async)
└────────┬────────────┘
         │
         ▼ Response < 800ms
{
  "success": true,
  "data": {
    "studentName": "Ahmad Zikri",
    "className": "Mathematics Form 4",
    "checkInTime": "08:31 AM",
    "photo": "https://cdn.tlms.app/..."
  }
}
         │
         ▼ Kiosk displays: Green ✓ + Student name + Photo (3 second overlay)
```

---

## 14. Infrastructure & Deployment Architecture

### 14.1 Production Environment Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     PRODUCTION INFRASTRUCTURE                          │
│                                                                         │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│  │   Cloudflare     │    │  Vercel           │    │  Fly.io          │  │
│  │   (Edge/CDN/WAF) │    │  (Next.js SSR)   │    │  (NestJS API)    │  │
│  │   Global PoP     │    │  Global Edge      │    │  Regions:        │  │
│  │   DDoS Shield    │    │  Auto-scaling     │    │  sin (Singapore) │  │
│  │   R2 Storage     │    │  Serverless Fn    │    │  Primary + Spare │  │
│  └──────────────────┘    └──────────────────┘    └──────────────────┘  │
│                                                                         │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│  │   Neon/Supabase  │    │  Upstash Redis   │    │  GitHub Actions  │  │
│  │   PostgreSQL 16  │    │  (Serverless)    │    │  CI/CD Pipeline  │  │
│  │   Auto-scaling   │    │  Global replicas │    │  → Vercel Deploy │  │
│  │   Point-in-time  │    │  TLS enforced    │    │  → Fly.io Deploy │  │
│  │   DB branching   │    │  Multi-zone HA   │    │                  │  │
│  └──────────────────┘    └──────────────────┘    └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 14.2 CI/CD Pipeline

```
Git Push to main
      │
      ▼
┌─────────────┐
│  GitHub     │  1. Checkout & pnpm install
│  Actions    │  2. TypeScript type-check (tsc --noEmit)
│  Workflow   │  3. ESLint + Prettier lint
│             │  4. Vitest unit tests (>85% coverage gate)
│             │  5. Prisma schema validation
│             │  6. Snyk dependency security scan
│             │  7. Build: Next.js + NestJS
│             │  8. E2E smoke tests (Playwright, staging)
└──────┬──────┘
       │  All checks pass
       ▼
┌─────────────┐         ┌─────────────┐
│  Vercel     │         │  Fly.io     │
│  Deploy     │         │  Deploy     │
│  (Frontend) │         │  (API)      │
│  < 90s      │         │  Blue/Green │
└─────────────┘         └─────────────┘
```

### 14.3 Environment Configuration

| Variable Category | Storage | Access Pattern |
|---|---|---|
| Database connection strings | Fly.io / Vercel secrets | Environment variable at runtime |
| JWT RS256 private key | Fly.io secrets | Loaded once at NestJS bootstrap |
| Billplz / Stripe API keys | Per-tenant, encrypted DB column | Retrieved via TenantCredentialService |
| WhatsApp tokens | Per-tenant, encrypted DB column | Retrieved via TenantCredentialService |
| Cloudflare R2 credentials | Fly.io secrets | Environment variable at runtime |
| VAPID keys for Web Push | Fly.io secrets | Environment variable at runtime |

---

## 15. Networking & Security Perimeter

### 15.1 Network Security Layers

```
Internet
    │
    ▼
Cloudflare WAF
├── OWASP Core Rule Set (CRS) enabled
├── Custom rule: Block non-MYS IPs for kiosk endpoints
├── Rate limit: 1,000 req/min per IP (global)
├── Rate limit: 60 req/min on /api/v1/auth/* (aggressive)
├── Bot Fight Mode: ON
└── SSL: Full Strict (cert pinned at origin)
    │
    ▼
Vercel Edge Network
├── HTTPS only (HSTS max-age=31536000)
├── Edge Middleware: Tenant resolution + JWT pre-validation
└── Serverless Functions with isolated execution contexts
    │
    ▼
Fly.io Private Network
├── NestJS API not publicly exposed directly
├── Cloudflare Tunnel forwards to Fly.io internal
├── PostgreSQL access: Private network only, no public endpoint
└── Redis access: TLS, private network only
```

### 15.2 Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(self), microphone=(), geolocation=()
```

---

## 16. Observability Architecture

### 16.1 Three Pillars of Observability

```
┌───────────────────────────────────────────────────────────────┐
│                    OBSERVABILITY STACK                        │
│                                                               │
│  METRICS (Datadog)          LOGS (Axiom)      TRACES (Sentry) │
│  ─────────────────          ────────────      ─────────────── │
│  • API response times       • Request logs    • Error stack   │
│  • Database query times     • Auth events     • Performance   │
│  • Queue depth / lag        • Webhook events  • Transaction   │
│  • Worker throughput        • Audit trail     • Profiling     │
│  • Error rate per tenant    • RLS violations  • Release track │
│  • Active session count     • Payment events  • Source maps   │
│  • Memory / CPU per pod     • BullMQ job logs                 │
└───────────────────────────────────────────────────────────────┘
```

### 16.2 Alerting Rules

| Alert | Condition | Severity | Notification |
|---|---|---|---|
| API error rate spike | >5% 5xx in 5min | Critical | PagerDuty + Slack |
| Job queue depth | >1,000 pending WhatsApp jobs | Warning | Slack |
| Failed payment webhook | 3+ HMAC verification failures | Critical | Slack + Email |
| DB connection pool exhausted | >95% utilization | Critical | PagerDuty |
| Kiosk scan latency | p99 > 2s | Warning | Slack |
| Cross-tenant RLS violation | Any RLS policy error | Critical | PagerDuty |
| Failed login surge | >100 failed logins/min/tenant | High | Slack + Block IP |

---

## 17. Disaster Recovery & Business Continuity

### 17.1 Recovery Objectives

| Metric | Target | Strategy |
|---|---|---|
| **RTO** (Recovery Time Objective) | < 4 hours | Automated failover via Fly.io health checks |
| **RPO** (Recovery Point Objective) | < 15 minutes | Continuous WAL archiving + 15-min PITR snapshots |
| **Availability SLA** | 99.9% (43.8 min/month downtime) | Multi-region edge (Cloudflare + Vercel), DB replicas |

### 17.2 Backup Policy

| Data | Frequency | Retention | Storage |
|---|---|---|---|
| PostgreSQL full dump | Daily, 2 AM MYT | 30 days | Cloudflare R2 (encrypted) |
| PostgreSQL WAL (PITR) | Continuous | 7 days | Managed by Neon/Supabase |
| R2 object storage | Cross-region replication | Permanent | Cloudflare R2 |
| Redis | RDB snapshot every hour | 24 hours | Upstash managed |
| Audit logs | Immutable — never deleted | 7 years (PDPA) | PostgreSQL + Offsite backup |

---

## 18. Architecture Decision Records (ADRs)

### ADR-001: Shared DB + Shared Schema with RLS (vs. DB-per-tenant)

| | |
|---|---|
| **Decision** | Use single PostgreSQL database with RLS, not separate databases per tenant |
| **Context** | Platform expects 100s of small tuition centers — individual DBs would be operationally expensive |
| **Rationale** | RLS provides cryptographically-enforced isolation at the DB row level with zero operational overhead per tenant |
| **Trade-off** | A bug in Prisma middleware that omits the `SET LOCAL` call could theoretically expose data — mitigated by automated cross-tenant isolation tests in CI |

### ADR-002: NestJS over Express for API Layer

| | |
|---|---|
| **Decision** | Use NestJS (opinionated framework) over raw Express |
| **Context** | Team needs consistent module boundaries, DI, Guards, Interceptors, and Decorators |
| **Rationale** | NestJS enforces architectural discipline — Guards for auth, Interceptors for logging, Pipes for validation, all composable and testable |
| **Trade-off** | Steeper learning curve for engineers new to Angular-style DI |

### ADR-003: BullMQ + Redis over CRON + DB Flags for Async Jobs

| | |
|---|---|
| **Decision** | Use BullMQ backed by Redis for all async jobs including cron scheduling |
| **Context** | WhatsApp alerts and PDF generation cannot block API response latency |
| **Rationale** | BullMQ provides at-least-once delivery, retry, DLQ, rate limiting, and cron scheduling in one library |
| **Trade-off** | Redis is an additional infrastructure dependency |

### ADR-004: Argon2id over bcrypt for Password Hashing

| | |
|---|---|
| **Decision** | Use Argon2id (m=65536, t=3, p=4) — winner of the Password Hashing Competition |
| **Context** | bcrypt is considered legacy; scrypt has no official OWASP recommendation over Argon2id |
| **Rationale** | Argon2id is memory-hard (resistant to GPU/ASIC attacks) and the current OWASP #1 recommended algorithm |
| **Trade-off** | 2-3x slower hash time than bcrypt — acceptable since login is not a hot path |

### ADR-005: Billplz as Primary FPX Gateway (vs. ToyyibPay / iPay88)

| | |
|---|---|
| **Decision** | Integrate Billplz as the primary Malaysian FPX gateway, with ToyyibPay as secondary |
| **Context** | Need Malaysian FPX + DuitNow QR support with good webhook reliability |
| **Rationale** | Billplz has the best developer documentation, DuitNow QR support, and lower per-transaction fees for SME volumes |
| **Trade-off** | ToyyibPay has wider retailer familiarity — kept as alternative option in tenant settings |

---

*System Architecture Document — Maintained by Engineering Architecture Lead. Review required for any structural changes.*
