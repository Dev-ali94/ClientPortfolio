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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,  
  credentials: true                 
}));

app.use("/api/project", projectRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/contact", contactRotes);
app.use("/api/admin", AdminLogin);
app.use("/api/project", projectRoutes);

export default app;
