import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import commentsRoutes from './routes/commentsRoutes.js';
import contactRoutes from './routes/ContactRoutes.js';
import AdminLogin from './routes/adminRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cors from "cors";

app.use(cors({
  origin: process.env.ADMIN_URL.replace(/\/$/, ""), // trailing slash remove
  credentials: true  // cookies یا tokens allow کریں
}));

// Routes
app.use("/api/project", projectRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", AdminLogin);

export default app;
