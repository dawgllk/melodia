# 🎵 Melodia Backend

Melodia Backend is a Node.js and TypeScript REST API for user authentication, Spotify-powered music search, Spotify account connection state, and persistent liked songs using MongoDB.

---

## 🚀 Features

- Search songs via the Spotify API
- User registration and login with JWT authentication
- Like and unlike songs, persisted per user
- Retrieve user-specific liked songs
- Connect and disconnect a user's Spotify account
- Check whether the current user has Spotify connected
- MongoDB integration with Mongoose
- Route/controller/service project structure

---

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT with `jsonwebtoken`
- `bcryptjs`
- Spotify Web API

---

## ⚙️ Setup

### 1. 📦 Install Dependencies

```bash
npm install
```

### 2. 🔐 Create `.env`

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/melodia
JWT_SECRET=your_jwt_secret

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=https://your-public-backend-url/api/spotify/callback

FRONTEND_URL=http://localhost:4200
```

`SPOTIFY_REDIRECT_URI` must exactly match one of the redirect URIs configured in the Spotify Developer Dashboard. During local development, this is usually an HTTPS tunnel URL such as ngrok.

### 3. ▶️ Start Development Server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

---

## 📡 API Endpoints

### 🩺 Health Check

```http
GET /
```

---

## 🔐 Authentication

### 📝 Register

```http
POST /api/auth/register
```

Body:

```json
{
  "username": "filip",
  "email": "filip@example.com",
  "password": "secret123"
}
```

Response includes a JWT:

```json
{
  "message": "User created successfully.",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "filip",
    "email": "filip@example.com"
  }
}
```

### 🔑 Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "filip@example.com",
  "password": "secret123"
}
```

Response includes a JWT:

```json
{
  "message": "Login successful.",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "filip",
    "email": "filip@example.com"
  }
}
```

### 👤 Get Current User

```http
GET /api/auth/me
Authorization: Bearer <jwt>
```

Spotify tokens are excluded from this response.

---

## 🔍 Search

### 🎶 Search Songs

```http
GET /api/search?q=drake
```

Uses Spotify's Client Credentials flow internally. No user Spotify connection is required for search.

---

## ❤️ Likes

All likes endpoints require the app JWT:

```http
Authorization: Bearer <jwt>
```

### ❤️ Like A Song

```http
POST /api/likes
Authorization: Bearer <jwt>
```

Body:

```json
{
  "spotifyTrackId": "track_id"
}
```

### 📄 Get Liked Songs

```http
GET /api/likes
Authorization: Bearer <jwt>
```

### ✅ Get Like Status

```http
GET /api/likes/:spotifyTrackId/status
Authorization: Bearer <jwt>
```

Response:

```json
{
  "isLiked": true
}
```

### 💔 Unlike A Song

```http
DELETE /api/likes/:spotifyTrackId
Authorization: Bearer <jwt>
```

---

## 🧭 Discover

### 🌍 Global Top Tracks

```http
GET /api/discover/global
```

### 🇦🇹 Austria Top Tracks

```http
GET /api/discover/austria
```

These endpoints fetch predefined Spotify playlists through the app-level Spotify credentials.

---

## 🎧 Spotify Account Connection

The Spotify account connection flow stores Spotify access and refresh tokens only in MongoDB. The frontend should never store or receive Spotify tokens.

### 🔗 Start Spotify OAuth

```http
GET /api/spotify/login
Authorization: Bearer <jwt>
```

The backend verifies the app JWT, creates a short-lived signed OAuth `state`, and redirects the browser to Spotify.

For browser redirects that cannot send an `Authorization` header, the current backend also accepts:

```http
GET /api/spotify/login?token=<jwt>
```

This works for development, but a safer follow-up is to replace URL JWT usage with a dedicated authenticated endpoint that returns the Spotify authorization URL.

### ↩️ Spotify OAuth Callback

```http
GET /api/spotify/callback
```

Spotify redirects here after authorization. The backend:

1. Verifies the signed OAuth `state`
2. Exchanges the Spotify code for tokens
3. Stores the Spotify access token and refresh token on the logged-in user
4. Redirects to:

```text
<FRONTEND_URL>/profile?spotify_connected=true
```

If Spotify returns an OAuth error, the backend redirects to:

```text
<FRONTEND_URL>/profile?spotify_error=<error>
```

### ✅ Check Spotify Connection Status

```http
GET /api/spotify/status
Authorization: Bearer <jwt>
```

Response:

```json
{
  "connected": true
}
```

### 🔌 Disconnect Spotify

```http
DELETE /api/spotify/disconnect
Authorization: Bearer <jwt>
```

Removes the stored Spotify access token, refresh token, and connection timestamp from the current user.

Response:

```json
{
  "connected": false
}
```

---

## 📝 Notes

- Spotify app credentials are required for search and discover endpoints.
- Spotify user OAuth tokens are stored only in the backend database.
- MongoDB must be running and reachable through `MONGODB_URI`.
- Passwords are hashed with `bcryptjs`.
- JWT is used for protected app routes.
- `SPOTIFY_REDIRECT_URI` must be HTTPS for Spotify OAuth unless Spotify explicitly allows a local development exception.

---

## 🔮 Future Improvements

- Replace Spotify login URL JWT usage with a safer authorization URL endpoint
- Encrypt stored Spotify OAuth tokens
- Add Spotify token expiry and refresh handling
- Add request validation with Zod or Joi
- Improve centralized error handling
- Restrict CORS origins by environment
- Add backend tests for auth, likes, and Spotify connection state

---

## ✨ Author

Filip Nogacki
