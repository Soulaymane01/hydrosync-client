# Architecture Documentation

## Overview

HydroSync follows a modern, component-based architecture built on Next.js 15 with the App Router. The application is designed with scalability, maintainability, and performance in mind.

## System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Next.js App                        │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│  │  │Dashboard│ │ Usage   │ │ Billing │ │ Account │   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
│  │                     │                               │   │
│  │              ┌──────┴──────┐                        │   │
│  │              │  Components │                        │   │
│  │              └──────┬──────┘                        │   │
│  │                     │                               │   │
│  │              ┌──────┴──────┐                        │   │
│  │              │   Hooks     │                        │   │
│  │              └─────────────┘                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js API Routes                      │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│  │  │  Auth   │ │  Usage  │ │ Billing │ │  Alerts │   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Database   │  │  IoT Gateway │  │   External   │      │
│  │  (Supabase)  │  │  (Meters)    │  │    APIs      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Directory Structure

### `/app` - Application Routes

The app directory contains all page routes following Next.js 15 App Router conventions:

| Route | Description |
|-------|-------------|
| `/` | Sign-in/authentication page |
| `/dashboard` | Main dashboard with usage overview |
| `/usage` | Detailed usage history and analytics |
| `/billing` | Billing information and payments |
| `/notifications` | Notification center |
| `/account` | User account settings |

### `/components` - Reusable Components

\`\`\`
components/
├── ui/                 # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── tabs.tsx
│   └── ...
├── bottom-nav.tsx      # Mobile navigation
├── charts/             # Chart components (future)
└── forms/              # Form components (future)
\`\`\`

### `/lib` - Utilities and Helpers

\`\`\`
lib/
├── utils.ts            # General utility functions
├── constants.ts        # Application constants (future)
└── types.ts            # TypeScript type definitions (future)
\`\`\`

## Component Architecture

### Page Components

Each page follows a consistent structure:

\`\`\`typescript
// app/[page]/page.tsx

export default function PageName() {
  // 1. State management
  const [state, setState] = useState()
  
  // 2. Data fetching (if needed)
  const { data } = useSWR('/api/endpoint')
  
  // 3. Event handlers
  const handleAction = () => {}
  
  // 4. Render
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* Content */}
      {/* Navigation */}
    </div>
  )
}
\`\`\`

### Component Composition

Components are composed following atomic design principles:

1. **Atoms**: Basic UI elements (Button, Input, Badge)
2. **Molecules**: Combinations of atoms (Card with content, Form fields)
3. **Organisms**: Complex UI sections (Dashboard cards, Navigation)
4. **Templates**: Page layouts
5. **Pages**: Complete views

## State Management

### Local State

React's `useState` and `useReducer` for component-level state:

\`\`\`typescript
const [selectedPeriod, setSelectedPeriod] = useState('week')
\`\`\`

### Server State

SWR for data fetching and caching:

\`\`\`typescript
const { data, error, isLoading } = useSWR('/api/usage', fetcher)
\`\`\`

### URL State

Next.js router for navigation state:

\`\`\`typescript
const router = useRouter()
const searchParams = useSearchParams()
\`\`\`

## Data Flow

\`\`\`
User Interaction
      │
      ▼
Event Handler
      │
      ▼
State Update / API Call
      │
      ▼
Re-render / Cache Update
      │
      ▼
UI Update
\`\`\`

## Styling Architecture

### Tailwind CSS

Utility-first CSS with consistent design tokens:

\`\`\`typescript
// Design tokens defined in tailwind.config.ts
colors: {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  // ...
}
\`\`\`

### CSS Variables

Theme values defined in `globals.css`:

\`\`\`css
:root {
  --primary: 199 89% 48%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
\`\`\`

## Performance Considerations

### Code Splitting

- Automatic code splitting per route
- Dynamic imports for heavy components

### Caching

- SWR for intelligent data caching
- Static generation where possible

### Optimization

- Image optimization with next/image
- Font optimization with next/font
- Minimal bundle size with tree shaking

## Security

### Client-Side

- Input sanitization
- XSS prevention
- CSRF protection (when backend connected)

### Authentication (Future)

- JWT-based authentication
- Secure session management
- Role-based access control

## Testing Strategy

### Unit Tests

\`\`\`bash
npm run test
\`\`\`

### Integration Tests

\`\`\`bash
npm run test:integration
\`\`\`

### E2E Tests

\`\`\`bash
npm run test:e2e
\`\`\`

## Deployment

### Vercel (Recommended)

\`\`\`bash
vercel deploy
\`\`\`

### Docker

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
\`\`\`

## Future Considerations

1. **Backend Integration**: Connect to real-time meter data
2. **Push Notifications**: Implement service workers
3. **Offline Support**: Add PWA capabilities
4. **Real-time Updates**: WebSocket connections for live data
5. **Analytics**: User behavior tracking and insights
