# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Root Level (TurboRepo)
- `npm run dev` - Start all services concurrently using TurboRepo
- `npm start` - Start all services using concurrently.js script (user-service, auth-service, tasks-service, projects-service, kriyo-ui)
- `npm run build` - Build all apps using TurboRepo
- `npm run test` - Run tests across all apps
- `npm run lint` - Lint all apps

### Frontend (kriyo-ui)
- `npm run dev --workspace apps/kriyo-ui` - Start Next.js dev server with Turbopack
- `npm run test --workspace apps/kriyo-ui` - Run Jest tests
- `npm run test:watch --workspace apps/kriyo-ui` - Run tests in watch mode
- `npm run test:coverage --workspace apps/kriyo-ui` - Generate test coverage report

### Backend Services (NestJS)
For each service (auth-service, user-service, tasks-service, projects-service):
- `npm run dev --workspace apps/{service-name}` - Start service in development mode with Prisma generation
- `npm run test --workspace apps/{service-name}` - Run unit tests
- `npm run test:e2e --workspace apps/{service-name}` - Run end-to-end tests
- `npm run lint --workspace apps/{service-name}` - Lint the service code

## Architecture Overview

### Microservices Architecture
Kriyo follows a microservices architecture with the following services:

1. **auth-service** (Port varies) - Authentication using Better Auth with Prisma
2. **user-service** (Port varies) - User management and profiles  
3. **tasks-service** (Port varies) - Task CRUD operations
4. **projects-service** (Port varies) - Project management
5. **kriyo-ui** (Port 3000) - Next.js frontend application

### Database Architecture
Each service has its own PostgreSQL database with Prisma ORM:
- **auth-service**: Better Auth schemas (user, session, account tables)
- **user-service**: User model with betterAuthId foreign key
- **tasks-service**: Task model with createdBy, dueDate, status, priority fields
- **projects-service**: Project model with owner, tasks array, priority fields

All Prisma clients are generated to `generated/prisma/` directory within each service.

### Frontend Architecture

#### Book-Based Modular UI
The frontend follows a "book-based" modular architecture:
- Each major feature is organized as a "book" containing sections
- Components are structured hierarchically with reusable UI elements
- Uses React Context for state management (AuthProvider, MyTasksProvider)

#### Key Frontend Patterns
- **MSW (Mock Service Worker)** for API mocking during development
- **Better Auth Client** for authentication integration
- **Axios abstraction layer** in `/services/api/` for HTTP requests
- **Protected routes** using AuthProvider context
- **Component testing** with Jest and React Testing Library

#### UI Components
- Built with **TailwindCSS** and **Radix UI** components
- Reusable components in `/components/ui/` (button, dialog, input, etc.)
- Form handling with **React Hook Form** and **Yup validation**
- Calendar integration using **react-day-picker**

### Authentication Flow
- Frontend uses Better Auth client (`authClient`) to communicate with auth-service
- Auth service uses Better Auth with Prisma adapter and PostgreSQL
- JWT sessions with trusted origins configuration
- User data synchronized between auth-service and user-service via better auth hooks

### Development Workflow
1. All services can be started together using `npm start` or `npm run dev`
2. Frontend runs on localhost:3000 with MSW for API mocking
3. Each service has independent database migrations via Prisma
4. TypeScript strict mode enabled across all apps
5. ESLint and Prettier configured for code formatting

### Testing Strategy
- **Frontend**: Jest with React Testing Library, MSW for API mocking
- **Backend**: Jest for unit tests, Supertest for e2e API testing
- **Coverage reporting** available for frontend with `npm run test:coverage`
- Test files follow `*.spec.ts` and `*.test.tsx` patterns

## Important File Locations

- **Frontend entry**: `apps/kriyo-ui/src/app/layout.tsx`
- **Auth configuration**: `apps/auth-service/src/lib/auth.ts` 
- **API services**: `apps/kriyo-ui/src/services/api/`
- **Database schemas**: `apps/*/prisma/schema.prisma`
- **Mock handlers**: `apps/kriyo-ui/src/app/mocks/handlers.ts`
- **Concurrent service startup**: `concurrently.js`