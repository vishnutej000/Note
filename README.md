# Note

A full-stack (MERN) Note-taking application built with **React** (frontend), **Node.js** + **Express** (backend), and **MongoDB** (database).

This README explains how the application works, its architecture, prerequisites, required environment variables, and how to run both the frontend and backend locally for development.

---

## 🏗️ Project Structure

```
/
├── backend/           # Express API (Node.js)
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── controllers/   # Route handlers / logic
│   ├── .env.example   # Example environment variables
│   └── server.js      # Main entry point for backend
├── frontend/          # React application
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

---

## ⚙️ How This Application Works

### Frontend (React)
- **Location:** `frontend/`
- Built with React (JavaScript), providing a responsive and interactive UI for note-taking.
- Communicates with the backend via HTTP requests (usually to `/api/notes`, `/api/users`, etc).
- Handles user authentication (login/signup), note creation, editing, deletion, and visualization.

### Backend (Node.js, Express)
- **Location:** `backend/`
- RESTful API built with Node.js and Express.
- Handles user authentication, CRUD operations for notes, and connects to MongoDB.
- Uses environment variables for sensitive data (MongoDB URI, JWT secret, etc).
- Has error handling and input validation for reliability and security.

### Database (MongoDB)
- Stores users and notes.
- Accessed by the backend via Mongoose ODM.

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB server

---

### 2. Environment Variables (`.env`)

Create a `.env` file in the `backend/` directory.  
You can copy `.env.example` as a template:

```bash
cp backend/.env.example backend/.env
```

**Required variables:**

```env
PORT=5000                           # Backend server port
MONGODB_URI=mongodb+srv://...       # Your MongoDB connection string
JWT_SECRET=your_jwt_secret          # Secret key for JWT signing
```
> **Note:** Never commit your real `.env` to version control.

---

### 3. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 4. Running the Application Locally

#### Start MongoDB

- If using Atlas: ensure your cluster is running.
- If using local MongoDB: make sure `mongod` is running.

#### Start Backend

```bash
cd backend
npm run dev
```
- Backend API will run at `http://localhost:5000`

#### Start Frontend

```bash
cd ../frontend
npm start
```
- React app will run at `http://localhost:3000` and proxy API requests to the backend.

---

## 🛠️ Additional Notes

- Make sure the `proxy` field in `frontend/package.json` is set to the backend URL (usually `"proxy": "http://localhost:5000"`).
- If you change ports or API paths, update them in both frontend and backend accordingly.
- The backend uses JWT for authentication. Make sure your `JWT_SECRET` is strong and private.
- CORS is enabled for frontend-backend communication during development.

---

## 🧪 Testing

- Test user signup, login, note creation, editing, and deletion.
- Check network requests in browser dev tools for error messages.
- Backend logs errors to the console.

---

## 🚚 Deployment

- For production, build the frontend and serve static files from Express, or deploy frontend and backend separately (e.g., Vercel/Netlify + Render/Heroku).
- Set environment variables in your cloud environment.

---

## 🙋 FAQ

**Q: What if I get MongoDB connection errors?**  
A: Check your `MONGODB_URI` in `.env` and ensure your IP is whitelisted in Atlas.

**Q: How do I reset my notes/users?**  
A: Drop the relevant collections in your MongoDB database.

---

## 📄 License

MIT

---

**Enjoy fast, secure, and reliable note-taking!**
