# 🎵 Melodia

Melodia is a fullstack music application that allows users to discover songs via the Spotify API, manage their favorite tracks, connect their Spotify account, and interact with a modern web interface.

---

## 🧱 Project Structure

- `melodia-backend/` – Node.js, Express, TypeScript, MongoDB backend
- `melodia-frontend/` – Angular, TypeScript frontend client

---

## 🚀 Features Overview

- Search songs via the Spotify API
- User authentication with JWT-based login and registration
- Like and manage favorite songs, persisted in MongoDB
- Connect and disconnect a user's Spotify account
- Check Spotify connection state from the profile page
- Responsive UI with dynamic state handling

---

## ⚙️ Backend

The backend provides:

- Spotify API integration for search and track data
- Spotify OAuth connection handling
- Backend-only storage of Spotify access and refresh tokens
- JWT-based authentication system
- Persistent storage of liked songs
- REST API with route, controller, service, and model layers

See the backend README for more details:

`melodia-backend/README.md`

---

## 💻 Frontend

The frontend provides:

- Angular-based UI with standalone components
- Search interface with multiple UI states
- Authentication system with global user state
- Like system with real-time UI updates
- Spotify connection status on the profile page
- Dynamic header with dropdown navigation

See the frontend README for more details:

`melodia-frontend/README.md`

---

## 🧠 Architecture

Melodia follows a clear separation between frontend and backend:

- **Frontend** handles UI, user interaction, routing, and client-side state
- **Backend** handles authentication, data persistence, Spotify communication, and protected API routes

Communication is handled through REST APIs with JSON-based data exchange.

---

## 🔐 Environment

The backend requires:

- MongoDB connection string
- JWT secret
- Spotify client ID and client secret
- Spotify OAuth redirect URI
- Frontend URL for OAuth redirects

Spotify OAuth requires an HTTPS callback URL during development. A tunnel service such as ngrok can be used for local testing.

Run the backend and frontend separately. See each package README for environment variables and startup commands.

---

## 📝 Notes

- This project demonstrates a fullstack architecture using modern web technologies
- Spotify OAuth tokens are stored only in the backend/database
- The frontend only receives Spotify connection status, not Spotify tokens
- The project focuses on clean structure, scalability, and real-world application design

---

## ✨ Author

Filip Nogacki
