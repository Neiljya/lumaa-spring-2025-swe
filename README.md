# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

# Task Manager App

This repository contains a full-stack task management application with a simple functioning backend
---

## Features
- **User Authentication** - Register and login with JWT authentication
- **Task Manager** - Create, retrieve, update, and delete tasks
- **PostgreSQL Database Compatible** - Stores users and tasks persistently

---
## Setup Guide

### 1. Clone the Repository
Run the following command:

```
git clone https://github.com/Neiljya/lumaa-spring-2025-swe.git
```
---
## Setting Up The Database (PostgreSQL)

### 2. Ensure PostgreSQL is installed
If not, you can install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).

### 3. Configure the `.env` file
Create a `.env` file in the **root directory** in the following format:

```
PORT=3000
PG_HOST=localhost
PG_USER=your_pg_user
PG_PASSWORD=your_password
PG_DATABASE=your_db_name
JWT_SECRET=your_secret
```
**Be sure to change the PG_USER, PG_PASSWORD, PG_DATABASE, and JWT_SECRET fields to match your information**

**Note:** By default, this project assumes you are testing on your local machine so `localhost` should remain the same, however, you are free to change the value of `PORT` to whatever port you would like.

To **generate a secure `JWT_SECRET`**, run:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
### 4. Running Database Migrations
Navigate to the **migrations** folder: 
``bash
cd task-manager/src/backend/migrations
``

Run the following inside `psql`:

**1.** 

```
\i migration_users.sql;
```

**2.**

```
\i migration_tasks.sql;
```

This will create the necessary tables (`users` and `tasks`).
---
## Running the Backend

Ensure that you are within the `task-manager/` directory first.

1. Install the backend dependencies:

```
npm install
```

2. Start the backend server:

```
npm run dev:backend
```

The server should now be running on `http://localhost:${PG_PORT}`
---

## Running the Frontend
1. Open a new terminal and navigate to `task-manager/`
2. Start the frontend by running:

```
npm run dev
```

The frontend should be available at `http://localhost:5173`
---
## API Routes
### **Authentication Routes**
- `POST /api/auth/register` -> Registers a new user
- `POST /api/auth/login` -> Login and receive a JWT token

### **Task Routes** (Requires Authentication)
- `GET /api/tasks` -> Gets tasks for the authenticated user.
- `POST /api/tasks` -> Creates a new task
- `PUT /api/tasks/:id` -> Updates tasks details (for now it only marks a task as completed or not)
- `DELETE /api/tasks/:id` -> Deletes a task

---
## Testing the API
**Option 1: Using Postman**
- Send requests to `http://localhost:${PG_PORT}/api/auth/register` or `http://localhost:${PG_PORT}/api/auth/login`
- Copy the token from response and use it as an `Authorization: Bearer <TOKEN>` header for tasks

**Option 2: Using Curl**
Example:
```
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type:
application/json" -d '{"username":"testuser","password":"password123"}'
```

---
## Troubleshooting
### Backend Not Starting?
- Ensure you're connected to your PostgreSQL database
  
```
\c your_database_name
```

- Verify `.env` variables are correctly set in the format:
  
```
PORT=3000
PG_HOST=localhost
PG_USER=your_pg_user
PG_PASSWORD=your_password
PG_DATABASE=your_db_name
JWT_SECRET=your_secret
```

- Check if the database already exists by running
  
```
psql -U postgres -d your_db_name
```

### Database Connection Failing?
- Verify the `.env` credentials match your PostgreSQL setup
- Check that you've properly migrated the tables:
  
```
\dt
```

The relations list should look like this:

```
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | tasks | table | postgres
 public | users | table | postgres
(2 rows)
```

---

**Additional Notes/Improvements**
In the future, further project improvements could include adding 
additional unit tests such as jest tests for backend services and frontend components.

There could be additional enhancements that could make the code more modular especially within
the queries in the models. As of right now, the project is small in scale but if additional fields
were to be added for users and tasks, queries could be improved by creating more constants and 
customizable queries for each method.

I would've liked to go back and refactor the code to use more variables in places
where base routes are more hardcoded to reduce mental overhead, however, due to time constraints,
these changes weren't prioritized as for the sake of testing the current project, those fields would
most likely not need to be modified. But for future reference, that is something to consider.

Additional comments for files and overall API structure could also improve clarity or a full documentation on the architecture of the application.

As for the backend, currently there is no rate limit for API requests which can be easily abused
if the project were to be deployed, as a fix, using `express-rate-limit` could help prevent
the abuse of such routes.
---
