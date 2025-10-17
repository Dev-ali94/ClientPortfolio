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


const allowedOrigins = [
  process.env.ADMIN_URL,   // admin frontend
  process.env.PUBLIC_URL,  // public frontend
  "http://localhost:5173"  // local dev URL
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // <--- This is mandatory for cookies
}));
// Routes
app.use("/api/project", projectRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", AdminLogin);

export default app;
