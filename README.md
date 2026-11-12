# AI Learning Companion

A production-ready **MERN stack** AI-powered learning platform. Upload study materials and learn smarter with summaries, quizzes, flashcards, contextual chat, and personalized analytics.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Vite, Tailwind CSS, React Router, Axios, Context API |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Multer |
| AI | OpenAI / Gemini (Phase 3+) |
| Auth | JWT, bcrypt, forgot/reset password |

## Project Structure

```
AI-Based Learning Companion/
├── backend/
│   └── src/
│       ├── config/       # DB, env
│       ├── controllers/  # Route handlers
│       ├── middleware/   # Auth, validation, errors
│       ├── models/       # Mongoose schemas
│       ├── routes/       # API routes
│       ├── services/     # Business logic
│       ├── utils/        # Helpers, logger
│       └── validators/   # express-validator rules
├── frontend/
│   └── src/
│       ├── api/          # Axios + API modules
│       ├── components/   # Reusable UI
│       ├── context/      # Auth, Theme
│       └── pages/        # Route pages
└── README.md
```

## Development Roadmap

| Phase | Status | Features |
|-------|--------|----------|
| **1** | ✅ Done | Project setup, folder structure, JWT auth, dashboard shell |
| **2** | 🔜 Next | Upload system (Multer), material metadata in MongoDB |
| **3** | Planned | AI summaries, quizzes, flashcards, chat |
| **4** | Planned | Analytics, study planner, weakness detection |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set JWT_SECRET and MONGODB_URI
npm install
npm run dev
```

API runs at `http://localhost:5000/api`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`

## API Endpoints (Auth — Phase 1)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user (protected) |
| PUT | `/api/auth/profile` | Update profile (protected) |
| PUT | `/api/auth/change-password` | Change password (protected) |
| POST | `/api/auth/forgot-password` | Request reset email |
| PUT | `/api/auth/reset-password/:token` | Reset password |

## Environment Variables

See `backend/.env.example` and `frontend/.env.example`.

## License

MIT — Built for portfolio, GitHub, and interview showcase.
