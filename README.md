# TaskFlow REST API

A RESTful Task Management API built using Node.js, Express.js and SQLite, featuring user authentication, JWT-based authorization and complete CRUD operations.

## Tech Stack

- Node.js
- Express.js
- SQLite
- better-sqlite3
- bcryptjs
- JSON Web Token (JWT)
- dotenv

## Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected task management endpoints
- Create, Read, Update and Delete tasks
- Input validation and error handling
- User-specific task access

## Installation

1. Clone the repository:

   `git clone YOUR_REPOSITORY_URL`

2. Navigate into the project:

   `cd Taskflow-restapi`

3. Install dependencies:

   `npm install`

4. Create a `.env` file:

   ```env
   PORT=5000
   JWT_SECRET=your_secure_random_secret
   ```

5. Start the development server:

   `npm run dev`

The API runs at `http://localhost:5000`.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

Registration request:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass123"
}
```

Login request:

```json
{
  "email": "test@example.com",
  "password": "TestPass123"
}
```

### Tasks

All task endpoints require a valid JWT Bearer token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Retrieve all user's tasks |
| GET | `/api/tasks/:id` | Retrieve a task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Authorization header:

`Authorization: Bearer YOUR_JWT_TOKEN`

Create task request:

```json
{
  "title": "Complete assignment",
  "description": "Build REST API",
  "status": "pending"
}
```

Update task request:

```json
{
  "title": "Assignment completed",
  "description": "REST API implementation finished",
  "status": "completed"
}
```

Allowed task statuses: `pending`, `completed`.

## HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Invalid input |
| 401 | Unauthorized |
| 404 | Resource not found |
| 409 | Duplicate email |
| 500 | Internal server error |

## Project Structure

```text
Taskflow-restapi/
├── config/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── database/
│   └── db.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Testing

API endpoints were tested using Postman.

Test cases include:
- Successful registration and login
- Incorrect password rejection
- Duplicate email rejection
- Access without authentication
- Successful CRUD operations
- Empty title validation
- Invalid task status validation
- Missing required fields
- Task retrieval after deletion

## Security

- Passwords are hashed using bcrypt.
- JWT tokens protect task endpoints.
- Users can access only their own tasks.
- Environment secrets are stored in `.env`.

## Author

Developed as a REST API development assignment.