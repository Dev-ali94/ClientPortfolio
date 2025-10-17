import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import commentsRoutes from './routes/commentsRoutes.js'
import contactRotes from './routes/ContactRoutes.js'
import AdminLogin from './routes/adminRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
connectDB()

const allowedOrigins = [
  process.env.ADMIN_URL,   // your admin frontend URL
  "http://localhost:5173"  // local dev URL
];


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: allowedOrigins,  // allow only these origins
  credentials: true        // allow cookies
}));



app.use("/api/project", projectRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/contact", contactRotes);
app.use("/api/admin", AdminLogin);

export default app;
