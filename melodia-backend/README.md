# Melodia Backend

Melodia Backend is a Node.js and TypeScript REST API for searching songs via the Spotify API, managing users with JWT authentication, and storing user-specific liked songs with MongoDB.

## 🚀 Features

- Search for songs using the Spotify API
- User registration and login (JWT)
- MongoDB integration with Mongoose
- Clean route/controller/service architecture

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Spotify Web API

## ⚙️ Setup

### 1. Install dependencies

    npm install

### 2. Create `.env` file

    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/melodia
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    JWT_SECRET=your_jwt_secret

### 3. Start development server

    npm run dev

Server will run on:

    http://localhost:3000

## API Endpoints

### Health Check

    GET /

### Search Songs

    GET /api/search?q=drake

### Register

    POST /api/auth/register

Body:

    {
      "username": "filip",
      "email": "filip@example.com",
      "password": "secret123"
    }

### Login

    POST /api/auth/login

Body:

    {
      "email": "filip@example.com",
      "password": "secret123"
    }

## 📝 Notes

- Spotify credentials are required for the API to work
- MongoDB must be running locally
- Passwords are hashed using bcrypt
- JWT is used for authentication

## 🔮 Future Improvements

- Protected routes (JWT middleware)
- Like/unlike songs
- Better error handling
- Input validation
- Frontend integration