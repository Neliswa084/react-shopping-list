<img src="https://socialify.git.ci/Neliswa084/react-shopping-list/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="react-shopping-list" width="640" height="320" />
# React Shopping List App

A full-stack shopping list application built with React and TypeScript. Users can register, log in, create shopping lists organised by category, manage items, and share lists with others via a public link.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- A terminal

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-shopping-list

# Install dependencies
npm install
```

### Running the App

This project requires **two terminals** running at the same time — one for the JSON Server (backend) and one for the React app (frontend).

**Terminal 1 — Start the JSON Server (backend/API):**
```bash
npx json-server db.json --port 3000
```

**Terminal 2 — Start the React app:**
```bash
npm run dev
```

The app runs at **http://localhost:5173**  
The API runs at **http://localhost:3000**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI and component logic |
| Vite | Build tool and dev server |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side navigation and protected routes |
| Axios | HTTP requests to JSON Server |
| bcryptjs | Password hashing on register and login |
| JSON Server | Mock REST API (users and shopping lists) |
| CSS Modules | Component-scoped styling |

---

## 📁 Project Structure

```
├── src/
│   ├── Components/
│   │   ├── Items/
│   │   │   ├── ItemRow/          # Single item row with check, edit, delete
│   │   │   └── ItemImage/        # Item image display
│   │   ├── Lists/
│   │   │   ├── ListCard/         # Expandable list card with items and actions
│   │   │   └── ProgressBar/      # Visual progress bar (checked/total)
│   │   ├── Modals/
│   │   │   ├── AddListModal/     # Create a new shopping list
│   │   │   ├── EditListModal/    # Edit list name, category, notes
│   │   │   ├── AddItemModal/     # Add item with photo upload
│   │   │   ├── EditItemModal/    # Edit existing item
│   │   │   └── EditProfileModal/ # Edit user profile
│   │   ├── Navbar/               # Top navigation bar
│   │   ├── ProtectedRoute/       # Auth guard for private pages
│   │   └── UI/                   # Reusable components (Button, Input, SearchBar, etc.)
│   ├── pages/
│   │   ├── LandingPage.tsx       # Home/welcome page
│   │   ├── LoginPage.tsx         # User login
│   │   ├── RegisterPage.tsx      # User registration
│   │   ├── HomePage.tsx          # Main app — category cards and lists
│   │   ├── ProfilePage.tsx       # User profile
│   │   ├── SharedListPage.tsx    # Public shared list view (no login required)
│   │   └── ForgetPasswordPage.tsx
│   ├── redux/
│   │   ├── reducers/
│   │   │   ├── listSlice.ts      # Shopping list CRUD and thunks
│   │   │   ├── listItemSlice.ts  # Selected item state
│   │   │   ├── loginSlice.ts     # Auth state and login thunk
│   │   │   ├── signUpSlice.ts    # Registration thunk
│   │   │   └── modalSlice.ts     # Modal open/close and selected IDs
│   │   └── store.ts              # Redux store configuration
│   ├── App.tsx                   # Route definitions
│   └── main.tsx                  # App entry point
├── db.json                       # JSON Server database (users + lists)
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✨ Features

**Authentication**
- User registration with bcrypt password hashing
- Login with bcrypt password comparison
- Protected routes — unauthenticated users are redirected to login
- Auth state persisted to localStorage

**Shopping Lists**
- Create, edit, and delete shopping lists
- Lists are organised by category
- Category drill-down navigation — click a category to see its lists
- Search lists by name or notes
- Sort lists by name or date
- Statistics dashboard showing total lists, categories, items, and done count

**Items**
- Add, edit, delete, and check off items within any list
- Photo upload using the FileReader API (stored as base64)
- Items grouped by category inside each list
- Progress bar showing how many items have been checked

**Sharing**
- Share a list via the native Web Share API (mobile) or copy link to clipboard (desktop)
- Public shared list page at `/shared-list/:id` — accessible without logging in

---

## 🔐 Auth Flow

1. User registers — password is hashed with bcrypt before saving to JSON Server
2. User logs in — email is looked up, then `bcrypt.compare` checks the password
3. On success, user object is saved to Redux state and localStorage
4. `ProtectedRoute` checks Redux state on every protected page — redirects to `/login` if not authenticated

---

## 📡 API (JSON Server)

Base URL: `http://localhost:3000`

| Endpoint | Description |
|---|---|
| `GET /users` | Get all users |
| `POST /users` | Register a new user |
| `GET /list` | Get all shopping lists |
| `POST /list` | Create a new list |
| `PUT /list/:id` | Update a list or its items |
| `DELETE /list/:id` | Delete a list |

---

## 🧪 Pages Overview

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing Page | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/shared-list/:id` | Shared List View | No |
| `/home` | Home (lists + categories) | Yes |
| `/profile` | User Profile | Yes |
