# User Management API

This is a RESTful API for managing users with basic CRUD operations and JWT-based authentication. It uses Express.js, Prisma ORM, and PostgreSQL for the database.

## Prerequisites

1. Node.js (version 17 or higher)
2. Docker (for running PostgreSQL)
3. Docker Compose (for managing the Docker container)

## Setup Instructions
1. Install Dependencies

Ensure you have Node.js version 17 or higher installed. Then, install the project dependencies:

```bash
npm install
```

2. Start the Docker Container

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```


This will start a PostgreSQL container

3. Run Prisma Migrations

Apply the database schema using Prisma migrations:

```bash
npx prisma migrate dev --name init
```


This will create the necessary tables in the PostgreSQL database.

4. Start the Server

Start the Express server:

```bash
npm start
```


The server will start on `http://localhost:3000`it will also prompt you to create the admin account if one doesn't exist.

## API Documentation
Once the server is running, you can access the Swagger UI for API documentation at `http://localhost:3000/docs`.
You can then use the /auth/login endpoint to get your admin accounts JWT token and use it to access and test the other endpoints.


> :warning: **This project includes the .env file which should be avoided in production**: Be very careful here!