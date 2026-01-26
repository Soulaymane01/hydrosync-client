# HydroSync Database Design

## Overview

This document outlines the complete database design for the HydroSync customer-facing water meter management application. The design follows a relational database model optimized for water consumption tracking, billing, notifications, and user account management.

---

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HydroSync Database Schema                          │
└─────────────────────────────────────────────────────────────────────────────┘

                                    ┌──────────────┐
                                    │    Users     │
                                    ├──────────────┤
                                    │ id (PK)      │
                                    │ email        │──┐
                                    │ password     │  │
                                    │ name         │  │
                                    │ phone        │  │
                                    │ address      │  │
                                    │ city         │  │
                                    │ state        │  │
                                    │ zip_code     │  │
                                    │ country      │  │
                                    │ created_at   │  │
                                    │ updated_at   │  │
                                    └──────────────┘  │
                                            │         │
                    ┌───────────────────────┼─────────┤
                    │                       │         │
        ┌───────────▼─────────┐  ┌─────────▼─────────┐
        │      Meters         │  │  PaymentMethods   │
        ├─────────────────────┤  ├───────────────────┤
        │ id (PK)             │  │ id (PK)           │
        │ user_id (FK)────────┼──┤ user_id (FK)      │
        │ meter_number        │  │ type              │
        │ location            │  │ card_number       │
        │ status              │  │ expiry_date       │
        │ installation_date   │  │ holder_name       │
        │ last_reading_date   │  │ is_default        │
        │ created_at          │  │ created_at        │
        │ updated_at          │  │ updated_at        │
        └─────────────────────┘  └───────────────────┘
                    │
                    │ 1:N
        ┌───────────▼──────────────┐
        │   MeterReadings          │
        ├──────────────────────────┤
        │ id (PK)                  │
        │ meter_id (FK)            │
        │ reading_value (m³)       │
        │ reading_date             │
        │ reading_type             │
        │ anomaly_detected         │
        │ usage_status             │
        │ created_at               │
        │ updated_at               │
        └──────────────────────────┘
                    │
                    │ 1:N
        ┌───────────▼──────────────┐
        │   UsageGoals             │
        ├──────────────────────────┤
        │ id (PK)                  │
        │ meter_id (FK)            │
        │ target_usage (m³)        │
        │ month                    │
        │ year                     │
        │ status                   │
        │ created_at               │
        │ updated_at               │
        └──────────────────────────┘

        ┌───────────────────────┐
        │   Bills/Invoices      │
        ├───────────────────────┤
        │ id (PK)               │
        │ meter_id (FK)         │
        │ billing_period_start  │
        │ billing_period_end    │
        │ usage_amount (m³)     │
        │ amount_due            │
        │ due_date              │
        │ status                │
        │ created_at            │
        │ updated_at            │
        └────────┬──────────────┘
                 │ 1:N
                 │
        ┌────────▼──────────────┐
        │     Payments          │
        ├───────────────────────┤
        │ id (PK)               │
        │ bill_id (FK)          │
        │ user_id (FK)          │
        │ payment_method_id(FK) │
        │ amount                │
        │ payment_date          │
        │ status                │
        │ transaction_id        │
        │ created_at            │
        │ updated_at            │
        └───────────────────────┘

        ┌─────────────────────────┐
        │   LeakDetectionEvents   │
        ├─────────────────────────┤
        │ id (PK)                 │
        │ meter_id (FK)           │
        │ anomaly_level           │
        │ detected_value (m³/h)   │
        │ normal_range (m³/h)     │
        │ description             │
        │ status                  │
        │ created_at              │
        │ updated_at              │
        └─────────────────────────┘

        ┌──────────────────────┐
        │   Notifications      │
        ├──────────────────────┤
        │ id (PK)              │
        │ user_id (FK)         │
        │ type                 │
        │ title                │
        │ message              │
        │ priority             │
        │ is_read              │
        │ action_url           │
        │ created_at           │
        │ updated_at           │
        └──────────────────────┘

        ┌────────────────────────┐
        │  AccountSettings       │
        ├────────────────────────┤
        │ id (PK)                │
        │ user_id (FK)           │
        │ notification_email     │
        │ notification_sms       │
        │ newsletter_opted_in    │
        │ language_preference    │
        │ theme_preference       │
        │ two_factor_enabled     │
        │ created_at             │
        │ updated_at             │
        └────────────────────────┘

        ┌────────────────────────┐
        │  SupportTickets        │
        ├────────────────────────┤
        │ id (PK)                │
        │ user_id (FK)           │
        │ subject                │
        │ description            │
        │ priority               │
        │ status                 │
        │ category               │
        │ assigned_to            │
        │ created_at             │
        │ updated_at             │
        └────────────────────────┘

        ┌────────────────────────┐
        │  AuditLogs             │
        ├────────────────────────┤
        │ id (PK)                │
        │ user_id (FK)           │
        │ action                 │
        │ entity_type            │
        │ entity_id              │
        │ changes                │
        │ ip_address             │
        │ created_at             │
        └────────────────────────┘
```

---

## Class Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     HydroSync Domain Model - Class Diagram                   │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────┐
│            User                     │
├─────────────────────────────────────┤
│ - id: UUID (PK)                     │
│ - email: String (UNIQUE)            │
│ - password_hash: String             │
│ - name: String                      │
│ - phone: String                     │
│ - address: String                   │
│ - city: String                      │
│ - state: String                     │
│ - zip_code: String                  │
│ - country: String                   │
│ - created_at: DateTime              │
│ - updated_at: DateTime              │
├─────────────────────────────────────┤
│ + register(): void                  │
│ + login(): Token                    │
│ + updateProfile(): void             │
│ + resetPassword(): void             │
│ + getTwoFactorStatus(): Boolean     │
└────────────────┬────────────────────┘
                 │ 1:N
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼──────────────────┐   ┌─────▼──────────────────┐
│      Meter            │   │   PaymentMethod       │
├───────────────────────┤   ├───────────────────────┤
│ - id: UUID (PK)       │   │ - id: UUID (PK)       │
│ - user_id: UUID (FK)  │   │ - user_id: UUID (FK)  │
│ - meter_number: String│   │ - type: Enum          │
│ - location: String    │   │ - card_number: String │
│ - status: Enum        │   │ - expiry_date: Date   │
│ - install_date: Date  │   │ - holder_name: String │
│ - last_reading: Date  │   │ - is_default: Boolean │
│ - created_at: DateTime│   │ - created_at: DateTime│
│ - updated_at: DateTime│   │ - updated_at: DateTime│
├───────────────────────┤   ├───────────────────────┤
│ + getStatus(): String │   │ + validate(): Boolean │
│ + getReadings(): List │   │ + setAsDefault(): void│
│ + getCurrentUsage(): Float          │
│ + getMonthlyBill(): Bill│   + delete(): void      │
│ + detectLeak(): Boolean             └───────────────┘
└────┬──────────────────┘
     │ 1:N
     │
┌────▼────────────────────────┐
│   MeterReading              │
├─────────────────────────────┤
│ - id: UUID (PK)             │
│ - meter_id: UUID (FK)       │
│ - reading_value: Float (m³) │
│ - reading_date: DateTime    │
│ - reading_type: Enum        │
│ - anomaly_detected: Boolean │
│ - usage_status: Enum        │
│ - created_at: DateTime      │
│ - updated_at: DateTime      │
├─────────────────────────────┤
│ + getValue(): Float         │
│ + detectAnomaly(): Boolean  │
│ + getStatus(): String       │
└────┬────────────────────────┘
     │ 1:N
     │
┌────▼────────────────────────┐
│   UsageGoal                 │
├─────────────────────────────┤
│ - id: UUID (PK)             │
│ - meter_id: UUID (FK)       │
│ - target_usage: Float (m³)  │
│ - month: Integer            │
│ - year: Integer             │
│ - status: Enum              │
│ - created_at: DateTime      │
│ - updated_at: DateTime      │
├─────────────────────────────┤
│ + getProgress(): Percentage │
│ + isOnTrack(): Boolean      │
│ + getRecommendations(): List│
└─────────────────────────────┘

┌─────────────────────────────┐
│   Bill                      │
├─────────────────────────────┤
│ - id: UUID (PK)             │
│ - meter_id: UUID (FK)       │
│ - billing_start: Date       │
│ - billing_end: Date         │
│ - usage_amount: Float (m³)  │
│ - amount_due: Decimal       │
│ - due_date: Date            │
│ - status: Enum              │
│ - created_at: DateTime      │
│ - updated_at: DateTime      │
├─────────────────────────────┤
│ + calculateTotal(): Decimal │
│ + isPaid(): Boolean         │
│ + isOverdue(): Boolean      │
│ + getPayments(): List       │
└────┬────────────────────────┘
     │ 1:N
     │
┌────▼───────────────────────────┐
│   Payment                       │
├────────────────────────────────┤
│ - id: UUID (PK)                │
│ - bill_id: UUID (FK)           │
│ - user_id: UUID (FK)           │
│ - payment_method_id: UUID (FK) │
│ - amount: Decimal              │
│ - payment_date: DateTime       │
│ - status: Enum                 │
│ - transaction_id: String       │
│ - created_at: DateTime         │
│ - updated_at: DateTime         │
├────────────────────────────────┤
│ + process(): Boolean           │
│ + refund(): Boolean            │
│ + getReceipt(): Document       │
└────────────────────────────────┘

┌──────────────────────────────────┐
│   LeakDetectionEvent             │
├──────────────────────────────────┤
│ - id: UUID (PK)                  │
│ - meter_id: UUID (FK)            │
│ - anomaly_level: Enum            │
│ - detected_value: Float (m³/h)   │
│ - normal_range: Float (m³/h)     │
│ - description: String            │
│ - status: Enum                   │
│ - created_at: DateTime           │
│ - updated_at: DateTime           │
├──────────────────────────────────┤
│ + getSeverity(): String          │
│ + getRecommendation(): String    │
│ + markResolved(): void           │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   Notification                   │
├──────────────────────────────────┤
│ - id: UUID (PK)                  │
│ - user_id: UUID (FK)             │
│ - type: Enum                     │
│ - title: String                  │
│ - message: String                │
│ - priority: Enum                 │
│ - is_read: Boolean               │
│ - action_url: String (Optional)  │
│ - created_at: DateTime           │
│ - updated_at: DateTime           │
├──────────────────────────────────┤
│ + markAsRead(): void             │
│ + delete(): void                 │
│ + getDetails(): Object           │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   AccountSettings                │
├──────────────────────────────────┤
│ - id: UUID (PK)                  │
│ - user_id: UUID (FK, UNIQUE)     │
│ - notif_email: Boolean           │
│ - notif_sms: Boolean             │
│ - newsletter_opt_in: Boolean     │
│ - language: String               │
│ - theme: String                  │
│ - two_factor_enabled: Boolean    │
│ - created_at: DateTime           │
│ - updated_at: DateTime           │
├──────────────────────────────────┤
│ + update(): void                 │
│ + enableTwoFactor(): void        │
│ + disableTwoFactor(): void       │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   SupportTicket                  │
├──────────────────────────────────┤
│ - id: UUID (PK)                  │
│ - user_id: UUID (FK)             │
│ - subject: String                │
│ - description: String            │
│ - priority: Enum                 │
│ - status: Enum                   │
│ - category: String               │
│ - assigned_to: UUID (FK, Null)   │
│ - created_at: DateTime           │
│ - updated_at: DateTime           │
├──────────────────────────────────┤
│ + open(): void                   │
│ + close(): void                  │
│ + assign(): void                 │
│ + addComment(): void             │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   AuditLog                       │
├──────────────────────────────────┤
│ - id: UUID (PK)                  │
│ - user_id: UUID (FK, Nullable)   │
│ - action: String                 │
│ - entity_type: String            │
│ - entity_id: String              │
│ - changes: JSON                  │
│ - ip_address: String             │
│ - created_at: DateTime (immutable)
├──────────────────────────────────┤
│ + getDetails(): Object           │
│ + getTimeline(): List            │
└──────────────────────────────────┘
```

---

## Database Schema Details

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

### 2. Meters Table
```sql
CREATE TABLE meters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meter_number VARCHAR(50) UNIQUE NOT NULL,
  location VARCHAR(255),
  status ENUM('Active', 'Inactive', 'Error', 'Disabled') DEFAULT 'Active',
  installation_date DATE,
  last_reading_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_meter_number (meter_number)
);
```

### 3. MeterReadings Table
```sql
CREATE TABLE meter_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meter_id UUID NOT NULL REFERENCES meters(id) ON DELETE CASCADE,
  reading_value DECIMAL(10, 3) NOT NULL,
  reading_date TIMESTAMP NOT NULL,
  reading_type ENUM('Manual', 'Automatic', 'Estimated') DEFAULT 'Automatic',
  anomaly_detected BOOLEAN DEFAULT false,
  usage_status ENUM('Normal', 'High', 'Critical', 'Leak_Suspected') DEFAULT 'Normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (meter_id) REFERENCES meters(id),
  INDEX idx_meter_id (meter_id),
  INDEX idx_reading_date (reading_date),
  UNIQUE(meter_id, reading_date)
);
```

### 4. UsageGoals Table
```sql
CREATE TABLE usage_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meter_id UUID NOT NULL REFERENCES meters(id) ON DELETE CASCADE,
  target_usage DECIMAL(8, 2) NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  status ENUM('Active', 'Achieved', 'Failed', 'Cancelled') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (meter_id) REFERENCES meters(id),
  INDEX idx_meter_id (meter_id),
  UNIQUE(meter_id, month, year)
);
```

### 5. Bills Table
```sql
CREATE TABLE bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meter_id UUID NOT NULL REFERENCES meters(id) ON DELETE CASCADE,
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  usage_amount DECIMAL(10, 3) NOT NULL,
  amount_due DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  status ENUM('Pending', 'Paid', 'Overdue', 'Cancelled') DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (meter_id) REFERENCES meters(id),
  INDEX idx_meter_id (meter_id),
  INDEX idx_status (status),
  INDEX idx_due_date (due_date)
);
```

### 6. Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
  transaction_id VARCHAR(255),
  receipt_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (bill_id) REFERENCES bills(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_bill_id (bill_id),
  INDEX idx_status (status),
  INDEX idx_payment_date (payment_date)
);
```

### 7. PaymentMethods Table
```sql
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type ENUM('Credit_Card', 'Debit_Card', 'Bank_Transfer', 'E_Wallet') NOT NULL,
  card_number VARCHAR(20) NOT NULL,
  expiry_date DATE,
  holder_name VARCHAR(255) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id)
);
```

### 8. LeakDetectionEvents Table
```sql
CREATE TABLE leak_detection_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meter_id UUID NOT NULL REFERENCES meters(id) ON DELETE CASCADE,
  anomaly_level ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
  detected_value DECIMAL(8, 4) NOT NULL,
  normal_range DECIMAL(8, 4) NOT NULL,
  description TEXT,
  status ENUM('Active', 'Acknowledged', 'Resolved', 'False_Alarm') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (meter_id) REFERENCES meters(id),
  INDEX idx_meter_id (meter_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

### 9. Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type ENUM('Billing', 'Maintenance', 'Usage_Alert', 'Payment_Reminder', 'System') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
  is_read BOOLEAN DEFAULT false,
  action_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
);
```

### 10. AccountSettings Table
```sql
CREATE TABLE account_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  notification_email BOOLEAN DEFAULT true,
  notification_sms BOOLEAN DEFAULT false,
  newsletter_opted_in BOOLEAN DEFAULT true,
  language_preference VARCHAR(10) DEFAULT 'en',
  theme_preference ENUM('Light', 'Dark', 'System') DEFAULT 'System',
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_method ENUM('Email', 'SMS', 'Authenticator') DEFAULT 'Email',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 11. SupportTickets Table
```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
  status ENUM('Open', 'In_Progress', 'Waiting_User', 'Resolved', 'Closed') DEFAULT 'Open',
  category VARCHAR(100),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

### 12. AuditLogs Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(255),
  changes JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at)
);
```

---

## Key Relationships

| From Table | To Table | Relationship | Cardinality |
|-----------|----------|--------------|------------|
| Users | Meters | One user has multiple meters | 1:N |
| Users | PaymentMethods | One user has multiple payment methods | 1:N |
| Users | Notifications | One user receives multiple notifications | 1:N |
| Users | AccountSettings | One user has one settings record | 1:1 |
| Users | SupportTickets | One user can create multiple tickets | 1:N |
| Meters | MeterReadings | One meter has multiple readings | 1:N |
| Meters | UsageGoals | One meter has multiple usage goals | 1:N |
| Meters | Bills | One meter generates multiple bills | 1:N |
| Meters | LeakDetectionEvents | One meter can have multiple leak events | 1:N |
| Bills | Payments | One bill can have multiple payments | 1:N |
| PaymentMethods | Payments | One payment method can be used for multiple payments | 1:N |

---

## Enums Definition

### Status Enums
- **Meter Status**: Active, Inactive, Error, Disabled
- **Bill Status**: Pending, Paid, Overdue, Cancelled
- **Payment Status**: Pending, Completed, Failed, Refunded
- **Leak Anomaly Level**: Low, Medium, High, Critical
- **Leak Status**: Active, Acknowledged, Resolved, False_Alarm
- **Usage Status**: Normal, High, Critical, Leak_Suspected
- **Notification Type**: Billing, Maintenance, Usage_Alert, Payment_Reminder, System
- **Notification Priority**: Low, Medium, High, Critical
- **Support Ticket Priority**: Low, Medium, High, Urgent
- **Support Ticket Status**: Open, In_Progress, Waiting_User, Resolved, Closed
- **Theme Preference**: Light, Dark, System

---

## Indexes Strategy

### Performance Indexes
- Foreign Key Indexes: On all FK columns for JOIN operations
- User Queries: `idx_email` for authentication
- Time-Based Queries: `idx_created_at`, `idx_reading_date`, `idx_due_date`
- Status Queries: `idx_status` for filtering by bill/payment/ticket status
- Read Status: `idx_is_read` for unread notifications

### Composite Indexes (for optimization)
```sql
CREATE INDEX idx_meter_user ON meter_readings(meter_id, reading_date);
CREATE INDEX idx_bill_period ON bills(meter_id, billing_period_start, billing_period_end);
CREATE INDEX idx_payment_bill_user ON payments(bill_id, user_id, payment_date);
```

---

## Constraints & Validation

### Primary Constraints
- All IDs are UUIDs (UUID v4)
- Email must be unique and valid format
- Password must be hashed (minimum 60 chars for bcrypt)
- Meter number must be unique
- Reading value cannot be negative
- Amount fields must be positive
- Dates follow ISO 8601 format

### Referential Integrity
- Cascade delete on Users (removes all related data)
- Restrict delete on Bills and Payments (preserve audit trail)
- Set NULL on optional foreign keys

### Business Rules
- A user can have multiple meters
- A meter can only belong to one user
- A bill must have at least one reading
- Payment amount cannot exceed bill amount
- Duplicate readings for same meter/date are prevented

---

## Scalability Considerations

### Database Optimization
- Partitioning: `meter_readings` by meter_id or date range (for large datasets)
- Archiving: Move old bills and payments to archive tables after retention period
- Caching: Cache frequently accessed user settings in Redis
- Read Replicas: For analytics and reporting queries

### Data Retention
- Active data: Full retention in primary tables
- Audit logs: Retain for 5 years for compliance
- Support tickets: Retain for 2 years
- Payment records: Retain for 7 years (compliance)

---

## Security Measures

- Password hashing with bcrypt (cost factor 12)
- Card data encrypted at rest
- Audit logs for all sensitive operations
- User IP tracking for security monitoring
- Two-factor authentication support
- Rate limiting on sensitive operations
- Soft deletes for critical data (optional flag)
