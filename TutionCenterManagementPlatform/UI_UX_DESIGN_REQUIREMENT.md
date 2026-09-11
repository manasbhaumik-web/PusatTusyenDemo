# UI/UX Design Requirements Document (DRD)
## Multi-Tenant Tuition Center Management Platform (TLMS)

---

| **Document Version** | 1.0.0 |
| **Status** | Approved & Ready for UI Implementation |
| **Design Tier** | Enterprise B2B SaaS + Consumer Parent/Student PWA |
| **Design Framework** | React 19 / Next.js 14 + Tailwind CSS + shadcn/ui (Radix UI) |
| **Target Viewports** | Desktop (1440px / 1920px), Laptop (1280px), Tablet (768px - 1024px), Mobile (375px - 430px) |

---

## 1. Design Vision, Philosophy & UX North Stars

### 1.1 Design Philosophy: *"Effortless Authority & Human Warmth"*
The Tuition Center Management Platform serves two distinct emotional mindsets:
1. **The Administrator / Tutor Mindset (Operational Velocity & Precision)**: Clean, high-density, authoritative, zero-lag, keyboard-friendly data management that saves 25+ hours every month.
2. **The Parent / Student Mindset (Reassurance, Pride & Simplicity)**: Warm, empathetic, clear, mobile-optimized interface that turns stressful exam preparations into transparent, celebrated progress.

### 1.2 The 5 UX North Stars
* **Zero-Friction Invoicing**: Parents can settle tuition fees within 3 taps via FPX / DuitNow without creating passwords or navigating deep menus.
* **Under-3-Second Attendance**: Tutors or entrance kiosk tablets can check in a student and dispatch a WhatsApp confirmation to parents in under 3 seconds.
* **Sub-200ms Perceived Speed**: Optimistic UI updates, skeleton placeholders, and instant client feedback across all tables and calendar views.
* **Command-K Centricity**: Full global search (`⌘K` / `Ctrl+K`) allowing center managers to jump to any student profile, class schedule, or unpaid invoice instantly.
* **Flawless Multi-Tenant White-Labeling**: Each tenant's custom brand identity (logo, color accents, typography, domain) feels native and bespoke with zero visual compromises.

---

## 2. Design Tokens & Design System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          3-TIER TOKEN SYSTEM                            │
├────────────────────────────┬────────────────────────────┬───────────────┤
│   1. Primitive Tokens      │   2. Semantic Tokens       │ 3. Component  │
│   (Raw HSL / Hex Scales)   │   (Roles & Purpose)        │ (Specific UI) │
│   - Slate / Zinc 50-950    │   - background, foreground │ - button-bg   │
│   - Royal Blue 50-950      │   - primary, secondary     │ - card-border │
│   - Emerald 50-950         │   - destructive, muted     │ - table-row   │
│   - Amber 50-950           │   - border, ring, input    │ - toast-glow  │
└────────────────────────────┴────────────────────────────┴───────────────┘
```

---

## 3. Color Palette & Theming Engine

### 3.1 Core Admin & Management Palette (Professional Slate & Deep Sapphire)

```
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│  Brand Deep Navy  │  Electric Cobalt  │  Success Emerald  │   Warning Amber   │
│      #0F172A      │      #2563EB      │      #059669      │      #D97706      │
│  (Primary Base)   │  (Active Accent)  │ (Paid/Present)    │  (Pending/Due)    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│  Canvas Light     │  Surface Pure     │   Subtle Border   │   Critical Red    │
│      #F8FAFC      │      #FFFFFF      │      #E2E8F0      │      #DC2626      │
│  (Background)     │  (Cards & Tables) │ (Card Outlines)   │ (Overdue/Absent)  │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```

#### Semantic Light Mode Tokens (Default Admin & Parent Console)
* `--background`: `#F8FAFC` (Slate 50) — Soft alabaster reducing eye strain.
* `--surface`: `#FFFFFF` (Pure White) — Elevated card surfaces.
* `--surface-muted`: `#F1F5F9` (Slate 100) — Table header & secondary backgrounds.
* `--foreground`: `#0F172A` (Slate 900) — High-contrast deep slate text (Contrast ratio 14.8:1, WCAG AAA).
* `--foreground-muted`: `#64748B` (Slate 500) — Supporting metadata & timestamps.
* `--primary`: `#1D4ED8` (Royal Blue 700) — Core action buttons & active navigation states.
* `--primary-foreground`: `#FFFFFF` — Text on primary buttons.
* `--accent`: `#3B82F6` (Blue 500) — Interactive highlights and focus rings.
* `--border`: `#E2E8F0` (Slate 200) — Clean geometric separators.

#### Semantic Dark Mode Tokens (Kiosk Displays & High-Tech Centers)
* `--background`: `#090D16` (Midnight Slate).
* `--surface`: `#0F172A` (Dark Navy).
* `--surface-muted`: `#1E293B` (Slate 800).
* `--foreground`: `#F8FAFC` (Slate 50).
* `--foreground-muted`: `#94A3B8` (Slate 400).
* `--border`: `#1E293B` (Slate 800).

---

### 3.2 Dynamic Multi-Tenant White-Label Color System
The platform injects dynamic CSS variables per tenant at the root layout:

```css
:root[data-tenant="inspirasi"] {
  --tenant-primary: #1E40AF;       /* Deep Royal Blue */
  --tenant-primary-hover: #1D4ED8;
  --tenant-accent: #38BDF8;        /* Electric Cyan */
  --tenant-radius: 0.75rem;        /* 12px Modern Smooth */
  --tenant-font: 'Plus Jakarta Sans', sans-serif;
}

:root[data-tenant="cambridge-elite"] {
  --tenant-primary: #831843;       /* Oxford Burgundy */
  --tenant-primary-hover: #701A3D;
  --tenant-accent: #D97706;        /* Warm Gold */
  --tenant-radius: 0.5rem;         /* 8px Classic Sharp */
  --tenant-font: 'Inter', sans-serif;
}
```

---

## 4. Typography Hierarchy & Font System

### 4.1 Primary Font Families
1. **Primary Interface & Numbers**: `Plus Jakarta Sans` (Geometric, modern, friendly curves, exceptional legibility at 11px-14px).
2. **Display & Headings**: `Outfit` or `Inter Display` (Bold character, premium hierarchy).
3. **Data, Time & Currency**: `JetBrains Mono` or tabular numbers `font-mono` (For financial ledgers, IC numbers, student IDs, and timestamps).

### 4.2 Type Scale Specification

| Style Name | Font Size | Line Height | Weight | Tracking | Purpose / Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | 36px (2.25rem) | 44px (1.2) | 800 (Extrabold) | -0.025em | Main dashboard headlines & KPI totals |
| **Heading 1 (H1)** | 28px (1.75rem) | 36px (1.25) | 700 (Bold) | -0.02em | Section titles, modal headers |
| **Heading 2 (H2)** | 20px (1.25rem) | 28px (1.3) | 700 (Bold) | -0.015em | Card headers, table group titles |
| **Heading 3 (H3)** | 16px (1.00rem) | 24px (1.4) | 600 (Semibold) | -0.01em | Subsections, student names in lists |
| **Body Standard** | 14px (0.875rem) | 20px (1.45) | 400 (Regular) | 0.00em | Default table data, body text, form fields |
| **Body Semibold** | 14px (0.875rem) | 20px (1.45) | 600 (Semibold) | 0.00em | Table primary values, active tab labels |
| **Caption / Meta** | 12px (0.75rem) | 16px (1.35) | 500 (Medium) | +0.01em | Status chips, timestamp indicators |
| **Micro / Data** | 11px (0.6875rem) | 14px (1.25) | 600 (Semibold) | +0.02em | Currency tags, badge pills, keyboard shortcuts |

---

## 5. Spacing, Elevation & Radius Architecture

### 5.1 Spacing & Layout Grid (8px Base Scale)
* `space-1`: 4px — Micro gap between icon & text
* `space-2`: 8px — Badge padding, form field gap
* `space-3`: 12px — Button internal padding, compact card gap
* `space-4`: 16px — Standard card internal padding, table cell padding
* `space-6`: 24px — Section spacing, modal padding
* `space-8`: 32px — Grid gap between major dashboard modules

### 5.2 Elevation & Shadow Layers
* `shadow-subtle`: `0 1px 3px 0 rgba(15, 23, 42, 0.05)` — Table rows, form inputs.
* `shadow-card`: `0 4px 20px -2px rgba(15, 23, 42, 0.06)` — Dashboard cards, metric tiles.
* `shadow-elevated`: `0 12px 32px -4px rgba(15, 23, 42, 0.12)` — Dropdowns, popovers, tooltips.
* `shadow-modal`: `0 24px 48px -12px rgba(15, 23, 42, 0.25)` — Modals, drawer sidebars.

### 5.3 Corner Radius Scale
* `rounded-sm`: 4px — Badges, tag chips.
* `rounded-md`: 8px — Buttons, form input fields, dropdown menus.
* `rounded-xl`: 12px — Dashboard metric cards, table containers.
* `rounded-2xl`: 16px — Main modal dialogs, entrance kiosk surfaces.
* `rounded-full`: 9999px — User avatars, status indicator dots.

---

## 6. Detailed Screen-by-Screen UI Specifications

### Screen Surface 1: Center Executive Dashboard ("Cockpit View")

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] Pusat Tusyen Inspirasi  |  Branch: [ Subang Jaya SS15 ▾ ]  |  🔍 Search (⌘K)  | [🔔 3] [Avatar] │
├───────────────┬────────────────────────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard  │  MONTHLY OVERVIEW (SEPTEMBER 2026)                          [+ Enroll Student] [Export]│
│ 👥 Students   ├────────────────┬────────────────┬────────────────┬─────────────────────────────────────┤
│ 📅 Timetable  │ TOTAL ACTIVE   │ COLLECTION RATE│ OUTSTANDING    │ ATTENDANCE TODAY                    │
│ 💳 Invoicing  │ 482 Students   │ 94.2% (RM142k) │ RM 8,740 (18)  │ 96.8% (214/221)                     │
│ 👨‍🏫 Tutors     │ ▲ +14 this mth │ ▲ +3.1% vs Aug │ ▼ -42% vs Aug  │ 🟢 Active Classes Now               │
│ 🏢 Rooms      ├────────────────┴────────────────┴────────────────┴─────────────────────────────────────┤
│ 📈 Analytics  │ LIVE REVENUE & ENROLLMENT TRAJECTORY (CHART) │ UPCOMING TODAY CLASSES & ROOM USAGE    │
│ ⚙️ Settings   │ [ Area Chart: Revenue Jan-Sep 2026 ]         │ 10:00 AM: SPM Add Maths (Room A - 12/12)│
│               │                                              │ 11:30 AM: IGCSE Chem (Room B - 10/10)  │
│               ├──────────────────────────────────────────────┴────────────────────────────────────────┤
│               │ RECENT TRANSACTIONS (FPX / DUITNOW)          │ UNPAID INVOICES EXCEEDING 7 DAYS       │
│               │ • Lucas Tan (Form 5) - RM350 [FPX: Maybank]  │ • Sarah Lee (RM 280) [Send WhatsApp 💬]│
│               │ • Isaac Lim (Year 10) - RM420 [DuitNow QR]   │ • Amirul Bin Azman [Send WhatsApp 💬]  │
└───────────────┴──────────────────────────────────────────────┴────────────────────────────────────────┘
```

#### Key UI Elements:
* **Global Branch Switcher Dropdown**: Allows multi-branch operators to toggle between specific physical campuses or view aggregated multi-branch numbers with 1 click.
* **Telemetry Metric Tiles**: Display bold metric with percentage delta comparison against the prior month.
* **One-Click Quick Actions Toolbar**: Top right sticky buttons for `[+ New Student Registration]`, `[+ Create Invoice]`, and `[Generate Report Cards]`.

---

### Screen Surface 2: Visual Drag-and-Drop Timetabling & Conflict Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TIMETABLE SCHEDULER  |  View: [ Weekly Room View ▾ ]  |  Branch: Subang Jaya  |  [+ New Class Slot]   │
├─────────────┬────────────────────┬────────────────────┬────────────────────┬───────────────────────────┤
│ TIME SLOT   │ ROOM 1 (MAX 12)    │ ROOM 2 (MAX 12)    │ ROOM 3 (MAX 10)    │ VIRTUAL ZOOM ROOM 1       │
├─────────────┼────────────────────┼────────────────────┼────────────────────┼───────────────────────────┤
│ 09:00-10:30 │ SPM Physics (F5)   │ IGCSE Chem (Y11)   │ Primary Maths (S6) │ SPM Add Maths (Online)    │
│             │ Tutor: Dr. Tan     │ Tutor: Sir Robert  │ Tutor: Miss Lim    │ Tutor: Dr. Tan (HD Stream)│
│             │ [12/12 Students]   │ [9/12 Students]    │ [8/10 Students]    │ [45/50 Live Viewers]      │
├─────────────┼────────────────────┼────────────────────┼────────────────────┼───────────────────────────┤
│ 10:45-12:15 │ SPM Add Maths (F5) │ SPM B. Melayu (F5) │ Form 2 Science     │ IGCSE Physics (Y10)       │
│             │ Tutor: Dr. Tan     │ Tutor: Cikgu Nurul │ Tutor: Miss Lim    │ Tutor: Sir Robert         │
│             │ [12/12 Full 🔒]    │ [11/12 Students]   │ [7/10 Students]    │ [22/30 Live Viewers]      │
└─────────────┴────────────────────┴────────────────────┴────────────────────┴───────────────────────────┘
```

#### Visual States & Interactions:
* **Color Coding by Curriculum**: Blue pill for SPM KSSM, Purple pill for Cambridge IGCSE, Emerald pill for Lower Secondary / Primary.
* **Capacity Indicators**: Clean progress bar showing seat utilization (e.g., `12/12 (100% Full)` in amber/red alert, `8/12 (66% Available)` in soft slate).
* **Conflict Warning Drawer**: If a tutor or room is double-booked, an instant red warning popover appears with 1-click auto-resolution suggestions.

---

### Screen Surface 3: Entrance Tablet Self-Check-In Kiosk UI

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             PUSAT TUSYEN INSPIRASI                       │
│                     📍 Subang Jaya SS15 Campus Entrance                  │
│                                                                          │
│                     ┌──────────────────────────────────┐                 │
│                     │                                  │                 │
│                     │      [ LIVE CAMERA SCANNER ]     │                 │
│                     │       Position Student QR        │                 │
│                     │         Inside The Frame         │                 │
│                     │                                  │                 │
│                     └──────────────────────────────────┘                 │
│                                                                          │
│                    OR ENTER STUDENT IC / ID: [ 080512-10-1234 ]          │
│                                                                          │
│  [ SUCCESS POPUP ]:                                                      │
│  ✅ Welcome, Daniel Wong (Form 5)!                                       │
│  🕒 Time Checked In: 09:58 AM (Class: SPM Add Maths - Room 1)            │
│  📱 WhatsApp notification sent to Mrs. Sharon Tan (+6012-***5678)        │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### Screen Surface 4: Mobile-First Parent Web Portal & PWA

```
┌─────────────────────────────────────────┐
│ ≡  INSPIRASI PARENT PORTAL      [🔔 2]  │
├─────────────────────────────────────────┤
│ SELECT CHILD:                           │
│ [ 👦 Daniel (Form 5) ]  [ 👧 Chloe (Y8) ]│
├─────────────────────────────────────────┤
│ DANIEL'S ATTENDANCE TODAY:              │
│ 🟢 Checked In: 09:58 AM (Room 1)        │
│ Class: SPM Additional Mathematics       │
├─────────────────────────────────────────┤
│ 💳 OUTSTANDING INVOICE:                 │
│ Invoice #INV-2026-0902 (September 2026) │
│ Amount: RM 350.00                       │
│ Due Date: 15 Sep 2026 (In 3 Days)       │
│                                         │
│ [ 💳 Pay Now with FPX / DuitNow (1-Tap)]│
├─────────────────────────────────────────┤
│ 📊 RECENT EXAM & QUIZ RESULTS:          │
│ • Chapter 4 Calculus Quiz: 92% (A+)     │
│ • SPM Mid-Year Add Maths: 88% (A)       │
│   [ 📄 Download Full Report Card (PDF)] │
├─────────────────────────────────────────┤
│ 💬 Direct Tutor WhatsApp Line:          │
│ [ Chat with Dr. Tan Hock Seng ➔ ]       │
└─────────────────────────────────────────┘
```

---

## 7. Component Library & Interaction Specifications

### 7.1 Buttons & Action Controls
* **Primary Button**: Solid `bg-primary` with subtle `shadow-sm`, `hover:scale-[1.01]`, `active:scale-[0.98]`, `transition-all duration-150`.
* **Secondary Button**: Crisp `border border-border` on `bg-surface`, text `text-foreground`, hover `bg-surface-muted`.
* **WhatsApp Action Button**: Custom branded `#25D366` background with white icon, high-visibility CTA for parent communications.
* **Loading State**: Button displays inline spinner with disabled opacity (`opacity-70 cursor-not-allowed`) with zero layout shift.

### 7.2 Data Tables & Faceted Search
* **Row Density Controls**: Compact (36px height), Default (48px height), Spacious (60px height).
* **Faceted Filters**: Multi-select pills for *Branch*, *Curriculum (SPM/IGCSE)*, *Payment Status (Paid/Unpaid/Overdue)*, *Grade Level*.
* **Batch Actions**: Multi-row selection allows bulk operations: `[Send WhatsApp Payment Reminders to 24 Parents]`, `[Export Receipts as ZIP]`.

### 7.3 Modals, Drawers & Sliders
* **Slide-over Sheet (Drawers)**: Used for quick student edits, invoice previews, and timetable slot details without losing page context.
* **Confirmation Dialogs**: Destructive actions (e.g. deleting a class schedule) require explicit keyword verification or two-step click.

---

## 8. Accessibility (a11y) & Responsive Behavior

### 8.1 Accessibility Standards
* **WCAG 2.2 AA Compliance**: All text elements maintain a minimum contrast ratio of 4.5:1 for regular text and 3:1 for large text.
* **Keyboard Navigation**: Full tab index order, visible focus rings (`ring-2 ring-primary ring-offset-2`), and escape key dismissals on all modal/dialog layers.
* **Screen Reader Tags**: `aria-label`, `aria-expanded`, and semantic HTML5 landmarks throughout all surfaces.

### 8.2 Responsive Breakpoints
* **Mobile (< 640px)**: Bottom navigation bar, stacked metric cards, swipeable horizontal tab rails.
* **Tablet (640px - 1024px)**: Collapsible sidebar navigation, 2-column dashboard grid.
* **Desktop (1024px+)**: Fixed multi-tier navigation, 4-column metrics grid, persistent quick-action command palette.

---

## 9. Animation & Motion Design Guidelines

* **Page Transitions**: Subtle 150ms fade-in and translateY (`opacity: 0 ➔ 1`, `transform: translateY(4px) ➔ translateY(0)`).
* **Micro-Interactions**:
  * Tooltip delay: `150ms`.
  * Accordion collapse/expand: `200ms cubic-bezier(0.16, 1, 0.3, 1)`.
  * Toast notification auto-dismiss: `4000ms`.
* **Zero Layout Shift (CLS)**: Skeletons mirror exact dimension and aspect ratios of final loaded components.

---

*End of UI/UX Design Requirements Document. Approved for Frontend Component Development.*
