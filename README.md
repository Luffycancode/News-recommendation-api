# News Aggregator API

A RESTful API built with Node.js and Express.js that allows users to register, authenticate, manage their news preferences, and retrieve personalized news content.

## Features

- User Registration
- User Authentication using JWT
- Password Hashing with bcrypt
- Protected Routes using Middleware
- View User Preferences
- Update User Preferences
- News Retrieval Endpoint
- Automated API Testing

## Tech Stack

- Node.js
- Express.js
- bcrypt
- JSON Web Token (JWT)
- Tap
- Supertest

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | /users/signup | Register a new user |
| POST | /users/login | Authenticate a user |

### Preferences

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | /users/preferences | Get user preferences |
| PUT | /users/preferences | Update user preferences |

### News

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | /news | Retrieve news articles |

## Getting Started

### Install Dependencies

bash npm install 

### Start Development Server

bash npm run dev 

### Run Tests

bash npm test 

## Test Results

- All automated tests passing (15/15)

## Future Enhancements

- MongoDB integration
- Real News API integration
- JWT verification improvements
- Caching support
- Enhanced input validation