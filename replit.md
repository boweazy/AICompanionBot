# Replit.md

## Overview

This is a full-stack web application built with React, Express, and TypeScript that simulates an educational bot learning platform. The application demonstrates how social media bots work through interactive simulation, allowing users to create and manage different types of bots while observing their behavior in a simulated social feed.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

### E-Commerce MVP Transformation Completed
- **Date**: January 17, 2025
- **Changes**: Complete transformation into monetizable MVP for e-commerce social media automation
- **New Features**:
  - **Enhanced SEO & Accessibility**: Comprehensive meta tags, Open Graph tags, no-JS fallbacks, and loading states
  - **E-Commerce Focused Branding**: Updated to "SFS AutoBots" with professional e-commerce messaging
  - **Marketplace Implementation**: Pre-built e-commerce bot templates with premium/free tiers
  - **Advanced Analytics**: Revenue tracking, conversion metrics, platform performance with Chart.js/Recharts
  - **Smart Scheduling System**: AI-powered automation rules with triggers, conditions, and actions
  - **Stripe Integration**: Complete payment processing setup with subscription management
  - **Freemium Monetization**: $49/month Premium tier with feature limitations for free users
  - **Mobile-First Design**: Responsive layouts with enhanced UX for deployment readiness

### Animated UI Transitions Implementation
- **Date**: January 17, 2025
- **Changes**: Complete implementation of animated UI transitions for bot configuration screens
- **New Features**:
  - Framer Motion integration for smooth, professional animations
  - Create Bot page with staggered entrance animations and form field transitions
  - Bot Configuration component with animated form inputs, hover effects, and loading states
  - Enhanced Bot Cards with entrance animations, hover effects, status transitions, and interactive buttons
  - Animated background glows, icon rotations, and micro-interactions throughout
  - Professional loading spinners and state transition animations

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with premium SFS brand colors (black #000000, dark brown #3E2723, gold #FFD700) featuring glass card effects, smooth animations, and professional typography
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

#### E-Commerce UI Architecture
- **Dashboard Layout**: Premium sidebar navigation with 6-tab interface (Overview, Feed, Analytics, Scheduling, Integrations, Configure)
- **Marketplace System**: Pre-built e-commerce bot templates with freemium monetization and premium upgrades
- **Advanced Analytics**: Revenue tracking, conversion metrics, platform performance using Recharts/Chart.js
- **Smart Scheduling**: AI-powered automation rules with triggers, conditions, and actions for e-commerce optimization
- **Component Structure**: Animated glass cards with professional hover effects and Framer Motion transitions
- **Responsive Design**: Mobile-first approach optimized for e-commerce deployment and accessibility
- **Theme System**: Enhanced SFS brand colors (Black #000000, Dark Brown #3E2723, Gold #FFD700) with premium animations
- **Monetization**: Comprehensive freemium model with $49/month Premium tier and Stripe integration

### Data Flow

1. **User Interaction**: Users interact with the dashboard to create and configure bots
2. **API Communication**: Frontend communicates with Express backend via REST API
3. **Database Operations**: Drizzle ORM handles database queries and mutations
4. **Real-time Updates**: TanStack Query provides optimistic updates and cache management
5. **Bot Simulation**: Backend simulates bot activities and updates statistics
6. **Feed Generation**: Social feed displays simulated posts and interactions

### External Dependencies

#### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with enhanced form validation
- **UI Libraries**: Radix UI components, Lucide React icons, Framer Motion for animations
- **Analytics & Charts**: Recharts, Chart.js for advanced e-commerce analytics and revenue tracking
- **Payment Processing**: Stripe.js for subscription management and payment processing
- **Styling**: Tailwind CSS, class-variance-authority for component variants with premium animations
- **Database**: Drizzle ORM, Neon Database serverless client
- **Utilities**: date-fns for date formatting, zod for schema validation

#### E-Commerce Enhancements
- **Monetization**: @stripe/stripe-js for payment processing and subscription management
- **Analytics**: react-chartjs-2, recharts for revenue tracking and conversion metrics
- **Animation**: Framer Motion for professional UI transitions and micro-interactions
- **SEO Optimization**: Enhanced meta tags, Open Graph support, and accessibility improvements

#### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds with deployment optimization
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development Experience**: Hot reloading, error overlays, Replit integration with SEO testing

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