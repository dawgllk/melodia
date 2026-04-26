# 🎵 Melodia

Melodia is a fullstack music application that allows users to discover songs via the Spotify API, manage their favorite tracks, and interact with a modern web interface.

---

## 🧱 Project Structure

- `melodia-backend/` – Node.js, Express, TypeScript, MongoDB backend
- `melodia-frontend/` – Angular, TypeScript frontend client

---

## 🚀 Features Overview

- 🔍 Search songs via Spotify API
- 🔐 User authentication (JWT-based login & register)
- ❤️ Like & manage favorite songs (persisted in database)
- 🎧 Spotify integration for music discovery
- 🎨 Responsive UI with dynamic state handling

---

## ⚙️ Backend

The backend provides:

- Spotify API integration (search & track data)
- JWT-based authentication system
- Persistent storage of liked songs
- REST API with clean architecture (routes, controllers, services)

See the backend README for more details:

`melodia-backend/README.md`

---

## 💻 Frontend

The frontend provides:

- Angular-based UI with standalone components
- Search interface with multiple UI states
- Authentication system with global user state
- Like system with real-time UI updates
- Dynamic header with dropdown navigation
- Homepage with Spotify playlist embeds

See the frontend README for more details:

`melodia-frontend/README.md`

---

## 🧠 Architecture

Melodia follows a clear separation between frontend and backend:

- **Frontend** handles UI, user interaction, and state management
- **Backend** handles authentication, data persistence, and API communication

Communication is handled via REST APIs with JSON-based data exchange.

---

## 📝 Notes

- This project demonstrates a fullstack architecture using modern web technologies
- Focus on clean structure, scalability, and real-world application design

---

## ✨ Author

Filip Nogacki
