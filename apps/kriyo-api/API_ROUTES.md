# Kriyo API Gateway - Route Mapping

This document outlines the API route mapping between UI routes and backend API endpoints.

## Authentication Flow

- **Auth routes (`/api/auth/*`)** are handled directly by the `auth-service` (not through API gateway)
- All other routes go through the `kriyo-api` gateway
- Authentication is verified via Better Auth session cookies

## Route Categories

### `/my/*` - User-owned Resources

All routes require authentication. Resources are filtered by the authenticated user.

### `/protected/*` - Authenticated User Resources

All routes require authentication. Resources can be accessed by any authenticated user.

### `/public/*` - Public Resources

Routes accessible without authentication (not implemented yet).

## Complete Route Mapping

| UI Route             | API Endpoint                                | Method | Auth Level | Description             |
| -------------------- | ------------------------------------------- | ------ | ---------- | ----------------------- |
| `/auth/login`        | `/api/auth/sign-in/email`                   | POST   | Public     | Direct to auth-service  |
| `/auth/signup`       | `/api/auth/sign-up/email`                   | POST   | Public     | Direct to auth-service  |
|                      |                                             |        |            |                         |
| **Dashboard Routes** |                                             |        |            |                         |
| `/dashboard`         | `/api/v1/my/dashboard/tasks`                | GET    | My         | Dashboard tasks summary |
| `/dashboard`         | `/api/v1/my/dashboard/projects`             | GET    | My         | Dashboard projects      |
| `/dashboard`         | `/api/v1/protected/tasks/search/:search`    | GET    | Protected  | Search tasks            |
| `/dashboard`         | `/api/v1/my/tasks/:dueDate`                 | GET    | My         | Tasks by date           |
|                      |                                             |        |            |                         |
| **Tasks Routes**     |                                             |        |            |                         |
| `/tasks`             | `/api/v1/my/tasks`                          | GET    | My         | Get user's tasks        |
| `/tasks`             | `/api/v1/my/tasks`                          | POST   | My         | Create new task         |
| `/tasks`             | `/api/v1/my/tasks/:id`                      | PUT    | My         | Update task             |
| `/tasks`             | `/api/v1/my/tasks/:id`                      | DELETE | My         | Delete task             |
| `/tasks`             | `/api/v1/protected/tasks/search/:search`    | GET    | Protected  | Search tasks            |
| `/tasks`             | `/api/v1/my/tasks/:dueDate`                 | GET    | My         | Tasks by due date       |
|                      |                                             |        |            |                         |
| **Projects Routes**  |                                             |        |            |                         |
| `/projects`          | `/api/v1/my/projects`                       | GET    | My         | Get user's projects     |
| `/projects`          | `/api/v1/my/projects`                       | POST   | My         | Create new project      |
| `/projects`          | `/api/v1/my/projects/:id`                   | PUT    | My         | Update project          |
| `/projects`          | `/api/v1/my/projects/:id`                   | DELETE | My         | Delete project          |
| `/projects`          | `/api/v1/protected/projects/search/:search` | GET    | Protected  | Search projects         |
|                      |                                             |        |            |                         |
| **Profile Routes**   |                                             |        |            |                         |
| `/profile`           | `/api/v1/my/profile`                        | GET    | My         | Get user profile        |
| `/profile`           | `/api/v1/my/profile`                        | PUT    | My         | Update profile          |

## API Response Formats

### Dashboard Tasks Response

```json
{
  "overdue": 3,
  "highPriority": 2,
  "tasks": [
    {
      "id": "1",
      "title": "Task title",
      "description": "Task description",
      "dueDate": "2025-08-21",
      "status": "pending",
      "priority": "high"
    }
  ]
}
```

### Tasks Response

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Task title",
      "description": "Task description",
      "dueDate": "2025-08-21",
      "status": "pending",
      "priority": "high",
      "createdBy": "user-id"
    }
  ]
}
```

### Projects Response

```json
{
  "projects": [
    {
      "id": "1",
      "title": "Project title",
      "description": "Project description",
      "status": "active",
      "tasks": ["task-1", "task-2"],
      "targetDate": "2025-09-01",
      "priority": "high",
      "owner": "user-id"
    }
  ]
}
```

## Service Integration

The API Gateway forwards requests to the following microservices:

- **auth-service** (Port varies) - Better Auth integration
- **user-service** (Port varies) - User profiles and data
- **tasks-service** (Port varies) - Task management
- **projects-service** (Port varies) - Project management

## Next Steps

1. Implement actual service-to-service HTTP calls in service classes
2. Add proper session validation with auth-service
3. Implement error handling and logging
4. Add API documentation with Swagger
5. Add rate limiting and security middleware
