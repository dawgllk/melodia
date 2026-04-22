# 🎵 Melodia – Music Discovery App

Melodia is a fullstack web application that allows users to search for songs via the Spotify API, manage their favorite tracks, and interact with a clean, modern UI.

---

## 🚀 Features (Frontend)

### 🔍 Search System
- Search for songs and artists using the Spotify API
- Clean and responsive search UI
- Displays:
  - Song name
  - Artist(s)
  - Album
  - Cover image
- Direct link to Spotify

### 🧠 Smart UI States
The search page handles all important states:

- 🟢 **Initial State**
  - “Start by searching for a song or artist”

- 🔄 **Loading State**
  - Animated spinner while fetching data

- ❌ **No Results State**
  - “No results found for 'xyz'”

- ✅ **Results State**
  - “Showing results for 'xyz'”

---

### ❤️ Like System (UI Ready)
- Like button implemented per track
- Ready for backend integration
- Clean hover effects and interaction design

---

### 🔐 Authentication System
- Login with email & password
- JWT token handling
- User data stored globally (AuthService + localStorage)

---

### 👤 Dynamic Header
- Adapts based on authentication state

#### Not logged in:
- Sign In
- Create Account

#### Logged in:
- Profile button
- Interactive dropdown:
  - Go to Profile (placeholder)
  - Logout

---

### 🧩 Dropdown UX
- Toggle dropdown on click
- Arrow indicator (▲ / ▼)
- Closes when clicking outside
- Smooth and intuitive behavior

---

### 🎨 UI / UX Design
- Dark theme with custom color palette
- Consistent typography (Inter font)
- Responsive layout
- Clean card-based design for tracks
- Subtle hover animations

---

## 🏗️ Tech Stack

- **Angular (Standalone Components)**
- TypeScript
- RxJS
- CSS (custom styling, no framework)
- Spotify API (via backend)

---

## 🔮 Future Improvements

### ❤️ Like System (Backend Integration)
- Persist liked songs in database
- Toggle like/unlike
- Display liked songs page

---

### 👤 Profile Page
- User information display
- Saved songs overview
- Account settings

---

### 🔐 Auth Improvements
- Register UI
- Token validation on app start
- Auto login via stored token
- HTTP Interceptor for auth headers

---

### ⚡ UX Enhancements
- Toast notifications (instead of alerts)
- Better loading animations
- Infinite scroll / pagination for search
- Keyboard navigation

---

### 🎵 Advanced Features
- Music previews (play snippets)
- Recommendations based on likes
- Recently searched songs

---

## 💡 Notes

This project focuses on:
- Clean UI/UX design
- Real-world app structure
- Fullstack-ready architecture

---

## 📸 Preview

*Screenshots will be added soon 👀*

---

## ✨ Author

Filip Nogacki
