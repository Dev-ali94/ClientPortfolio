import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import commentsRoutes from './routes/commentsRoutes.js'
import contactRoutes from './routes/ContactRoutes.js'
import AdminLogin from './routes/adminRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  process.env.ADMIN_URL,   // admin frontend
  process.env.PUBLIC_URL,  // public frontend
  "http://localhost:5173"  // local dev URL
];

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    // Admin requests (cookies) should have credentials
    const isAdmin = origin === process.env.ADMIN_URL;
    cors({
      origin,
      credentials: isAdmin
    })(req, res, next);
  } else {
    next();
  }
});

// Routes
app.use("/api/project", projectRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", AdminLogin);

export default app;
