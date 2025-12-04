# API Reference

## Overview

This document describes the API endpoints and data models used by the HydroSync application. Currently, the application uses sample data, but this serves as the specification for backend integration.

## Base URL

\`\`\`
Production: https://api.hydrosync.com/v1
Development: http://localhost:3000/api
\`\`\`

## Authentication

All API requests require authentication via Bearer token:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Authentication

#### POST /auth/login

Authenticate a user and receive an access token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
\`\`\`

---

### Usage Data

#### GET /usage/current

Get current water usage data.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "currentUsage": 847,
    "unit": "gallons",
    "dailyAverage": 42.3,
    "monthlyGoal": 1200,
    "percentOfGoal": 71,
    "comparisonToPrevious": -12,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
\`\`\`

#### GET /usage/history

Get historical usage data.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| period | string | `day`, `week`, `month`, `year` |
| startDate | string | ISO 8601 date |
| endDate | string | ISO 8601 date |

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "period": "week",
    "total": 296,
    "average": 42.3,
    "records": [
      { "date": "2024-01-08", "usage": 45, "cost": 4.50 },
      { "date": "2024-01-09", "usage": 38, "cost": 3.80 },
      { "date": "2024-01-10", "usage": 52, "cost": 5.20 }
    ]
  }
}
\`\`\`

#### GET /usage/breakdown

Get usage breakdown by category.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "categories": [
      { "name": "Bathroom", "usage": 340, "percentage": 40 },
      { "name": "Kitchen", "usage": 212, "percentage": 25 },
      { "name": "Laundry", "usage": 170, "percentage": 20 },
      { "name": "Outdoor", "usage": 85, "percentage": 10 },
      { "name": "Other", "usage": 40, "percentage": 5 }
    ]
  }
}
\`\`\`

---

### Billing

#### GET /billing/current

Get current billing information.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "billId": "bill_202401",
    "amount": 45.80,
    "dueDate": "2024-01-25",
    "status": "pending",
    "breakdown": {
      "waterUsage": 38.50,
      "serviceFee": 5.00,
      "taxes": 2.30
    },
    "usageGallons": 847
  }
}
\`\`\`

#### GET /billing/history

Get billing history.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "bills": [
      {
        "billId": "bill_202312",
        "amount": 52.30,
        "dueDate": "2023-12-25",
        "paidDate": "2023-12-20",
        "status": "paid"
      }
    ]
  }
}
\`\`\`

#### POST /billing/pay

Process a payment.

**Request Body:**
\`\`\`json
{
  "billId": "bill_202401",
  "paymentMethodId": "pm_123456",
  "amount": 45.80
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "transactionId": "txn_789012",
    "status": "completed",
    "receiptUrl": "https://..."
  }
}
\`\`\`

---

### Notifications

#### GET /notifications

Get user notifications.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | `alert`, `billing`, `usage`, `system` |
| status | string | `read`, `unread`, `all` |
| limit | number | Number of results (default: 20) |

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "unreadCount": 3,
    "notifications": [
      {
        "id": "notif_001",
        "type": "alert",
        "priority": "high",
        "title": "Unusual Water Flow Detected",
        "message": "We detected higher than normal water usage...",
        "timestamp": "2024-01-15T08:30:00Z",
        "read": false,
        "actionUrl": "/dashboard"
      }
    ]
  }
}
\`\`\`

#### PATCH /notifications/:id

Mark a notification as read.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "notif_001",
    "read": true
  }
}
\`\`\`

---

### Account

#### GET /account/profile

Get user profile.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "usr_123456",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "phone": "(555) 123-4567",
    "address": {
      "street": "123 Water Street",
      "city": "Riverside",
      "state": "CA",
      "zip": "92501"
    },
    "accountNumber": "WM-2024-78542",
    "meterNumber": "MTR-456789"
  }
}
\`\`\`

#### PATCH /account/profile

Update user profile.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "phone": "(555) 123-4567"
}
\`\`\`

---

### Alerts

#### GET /alerts/leak-detection

Get leak detection status.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "status": "warning",
    "message": "Unusual flow pattern detected",
    "detectedAt": "2024-01-15T02:30:00Z",
    "flowRate": 2.5,
    "normalFlowRate": 0.5,
    "recommendation": "Check for running toilets or faucets"
  }
}
\`\`\`

---

## Data Models

### User

\`\`\`typescript
interface User {
  id: string
  email: string
  name: string
  phone?: string
  address: Address
  accountNumber: string
  meterNumber: string
  createdAt: string
  updatedAt: string
}
\`\`\`

### UsageRecord

\`\`\`typescript
interface UsageRecord {
  date: string
  usage: number
  cost: number
  unit: 'gallons' | 'liters'
}
\`\`\`

### Bill

\`\`\`typescript
interface Bill {
  billId: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'pending' | 'paid' | 'overdue'
  breakdown: {
    waterUsage: number
    serviceFee: number
    taxes: number
  }
}
\`\`\`

### Notification

\`\`\`typescript
interface Notification {
  id: string
  type: 'alert' | 'billing' | 'usage' | 'system'
  priority: 'high' | 'medium' | 'low'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}
\`\`\`

---

## Error Handling

All errors follow this format:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
\`\`\`

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Invalid or missing authentication |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid request data |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |

---

## Rate Limiting

- **Standard**: 100 requests per minute
- **Authenticated**: 1000 requests per minute

Rate limit headers:
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705312800
