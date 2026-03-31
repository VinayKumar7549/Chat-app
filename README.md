<div align="center">

# 💬 Chat App

**A full-stack real-time messaging application** built with the MERN stack.  
Sign up, pick a conversation, and chat instantly—with **live presence**, **JWT-based auth**, and **image messages** powered by Cloudinary.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[Features](#-features) · [Tech stack](#-tech-stack) · [Getting started](#-getting-started) · [Environment](#-environment-variables) · [API](#-api-overview)

</div>

---

## ✨ Features

| | |
| :--- | :--- |
| **Authentication** | Sign up, log in, log out with **JWT** stored in **HTTP-only cookies** |
| **Real-time chat** | **Socket.IO** for instant message delivery when the recipient is online |
| **Online presence** | See who is **online** in real time |
| **Rich messages** | Send **text** and **images** (images uploaded via **Cloudinary**) |
| **User directory** | Sidebar lists **all other users** (excluding you) for quick starts |
| **Profile** | Update **full name** and **profile picture** |
| **Theming** | **Light / dark** theme (DaisyUI + Tailwind) |
| **Production-ready UI** | React + Vite, loading states, and toast notifications |

---

## 🧱 Tech stack

### Frontend

| Technology | Role |
| ---------- | ---- |
| [React 18](https://react.dev/) | UI |
| [Vite 6](https://vitejs.dev/) | Dev server & build |
| [React Router 7](https://reactrouter.com/) | Routing & protected routes |
| [Zustand](https://github.com/pmndrs/zustand) | Auth & chat state |
| [Axios](https://axios-http.com/) | API client (`withCredentials` for cookies) |
| [Socket.IO Client](https://socket.io/) | Real-time events |
| [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) | Styling & components |
| [Lucide React](https://lucide.dev/) | Icons |
| [react-hot-toast](https://react-hot-toast.com/) | Notifications |

### Backend

| Technology | Role |
| ---------- | ---- |
| [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | REST API |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Data layer |
| [Socket.IO](https://socket.io/) | WebSockets (online users + new messages) |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Auth & password hashing |
| [Cloudinary](https://cloudinary.com/) | Image uploads (profile & chat images) |
| [cookie-parser](https://github.com/expressjs/cookie-parser) & [cors](https://github.com/expressjs/cors) | Cookies & cross-origin |

---

## 📁 Project structure

```
Chat-app/
├── backend/
│   └── src/
│       ├── controllers/     # Auth & message logic
│       ├── middleware/      # JWT protection
│       ├── models/          # User & Message schemas
│       ├── routes/          # /api/auth, /api/messages
│       ├── lib/             # DB, Socket.IO, Cloudinary, JWT helpers
│       └── index.js         # Express app & server entry
├── frontend/
│   └── src/
│       ├── components/      # Chat UI, sidebar, navbar, etc.
│       ├── pages/           # Home, login, signup, settings, profile
│       ├── store/           # Zustand stores
│       └── lib/             # Axios instance
├── package.json             # Root scripts (optional)
└── README.md
```

---

## 📋 Prerequisites

- **[Node.js](https://nodejs.org/)** 18 or newer (recommended for Vite 6 and modern tooling)
- **[MongoDB](https://www.mongodb.com/)** — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string
- **[Cloudinary](https://cloudinary.com/)** account (for profile pictures and image messages)

---

## 🚀 Getting started

### 1. Clone the repository

```bash
git clone https://github.com/VinayKumar7549/Chat-app.git
cd Chat-app
```

### 2. Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

### 3. Environment variables

Create a **`backend/.env`** file (never commit real secrets):

| Variable | Description |
| -------- | ----------- |
| `PORT` | Server port (e.g. `5001` — must match what the frontend expects in development) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs (use a long random string in production) |
| `NODE_ENV` | `development` or `production` (affects cookie `secure` flag and static file serving) |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |

Example shape (replace values):

```env
PORT=5001
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/DB_NAME
JWT_SECRET=your_super_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

The frontend uses **`http://localhost:5001/api`** in development (see `frontend/src/lib/axios.js`). If you change `PORT`, update the frontend base URL accordingly.

### 4. Run in development

Use **two terminals** — backend first, then frontend.

**Terminal 1 — API + Socket.IO server**

```bash
cd backend
npm run dev
```

**Terminal 2 — Vite dev server (default [http://localhost:5173](http://localhost:5173))**

```bash
cd frontend
npm run dev
```

Open the app in the browser, register an account, and start chatting.

---

## 🏗️ Production build

The backend can serve the built React app when `NODE_ENV=production` (see `backend/src/index.js`).

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Set `NODE_ENV=production` and ensure `PORT`, MongoDB, JWT, and Cloudinary variables are set on your host.

3. Start the server from the **backend** directory:

   ```bash
   cd backend
   npm start
   ```

Adjust **CORS** and **Socket.IO `origin`** lists in `backend/src/index.js` and `backend/src/lib/socket.js` to match your deployed frontend URL (the codebase includes examples for local and Vercel-style hosts).

---

## 📡 API overview

Base URL in development: **`http://localhost:5001/api`** (with credentials/cookies).

### Auth (`/api/auth`)

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| `POST` | `/signup` | No | Register (`fullName`, `email`, `password`) |
| `POST` | `/login` | No | Log in (`email`, `password`) |
| `POST` | `/logout` | No | Log out |
| `PUT` | `/update-profile` | Yes | Update profile (e.g. name, picture) |
| `GET` | `/check` | Yes | Current user (session refresh) |

### Messages (`/api/messages`)

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| `GET` | `/users` | Yes | All users except the logged-in user (sidebar) |
| `GET` | `/:id` | Yes | Message history with user `id` |
| `POST` | `/send/:id` | Yes | Send message to user `id` (`text`, optional `image` base64) |

---

## 🔌 Real-time (Socket.IO)

- Clients connect with a **`userId`** query parameter for presence tracking.
- **`getOnlineUsers`** — broadcast list of online user IDs when users connect or disconnect.
- **`newMessage`** — emitted to the recipient’s socket when a message is saved (if they are online).

If you deploy frontend and backend on different origins, ensure CORS and Socket.IO origins are updated to your real domains.

---

## 🛠️ Scripts reference

| Location | Command | Purpose |
| -------- | ------- | ------- |
| `backend/` | `npm run dev` | Development with nodemon |
| `backend/` | `npm start` | Production Node server |
| `frontend/` | `npm run dev` | Vite dev server |
| `frontend/` | `npm run build` | Production bundle to `dist/` |
| `frontend/` | `npm run preview` | Preview production build locally |
| `frontend/` | `npm run lint` | ESLint |

---

## 🤝 Contributing

Issues and pull requests are welcome. For bugs, use [GitHub Issues](https://github.com/VinayKumar7549/Chat-app/issues).

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

Built as a **MERN** learning and portfolio project demonstrating real-time messaging, secure auth patterns, and cloud image handling.

---

<div align="center">

**⭐ If you find this project useful, consider starring the repo on GitHub.**

</div>
