# Replit.md

## Overview

This is a full-stack web application built with React, Express, and TypeScript that simulates an educational bot learning platform. The application demonstrates how social media bots work through interactive simulation, allowing users to create and manage different types of bots while observing their behavior in a simulated social feed.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with a custom dark theme featuring black, brown, and gold color scheme
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and building

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (configured in drizzle.config.ts)
- **API Design**: RESTful API with JSON responses
- **Development Setup**: Hot reloading with Vite middleware integration

### Key Components

#### Database Schema (Drizzle ORM)
- **Users**: Basic user authentication structure
- **Bots**: Bot entities with configuration, stats, and activity tracking
- **Posts**: Social media posts with engagement metrics
- **Activities**: Bot activity logging system
- **Comments**: Post comments with bot/user attribution

#### Bot System
- **Bot Types**: Content creator, engagement, follower, and analytics bots
- **Configuration**: Customizable activity levels, keywords, schedules, and rate limiting
- **Statistics Tracking**: Performance metrics including engagement rates and interaction counts
- **Real-time Simulation**: Automated bot behavior simulation

#### UI Architecture
- **Dashboard Layout**: Sidebar navigation with main content area
- **Component Structure**: Modular components for bot cards, activity feeds, performance metrics
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme System**: Custom CSS variables for consistent branding

### Data Flow

1. **User Interaction**: Users interact with the dashboard to create and configure bots
2. **API Communication**: Frontend communicates with Express backend via REST API
3. **Database Operations**: Drizzle ORM handles database queries and mutations
4. **Real-time Updates**: TanStack Query provides optimistic updates and cache management
5. **Bot Simulation**: Backend simulates bot activities and updates statistics
6. **Feed Generation**: Social feed displays simulated posts and interactions

### External Dependencies

#### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Libraries**: Radix UI components, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Database**: Drizzle ORM, Neon Database serverless client
- **Utilities**: date-fns for date formatting, zod for schema validation

#### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development Experience**: Hot reloading, error overlays, Replit integration

### Deployment Strategy

#### Development Environment
- **Local Development**: Vite dev server with Express API integration
- **Hot Reloading**: Vite middleware handles frontend updates
- **Database**: Neon Database for development and production
- **Environment Variables**: DATABASE_URL for database connection

#### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles Express server to `dist/index.js`
- **Static Assets**: Vite handles asset optimization and fingerprinting
- **Database Migrations**: Drizzle Kit manages schema migrations

#### Architecture Decisions

**Database Choice**: PostgreSQL with Drizzle ORM was chosen for its type safety, schema management, and compatibility with serverless deployments. Neon Database provides a managed PostgreSQL solution that works well in cloud environments.

**State Management**: TanStack Query handles server state rather than client state managers like Redux, reducing complexity and providing built-in caching, background updates, and optimistic updates.

**UI Framework**: shadcn/ui provides high-quality, customizable components built on Radix UI primitives, offering accessibility and flexibility while maintaining design consistency.

**Monorepo Structure**: The codebase uses a shared folder for types and schemas, allowing type safety between frontend and backend while maintaining separation of concerns.

**Development Experience**: The setup prioritizes developer experience with hot reloading, TypeScript throughout, and integrated error handling for rapid iteration.