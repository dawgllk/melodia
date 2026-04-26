# 🎵 Melodia – Music Discovery App

Melodia is a fullstack web application that allows users to discover music via the Spotify API, manage their favorite tracks, and interact with a modern, responsive UI.

---

## 🚀 Features

### 🔍 Search System
- Search for songs and artists using the Spotify API
- Displays:
  - Song name
  - Artist(s)
  - Album
  - Cover image
- Direct link to Spotify

---

### 🧠 UI States
The search page handles all important states:

- 🟢 Initial state (“Start searching for a song or artist”)
- 🔄 Loading state (spinner)
- ❌ No results state
- ✅ Results state with dynamic feedback

---

### ❤️ Like System
- Like and unlike songs
- Persistent storage via backend
- Instant UI updates (toggle state)
- Dedicated **Liked Songs page**

---

### 🔐 Authentication
- Register & Login with email and password
- JWT-based authentication
- Global user state management (AuthService + localStorage)
- Automatic token handling via HTTP Interceptor

---

### 👤 Dynamic Header
Adapts based on authentication state:

- Not logged in:
  - Sign In
  - Create Account
- Logged in:
  - Profile dropdown
  - Logout functionality

---

### 🎵 Homepage
- Spotify chart playlists embedded:
  - Global Top 50
  - Austria Top 50
  - Discover Weekly
  - Release Radar
- Responsive grid layout

---

### 🎨 UI / UX
- Dark theme with consistent design system
- Responsive layout
- Clean card-based components
- Subtle hover and interaction effects

---

## 🏗️ Tech Stack

- **Angular (Standalone Components)**
- TypeScript
- RxJS
- Node.js / Express (Backend)
- MongoDB
- REST APIs
- JWT Authentication
- Spotify API

---

## 🔮 Future Improvements

### 👤 Profile Page
- User overview
- Saved songs
- Account settings

### ⚡ UX Enhancements
- Toast notifications
- Infinite scroll / pagination
- Improved loading states

### 🎵 Advanced Features
- Music previews
- Recommendations based on likes
- Recently played / searched tracks

---

## 💡 Notes

This project demonstrates:
- Fullstack architecture
- API integration (Spotify)
- Authentication & state management
- Clean and scalable frontend structure

---

## 📸 Preview

*Screenshots will be added soon 👀*

---

## ✨ Author

Filip Nogacki
