# 🎵 Melodia Backend

Melodia Backend is a Node.js and TypeScript REST API for handling music search, user authentication, and persistent liked songs using the Spotify API and MongoDB.

---

## 🚀 Features

- 🔍 Search songs via the Spotify API
- 🔐 User registration and login with JWT authentication
- ❤️ Like and unlike songs (persisted in database)
- 📄 Retrieve user-specific liked songs
- 🗄️ MongoDB integration with Mongoose
- 🧩 Clean architecture (routes, controllers, services)

---

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Spotify Web API

---

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

---

## 📡 API Endpoints

### Health Check

    GET /

---

### 🔍 Search Songs

    GET /api/search?q=drake

---

### 🔐 Authentication

#### Register

    POST /api/auth/register

Body:

    {
      "username": "filip",
      "email": "filip@example.com",
      "password": "secret123"
    }

#### Login

    POST /api/auth/login

Body:

    {
      "email": "filip@example.com",
      "password": "secret123"
    }

---

### ❤️ Likes

#### Like a song

    POST /api/likes

Body:

    {
      "spotifyTrackId": "track_id"
    }

#### Get liked songs

    GET /api/likes

#### Unlike a song

    DELETE /api/likes/:spotifyTrackId

---

## 🎧 Spotify Integration

- Uses the Spotify Web API with Client Credentials Flow
- Implements song search and track data mapping

> ⚠️ Note:  
> An attempt was made to fetch Spotify chart playlists (e.g. Top 50 Global) via the playlist endpoints.  
> However, access was restricted (403 Forbidden) when using the Client Credentials Flow,  
> so this feature was not integrated into the frontend.

---

## 📝 Notes

- Spotify credentials are required for the API to work
- MongoDB must be running locally
- Passwords are securely hashed using bcrypt
- JWT is used for authentication and protected routes

---

## 🔮 Future Improvements

- Input validation (e.g. Zod / Joi)
- Improved error handling
- Token refresh / session handling
- User profile endpoints
- Advanced Spotify features (recommendations, previews)

---

## ✨ Author

Filip Nogacki