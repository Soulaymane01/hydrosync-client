# Changelog

All notable changes to HydroSync will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] 31/01/2026

### 🚀 Recent Changes (What I Added)
#### Frontend
*   **Consumer Login**: Implemented login page (`/`) connecting to Client Auth API.
*   **Security Guards**: Created `AuthGuard` which wraps key sections (`/dashboard`, `/account`, `/billing`, etc.).
    *   **Fix**: Prevents users from using "Back Button" to access app after logout.
*   **Hydration Fixes**: Suppressed hydration warnings in `layout.tsx` caused by browser extensions.
*   **Packages Added**: `axios` for API requests.

#### Backend Support
*   **Dual-Auth System**: Backend now distinguishes "Client" tokens from "Staff" tokens.
*   **Client API**: Endpoints at `/api/client/auth/login` & `logout`.
*   **Seeding Script**: Created `seed_client_data` for test accounts.

### 👷‍♂️ Team Guide: How to Run This Branch
**Follow these exact steps after pulling:**

1.  **Backend Setup**:
    *   `pip install -r requirements.txt`
    *   `python manage.py migrate`
    *   `python manage.py seed_client_data` (**CRITICAL**: Creates test user `client@hydrosync.com` / `password123`)
2.  **Frontend Setup**:
    *   `npm install`
    *   `npm run dev`

### Planned
- Dark mode support
- Push notifications (PWA)
- Offline support
- Multi-language support (i18n)
- Real-time meter data integration

---

## [1.0.0] - 2024-01-15

### Added

#### Core Features
- **Sign-in Page**: User authentication with email/password
- **Dashboard**: Real-time water usage monitoring
  - Current usage display with daily average
  - Weekly usage chart with interactive tooltips
  - Monthly goal progress tracker
  - Leak detection alerts
  - Quick action buttons
  - Smart insights and recommendations

#### Usage Analytics
- **Usage History Page**: Detailed consumption analytics
  - Tabbed interface (Overview, Comparison, Efficiency)
  - Multiple chart types (bar, line, area, composed)
  - Date range filtering (day, week, month, year)
  - Usage breakdown by category (pie chart)
  - Hourly usage patterns
  - Year-over-year comparison
  - Efficiency scoring system

#### Billing & Payments
- **Billing Page**: Complete billing management
  - Current bill overview with breakdown
  - Payment method management
  - Bill history with search
  - Cost trend analysis
  - Savings recommendations
  - Auto-pay configuration

#### Notifications
- **Notifications Center**: Smart alert system
  - Priority-based notifications (high, medium, low)
  - Category filtering (alerts, billing, usage, system)
  - Read/unread status management
  - Actionable notification items
  - Relative timestamp display

#### Account Management
- **Account Page**: User profile and settings
  - Personal information management
  - Notification preferences
  - Linked meter management
  - Help and support access
  - Sign out functionality

#### UI/UX
- Mobile-first responsive design
- Bottom navigation with active states
- Consistent card-based layouts
- Gradient header backgrounds
- Loading states and transitions
- Accessibility considerations

### Technical
- Next.js 15 with App Router
- TypeScript implementation
- Tailwind CSS styling
- shadcn/ui components
- Recharts for data visualization
- Lucide React icons

---

## [0.1.0] - 2024-01-01

### Added
- Initial project setup
- Basic project structure
- Development environment configuration

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2024-01-15 | Initial release with all core features |
| 0.1.0 | 2024-01-01 | Project initialization |

---

## Upgrade Guide

### From 0.x to 1.0

This is the initial stable release. No migration required.

### Future Upgrades

Upgrade guides will be provided for breaking changes in future major versions.

---

[Unreleased]: https://github.com/hydrosync/hydrosync/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/hydrosync/hydrosync/releases/tag/v1.0.0
[0.1.0]: https://github.com/hydrosync/hydrosync/releases/tag/v0.1.0
