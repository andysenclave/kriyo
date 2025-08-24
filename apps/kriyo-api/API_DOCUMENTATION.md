# Kriyo API Documentation

This document provides an overview of all available API endpoints in the Kriyo API. The API uses versioning through URIs (e.g., `/api/v1/`) and requires authentication for most endpoints.

## Base URL

- Development: `http://localhost:8000`
- API Prefix: `/api`
- Version: `/v1`

## Authentication

The API uses cookie-based authentication with the `better-auth.session_token` cookie. All protected endpoints require this authentication token.

## Interactive Documentation

Once the server is running, you can access the interactive Swagger documentation at:
`http://localhost:8000/api/docs`

## Endpoints Overview

### Health Check

- **GET** `/api/v1/health` - Check service health status

### Dashboard

- **GET** `/api/v1/my/dashboard/tasks` - Get dashboard tasks summary
- **GET** `/api/v1/my/dashboard/projects` - Get dashboard projects summary

### Tasks Management

- **GET** `/api/v1/my/tasks` - Get all user tasks
- **GET** `/api/v1/my/tasks/:dueDate` - Get user tasks by due date
- **POST** `/api/v1/my/tasks` - Create a new task
- **PUT** `/api/v1/my/tasks/:id` - Update an existing task
- **DELETE** `/api/v1/my/tasks/:id` - Delete a task
- **GET** `/api/v1/protected/tasks/search/:search` - Search tasks across all users

### Projects Management

- **GET** `/api/v1/my/projects` - Get all user projects
- **POST** `/api/v1/my/projects` - Create a new project
- **PUT** `/api/v1/my/projects/:id` - Update an existing project
- **DELETE** `/api/v1/my/projects/:id` - Delete a project
- **GET** `/api/v1/protected/projects/search/:search` - Search projects across all users

### User Profile

- **GET** `/api/v1/my/profile` - Get user profile information
- **PUT** `/api/v1/my/profile` - Update user profile

## Data Models

### Task

- `id`: string - Unique identifier
- `title`: string - Task title (required)
- `description`: string - Task description (required)
- `dueDate`: string (ISO 8601) - Due date (optional)
- `status`: enum - Task status (`pending`, `in-progress`, `completed`, `cancelled`)
- `priority`: enum - Priority level (`low`, `medium`, `high`, `critical`)
- `priorityRank`: number - Numeric ranking for sorting
- `project`: string - Associated project ID (optional)
- `assignedTo`: string - Assigned user ID (optional)
- `userId`: string - Owner user ID
- `createdAt`: string (ISO 8601) - Creation timestamp
- `updatedAt`: string (ISO 8601) - Last update timestamp

### Project

- `id`: string - Unique identifier
- `title`: string - Project title (required)
- `description`: string - Project description (required)
- `status`: enum - Project status (`planning`, `active`, `on-hold`, `completed`, `cancelled`)
- `targetDate`: string (ISO 8601) - Target completion date (optional)
- `priority`: enum - Priority level (`low`, `medium`, `high`, `critical`)
- `priorityRank`: number - Numeric ranking for sorting
- `owner`: string - Project owner ID (required)
- `assignedTo`: string - Assigned user ID (optional)
- `tasks`: array of strings - Associated task IDs
- `createdAt`: string (ISO 8601) - Creation timestamp
- `updatedAt`: string (ISO 8601) - Last update timestamp

### User Profile

- `id`: string - Unique identifier
- `email`: string - User email address
- `name`: string - Full name
- `phone`: string - Phone number (optional)
- `avatar`: string - Avatar URL (optional)
- `createdAt`: string (ISO 8601) - Account creation timestamp
- `updatedAt`: string (ISO 8601) - Last update timestamp
- `preferences`: object - User preferences (theme, notifications, timezone)
- `statistics`: object - User statistics (task/project counts)

## Error Responses

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (Invalid data)
- `401` - Unauthorized (Authentication required)
- `404` - Not Found (Resource not found or doesn't belong to user)
- `500` - Internal Server Error

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

## Authentication Headers

All protected endpoints expect the authentication token in the cookie:

```
Cookie: better-auth.session_token=<token>
```

## Middleware

- **Client ID Validator**: All endpoints require a valid client ID in headers
- **CORS**: Configured to accept requests from the Kriyo UI application
- **Cookie Parser**: Handles cookie-based authentication

## Running the Development Server

```bash
cd /Users/andysenclave/Projects/Projects2025/kriyo/apps/kriyo-api
npm run dev
```

The server will start on the port specified in the `PUBLIC_API_PORT` environment variable (default: 8000).

## Testing the API

You can test the API using:

1. **Swagger UI**: `http://localhost:8000/api/docs`
2. **Postman**: Import the OpenAPI/Swagger specification
3. **cURL**: Command line requests with proper authentication cookies
4. **Jest Tests**: Run `npm test` for unit tests, `npm run test:e2e` for end-to-end tests
